<?php add_thickbox(); ?>

<div class="alignright">
	<a href="#TB_inline?width=0&height=550&inlineId=avangpress-form-variables" class="thickbox button-secondary">
		<span class="dashicons dashicons-info"></span>
		<?php _e( 'Form variables', 'avangpress' ); ?>
	</a>
	<a href="#TB_inline?width=600&height=400&inlineId=avangpress-add-field-help" class="thickbox button-secondary">
		<span class="dashicons dashicons-editor-help"></span>
		<?php _e( 'Add more fields', 'avangpress' ); ?>
	</a>
</div>
<h2><?php _e( "Form Fields", 'avangpress' ); ?></h2>

<!-- Placeholder for the field wizard -->
<div id="avangpress-field-wizard"></div>

<div class="avangpress-row">
	<div class="avangpress-col avangpress-col-3 avangpress-form-editor-wrap">
		<h4 style="margin: 0"><label><?php _e( 'Form code', 'avangpress' ); ?></label></h4>
		<!-- Textarea for the actual form content HTML -->
		<textarea class="widefat" cols="160" rows="20" id="avangpress-form-content" name="avangpress_form[content]" placeholder="<?php _e( 'Enter the HTML code for your form fields..', 'avangpress' ); ?>" autocomplete="false" autocorrect="false" autocapitalize="false" spellcheck="false"><?php echo htmlspecialchars( $form->content, ENT_QUOTES, get_option( 'blog_charset' ) ); ?></textarea>
	</div>
	<div class="avangpress-col avangpress-col-3 avangpress-form-preview-wrap">
		<h4 style="margin: 0;">
			<label><?php _e( 'Form preview', 'avangpress' ); ?> 
			<span class="avangpress-tooltip dashicons dashicons-editor-help" title="<?php esc_attr_e( 'The form may look slightly different than this when shown in a post, page or widget area.', 'avangpress' ); ?>"></span>
			</label>
		</h4>
		<iframe id="avangpress-form-preview" src="<?php echo esc_attr( $form_preview_url ); ?>"></iframe>
	</div>
</div>


<!-- This field is updated by JavaScript as the form content changes -->
<input type="hidden" id="required-fields" name="avangpress_form[settings][required_fields]" value="<?php echo esc_attr( $form->settings['required_fields'] ); ?>" />

<?php submit_button(); ?>

<p class="avangpress-form-usage"><?php printf( __( 'Use the shortcode %s to display this form inside a post, page or text widget.' ,'avangpress' ), '<input type="text" onfocus="this.select();" readonly="readonly" value="'. esc_attr( sprintf( '[avangpress_form id="%d"]', $form->ID ) ) .'" size="'. ( strlen( $form->ID ) + 18 ) .'">' ); ?></p>


<?php // Content for Thickboxes ?>
<div id="avangpress-form-variables" style="display: none;">
	<?php include dirname( __FILE__ ) . '/../parts/dynamic-content-tags.php'; ?>
</div>

<div id="avangpress-add-field-help" style="display: none;">
	<?php include dirname( __FILE__ ) . '/../parts/add-fields-help.php'; ?>
</div>
