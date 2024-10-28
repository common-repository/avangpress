<?php

/**
 * Get a service by its name
 *
 * _Example:_
 *
 * $forms = avangpress('forms');
 * $api = avangpress('api');
 *
 * When no service parameter is given, the entire container will be returned.
 *
 * @ignore
 * @access private
 *
 * @param string $service (optional)
 * @return mixed
 *
 * @throws Exception when service is not found
 */
function avangpress($service = null)
{
    static $avangpress;

    if (!$avangpress) {
        $avangpress = new Avangpress_Container();
    }

    if ($service) {
        return $avangpress->get($service);
    }

    return $avangpress;
}

/**
 * Gets the Mail for WP options from the database
 * Uses default values to prevent undefined index notices.
 *
 * @since 1.0
 * @access public
 * @static array $options
 * @return array
 */
function avangpress_get_options()
{
    static $options;

    if (!$options) {
        $defaults = require Avangpress_PLUGIN_DIR . 'config/default-settings.php';
        $options = (array)get_option('avangpress', array());
        $options = array_merge($defaults, $options);
    }

    /**
     * Filters the Mail for WordPress settings (general).
     *
     * @param array $options
     */
    return apply_filters('avangpress_settings', $options);
}

/**
 * Gets the Mail for WP API class (v3) and injects it with the API key
 *
 * @since 4.0
 * @access public
 *
 * @return Avangpress_API_v3
 */
function avangpress_get_api()
{
    $opts = avangpress_get_options();
    $instance = new Avangpress_API($opts);
    return $instance;
}

/**
 * Creates a new instance of the Debug Log
 *
 * @return Avangpress_Debug_Log
 */
function avangpress_get_debug_log()
{
    $opts = avangpress_get_options();

    // get default log file location
    $upload_dir = wp_upload_dir(null, false);
    $file = trailingslashit($upload_dir['basedir']) . 'avangpress-debug-log.php';

    /**
     * Filters the log file to write to.
     *
     * @param string $file The log file location. Default: /wp-content/uploads/avangpress-debug.log
     */
    $file = apply_filters('avangpress_debug_log_file', $file);

    /**
     * Filters the minimum level to log messages.
     *
     * @see Avangpress_Debug_Log
     *
     * @param string|int $level The minimum level of messages which should be logged.
     */
    $level = apply_filters('avangpress_debug_log_level', $opts['debug_log_level']);

    return new Avangpress_Debug_Log($file, $level);
}


/**
 * Get current URL (full)
 *
 * @return string
 */
function avangpress_get_request_url() {
     global $wp;

    // get requested url from global $wp object
    $site_request_uri = $wp->request;

    // fix for IIS servers using index.php in the URL
    if (false !== stripos($_SERVER['REQUEST_URI'], '/index.php/' . $site_request_uri)) {
        $site_request_uri = 'index.php/' . $site_request_uri;
    }

    // concatenate request url to home url
    $url = home_url($site_request_uri);
    $url = trailingslashit($url);

    return esc_url($url);
}

/**
 * Get current URL path.
 * 
 * @return string
 */
function avangpress_get_request_path() 
{
    return $_SERVER['REQUEST_URI'];
}

