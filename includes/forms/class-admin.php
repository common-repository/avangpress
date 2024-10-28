<?php

/**
 * Class Avangpress_Forms_Admin
 *
 * @ignore
 * @access private
 */
class Avangpress_Forms_Admin {

	/**
	 * @var Avangpress_Admin_Messages
	 */
	protected $messages;

	/**
	 * @var Avangpress_Mail
	 */
	protected $mail;

	/**
	 * @param Avangpress_Admin_Messages $messages
	 * @param Avangpress_Mail $mail
	 */
	public function __construct(Avangpress_Admin_Messages $messages, Avangpress_Mail $mail) {
		$this->messages = $messages;
		$this->mail = $mail;
	}

	/**
	 * Add hooks
	 */
	public function add_hooks() {
		add_action('register_shortcode_ui', array($this, 'register_shortcake_ui'));
		add_action('avangpress_save_form', array($this, 'update_form_stylesheets'));
		add_action('avangpress_admin_edit_form', array($this, 'process_save_form'));
		add_action('avangpress_admin_add_form', array($this, 'process_add_form'));

		add_filter('avangpress_admin_menu_items', array($this, 'add_menu_item'), 5);
		add_action('avangpress_admin_show_forms_page-main-form', array($this, 'show_main_page'));
		add_action('avangpress_admin_show_forms_page-add-form', array($this, 'show_add_page'));
		add_action('avangpress_admin_show_forms_page-edit-form', array($this, 'show_edit_page'));
		add_action('avangpress_admin_show_forms_page-delete-form', array($this, 'show_delete_page'));
		add_action('avangpress_admin_enqueue_assets', array($this, 'enqueue_assets'), 10, 2);
	}

	/**
	 * @param string $suffix
	 * @param string $page
	 */
	public function enqueue_assets($suffix, $page = '') {

		if ($page !== 'forms' || empty($_GET['view']) || $_GET['view'] !== 'edit-form') {
			return;
		}

		wp_register_script('avangpress-forms-admin', Avangpress_PLUGIN_URL . 'assets/js/forms-admin' . $suffix . '.js', array('avangpress-admin'), Avangpress_VERSION, true);
		wp_enqueue_script('avangpress-forms-admin');
		wp_localize_script('avangpress-forms-admin', 'avangpress_forms_i18n', array(
			'addToForm' => __("Add to form", 'avangpress'),
			'agreeToTerms' => __("I have read and agree to the terms & conditions", 'avangpress'),
			'agreeToTermsShort' => __("Agree to terms", 'avangpress'),
			'agreeToTermsLink' => __('Link to your terms & conditions page', 'avangpress'),
			'city' => __('City', 'avangpress'),
			'checkboxes' => __('Checkboxes', 'avangpress'),
			'choices' => __('Choices', 'avangpress'),
			'choiceType' => __("Choice type", 'avangpress'),
			'chooseField' => __("Choose a field to add to the form", 'avangpress'),
			'close' => __('Close', 'avangpress'),
			'country' => __('Country', 'avangpress'),
			'dropdown' => __('Dropdown', 'avangpress'),
			'fieldType' => __('Field type', 'avangpress'),
			'fieldLabel' => __("Field label", 'avangpress'),
			'formAction' => __('Form action', 'avangpress'),
			'formActionDescription' => __('This field will allow your visitors to choose whether they would like to subscribe or unsubscribe', 'avangpress'),
			'formFields' => __('Form fields', 'avangpress'),
			'forceRequired' => __('This field is marked as required in Mail.', 'avangpress'),
			'initialValue' => __("Initial value", 'avangpress'),
			'interestCategories' => __('Interest categories', 'avangpress'),
			'isFieldRequired' => __("Is this field required?", 'avangpress'),
			'listChoice' => __('List choice', 'avangpress'),
			'listChoiceDescription' => __('This field will allow your visitors to choose a list to subscribe to.', 'avangpress'),
			'listFields' => __('List fields', 'avangpress'),
			'min' => __('Min', 'avangpress'),
			'max' => __('Max', 'avangpress'),
			'noAvailableFields' => __('No available fields. Did you select a Mail list in the form settings?', 'avangpress'),
			'optional' => __('Optional', 'avangpress'),
			'placeholder' => __('Placeholder', 'avangpress'),
			'placeholderHelp' => __("Text to show when field has no value.", 'avangpress'),
			'preselect' => __('Preselect', 'avangpress'),
			'remove' => __('Remove', 'avangpress'),
			'radioButtons' => __('Radio buttons', 'avangpress'),
			'streetAddress' => __('Street Address', 'avangpress'),
			'state' => __('State', 'avangpress'),
			'subscribe' => __('Subscribe', 'avangpress'),
			'submitButton' => __('Submit button', 'avangpress'),
			'wrapInParagraphTags' => __("Wrap in paragraph tags?", 'avangpress'),
			'value' => __("Value", 'avangpress'),
			'valueHelp' => __("Text to prefill this field with.", 'avangpress'),
			'zip' => __('ZIP', 'avangpress'),
		));
	}

