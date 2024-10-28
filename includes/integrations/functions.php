<?php

/**
 * Gets an array of all registered integrations
 *
 * @since 3.0
 * @access public
 *
 * @return Avangpress_Integration[]
 */
function avangpress_get_integrations() {
	return avangpress('integrations')->get_all();
}

/**
 * Get an instance of a registered integration class
 *
 * @since 3.0
 * @access public
 *
 * @param string $slug
 *
 * @return Avangpress_Integration
 */
function avangpress_get_integration($slug) {
	return avangpress('integrations')->get($slug);
}

/**
 * Register a new integration with AvangPress for WordPress
 *
 * @since 3.0
 * @access public
 *
 * @param string $slug
 * @param string $class
 *
 * @param bool $always_enabled
 */
function avangpress_register_integration($slug, $class, $always_enabled = false) {
	return avangpress('integrations')->register_integration($slug, $class, $always_enabled);
}

/**
 * Deregister a previously registered integration with AvangPress for WordPress
 *
 * @since 3.0
 * @access public
 * @param string $slug
 */
function avangpress_deregister_integration($slug) {
	avangpress('integrations')->deregister_integration($slug);
}