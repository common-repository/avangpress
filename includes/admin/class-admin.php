<?php

/**
 * Class Avangpress_Admin
 *
 * @ignore
 * @access private
 */
class Avangpress_Admin {

	/**
	 * @var string The relative path to the main plugin file from the plugins dir
	 */
	protected $plugin_file;

	/**
	 * @var Avangpress_Mail
	 */
	protected $mail;

	/**
	 * @var Avangpress_Admin_Messages
	 */
	protected $messages;


	/**
	 * @var Avangpress_Admin_Tools
	 */
	protected $tools;

	/**
	 * @var Avangpress_Admin_Review_Notice
	 */
	protected $review_notice;

	/**
	 * Constructor
	 *
	 * @param Avangpress_Admin_Tools $tools
	 * @param Avangpress_Admin_Messages $messages
	 * @param Avangpress_Mail      $mail
	 */
	public function __construct(Avangpress_Admin_Tools $tools, Avangpress_Admin_Messages $messages, Avangpress_Mail $mail) {
		$this->tools = $tools;
		$this->mail = $mail;
		$this->messages = $messages;
		$this->plugin_file = plugin_basename(Avangpress_PLUGIN_FILE);
		$this->review_notice = new Avangpress_Admin_Review_Notice($tools);
		$this->load_translations();
	}

