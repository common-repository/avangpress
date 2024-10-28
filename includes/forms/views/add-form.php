<?php defined('ABSPATH') or exit;?>
<div id="avangpress-admin" class="wrap avangpress-settings">

	    <p class="breadcrumbs">
        <span class="prefix"><?php echo __('You are here: ', 'avangpress'); ?></span>
        <a href="<?php echo admin_url('admin.php?page=avangpress'); ?>">AvangPress for WordPress</a> &rsaquo;
        <a href="<?php echo admin_url('admin.php?page=avangpress-forms'); ?>"><?php _e('Forms', 'avangpress'); ?></a>
        &rsaquo;
        <span class="current-crumb"><strong><?php echo __('Add Form', 'avangpress'); ?></strong></span>
    </p>

	<div class="row">
		<!-- Main Content -->
		<div class="main-content col col-4">

			<h1 class="page-title">
				<?php _e("Add new form", 'avangpress');?>
			</h1>

			<h2 style="display: none;"></h2><?php // fake h2 for admin notices ?>

			<div style="max-width: 480px;">

				<!-- Wrap entire page in <form> -->
				<form method="post">

					<input type="hidden" name="avangpress_action" value="add_form" />
					<?php wp_nonce_field('add_form', 'avangpress_nonce');?>


					<div class="small-margin">
						<h3>
							<label>
								<?php _e('What is the name of this form?', 'avangpress');?>
							</label>
						</h3>
						<input type="text" name="avangpress_form[name]" class="widefat" value="" spellcheck="true" autocomplete="off" placeholder="<?php _e('Enter your form title..', 'avangpress');?>">
					</div>

					<div class="small-margin">

						<h3>
							<label>
								<?php _e('To which Mail lists should this form subscribe?', 'avangpress');?>
							</label>
						</h3>

						<?php if (!empty($lists)) {?>
						<ul id="avangpress-lists">
							<?php foreach ($lists as $list) {?>
								<li>
									<label>
										<input type="checkbox" name="avangpress_form[settings][lists][<?php echo esc_attr($list->id); ?>]" value="<?php echo esc_attr($list->id); ?>" <?php checked($number_of_lists, 1);?> >
										<?php echo esc_html($list->name); ?>
									</label>
								</li>
							<?php }?>
						</ul>
						<?php } else {?>
						<p class="avangpress-notice">
							<?php printf(__('No lists found. Did you <a href="%s">connect with Mail</a>?', 'avangpress'), admin_url('admin.php?page=avangpress'));?>
						</p>
						<?php }?>

					</div>

					<?php submit_button(__('Add new form', 'avangpress'));?>


				</form><!-- Entire page form wrap -->

			</div>


			<?php include Avangpress_PLUGIN_DIR . 'includes/views/parts/admin-footer.php';?>

		</div><!-- / Main content -->

		<!-- Sidebar -->
		<div class="sidebar col col-2">
			<?php include Avangpress_PLUGIN_DIR . 'includes/views/parts/admin-sidebar.php';?>
		</div>
	</div>
</div>
