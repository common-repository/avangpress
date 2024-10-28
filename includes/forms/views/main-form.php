<?php defined('ABSPATH') or exit;?>
<div id="avangpress-admin" class="wrap avangpress-settings">
	<div class="row">
		<div class="main-content col col-4">
			<h1 class="page-title">
				<?php _e("Manage Forms", 'avangpress');?>
			</h1>

			<a href="<?=avangpress_get_add_form_url() ?>" class="button button-primary">Add New Form</a>

			<h2 style="display: none;"></h2><?php // fake h2 for admin notices ?>
			<div style="max-width: 780px;">
				<div class="avangpress-lists-overview">
					<?php if (empty($lists)) {?>
						<p><?php _e('No form were found in account', 'avangpress');?>.</p>
					<?php } else {
					printf('<p>' . __('A total of %d form were found in account.', 'avangpress') . '</p>', count($lists));

					echo '<table class="widefat striped">';

					$headings = array(
						__('ID', 'avangpress'),
						__('Form Name', 'avangpress'),
						__('Action', 'avangpress'),
					);

					echo '<thead>';
					echo '<tr>';
					foreach ($headings as $heading) {
						echo sprintf('<th>%s</th>', $heading);
					}
					echo '</tr>';
					echo '</thead>';

					foreach ($lists as $k => $list) {
						echo '<tr>';
						echo sprintf('<td><code>%s</code></td>', esc_html($list->ID));
						echo sprintf('<td><code>%s</code></td>', esc_html($list->name));

						echo '<td><a href="'.avangpress_get_edit_form_url($list->ID).'">Edit</a>';
						echo '&nbsp;&nbsp;&nbsp;<a onclick="return confirm(\'Are you sure, Delete the Form?\')" href="'.avangpress_get_delete_form_url($list->ID).'">Delete</a></td>';

						echo '</tr>';
						?>
						<?php }
					echo '</table>';
				} // end if empty ?>
				</div>
			</div>
			<?php include Avangpress_PLUGIN_DIR . 'includes/views/parts/admin-footer.php';?>
		</div>
		<div class="sidebar col col-2">
			<?php include Avangpress_PLUGIN_DIR . 'includes/views/parts/admin-sidebar.php';?>
		</div>
	</div>
</div>
