<?php

/**
 * Try to include a file before each integration's settings page
 *
 * @param Avangpress_Integration $integration
 * @param array $opts
 * @ignore
 */
function avangpress_admin_before_integration_settings( Avangpress_Integration $integration, $opts ) {

	$file = dirname( __FILE__ ) . sprintf( '/%s/admin-before.php', $integration->slug );

	if( file_exists( $file ) ) {
		include $file;
	}
}

/**
 * Try to include a file before each integration's settings page
 *
 * @param Avangpress_Integration $integration
 * @param array $opts
 * @ignore
 */
function avangpress_admin_after_integration_settings( Avangpress_Integration $integration, $opts ) {
	$file = dirname( __FILE__ ) . sprintf( '/%s/admin-after.php', $integration->slug );

	if( file_exists( $file ) ) {
		include $file;
	}
}

add_action( 'avangpress_admin_before_integration_settings', 'avangpress_admin_before_integration_settings', 30, 2 );
add_action( 'avangpress_admin_after_integration_settings', 'avangpress_admin_after_integration_settings', 30, 2 );

// Register core integrations
avangpress_register_integration( 'ninja-forms-2', 'Avangpress_Ninja_Forms_v2_Integration', true );
avangpress_register_integration( 'wp-comment-form', 'Avangpress_Comment_Form_Integration' );
avangpress_register_integration( 'wp-registration-form', 'Avangpress_Registration_Form_Integration' );
avangpress_register_integration( 'buddypress', 'Avangpress_BuddyPress_Integration' );
avangpress_register_integration( 'woocommerce', 'Avangpress_WooCommerce_Integration' );
avangpress_register_integration( 'easy-digital-downloads', 'Avangpress_Easy_Digital_Downloads_Integration' );
avangpress_register_integration( 'contact-form-7', 'Avangpress_Contact_Form_7_Integration', true );
avangpress_register_integration( 'events-manager', 'Avangpress_Events_Manager_Integration' );
avangpress_register_integration( 'memberpress', 'Avangpress_MemberPress_Integration' );
avangpress_register_integration( 'affiliatewp', 'Avangpress_AffiliateWP_Integration' );

avangpress_register_integration( 'custom', 'Avangpress_Custom_Integration', true );
$dir = dirname( __FILE__ );
require $dir . '/ninja-forms/bootstrap.php';
require $dir . '/wpforms/bootstrap.php';
require $dir . '/gravity-forms/bootstrap.php';

