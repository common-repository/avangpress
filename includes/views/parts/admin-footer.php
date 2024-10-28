<?php defined('ABSPATH') or exit;

/**
 * @ignore
 */
function avangpress_admin_translation_notice() {

	// show for every language other than the default
	if (stripos(get_locale(), 'en_us') === 0) {
		return;
	}

	// TODO: Check translation progress from Transifex here. Only show when < 100.

	echo '<p class="help">' . sprintf(__('AvangPress for WordPress is in need of translations. Is the plugin not translated in your language or do you spot errors with the current translations? Helping out is easy! Head over to <a href="%s">the translation project and click "help translate"</a>.', 'avangpress'), 'https://avangemail.com/docs/#/') . '</p>';
}

/**
 * @ignore
 */
function avangpress_admin_github_notice() {

	if (strpos($_SERVER['HTTP_HOST'], 'local') !== 0 && !WP_DEBUG) {
		return;
	}

	echo '<p class="help">Developer? Follow <a href="https://avangemail.com/docs/#/">AvangPress for WordPress on GitHub</a> or have a look at our repository of <a href="https://avangemail.com/docs/#/">sample code snippets</a>.</p>';

}

/**
 * @ignore
 */
function avangpress_admin_disclaimer_notice() {
	echo '<p class="help">' . __('This plugin is developed by AvangPress for wordpress.', 'avangpress') . '</p>';
}

add_action('avangpress_admin_footer', 'avangpress_admin_translation_notice', 20);
add_action('avangpress_admin_footer', 'avangpress_admin_github_notice', 50);
add_action('avangpress_admin_footer', 'avangpress_admin_disclaimer_notice', 80);
?>

<div class="big-margin">

	<?php

/**
 * Runs while printing the footer of every AvangPress for WordPress settings page.
 *
 * @since 3.0
 */
do_action('avangpress_admin_footer');?>

</div>
