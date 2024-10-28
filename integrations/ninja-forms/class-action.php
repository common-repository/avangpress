<?php if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class Avangpress_Ninja_Forms_Action
 */
final class Avangpress_Ninja_Forms_Action extends NF_Abstracts_ActionNewsletter {
	/**
	 * @var string
	 */
	protected $_name = 'avangpress_subscribe';

	/**
	 * Constructor
	 */
	public function __construct() {
		parent::__construct();

		$this->_nicename = __('Mail', 'avangpress');
		$prefix = $this->get_name();

		unset($this->_settings[$prefix . 'newsletter_list_groups']);

		$this->_settings['double_optin'] = array(
			'name' => 'double_optin',
			'type' => 'select',
			'label' => __('Use double opt-in?', 'avangpress'),
			'width' => 'full',
			'group' => 'primary',
			'value' => 1,
			'options' => array(
				array(
					'value' => 1,
					'label' => 'Yes',
				),
				array(
					'value' => 0,
					'label' => 'No',
				),
			),
		);

		$this->_settings['update_existing'] = array(
			'name' => 'update_existing',
			'type' => 'select',
			'label' => __('Update existing subscribers?', 'avangpress'),
			'width' => 'full',
			'group' => 'primary',
			'value' => 0,
			'options' => array(
				array(
					'value' => 1,
					'label' => 'Yes',
				),
				array(
					'value' => 0,
					'label' => 'No',
				),
			),
		);

//        $this->_settings[ 'replace_interests' ] = array(
		//            'name' => 'replace_interests',
		//            'type' => 'select',
		//            'label' => __( 'Replace existing interest groups?', 'avangpress'),
		//            'width' => 'full',
		//            'group' => 'primary',
		//            'value' => 0,
		//            'options' => array(
		//                array(
		//                    'value' => 1,
		//                    'label' => 'Yes',
		//                ),
		//                array(
		//                    'value' => 0,
		//                    'label' => 'No',
		//                ),
		//            ),
		//        );
	}

	/*
		    * PUBLIC METHODS
	*/

	public function save($action_settings) {

	}

	public function process($action_settings, $form_id, $data) {
		if (empty($action_settings['newsletter_list']) || empty($action_settings['EMAIL'])) {
			return;
		}

		// find "avangpress_optin" type field, bail if not checked.
		foreach ($data['fields'] as $field_data) {
			if ($field_data['type'] === 'avangpress_optin' && empty($field_data['value'])) {
				return;
			}
		}

		$list_id = $action_settings['newsletter_list'];
		$email_address = $action_settings['EMAIL'];
		$mail = new Avangpress_Mail();
		$list = $mail->get_list($list_id, true);

		$merge_fields = array();
		foreach ($list->merge_fields as $merge_field) {
			if (!empty($action_settings[$merge_field->tag])) {
				$merge_fields[$merge_field->tag] = $action_settings[$merge_field->tag];
			}
		}

		$double_optin = $action_settings['double_optin'] != '0';
		$update_existing = $action_settings['update_existing'] == '1';
		$replace_interests = isset($action_settings['replace_interests']) && $action_settings['replace_interests'] == '1';

		do_action('avangpress_integration_ninja_forms_subscribe', $email_address, $merge_fields, $list_id, $double_optin, $update_existing, $replace_interests, $form_id);
	}

	protected function get_lists() {
		$mail = new Avangpress_Mail();

		/** @var Avangpress_List[] $lists */
		$lists = $mail->get_lists();
		$return = array();

		foreach ($lists as $list) {

			$list_fields = array();
			foreach ($list->merge_fields as $merge_field) {
				$list_fields[] = array(
					'value' => $merge_field->tag,
					'label' => $merge_field->name,
				);
			}

//            TODO: Add support for groups once base class supports this.
			//            $list_groups = array();
			//            foreach( $list->interest_categories as $category ) {
			//
			//            }

			$return[] = array(
				'value' => $list->id,
				'label' => $list->name,
				'fields' => $list_fields,
			);
		}

		return $return;
	}
}
