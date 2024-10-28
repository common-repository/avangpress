<?php

defined('ABSPATH') or exit;

/**
 * Class Avangpress_Ninja_Forms_Integration
 *
 * @ignore
 */
class Avangpress_Gravity_Forms_Integration extends Avangpress_Integration {

	/**
	 * @var string
	 */
	public $name = "Gravity Forms";

	/**
	 * @var string
	 */
	public $description = "Subscribe visitors from your Gravity Forms forms.";

	/**
	 * Add hooks
	 */
	public function add_hooks() {
		add_action('gform_field_standard_settings', array($this, 'settings_fields'), 10, 2);
		add_action('gform_editor_js', array($this, 'editor_js'));
		add_action('gform_after_submission', array($this, 'after_submission'), 10, 2);
	}

	public function after_submission($submission, $form) {

		$subscribe = false;
		$email_address = '';
		$mail_list_id = '';
		$double_optin = $this->options['double_optin'];

		// find email field & checkbox value
		foreach ($form['fields'] as $field) {
			if ($field->type === 'email' && empty($email_address) && !empty($submission[$field->id])) {
				$email_address = $submission[$field->id];
			}

			if ($field->type === 'mail' && !empty($submission[$field->id])) {
				$subscribe = true;
				$mail_list_id = $field->mail_list;

				if (isset($field->mail_double_optin)) {
					$double_optin = $field->mail_double_optin;
				}
			}
		}

		if (!$subscribe || empty($email_address)) {
			return;
		}

		// override integration settings with field options
		$orig_options = $this->options;
		$this->options['lists'] = array($mail_list_id);
		$this->options['double_optin'] = $double_optin;

		// perform the sign-up
		$this->subscribe(array('EMAIL' => $email_address), $submission['form_id']);

		// revert back to original options in case request lives on
		$this->options = $orig_options;
	}

	public function editor_js() {
		?>
        <script type="text/javascript">
            /*
            * When the field settings are initialized, populate
            * the custom field setting.
            */
            jQuery(document).on('gform_load_field_settings', function(ev, field) {
                jQuery('#field_mail_list').val(field.mail_list || '');
                jQuery('#field_mail_double_optin').val(field.mail_double_optin || "1");
            });
        </script>
        <?php
}

	public function settings_fields($pos, $form_id) {
		if ($pos !== 0) {
			return;
		}

		$mail = new Avangpress_Mail();
		$lists = $mail->get_cached_lists();
		?>
        <li class="mail_list_setting field_setting">
            <label for="field_mail_list" class="section_label">
                <?php esc_html_e('AvangPress list', 'avangpress');?>
            </label>
            <select id="field_mail_list" onchange="SetFieldProperty('mail_list', this.value)">
                <option value="" disabled><?php _e('Select a AvangPress list', 'avangpress');?></option>
                <?php foreach ($lists as $list) {
			echo sprintf('<option value="%s">%s</option>', $list->id, $list->name);
		}?>
            </select>
        </li>
        <li class="mail_double_optin field_setting">
            <label for="field_mail_double_optin" class="section_label">
                <?php esc_html_e('Double opt-in?', 'avangpress');?>
            </label>
            <select id="field_mail_double_optin" onchange="SetFieldProperty('mail_double_optin', this.value)">
                <option value="1"><?php echo __('Yes'); ?></option>
                <option value="0"><?php echo __('No'); ?></option>
            </select>
        </li>
        <?php
}

	/**
	 * @return bool
	 */
	public function is_installed() {
		return class_exists('GF_Field') && class_exists('GF_Fields');
	}

	/**
	 * @since 3.0
	 * @return array
	 */
	public function get_ui_elements() {
		return array();
	}

	/**
	 * @param int $form_id
	 * @return string
	 */
	public function get_object_link($form_id) {
		return '<a href="' . admin_url(sprintf('admin.php?page=gf_edit_forms&id=%d', $form_id)) . '">Gravity Forms</a>';
	}

}