/**
* Get IP address for client making current request
*
* @return string
*/
function avangpress_get_request_ip_address() 
{
    $headers = ( function_exists( 'apache_request_headers' ) ) ? apache_request_headers() : $_SERVER;

    if ( array_key_exists( 'X-Forwarded-For', $headers ) && filter_var( $headers['X-Forwarded-For'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
        return $headers['X-Forwarded-For'];
    }

    if ( array_key_exists( 'HTTP_X_FORWARDED_FOR', $headers ) && filter_var( $headers['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
        return $headers['HTTP_X_FORWARDED_FOR'];
    }

    return $_SERVER['REMOTE_ADDR'];
}

/**
 * Strips all HTML tags from all values in a mixed variable, then trims the result.
 *
 * @access public
 * @param mixed $value
 *
 * @return mixed
 */
function avangpress_sanitize_deep($value)
{

    if (is_scalar($value)) {
        // strip all HTML tags & whitespace
        $value = trim(strip_tags($value));

        // convert &amp; back to &
        $value = html_entity_decode($value, ENT_NOQUOTES);
    } elseif (is_array($value)) {
        $value = array_map('avangpress_sanitize_deep', $value);
    } elseif (is_object($value)) {
        $vars = get_object_vars($value);
        foreach ($vars as $key => $data) {
            $value->{$key} = avangpress_sanitize_deep($data);
        }
    }

    return $value;
}

/**
 *
 * @since 4.0
 * @ignore
 *
 * @param array $data
 * @return array
 */
function avangpress_update_groupings_data($data = array())
{

    // data still has old "GROUPINGS" key?
    if (empty($data['GROUPINGS'])) {
        return $data;
    }

    // prepare new key
    if (!isset($data['INTERESTS'])) {
        $data['INTERESTS'] = array();
    }

    $map = get_option('avangpress_groupings_map', array());

    foreach ($data['GROUPINGS'] as $grouping_id => $groups) {

        // for compatibility with expanded grouping arrays
        $grouping_key = $grouping_id;
        if (is_array($groups) && isset($groups['id']) && isset($groups['groups'])) {
            $grouping_id = $groups['id'];
            $groups = $groups['groups'];
        }

        // do we have transfer data for this grouping id?
        if (!isset($map[$grouping_id])) {
            continue;
        }

        // if we get a string, explode on delimiter(s)
        if (is_string($groups)) {
            // for BC with 3.x: explode on comma's
            $groups = join('|', explode(',', $groups));

            // explode on current delimiter
            $groups = explode('|', $groups);
        }

        // loop through groups and find interest ID
        $migrated = 0;
        foreach ($groups as $key => $group_name_or_id) {

            // do we know the new interest ID?
            if (empty($map[$grouping_id]['groups'][$group_name_or_id])) {
                continue;
            }

            $interest_id = $map[$grouping_id]['groups'][$group_name_or_id];

            // add to interests data
            if (!in_array($interest_id, $data['INTERESTS'])) {
                $migrated++;
                $data['INTERESTS'][] = $interest_id;
            }
        }

        // remove old grouping ID if we migrated all groups.
        if ($migrated === count($groups)) {
            unset($data['GROUPINGS'][$grouping_key]);
        }
    }

    // if everything went well, this is now empty & moved to new INTERESTS key.
    if (empty($data['GROUPINGS'])) {
        unset($data['GROUPINGS']);
    }

    // is this empty? just unset it then.
    if (empty($data['INTERESTS'])) {
        unset($data['INTERESTS']);
    }

    return $data;
}

/**
 * Guesses merge vars based on given data & current request.
 *
 * @since 3.0
 * @access public
 *
 * @param array $data
 *
 * @return array
 */
function avangpress_add_name_data($data = array())
{

    // Guess first and last name
    if (!empty($data['NAME']) && empty($data['FNAME']) && empty($data['LNAME'])) {
        $data['NAME'] = trim($data['NAME']);
        $strpos = strpos($data['NAME'], ' ');

        if ($strpos !== false) {
            $data['FNAME'] = trim(substr($data['NAME'], 0, $strpos));
            $data['LNAME'] = trim(substr($data['NAME'], $strpos));
        } else {
            $data['FNAME'] = $data['NAME'];
        }
    }

    // Set name value
    if (empty($data['NAME']) && !empty($data['FNAME']) && !empty($data['LNAME'])) {
        $data['NAME'] = sprintf('%s %s', $data['FNAME'], $data['LNAME']);
    }

    return $data;
}

/**
 * Gets the "email type" for new subscribers.
 *
 * Possible return values are either "html" or "text"
 *
 * @access public
 * @since 3.0
 *
 * @return string
 */
function avangpress_get_email_type()
{

    $email_type = 'html';

    /**
     * Filters the email type preference for this new subscriber.
     *
     * @param string $email_type
     */
    $email_type = (string)apply_filters('avangpress_email_type', $email_type);

    return $email_type;
}

/**
 *
 * @ignore
 * @return bool
 */
function avangpress_use_sslverify()
{

    // Disable for all transports other than CURL
    if (!function_exists('curl_version')) {
        return false;
    }

    $curl = curl_version();

    // Disable if OpenSSL is not installed
    if (empty($curl['ssl_version'])) {
        return false;
    }

    // Disable if on WP 4.4, see https://core.trac.wordpress.org/ticket/34935
    if ($GLOBALS['wp_version'] === '4.4') {
        return false;
    }

    return true;
}

/**
 * This will replace the first half of a string with "*" characters.
 *
 * @param string $string
 * @return string
 */
function avangpress_obfuscate_string($string)
{
    $length = strlen($string);
    $obfuscated_length = ceil($length / 2);
    $string = str_repeat('*', $obfuscated_length) . substr($string, $obfuscated_length);
    return $string;
}

/**
 * @internal
 * @ignore
 */
function avangpress_obfuscate_email_addresses_callback($m)
{
    $one = $m[1] . str_repeat('*', strlen($m[2]));
    $two = $m[3] . str_repeat('*', strlen($m[4]));
    $three = $m[5];
    return sprintf('%s@%s.%s', $one, $two, $three);
}

/**
 * Obfuscates email addresses in a string.
 *
 * @param $string String possibly containing email address
 * @return string
 */
function avangpress_obfuscate_email_addresses($string)
{
    return preg_replace_callback('/([\w\.]{1,4})([\w\.]*)\@(\w{1,2})(\w*)\.(\w+)/', 'avangpress_obfuscate_email_addresses_callback', $string);
}

/**
 * Refreshes Mail lists. This can take a while if the connected Mail account has many lists.
 *
 * @return void
 */
function avangpress_refresh_mail_lists()
{
    $mail = new Avangpress_Mail();
    $mail->fetch_lists();
}

/**
* Get element from array, allows for dot notation eg: "foo.bar"
*
* @param array $array
* @param string $key
* @param mixed $default
* @return mixed
*/
function avangpress_array_get( $array, $key, $default = null ) {
    if ( is_null( $key ) ) {
        return $array;
    }

    if ( isset( $array[$key] ) ) {
        return $array[$key];
    }

    foreach (explode( '.', $key ) as $segment) {
        if ( ! is_array( $array ) || ! array_key_exists( $segment, $array ) ) {
            return $default;
        }

        $array = $array[$segment];
    }

    return $array;
}
