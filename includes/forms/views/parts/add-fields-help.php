<?php defined( 'ABSPATH' ) or exit; ?>

<div class="avangpress-admin">
	<h2><?php _e( 'Add more fields', 'avangpress' ); ?></h2>

	<div class="help-text">

		<p>
			<?php echo __( 'To add more fields to your form, you will need to create those fields in Mail first.', 'avangpress' ); ?>
		</p>

		<p><strong><?php echo __( "Here's how:", 'avangpress' ); ?></strong></p>

		<ol>
			<li>
				<p>
					<?php echo __( 'Log in to your Mail account.', 'avangpress' ); ?>
				</p>
			</li>
			<li>
				<p>
					<?php echo __( 'Add list fields to any of your selected lists.', 'avangpress' ); ?>
					<?php echo __( 'Clicking the following links will take you to the right screen.', 'avangpress' ); ?>
				</p>
				<ul class="children lists--only-selected">
					<?php foreach( $lists as $list ) { ?>
					<li data-list-id="<?php echo $list->id; ?>" class="<?php echo in_array( $list->id, $opts['lists'] ) ? '' : 'hidden'; ?>">
						<a href="https://admin.mail.com/lists/settings/merge-tags?id=<?php echo $list->web_id; ?>">
							<span class="screen-reader-text"><?php _e( 'Edit list fields for', 'avangpress' ); ?> </span>
							<?php echo $list->name; ?>
						</a>
					</li>
					<?php } ?>
				</ul>
			</li>
			<li>
				<p>
					<?php echo __( 'Click the following button to have Mail for WordPress pick up on your changes.', 'avangpress' ); ?>
				</p>

				<p>
					<a class="button button-primary" href="<?php echo esc_attr( add_query_arg( array( 'avangpress_action' => 'empty_lists_cache' ) ) ); ?>">
						<?php _e( 'Renew Mail lists', 'avangpress' ); ?>
					</a>
				</p>
			</li>
		</ol>


	</div>
</div>