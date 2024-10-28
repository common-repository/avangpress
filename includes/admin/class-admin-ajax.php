<?php

class Avangpress_Admin_Ajax {

	/**
	 * @var Avangpress_Admin_Tools
	 */
	protected $tools;

	/**
	 * Avangpress_Admin_Ajax constructor.
	 *
	 * @param Avangpress_Admin_Tools $tools
	 */
	public function __construct(Avangpress_Admin_Tools $tools) {
		$this->tools = $tools;
	}

	/**
	 * Hook AJAX actions
	 */
	public function add_hooks() {
		add_action('wp_ajax_avangpress_renew_mail_lists', array($this, 'refresh_mail_lists'));
	}

	/**
	 * Empty lists cache & fetch lists again.
	 */
	public function refresh_mail_lists() {
		if (!$this->tools->is_user_authorized()) {
			wp_send_json(false);
		}

		$mail = new Avangpress_Mail();
		$success = $mail->fetch_lists();
		wp_send_json($success);
	}

}