	/**
	 * @param $items
	 *
	 * @return mixed
	 */
	public function add_menu_item($items) {

		$items['forms'] = array(
			'title' => __('Forms', 'avangpress'),
			'text' => __('Form', 'avangpress'),
			'slug' => 'forms',
			'callback' => array($this, 'show_forms_page'),
			'load_callback' => array($this, 'redirect_to_form_action'),
			'position' => 10,
		);

		return $items;
	}

	/**
	 * Act on the "add form" form
	 */
	public function process_add_form() {

		check_admin_referer('add_form', 'avangpress_nonce');

		$form_data = $_POST['avangpress_form'];
		$form_content = include Avangpress_PLUGIN_DIR . 'config/default-form-content.php';

		// Fix for MultiSite stripping KSES for roles other than administrator
		remove_all_filters('content_save_pre');

		$form_id = wp_insert_post(
			array(
				'post_type' => 'avangpress-form',
				'post_status' => 'publish',
				'post_title' => $form_data['name'],
				'post_content' => $form_content,
			)
		);

		// if settings were passed, save those too.
		if (isset($form_data['settings'])) {
			update_post_meta($form_id, 'avangpress_settings', $form_data['settings']);
		}

		// set default form ID
		$this->set_default_form_id($form_id);

		$this->messages->flash(__("<strong>Success!</strong> Form successfully saved.", 'avangpress'));
		wp_redirect(avangpress_get_edit_form_url($form_id));
		exit;
	}

	/**
	 * Saves a form to the database
	 *
	 * @param array $data
	 * @return int
	 */
	public function save_form($data) {
		$keys = array(
			'settings' => array(),
			'messages' => array(),
			'name' => '',
			'content' => '',
		);

		$data = array_merge($keys, $data);
		$data = $this->sanitize_form_data($data);

		$post_data = array(
			'post_type' => 'avangpress-form',
			'post_status' => !empty($data['status']) ? $data['status'] : 'publish',
			'post_title' => $data['name'],
			'post_content' => $data['content'],
		);

		$any_post = isset($data['settings']['any_post'])?(int)$data['settings']['any_post']:'';

		// if an `ID` is given, make sure post is of type `avangpress-form`
		if (!empty($data['ID'])) {
			$post = get_post($data['ID']);

			if ($post instanceof WP_Post && $post->post_type === 'avangpress-form') {
				$post_data['ID'] = $data['ID'];

				// merge new settings  with current settings to allow passing partial data
				$current_settings = get_post_meta($post->ID, 'avangpress_settings', true);
				if (is_array($current_settings)) {
					$data['settings'] = array_merge($current_settings, $data['settings']);
				}
			}
		}

		if($any_post==1){
			$post_data['menu_order'] = 1;
		}else{
			$post_data['menu_order'] = 0;
		}

		// Fix for MultiSite stripping KSES for roles other than administrator
		remove_all_filters('content_save_pre');

		$form_id = wp_insert_post($post_data);
		update_post_meta($form_id, 'avangpress_settings', $data['settings']);

		// save form messages in individual meta keys
		foreach ($data['messages'] as $key => $message) {
			update_post_meta($form_id, 'text_' . $key, $message);
		}

		/**
		 * Runs right after a form is updated.
		 *
		 * @since 3.0
		 *
		 * @param int $form_id
		 */
		do_action('avangpress_save_form', $form_id);

		return $form_id;
	}

	/**
	 * @param array $data
	 * @return array
	 */
	public function sanitize_form_data($data) {

		$raw_data = $data;

		// strip <form> tags from content
		$data['content'] = preg_replace('/<\/?form(.|\s)*?>/i', '', $data['content']);

		// replace lowercased name="name" to prevent 404
		$data['content'] = str_ireplace(' name=\"name\"', ' name=\"NAME\"', $data['content']);

		// sanitize text fields
		$data['settings']['redirect'] = sanitize_text_field($data['settings']['redirect']);

		// strip tags from messages
		foreach ($data['messages'] as $key => $message) {
			$data['messages'][$key] = strip_tags($message, '<strong><b><br><a><script><u><em><i><span><img>');
		}

		// make sure lists is an array
		if (!isset($data['settings']['lists'])) {
			$data['settings']['lists'] = array();
		}

		$data['settings']['lists'] = array_filter((array) $data['settings']['lists']);

		/**
		 * Filters the form data just before it is saved.
		 *
		 * @param array $data Sanitized array of form data.
		 * @param array $raw_data Raw array of form data.
		 *
		 * @since 3.0.8
		 * @ignore
		 */
		$data = (array) apply_filters('avangpress_form_sanitized_data', $data, $raw_data);

		return $data;
	}

	/**
	 * Saves a form
	 */
	public function process_save_form() {

		check_admin_referer('edit_form', 'avangpress_nonce');
		$form_id = (int) $_POST['avangpress_form_id'];

		$form_data = $_POST['avangpress_form'];
		$form_data['ID'] = $form_id;

		$this->save_form($form_data);
		$this->set_default_form_id($form_id);

		$this->messages->flash(__("<strong>Success!</strong> Form successfully saved.", 'avangpress'));
	}

