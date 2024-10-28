<?php

defined( 'ABSPATH' ) or exit;

avangpress_register_integration( 'gravity-forms', 'Avangpress_Gravity_Forms_Integration', true );

if ( class_exists( 'GF_Fields' ) ) {
    GF_Fields::register( new Avangpress_Gravity_Forms_Field() );
}
