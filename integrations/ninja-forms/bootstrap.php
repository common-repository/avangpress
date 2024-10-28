<?php

avangpress_register_integration( 'ninja-forms', 'Avangpress_Ninja_Forms_Integration', true );

if( class_exists( 'Ninja_Forms' ) && method_exists( 'Ninja_Forms', 'instance' ) ) {
    $ninja_forms = Ninja_Forms::instance();

    if( isset( $ninja_forms->fields ) ) {
        $ninja_forms->fields['avangpress_optin'] = new Avangpress_Ninja_Forms_Field();
    }

    if( isset( $ninja_forms->actions ) ) {
        $ninja_forms->actions['avangpress_subscribe'] = new Avangpress_Ninja_Forms_Action();
    }
}
