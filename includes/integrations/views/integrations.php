<?php defined('ABSPATH') or exit;
/** @var Avangpress_Integration_Fixture[] $enabled_integrations */
/** @var Avangpress_Integration_Fixture[] $available_integrations */

/**
 * Render a table with integrations
 *
 * @param $integrations
 * @ignore
 */
function avangpress_integrations_table($integrations) {
	?>
	<table class="avangpress-table widefat striped">

		<thead>
		<tr>
			<th><?php _e('Name', 'avangpress');?></th>
			<th><?php _e('Description', 'avangpress');?></th>
		</tr>
		</thead>

		<tbody>

		<?php foreach ($integrations as $integration) {

		$installed = $integration->is_installed();
		?>
			<tr style="<?php if (!$installed) {echo 'opacity: 0.4;';}?>">

				<!-- Integration Name -->
				<td>

					<?php
if ($installed) {
			printf('<strong><a href="%s" title="%s">%s</a></strong>', esc_attr(add_query_arg(array('integration' => $integration->slug))), __('Configure this integration', 'avangpress'), $integration->name);
		} else {
			echo $integration->name;
		}?>


				</td>
				<td class="desc">
					<?php
_e($integration->description, 'avangpress');
		?>
				</td>
			</tr>
		<?php }?>

		</tbody>
	</table><?php
}
?>
<div id="avangpress-admin" class="wrap avangpress-settings">

	<p class="breadcrumbs">
		<span class="prefix"><?php echo __('You are here: ', 'avangpress'); ?></span>
		<a href="<?php echo admin_url('admin.php?page=avangpress'); ?>">AvangPress for WordPress</a> &rsaquo;
		<span class="current-crumb"><strong><?php _e('Integrations', 'avangpress');?></strong></span>
	</p>

	<div class="main-content row">

		<!-- Main Content -->
		<div class="col col-4">

			<h1 class="page-title"><?php _e('Integrations', 'avangpress');?></h1>

			<h2 style="display: none;"></h2>
			<?php settings_errors();?>

			<p>
				<?php _e('The table below shows all available integrations.', 'avangpress');?>
				<?php _e('Click on the name of an integration to edit avangpress all settings specific to that integration.', 'avangpress');?>
			</p>

			<form action="<?php echo admin_url('options.php'); ?>" method="post">

				<?php settings_fields('avangpress_integrations_settings');?>

				<h3><?php _e('Enabled integrations', 'avangpress');?></h3>
				<?php avangpress_integrations_table($enabled_integrations);?>

				<div class="medium-margin"></div>

				<h3><?php _e('Available integrations', 'avangpress');?></h3>
				<?php avangpress_integrations_table($available_integrations);?>
                <p><?php echo __("Greyed out integrations will become available after installing & activating the corresponding plugin.", 'avangpress'); ?></p>


            </form>

		</div>

		<!-- Sidebar -->
		<div class="sidebar col col-2">
			<?php include Avangpress_PLUGIN_DIR . '/includes/views/parts/admin-sidebar.php';?>
		</div>

	</div>

</div>
