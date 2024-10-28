<?php

defined( 'ABSPATH' ) or exit;

add_filter( 'avangpress_form_data', 'avangpress_add_name_data', 60 );
add_filter( 'avangpress_integration_data', 'avangpress_add_name_data', 60 );

add_filter( 'mctb_data', 'avangpress_update_groupings_data', PHP_INT_MAX - 1 );
add_filter( 'avangpress_form_data', 'avangpress_update_groupings_data', PHP_INT_MAX - 1 );
add_filter( 'avangpress_integration_data', 'avangpress_update_groupings_data', PHP_INT_MAX - 1 );
add_filter( 'mail_sync_user_data', 'avangpress_update_groupings_data', PHP_INT_MAX - 1 );
add_filter( 'avangpress_use_sslverify', 'avangpress_use_sslverify', 1 );
