<?php

$position_options = array(
	'checkout_billing' => __( "After billing details", 'avangpress' ),
	'checkout_shipping' => __( 'After shipping details', 'avangpress' ),
	'checkout_after_customer_details' => __( 'After customer details', 'avangpress' ),
	'review_order_before_submit' => __( 'Before submit button', 'avangpress' ),
);




/** @var Avangpress_Integration $integration */

?>
<table class="form-table">
	<?php $config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][implicit]', 'value' => '0' ); ?>
	<tr valign="top" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">
		<th scope="row">
			<?php _e( 'Position', 'avangpress' ); ?>
		</th>
		<td>
			<select name="avangpress_integrations[<?php echo $integration->slug; ?>][position]">
				<?php

				foreach( $position_options as $value => $label ) {
					printf( '<option value="%s" %s>%s</option>', esc_attr( $value ), selected( $value, $opts['position'], false ), esc_html( $label ) );
				}
				?>

			</select>
		</td>
	</tr>
</table>
