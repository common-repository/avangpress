<p>
	<?php _e( 'To get a custom integration to work, include the following HTML in the form you are trying to integrate with.', 'avangpress' ); ?>
</p>

<?php ob_start(); ?>
<p>
	<label>
		<input type="checkbox" name="avangpress-subscribe" value="1" />
		<?php _e( 'Subscribe to our newsletter.', 'avangpress' ); ?>
	</label>
</p>

<?php $html = ob_get_clean(); ?>

<textarea class="widefat code-sample" rows="<?php echo substr_count( $html, PHP_EOL ); ?>" readonly onfocus="this.select()"><?php echo esc_textarea( $html ); ?></textarea>
