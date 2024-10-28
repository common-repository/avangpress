<?php

/**
 * @use avangpress_add_name_merge_vars()
 * @deprecated 4.0
 * @ignore
 *
 * @param array $merge_vars
 * @return array
 */
function avangpress_guess_merge_vars( $merge_vars = array() ) {
	_deprecated_function( __FUNCTION__, 'Mail for WordPress v4.0' );
	$merge_vars = avangpress_add_name_data( $merge_vars );
	$merge_vars = avangpress_update_groupings_data( $merge_vars );
	return $merge_vars;
}

/**
 * Echoes a sign-up checkbox.
 *
 * @ignore
 * @deprecated 3.0
 *
 * @use avangpress_get_integration()
 */
function avangpress_checkbox() {
	_deprecated_function( __FUNCTION__, 'Mail for WordPress v3.0' );
	avangpress_get_integration('wp-comment-form')->output_checkbox();
}

/**
 * Echoes a Mail for WordPress form
 *
 * @ignore
 * @deprecated 3.0
 * @use avangpress_show_form()
 *
 * @param int $id
 * @param array $attributes
 *
 * @return string
 *
 */
function avangpress_form( $id = 0, $attributes = array() ) {
	_deprecated_function( __FUNCTION__, 'Mail for WordPress v3.0', 'avangpress_show_form' );
	return avangpress_show_form( $id, $attributes );
}

/**
 * @deprecated 4.1.12
 * @return string
 */
function avangpress_get_current_url()
{
   return $avangpress_get_current_url();
}
