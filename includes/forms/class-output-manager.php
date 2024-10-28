<?php

/**
 * Class Avangpress_Form_Output_Manager
 *
 * @ignore
 * @access private
 */
class Avangpress_Form_Output_Manager {

	/**
	 * @var int The # of forms outputted
	 */
	public $count = 0;

	public $formids = array();

	/**
	 * @const string
	 */
	const SHORTCODE = 'avangpress_form';

	/**
	 * Constructor
	 */
	public function __construct() {}

	/**
	 * Add hooks
	 */
	public function add_hooks() {
		// enable shortcodes in text widgets
		add_filter('widget_text', 'shortcode_unautop');
		add_filter('widget_text', 'do_shortcode', 11);

		// enable shortcodes in form content
		add_filter('avangpress_form_content', 'do_shortcode');

		add_filter('the_content', array($this, 'show_any_post'));

		add_action('init', array($this, 'register_shortcode'));
	}

	public function show_any_post($content) {
		$any_posts = get_posts(array('post_type' => 'avangpress-form', 'menu_order' => 1));

		if (count($any_posts) == 0) {
			return $content;
		}

		$html = '';
		foreach ($any_posts as $k => $v) {
			$html .= $this->shortcode(array('id' => $v->ID), '');
		}

		return $content . $html;
	}

	/**
	 * Registers the [avangpress_form] shortcode
	 */
	public function register_shortcode() {
		// register shortcodes
		add_shortcode(self::SHORTCODE, array($this, 'shortcode'));
	}

	/**
	 * @param array  $attributes
	 * @param string $content
	 * @return string
	 */
	public function shortcode($attributes = array(), $content = '') {
		$default_attributes = array(
			'id' => '',
			'lists' => '',
			'email_type' => '',
			'element_id' => '',
			'element_class' => '',
		);

		$attributes = shortcode_atts(
			$default_attributes,
			$attributes,
			self::SHORTCODE
		);

		$config = array(
			'element_id' => $attributes['element_id'],
			'lists' => $attributes['lists'],
			'email_type' => $attributes['email_type'],
			'element_class' => $attributes['element_class'],
		);

		return $this->output_form($attributes['id'], $config, false);
	}

	/**
	 * @param int   $id
	 * @param array $config
	 * @param bool $echo
	 *
	 * @return string
	 */
	public function output_form($id = 0, $config = array(), $echo = true) {

		// check the form last showed by any post show
		foreach ($this->formids as $fid) {
			if ($fid == $id) {
				return;
			}
		}

		try {
			$form = avangpress_get_form($id);
		} catch (Exception $e) {

			if (current_user_can('manage_options')) {
				return sprintf('<strong>AvangPress for WordPress error:</strong> %s', $e->getMessage());
			}

			return '';
		}

		$this->count++;

		// saved to output send
		array_push($this->formids, $id);

		// set a default element_id if none is given
		if (empty($config['element_id'])) {
			$config['element_id'] = 'avangpress-form-' . $this->count;
		}

		$form_html = $form->get_html($config['element_id'], $config);

		try {
			// start new output buffer
			ob_start();

			/**
			 * Runs just before a form element is outputted.
			 *
			 * @since 3.0
			 *
			 * @param Avangpress_Form $form
			 */
			do_action('avangpress_output_form', $form);

			// output the form (in output buffer)
			echo $form_html;

			// grab all contents in current output buffer & then clean + end it.
			$html = ob_get_clean();
		} catch (Error $e) {
			$html = $form_html;
		}

		// echo content if necessary
		if ($echo) {
			echo $html;
		}

		return $html;
	}

}
