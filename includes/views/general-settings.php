<?php
defined('ABSPATH') or exit;
?>
<div id="avangpress-admin" class="wrap avangpress-settings">

	<div class="row">

		<!-- Main Content -->
		<div class="main-content col col-4">

			<h1 class="page-title">
				&nbsp;&nbsp;<?php _e('General Settings', 'avangpress');?>
			</h1>

			<h2 style="display: none;"></h2>
			<?php
settings_errors();
$this->messages->show();
?>

			<form action="<?php echo admin_url('options.php'); ?>" method="post">
				<?php settings_fields('avangpress_settings');?>

				<h3>
					<?php _e('AvangPress API Settings', 'avangpress');?>
				</h3>

				<table class="form-table">

					<tr valign="top">
						<th scope="row">
							<?php _e('Status', 'avangpress');?>
						</th>
						<td>
							<?php if ($connected) {?>
								<span class="status positive"><?php _e('CONNECTED', 'avangpress');?></span>
							<?php } else {?>
								<span class="status neutral"><?php _e('NOT CONNECTED', 'avangpress');?></span>
							<?php }?>
						</td>
					</tr>


					<tr valign="top">
						<th scope="row"><label for="avangpress_public_key"><?php _e('Public Key', 'avangpress');?></label></th>
						<td>
							<input type="text" class="widefat" placeholder="<?php _e('Your AvangPress Public key', 'avangpress');?>" id="avangpress_public_key"
							name="avangpress[public_key]" value="<?php echo esc_attr($public_key); ?>" />
						</td>
					</tr>


					<tr valign="top">
						<th scope="row"><label for="avangpress_privare_key"><?php _e('Private Key', 'avangpress');?></label></th>
						<td>
							<input type="text" class="widefat" placeholder="<?php _e('Your AvangPress Private key', 'avangpress');?>" id="avangpress_privare_key"
							name="avangpress[private_key]" value="<?php echo esc_attr($private_key); ?>" />

						</td>
					</tr>

				</table>
						<p class="help">
								<?php _e('The API key for connecting with your AvangPress account.', 'avangpress');?>
								<a target="_blank" href="https://app.avangemail.com/customer/guest/index"><?php _e('Get your API key here.', 'avangpress');?></a>
							</p>

				<?php submit_button();?>

			</form>

			<?php

/**
 * Runs right after general settings are outputted in admin.
 *
 * @since 3.0
 * @ignore
 */
do_action('avangpress_admin_after_general_settings');

if ($connected) {
	echo '<hr />';
	include dirname(__FILE__) . '/parts/lists-overview.php';
}

include dirname(__FILE__) . '/parts/admin-footer.php';

?>
		</div>

		<!-- Sidebar -->
		<div class="sidebar col col-2">
			<?php include dirname(__FILE__) . '/parts/admin-sidebar.php';?>
		</div>


	</div>

</div>