	/**
	 * @param int $form_id
	 */
	private function set_default_form_id($form_id) {
		$default_form_id = (int) get_option('avangpress_default_form_id', 0);

		if (empty($default_form_id)) {
			update_option('avangpress_default_form_id', $form_id);
		}
	}

	/**
	 * Goes through each form and aggregates array of stylesheet slugs to load.
	 *
	 * @hooked `avangpress_save_form`
	 */
	public function update_form_stylesheets() {
		$stylesheets = array();

		$forms = avangpress_get_forms();
		foreach ($forms as $form) {

			$stylesheet = $form->get_stylesheet();

			if (!empty($stylesheet) && !in_array($stylesheet, $stylesheets)) {
				$stylesheets[] = $stylesheet;
			}
		}

		update_option('avangpress_form_stylesheets', $stylesheets);
	}

	/**
	 * Redirect to correct form action
	 *
	 * @ignore
	 */
	public function redirect_to_form_action() {

		if (!empty($_GET['view'])) {
			return;
		}

		$redirect_url = avangpress_get_main_form_url();

		if (headers_sent()) {
			echo sprintf('<meta http-equiv="refresh" content="0;url=%s" />', $redirect_url);
		} else {
			wp_redirect($redirect_url);
		}

		exit;
	}

	/**
	 * Show the Forms Settings page
	 *
	 * @internal
	 */
	public function show_forms_page() {

		$view = !empty($_GET['view']) ? $_GET['view'] : '';

		/**
		 * @ignore
		 */
		do_action('avangpress_admin_show_forms_page', $view);

		/**
		 * @ignore
		 */
		do_action('avangpress_admin_show_forms_page-' . $view);
	}

	public function show_main_page() {
		$lists = avangpress_get_forms();
		require dirname(__FILE__) . '/views/main-form.php';
	}

	/**
	 * Shows the "Add Form" page
	 *
	 * @internal
	 */
	public function show_add_page() {
		$lists = $this->mail->get_lists();
		$number_of_lists = count($lists);
		require dirname(__FILE__) . '/views/add-form.php';
	}

	/**
	 * Handle the "Delete Request" page
	 *
	 * @internal
	 */
	public function show_delete_page() {
		$form_id = (!empty($_GET['form_id'])) ? (int) $_GET['form_id'] : 0;
		if($this->mail->delete_form($form_id)==false){
			$this->messages->flash(__("<strong>Failed!</strong> Error on delete form.", 'avangpress'));
		}else{
			$this->messages->flash(__("<strong>Success</strong> Delete form({$form_id}).", 'avangpress'));
		}

		$redirect_url = avangpress_get_main_form_url();

		if (headers_sent()) {
			echo sprintf('<meta http-equiv="refresh" content="0;url=%s" />', $redirect_url);
		} else {
			wp_redirect($redirect_url);
		}

		exit;
	}

	/**
	 * Show the "Edit Form" page
	 *
	 * @internal
	 */
	public function show_edit_page() {
		$form_id = (!empty($_GET['form_id'])) ? (int) $_GET['form_id'] : 0;
		$lists = $this->mail->get_lists();

		try {
			$form = avangpress_get_form($form_id);
		} catch (Exception $e) {
			echo '<h2>' . __("Form not found.", 'avangpress') . '</h2>';
			echo '<p>' . $e->getMessage() . '</p>';
			echo '<p><a href="javascript:history.go(-1);"> &lsaquo; ' . __('Go back') . '</a></p>';
			return;
		}

		$opts = $form->settings;
		$active_tab = (isset($_GET['tab'])) ? $_GET['tab'] : 'fields';

		$form_preview_url = add_query_arg(array(
			'avangpress_preview_form' => $form_id,
		), site_url('/', 'admin'));

		require dirname(__FILE__) . '/views/edit-form.php';
	}



	/**
	 * Get URL for a tab on the current page.
	 *
	 * @since 3.0
	 * @internal
	 * @param $tab
	 * @return string
	 */
	public function tab_url($tab) {
		return add_query_arg(array('tab' => $tab), remove_query_arg('tab'));
	}

	/**
	 * Registers UI for when shortcake is activated
	 */
	public function register_shortcake_ui() {

		$assets = new Avangpress_Form_Asset_Manager();
		$assets->load_stylesheets();

		$forms = avangpress_get_forms();
		$options = array();
		foreach ($forms as $form) {
			$options[$form->ID] = $form->name;
		}

		/**
		 * Register UI for your shortcode
		 *
		 * @param string $shortcode_tag
		 * @param array $ui_args
		 */
		shortcode_ui_register_for_shortcode('avangpress_form', array(
			'label' => esc_html__('Mail Sign-Up Form', 'avangpress'),
			'listItemImage' => 'dashicons-feedback',
			'attrs' => array(
				array(
					'label' => esc_html__('Select the form to show', 'avangpress'),
					'attr' => 'id',
					'type' => 'select',
					'options' => $options,
				),
			),
		)
		);
	}
}
