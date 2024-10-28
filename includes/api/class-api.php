<?php

/**
 * Class Avangpress_API
 */
class Avangpress_API {

	/**
	 * @var Avangpress_API_v3_Client
	 */
	protected $client;

	/**
	 * @var bool Are we able to talk to the AvangPress API?
	 */
	protected $connected;

	/**
	 * Constructor
	 *
	 * @param array config public/private key
	 */
	public function __construct($opts) {
		$this->client = new Avangpress_API_Client($opts);
	}

	/**
	 * Gets the API client to perform raw API calls.
	 *
	 * @return Avangpress_API_v3_Client
	 */
	public function get_client() {
		return $this->client;
	}

	/**
	 * Pings the AvangPress API to see if we're connected
	 *
	 * The result is cached to ensure a maximum of 1 API call per page load
	 *
	 * @return boolean
	 * @throws Avangpress_API_Exception
	 */
	public function is_connected() {

		$data = $this->client->get('lists');

		if (!$data || !is_object($data)) {
			throw new Avangpress_API_Connection_Exception('Connection Failed, please check errors on server', 5051);
		}

		if (!isset($data->body) || !isset($data->body['status'])) {
			throw new Avangpress_API_Connection_Exception('Failed Responce from AvangPress Server, Contact to Developer', 4041);
		}

		if ($data->body['status'] != 'success') {
			throw new Avangpress_API_Connection_Exception($data->body['error'], 5031);
		}

		return true;
	}

	/**
	 * @param $email_address
	 *
	 * @return string
	 */
	public function get_subscriber_hash($email_address) {
		return md5(strtolower(trim($email_address)));
	}

	/**
	 * Get recent daily, aggregated activity stats for a list.
	 *
	 *
	 * @param string $list_id
	 * @param array $args
	 *
	 * @return array
	 * @throws Avangpress_API_Exception
	 */
	public function get_list_activity($list_id, array $args = array()) {
		$resource = sprintf('/lists/%s/activity', $list_id);
		$data = $this->client->get($resource, $args);

		if (is_object($data) && isset($data->activity)) {
			return $data->activity;
		}

		return array();
	}

	/**
	 * Gets the interest categories for a given List
	 *
	 * @param string $list_id
	 * @param array $args
	 *
	 * @return array
	 * @throws Avangpress_API_Exception
	 */
	public function get_list_interest_categories($list_id, array $args = array()) {
		return array();
	}

	/**
	 *
	 * @param string $list_id
	 * @param string $interest_category_id
	 * @param array $args
	 *
	 * @return array
	 * @throws Avangpress_API_Exception
	 */
	public function get_list_interest_category_interests($list_id, $interest_category_id, array $args = array()) {
		return array();
	}

	/**
	 * Get merge vars for a given list
	 *
	 *
	 * @param string $list_id
	 * @param array $args
	 *
	 * @return array
	 * @throws Avangpress_API_Exception
	 */
	public function get_list_merge_fields($list_id, array $args = array()) {
		return array();
	}

	/**
	 *
	 * @param string $list_id
	 * @param array $args
	 *
	 * @return object
	 * @throws Avangpress_API_Exception
	 */
	public function get_list($list_id, array $args = array()) {
		return $this->client->get('list', array('list_id' => $list_id));
	}

	/**
	 *
	 * @param array $args
	 *
	 * @return array
	 * @throws Avangpress_API_Exception
	 */
	public function get_lists($args = array()) {
		$resource = 'lists';
		$data = $this->client->get($resource, $args);

		$ret = array();

		if (is_object($data) && isset($data->body) && $data->body['status'] == 'success' && isset($data->body['data'])) {
			$rd = isset($data->body['data']) ? $data->body['data'] : null;
			if (!isset($rd['count']) || $rd['count'] == 0) {
				return $ret;
			}

			return $rd;

		}

		return $ret;
	}

	/**
	 *
	 * @param string $list_id
	 * @param string $email_address
	 * @param array $args
	 *
	 * @return object
	 * @throws Avangpress_API_Exception
	 */
	public function get_list_member($list_id, $email_address, array $args = array()) {
		return $this->client->get('emailinlist', array('list_id' => $list_id, 'email_address' => $email_address));
	}

	/**
	 * Batch subscribe / unsubscribe list members.
	 *
	 *
	 * @param string $list_id
	 * @param array $args
	 * @return object
	 * @throws Avangpress_API_Exception
	 */
	public function add_list_members($list_id, array $args) {
		$resource = sprintf('/lists/%s', $list_id);
		return $this->client->post($resource, $args);
	}

	/**
	 * Add or update (!) a member to a AvangPress list.
	 *
	 * @param string $list_id
	 * @param array $args
	 *
	 * @return object
	 * @throws Avangpress_API_Exception
	 */
	public function add_list_member($list_id, array $args) {
		return $this->client->put('member', array('list_id' => $list_id, 'email_address' => $args['email_address']));

	}

	/**
	 *
	 * @param $list_id
	 * @param $email_address
	 * @param array $args
	 *
	 * @return object
	 * @throws Avangpress_API_Exception
	 */
	public function update_list_member($list_id, $email_address, array $args) {
		return $this->client->patch($list_id, $email_address);
	}

	/**
	 *
	 * @param string $list_id
	 * @param string $email_address
	 *
	 * @return bool
	 * @throws Avangpress_API_Exception
	 */
	public function delete_list_member($list_id, $email_address) {
		return $this->client->delete('member', array('list_id' => $list_id, 'email_address' => $email_address));
	}

	/**
	 * @return string
	 */
	public function get_last_response_body() {
		return $this->client->get_last_response_body();
	}

	/**
	 * @return array
	 */
	public function get_last_response_headers() {
		return $this->client->get_last_response_headers();
	}

}
