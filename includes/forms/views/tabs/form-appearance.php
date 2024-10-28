<?php

$theme = wp_get_theme();
$css_options = array(
	'0' => sprintf( __( 'Inherit from %s theme', 'avangpress' ), $theme->Name ),
	'basic' => __( 'Basic', 'avangpress' ),
	__( 'Form Themes', 'avangpress' ) => array(
		'theme-light' => __( 'Light Theme', 'avangpress' ),
		'theme-dark' => __( 'Dark Theme', 'avangpress' ),
		'theme-red' => __( 'Red Theme', 'avangpress' ),
		'theme-green' => __( 'Green Theme', 'avangpress' ),
		'theme-blue' => __( 'Blue Theme', 'avangpress' ),
	)
);

/**
 * Filters the <option>'s in the "CSS Stylesheet" <select> box.
 *
 * @ignore
 */
$css_options = apply_filters( 'avangpress_admin_form_css_options', $css_options );

?>

<h2><?php _e( 'Form Appearance', 'avangpress' ); ?></h2>

<table class="form-table">
	<tr valign="top">
		<th scope="row"><label for="avangpress_load_stylesheet_select"><?php _e( 'Form Style' ,'avangpress' ); ?></label></th>
		<td class="nowrap valigntop">
			<select name="avangpress_form[settings][css]" id="avangpress_load_stylesheet_select">

				<?php foreach( $css_options as $key => $option ) {
					if( is_array( $option ) ) {
						$label = $key;
						$options = $option;
						printf( '<optgroup label="%s">', $label );
						foreach( $options as $key => $option ) {
							printf( '<option value="%s" %s>%s</option>', $key, selected( $opts['css'], $key, false ), $option );
						}
						print( '</optgroup>' );
					} else {
						printf( '<option value="%s" %s>%s</option>', $key, selected( $opts['css'], $key, false ), $option );
					}
				} ?>
			</select>
			<p class="help">
				<?php _e( 'If you want to load some default CSS styles, select "basic formatting styles" or choose one of the color themes' , 'avangpress' ); ?>
			</p>
		</td>
	</tr>

	<?php
	/** @ignore */
	do_action( 'avangpress_admin_form_after_appearance_settings_rows', $opts, $form );
	?>

</table>

<?php submit_button(); ?>