<?php
return array(
	'subscribed'               => array(
		'type' => 'success',
		'text' => __( 'Thank you, your sign-up request was successful! Please check your email inbox to confirm.', 'avangpress' )
	),
	'updated' 				   => array(
		'type' => 'success',
		'text' => __( 'Thank you, your records have been updated!', 'avangpress' ),
	),
	'unsubscribed'             => array(
		'type' => 'success',
		'text' => __( 'You were successfully unsubscribed.', 'avangpress' ),
	),
	'not_subscribed'           => array(
		'type' => 'notice',
		'text' => __( 'Given email address is not subscribed.', 'avangpress' ),
	),
	'error'                    => array(
		'type' => 'error',
		'text' => __( 'Oops. Something went wrong. Please try again later.', 'avangpress' ),
	),
	'invalid_email'            => array(
		'type' => 'error',
		'text' => __( 'Please provide a valid email address.', 'avangpress' ),
	),
	'already_subscribed'       => array(
		'type' => 'notice',
		'text' => __( 'Given email address is already subscribed, thank you!', 'avangpress' ),
	),
	'required_field_missing'   => array(
		'type' => 'error',
		'text' => __( 'Please fill in the required fields.', 'avangpress' ),
	),
	'no_lists_selected'        => array(
		'type' => 'error',
		'text' => __( 'Please select at least one list.', 'avangpress' )
	),
);
