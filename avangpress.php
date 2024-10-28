<?php
/*
Plugin Name: AvangPress
Plugin URI: https://avangemail.com/blog/avangpress-wp-plugin
Description: AvangPress WordPress plugin by mehrdad seifzadeh.
Version: 1.0.1
Author: mehrdad.seifzadeh
Author URI: http://seifzadeh.blog.ir/
Text Domain: avangpress
Domain Path: /languages
License: GPL v3

AvangPress
Copyright (C) 2018, Mehrdad Seifzadeh, mehrdad.seifzadeh@gmail.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
https://avangemail.com/docs/#/
 */

// Prevent direct file access
defined('ABSPATH') or exit;

/**
 * Bootstrap the AvangPress for WordPress plugin
 *
 * @ignore
 * @access private
 * @return bool
 */
function avangpress_load_plugin() {

	global $avangpress;

	// bootstrap the core plugin
	define('Avangpress_VERSION', '1.0.1');
	define('Avangpress_PLUGIN_DIR', dirname(__FILE__) . '/');
	define('Avangpress_PLUGIN_URL', plugins_url('/', __FILE__));
	define('Avangpress_PLUGIN_FILE', __FILE__);

	// load autoloader if function not yet exists (for compat with sitewide autoloader)
	if (!function_exists('avangpress')) {
		require_once Avangpress_PLUGIN_DIR . 'vendor/autoload_52.php';
	}

	/**
	 * @global Avangpress_Container $GLOBALS['avangpress']
	 * @name $avangpress
	 */
	$avangpress = avangpress();
	$avangpress['api'] = 'avangpress_get_api';
	$avangpress['request'] = array('Avangpress_Request', 'create_from_globals');
	$avangpress['log'] = 'avangpress_get_debug_log';

	// forms
	$avangpress['forms'] = new Avangpress_Form_Manager();
	$avangpress['forms']->add_hooks();

	// integration core
	$avangpress['integrations'] = new Avangpress_Integration_Manager();
	$avangpress['integrations']->add_hooks();

	// Initialize admin section of plugin
	if (is_admin()) {

		$admin_tools = new Avangpress_Admin_Tools();

		if (defined('DOING_AJAX') && DOING_AJAX) {
			$ajax = new Avangpress_Admin_Ajax($admin_tools);
			$ajax->add_hooks();
		} else {
			$messages = new Avangpress_Admin_Messages();
			$avangpress['admin.messages'] = $messages;

			$mail = new Avangpress_Mail();

			$admin = new Avangpress_Admin($admin_tools, $messages, $mail);
			$admin->add_hooks();

			$forms_admin = new Avangpress_Forms_Admin($messages, $mail);
			$forms_admin->add_hooks();

			$integrations_admin = new Avangpress_Integration_Admin($avangpress['integrations'], $messages, $mail);
			$integrations_admin->add_hooks();
		}
	}

	return true;
}

// bootstrap custom integrations
function avangpress_bootstrap_integrations() {
	require_once Avangpress_PLUGIN_DIR . 'integrations/bootstrap.php';
}

add_action('plugins_loaded', 'avangpress_load_plugin', 8);
add_action('plugins_loaded', 'avangpress_bootstrap_integrations', 90);

/**
 * Flushes transient cache & schedules refresh hook.
 *
 * @ignore
 * @since 0.1
 */
function avangpress_on_plugin_activation() {
	$time_string = sprintf("tomorrow %d:%d%d am", rand(1, 6), rand(0, 5), rand(0, 9));
	wp_schedule_event(strtotime($time_string), 'daily', 'avangpress_refresh_mail_lists');
}

/**
 * Clears scheduled hook for refreshing Mail lists.
 *
 * @ignore
 * @since 0.0.1
 */
function avangpress_on_plugin_deactivation() {
	global $wpdb;
	wp_clear_scheduled_hook('avangpress_refresh_mail_lists');

	$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE 'avangpress_mail_list_%'");
}

register_activation_hook(__FILE__, 'avangpress_on_plugin_activation');
register_deactivation_hook(__FILE__, 'avangpress_on_plugin_deactivation');