	/**
	 * Registers all hooks
	 */
	public function add_hooks() {

		// Actions used globally throughout WP Admin
		add_action('admin_menu', array($this, 'build_menu'));
		add_action('admin_init', array($this, 'initialize'));

		add_action('current_screen', array($this, 'customize_admin_texts'));
		add_action('wp_dashboard_setup', array($this, 'register_dashboard_widgets'));
		add_action('avangpress_admin_empty_lists_cache', array($this, 'renew_lists_cache'));
		add_action('avangpress_admin_empty_debug_log', array($this, 'empty_debug_log'));

		add_action('admin_notices', array($this, 'show_api_key_notice'));
		add_action('avangpress_admin_dismiss_api_key_notice', array($this, 'dismiss_api_key_notice'));
		add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));


		$this->messages->add_hooks();
		$this->review_notice->add_hooks();
	}

	/**
	 * Initializes various stuff used in WP Admin
	 *
	 * - Registers settings
	 */
	public function initialize() {

		// register settings
		register_setting('avangpress_settings', 'avangpress', array($this, 'save_general_settings'));

		// listen for custom actions
		$this->listen_for_actions();
	}

	/**
	 * Listen for `avangpress_action` requests
	 */
	public function listen_for_actions() {

		// listen for any action (if user is authorised)
		if (!$this->tools->is_user_authorized() || !isset($_REQUEST['avangpress_action'])) {
			return false;
		}

		$action = (string) $_REQUEST['avangpress_action'];

		/**
		 * Allows you to hook into requests containing `avangpress_action` => action name.
		 *
		 * The dynamic portion of the hook name, `$action`, refers to the action name.
		 *
		 * By the time this hook is fired, the user is already authorized. After processing all the registered hooks,
		 * the request is redirected back to the referring URL.
		 *
		 * @since 3.0
		 */
		do_action('avangpress_admin_' . $action);

		// redirect back to where we came from
		$redirect_url = !empty($_POST['_redirect_to']) ? $_POST['_redirect_to'] : remove_query_arg('avangpress_action');
		wp_redirect($redirect_url);
		exit;
	}

	/**
	 * Register dashboard widgets
	 */
	public function register_dashboard_widgets() {

		if (!$this->tools->is_user_authorized()) {
			return false;
		}

		/**
		 * Setup dashboard widget, users are authorized by now.
		 *
		 * Use this hook to register your own dashboard widgets for users with the required capability.
		 *
		 * @since 3.0
		 * @ignore
		 */
		do_action('avangpress_dashboard_setup');

		return true;
	}

	/**
	 * Renew Mail lists cache
	 */
	public function renew_lists_cache() {
		// try getting new lists to fill cache again
		$lists = $this->mail->fetch_lists();

		if (!empty($lists)) {
			$this->messages->flash(__('Success! The cached configuration for your Mail lists has been renewed.', 'avangpress'));
		}
	}

	/**
	 * Load the plugin translations
	 */
	private function load_translations() {
		// load the plugin text domain
		load_plugin_textdomain('avangpress', false, dirname($this->plugin_file) . '/languages');
	}

	/**
	 * Customize texts throughout WP Admin
	 */
	public function customize_admin_texts() {
		$texts = new Avangpress_Admin_Texts($this->plugin_file);
		$texts->add_hooks();
	}

	/**
	 * Validates the General settings
	 * @param array $settings
	 * @return array
	 */
	public function save_general_settings(array $settings) {


		$current = avangpress_get_options();

		// merge with current settings to allow passing partial arrays to this method
		$settings = array_merge($current, $settings);


		// Make sure not to use obfuscated public key
		if (strpos($settings['public_key'], '*') !== false) {
			$settings['public_key'] = $current['public_key'];
		}

		// Make sure not to use obfuscated private key
		if (strpos($settings['private_key'], '*') !== false) {
			$settings['private_key'] = $current['private_key'];
		}

		// Sanitize public key
		$settings['public_key'] = sanitize_text_field($settings['public_key']);

		// Sanitize private key
		$settings['private_key'] = sanitize_text_field($settings['private_key']);

		// if public key changed, empty AvangPress cache
		if ($settings['public_key'] !== $current['public_key']) {
			$this->mail->empty_cache();
		}

		// if private key changed, empty AvangPress cache
		if ($settings['private_key'] !== $current['private_key']) {
			$this->mail->empty_cache();
		}

		/**
		 * Runs right before general settings are saved.
		 *
		 * @param array $settings The updated settings array
		 * @param array $current The old settings array
		 */
		do_action('avgeml_save_settings', $settings, $current);

		return $settings;
	}

	/**
	 * Load scripts and stylesheet on Mail for WP Admin pages
	 *
	 * @return bool
	 */
	public function enqueue_assets() {

		global $wp_scripts;

		if (!$this->tools->on_plugin_page()) {
			return false;
		}

		$opts = avangpress_get_options();
		$page = $this->tools->get_plugin_page();
		$suffix = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';

		// css
		wp_register_style('avangpress-admin', Avangpress_PLUGIN_URL . 'assets/css/admin-styles' . $suffix . '.css', array(), Avangpress_VERSION);
		wp_enqueue_style('avangpress-admin');

		// js
		wp_register_script('es5-shim', Avangpress_PLUGIN_URL . 'assets/js/third-party/es5-shim.min.js', array(), Avangpress_VERSION);
		$wp_scripts->add_data('es5-shim', 'conditional', 'lt IE 9');

		// TODO: eventually get rid of jQuery here
		wp_register_script('avangpress-admin', Avangpress_PLUGIN_URL . 'assets/js/admin' . $suffix . '.js', array('jquery', 'es5-shim'), Avangpress_VERSION, true);
		wp_enqueue_script(array('jquery', 'es5-shim', 'avangpress-admin'));

		wp_localize_script('avangpress-admin', 'avangpress_vars',
			array(
				'mail' => array(
					'api_connected' => !empty($opts['api_key']),
					'lists' => $this->mail->get_cached_lists(),
				),
				'countries' => Avangpress_Tools::get_countries(),
				'i18n' => array(
					'pro_only' => __('This is a pro-only feature. Please upgrade to the premium version to be able to use it.', 'avangpress'),
					'renew_mail_lists' => __('Renew AvangPress lists', 'avangpress'),
					'fetching_mail_lists' => __('Fetching AvangPress lists', 'avangpress'),
					'fetching_mail_lists_done' => __('Done! AvangPress lists renewed.', 'avangpress'),
					'fetching_mail_lists_can_take_a_while' => __('This can take a while if you have many AvangPress lists.', 'avangpress'),
					'fetching_mail_lists_error' => __('Failed to renew your lists. An error occured.', 'avangpress'),
				),
			)
		);

		/**
		 * Hook to enqueue your own custom assets on the Mail for WordPress setting pages.
		 *
		 * @since 3.0
		 *
		 * @param string $suffix
		 * @param string $page
		 */
		do_action('avangpress_admin_enqueue_assets', $suffix, $page);

		return true;
	}

	/**
	 * Register the setting pages and their menu items
	 */
	public function build_menu() {
		$required_cap = $this->tools->get_required_capability();

		$menu_items = array(
			array(
				'title' => __('AvangPress API Settings', 'avangpress'),
				'text' => __('AvangPress', 'avangpress'),
				'slug' => '',
				'callback' => array($this, 'show_generals_setting_page'),
				'position' => 0,
			),
			array(
				'title' => __('Other Settings', 'avangpress'),
				'text' => __('Other', 'avangpress'),
				'slug' => 'other',
				'callback' => array($this, 'show_other_setting_page'),
				'position' => 90,
			),

		);

		/**
		 * Filters the menu items to appear under the main menu item.
		 *
		 * To add your own item, add an associative array in the following format.
		 *
		 * $menu_items[] = array(
		 *     'title' => 'Page title',
		 *     'text'  => 'Menu text',
		 *     'slug' => 'Page slug',
		 *     'callback' => 'my_page_function',
		 *     'position' => 50
		 * );
		 *
		 * @param array $menu_items
		 * @since 3.0
		 */
		$menu_items = (array) apply_filters('avangpress_admin_menu_items', $menu_items);

		// add top menu item
		add_menu_page('AvangPress', 'AvangPress', $required_cap, 'avangpress', array($this, 'show_generals_setting_page'), Avangpress_PLUGIN_URL . 'assets/img/icon.png', '99.68491');

		// sort submenu items by 'position'
		usort($menu_items, array($this, 'sort_menu_items_by_position'));

		// add sub-menu items
		foreach ($menu_items as $item) {
			$this->add_menu_item($item);
		}
	}

	/**
	 * @param array $item
	 */
	public function add_menu_item(array $item) {

		// generate menu slug
		$slug = 'avangpress';
		if (!empty($item['slug'])) {
			$slug .= '-' . $item['slug'];
		}

		// provide some defaults
		$parent_slug = !empty($item['parent_slug']) ? $item['parent_slug'] : 'avangpress';
		$capability = !empty($item['capability']) ? $item['capability'] : $this->tools->get_required_capability();

		// register page
		$hook = add_submenu_page($parent_slug, $item['title'] . ' - AvangPress', $item['text'], $capability, $slug, $item['callback']);

		// register callback for loading this page, if given
		if (array_key_exists('load_callback', $item)) {
			add_action('load-' . $hook, $item['load_callback']);
		}
	}

	/**
	 * Show the API Settings page
	 */
	public function show_generals_setting_page() {
		$opts = avangpress_get_options();

		$connected = !empty($opts['public_key']);
		if ($connected) {
			try {
				$connected = $this->get_api()->is_connected();
			} catch (Avangpress_API_Connection_Exception $e) {
				$message = sprintf("<strong>%s</strong> %s %s ", __("Error connecting to AvangPress:", 'avangpress'), $e->getCode(), $e->getMessage());

				if (is_object($e->data) && !empty($e->data->ref_no)) {
					$message .= '<br />' . sprintf(__('Looks like your server is blocked by AvangPress\'s firewall. Please contact AvangPress support and include the following reference number: %s', 'avangpress'), $e->data->ref_no);
				}

				$message .= '<br /><br />' . sprintf('<a href="%s">' . __('Here\'s some info on solving common connectivity issues.', 'avangpress') . '</a>', 'https://avangemail.com/docs/#/');

				$this->messages->flash($message, 'error');
				$connected = false;
			} catch (Avangpress_API_Exception $e) {
				$this->messages->flash(sprintf("<strong>%s</strong><br /> %s", __("AvangPress returned the following error:", 'avangpress'), $e), 'error');
				$connected = false;
			}
		}

		$lists = $this->mail->get_cached_lists();
		$public_key = avangpress_obfuscate_string($opts['public_key']);
		$private_key = avangpress_obfuscate_string($opts['private_key']);

		require Avangpress_PLUGIN_DIR . 'includes/views/general-settings.php';
	}

	/**
	 * Show the Other Settings page
	 */
	public function show_other_setting_page() {
		$opts = avangpress_get_options();
		$log = $this->get_log();
		$log_reader = new Avangpress_Debug_Log_Reader($log->file);
		require Avangpress_PLUGIN_DIR . 'includes/views/other-settings.php';
	}

	/**
	 * @param $a
	 * @param $b
	 *
	 * @return int
	 */
	public function sort_menu_items_by_position($a, $b) {
		$pos_a = isset($a['position']) ? $a['position'] : 80;
		$pos_b = isset($b['position']) ? $b['position'] : 90;
		return $pos_a < $pos_b ? -1 : 1;
	}

	/**
	 * Empties the log file
	 */
	public function empty_debug_log() {
		$log = $this->get_log();
		file_put_contents($log->file, '');

		$this->messages->flash(__('Log successfully emptied.', 'avangpress'));
	}

	/**
	 * Shows a notice when API key is not set.
	 */
	public function show_api_key_notice() {

		// don't show if on settings page already
		if ($this->tools->on_plugin_page('')) {
			return;
		}

		// only show to user with proper permissions
		if (!$this->tools->is_user_authorized()) {
			return;
		}

		// don't show if dismissed
		if (get_transient('avangpress_api_key_notice_dismissed')) {
			return;
		}

		// don't show if api key is set already
		$options = avangpress_get_options();
		if (!empty($options['public_key'])) {
			return;
		}

		echo '<div class="notice notice-warning avangpress-is-dismissible">';
		echo '<p>' . sprintf(__('To get started with AvangPress for WordPress, please <a href="%s">enter your AvangPress API key on the settings page of the plugin</a>.', 'avangpress'), admin_url('admin.php?page=avangpress')) . '</p>';
		echo '<form method="post"><input type="hidden" name="avangpress_action" value="dismiss_api_key_notice" /><button type="submit" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></form>';
		echo '</div>';
	}

	/**
	 * Dismisses the API key notice for 1 week
	 */
	public function dismiss_api_key_notice() {
		set_transient('avangpress_api_key_notice_dismissed', 1, 3600 * 24 * 7);
	}

	/**
	 * @return Avangpress_Debug_Log
	 */
	protected function get_log() {
		return avangpress('log');
	}

	/**
	 * @return Avangpress_API
	 */
	protected function get_api() {
		return avangpress('api');
	}

}
