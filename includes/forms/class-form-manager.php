<?php

/**
 * This class takes care of all form related functionality
 *
 * Do not interact with this class directly, use `avangpress_form` functions tagged with @access public instead.
 *
 * @class Avangpress_Form_Manager
 * @ignore
 * @access private
*/
class Avangpress_Form_Manager {

	/**
	 * @var Avangpress_Form_Output_Manager
	 */
	protected $output_manager;

	/**
	 * @var Avangpress_Form_Listener
	 */
	protected $listener;

	/**
	 * @var Avangpress_Form_Tags
	 */
	protected $tags;

	/**
	* @var Avangpress_Form_Previewer
	*/
	protected $previewer;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->output_manager = new Avangpress_Form_Output_Manager();
		$this->tags = new Avangpress_Form_Tags();
		$this->listener = new Avangpress_Form_Listener();
		$this->previewer = new Avangpress_Form_Previewer();
	}

	/**
	 * Hook!
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'initialize' ) );
		add_action( 'wp', array( $this, 'init_asset_manager' ), 90 );
		add_action( 'widgets_init', array( $this, 'register_widget' ) );

		$this->listener->add_hooks();
		$this->output_manager->add_hooks();
		$this->tags->add_hooks();
		$this->previewer->add_hooks();
	}

	/**
	 * Initialize
	 */
	public function initialize() {
		$this->register_post_type();
	}


	/**
	 * Register post type "avangpress-form"
	 */
	public function register_post_type() {
		// register post type
		register_post_type( 'avangpress-form', array(
				'labels' => array(
					'name' => 'Mail Sign-up Forms',
					'singular_name' => 'Sign-up Form',
				),
				'public' => false
			)
		);
	}

	/**
	 * Initialise asset manager
	 *
	 * @hooked `template_redirect`
	 */
	public function init_asset_manager() {
		$assets = new Avangpress_Form_Asset_Manager();
		$assets->hook();
	}

	/**
	 * Register our Form widget
	 */
	public function register_widget() {
		register_widget( 'Avangpress_Form_Widget' );
	}

	/**
	 * @param       $form_id
	 * @param array $config
	 * @param bool  $echo
	 *
	 * @return string
	 */
	public function output_form(  $form_id, $config = array(), $echo = true ) {
		return $this->output_manager->output_form( $form_id, $config, $echo );
	}

	/**
	 * Gets the currently submitted form
	 *
	 * @return Avangpress_Form|null
	 */
	public function get_submitted_form() {
		if( $this->listener->submitted_form instanceof Avangpress_Form ) {
			return $this->listener->submitted_form;
		}

		return null;
	}

	/**
	 * Return all tags
	 *
	 * @return array
	 */
	public function get_tags() {
		return $this->tags->get();
	}
}
