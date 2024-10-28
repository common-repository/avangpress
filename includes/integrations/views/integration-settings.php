<?php defined( 'ABSPATH' ) or exit;
/** @var Avangpress_Integration $integration */
/** @var array $opts */
?>
<div id="avangpress-admin" class="wrap avangpress-settings">

	<p class="breadcrumbs">
		<span class="prefix"><?php echo __( 'You are here: ', 'avangpress' ); ?></span>
		<a href="<?php echo admin_url( 'admin.php?page=avangpress' ); ?>">AvangPress for WordPress</a> &rsaquo;
		<a href="<?php echo admin_url( 'admin.php?page=avangpress-integrations' ); ?>"><?php _e( 'Integrations', 'avangpress' ); ?></a> &rsaquo;
		<span class="current-crumb"><strong><?php echo esc_html( $integration->name ); ?></strong></span>
	</p>

	<div class="main-content row">

		<!-- Main Content -->
		<div class="main-content col col-4 col-sm-6">

			<h1 class="page-title">
				<?php printf( __( '%s integration', 'avangpress' ), esc_html( $integration->name ) ); ?>
			</h1>

			<h2 style="display: none;"></h2>
			<?php settings_errors(); ?>

			<div id="notice-additional-fields" class="notice notice-info" style="display: none;">
				<p><?php _e( 'The selected AvangPress lists require non-default fields, which may prevent this integration from working.', 'avangpress' ); ?></p>
				<p><?php echo sprintf( __( 'Please ensure you <a href="%s">configure the plugin to send all required fields</a> or <a href="%s">log into your AvangPress account</a> and make sure only the email & name fields are marked as required fields for the selected list(s).', 'avangpress' ), 'https://avangemail.com/docs/#/' ); ?></p>
			</div>

			<p>
				<?php _e($integration->description, 'avangpress'); ?>
			</p>

			<!-- Settings form -->
			<form method="post" action="<?php echo admin_url( 'options.php' ); ?>">
				<?php settings_fields( 'avangpress_integrations_settings' ); ?>

				<?php

				/**
				 * Runs just before integration settings are outputted in admin.
				 *
				 * @since 3.0
				 *
				 * @param Avangpress_Integration $integration
				 * @param array $opts
				 * @ignore
				 */
				do_action( 'avangpress_admin_before_integration_settings', $integration, $opts );

				/**
				 * @ignore
				 */
				do_action( 'avangpress_admin_before_' . $integration->slug . '_integration_settings', $integration, $opts );
				?>

				<table class="form-table">

					<?php if( $integration->has_ui_element( 'enabled' ) ) { ?>
					<tr valign="top">
						<th scope="row"><?php _e( 'Enabled?', 'avangpress' ); ?></th>
						<td class="nowrap integration-toggles-wrap">
							<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][enabled]" value="1" <?php checked( $opts['enabled'], 1 ); ?> /> <?php _e( 'Yes' ); ?></label> &nbsp;
							<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][enabled]" value="0" <?php checked( $opts['enabled'], 0 ); ?> /> <?php _e( 'No' ); ?></label>
							<p class="help"><?php printf( __( 'Enable the %s integration? This will add a sign-up checkbox to the form.', 'avangpress' ), $integration->name ); ?></p>
						</td>
					</tr>
					<?php } ?>

					<?php $config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][enabled]', 'value' => '1', 'hide' => false ); ?>
					<tbody class="integration-toggled-settings" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">

					<?php if( $integration->has_ui_element( 'implicit' ) ) { ?>
						<tr valign="top">
							<th scope="row"><?php _e( 'Implicit?', 'avangpress' ); ?></th>
							<td class="nowrap">
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][implicit]" value="1" <?php checked( $opts['implicit'], 1 ); ?> /> <?php _e( 'Yes' ); ?></label> &nbsp;
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][implicit]" value="0" <?php checked( $opts['implicit'], 0 ); ?> /> <?php _e( 'No' ); ?> <?php echo '<em>' . __( '(recommended)', 'avangpress' ) . '</em>'; ?>
							</label>
								<p class="help">
									<?php _e( 'Select "yes" if you want to subscribe people without asking them explicitly.', 'avangpress' ); 
									echo '<br />';

									printf( __( '<strong>Warning: </strong> enabling this may affect your <a href="%s">GDPR compliance</a>.', 'avangpress' ), 'https://avangemail.com/docs/#/' ); ?>
									</p>
							</td>
						</tr>
					<?php } ?>

					<?php if( $integration->has_ui_element( 'lists' ) ) {
						?>
						<?php // hidden input to make sure a value is sent to the server when no checkboxes were selected ?>
						<input type="hidden" name="avangpress_integrations[<?php echo $integration->slug; ?>][lists][]" value="" />
						<tr valign="top">
							<th scope="row"><?php _e( 'Mail Lists', 'avangpress' ); ?></th>
							<?php if( ! empty( $lists ) ) {
								echo '<td>';
								echo '<ul style="margin-bottom: 20px; max-height: 300px; overflow-y: auto;">';
								foreach( $lists as $list ) {
									echo '<li><label>';
									echo sprintf( '<input type="checkbox" name="avangpress_integrations[%s][lists][]" value="%s" class="avangpress-list-input" %s> ', $integration->slug, $list->id, checked( in_array( $list->id, $opts['lists'] ), true, false ) );
									echo esc_html( $list->name );
									echo '</label></li>';
								}
								echo '</ul>';

								echo '<p class="help">';
								_e( 'Select the list(s) to which people who check the checkbox should be subscribed.' ,'avangpress' );
								echo '</p>';
								echo '</td>';
							} else {
								echo '<td>' . sprintf( __( 'No lists found, <a href="%s">are you connected to Mail</a>?', 'avangpress' ), admin_url( 'admin.php?page=avangpress' ) ) . '</td>';
							} ?>
						</tr>
					<?php } // end if UI has lists ?>

					<?php if( $integration->has_ui_element( 'label' ) ) {
						$config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][implicit]', 'value' => 0 );
						?>
						<tr valign="top" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">
							<th scope="row"><label for="avangpress_checkbox_label"><?php _e( 'Checkbox label text', 'avangpress' ); ?></label></th>
							<td>
								<input type="text"  class="widefat" id="avangpress_checkbox_label" name="avangpress_integrations[<?php echo $integration->slug; ?>][label]" value="<?php echo esc_attr( $opts['label'] ); ?>" required />
								<p class="help"><?php printf( __( 'HTML tags like %s are allowed in the label text.', 'avangpress' ), '<code>' . esc_html( '<strong><em><a>' ) . '</code>' ); ?></p>
							</td>
						</tr>
					<?php } // end if UI label ?>


					<?php if( $integration->has_ui_element( 'precheck' ) ) {
					$config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][implicit]', 'value' => 0 );
					?>
						<tr valign="top" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">
							<th scope="row"><?php _e( 'Pre-check the checkbox?', 'avangpress' ); ?></th>
							<td class="nowrap">
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][precheck]" value="1" <?php checked( $opts['precheck'], 1 ); ?> /> <?php _e( 'Yes' ); ?></label> &nbsp;
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][precheck]" value="0" <?php checked( $opts['precheck'], 0 ); ?> /> <?php _e( 'No' ); ?> <?php echo '<em>' . __( '(recommended)', 'avangpress' ) . '</em>'; ?></label>
								<p class="help">
									<?php _e( 'Select "yes" if the checkbox should be pre-checked.', 'avangpress' ); 
									echo '<br />';
									printf( __( '<strong>Warning: </strong> enabling this may affect your <a href="%s">GDPR compliance</a>.', 'avangpress' ), 'https://avangemail.com/docs/#/' ); ?>
								</p>
							</td>
					<?php } // end if UI precheck ?>

					<?php if( $integration->has_ui_element( 'css' ) ) {
					$config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][implicit]', 'value' => 0 );
					?>
						<tr valign="top" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">
							<th scope="row"><?php _e( 'Load some default CSS?', 'avangpress' ); ?></th>
							<td class="nowrap">
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][css]" value="1" <?php checked( $opts['css'], 1 ); ?> />&rlm; <?php _e( 'Yes' ); ?></label> &nbsp;
								<label><input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][css]" value="0" <?php checked( $opts['css'], 0 ); ?> />&rlm; <?php _e( 'No' ); ?></label>
								<p class="help"><?php _e( 'Select "yes" if the checkbox appears in a weird place.', 'avangpress' ); ?></p>
							</td>
						</tr>
					<?php } // end if UI css ?>

					<?php if( $integration->has_ui_element( 'double_optin' ) ) { ?>
						<tr valign="top">
							<th scope="row"><?php _e( 'Double opt-in?', 'avangpress' ); ?></th>
							<td class="nowrap">
								<label>
									<input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][double_optin]" value="1" <?php checked( $opts['double_optin'], 1 ); ?> />&rlm;
									<?php _e( 'Yes' ); ?>
								</label> &nbsp;
								<label>
									<input type="radio" id="avangpress_checkbox_double_optin_0" name="avangpress_integrations[<?php echo $integration->slug; ?>][double_optin]" value="0" <?php checked( $opts['double_optin'], 0 ); ?> />&rlm;
									<?php _e( 'No' ); ?>
								</label>
								<p class="help">
									<?php _e( 'Select "yes" if you want people to confirm their email address before being subscribed (recommended)', 'avangpress' ); ?>
								</p>
							</td>
						</tr>
					<?php } // end if UI double_optin ?>
					
					<?php if( $integration->has_ui_element( 'update_existing' ) ) { ?>
					<tr valign="top">
						<th scope="row"><?php _e( 'Update existing subscribers?', 'avangpress' ); ?></th>
						<td class="nowrap">
							<label>
								<input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][update_existing]" value="1" <?php checked( $opts['update_existing'], 1 ); ?> />&rlm;
								<?php _e( 'Yes' ); ?>
							</label> &nbsp;
							<label>
								<input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][update_existing]" value="0" <?php checked( $opts['update_existing'], 0 ); ?> />&rlm;
								<?php _e( 'No' ); ?>
							</label>
							<p class="help"><?php _e( 'Select "yes" if you want to update existing subscribers with the data that is sent.', 'avangpress' ); ?></p>
						</td>
					</tr>
					<?php } // end if UI update_existing ?>

					<?php if( $integration->has_ui_element( 'replace_interests' ) ) {
						$config = array( 'element' => 'avangpress_integrations['. $integration->slug .'][update_existing]', 'value' => 1 );
						?>
						<tr valign="top" data-showif="<?php echo esc_attr( json_encode( $config ) ); ?>">
							<th scope="row"><?php _e( 'Replace interest groups?', 'avangpress' ); ?></th>
							<td class="nowrap">
								<label>
									<input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][replace_interests]" value="1" <?php checked( $opts['replace_interests'], 1 ); ?> />&rlm;
									<?php _e( 'Yes' ); ?>
								</label> &nbsp;
								<label>
									<input type="radio" name="avangpress_integrations[<?php echo $integration->slug; ?>][replace_interests]" value="0" <?php checked( $opts['replace_interests'], 0 ); ?> />&rlm;
									<?php _e( 'No' ); ?>
								</label>
								<p class="help">
									<?php _e( 'Select "no" if you want to add the selected interests to any previously selected interests when updating a subscriber.', 'avangpress' ); ?>
									<?php printf( ' <a href="%s" target="_blank">' . __( 'What does this do?', 'avangpress' ) . '</a>', 
									'https://avangemail.com/docs/#/' ); ?>
								</p>
							</td>
						</tr>
					<?php } // end if UI replace_interests ?>

					</tbody>
				</table>

				<?php

				/**
				 * Runs right after integration settings are outputted (before the submit button).
				 *
				 * @param Avangpress_Integration $integration
				 * @param array $opts
				 * @ignore
				 */
				do_action( 'avangpress_admin_after_integration_settings', $integration, $opts );

				/**
				 * @ignore
				 */
				do_action( 'avangpress_admin_after_' . $integration->slug . '_integration_settings', $integration, $opts );
				?>

				<?php if( count( $integration->get_ui_elements() ) > 0 ) { submit_button(); } ?>

			</form>


		</div>

		<!-- Sidebar -->
		<div class="sidebar col col-2">
			<?php include Avangpress_PLUGIN_DIR . '/includes/views/parts/admin-sidebar.php'; ?>
		</div>

	</div>

</div>
