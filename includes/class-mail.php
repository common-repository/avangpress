<?php

/**
 * Class Avangpress_Mail
 *
 * @access private
 * @ignore
 */
class Avangpress_Mail {

	/**
	 * @var string
	 */
	public $error_code = '';

	/**
	 * @var string
	 */
	public $error_message = '';

	/**
	 *
	 * Sends a subscription request to the Mail API
	 *
	 * @param string  $list_id           The list id to subscribe to
	 * @param string  $email_address             The email address to subscribe
	 * @param array    $args
	 * @param boolean $update_existing   Update information if this email is already on list?
	 * @param boolean $replace_interests Replace interest groupings, only if update_existing is true.
	 *
	 * @return object
	 */
	public function list_subscribe($list_id, $email_address, array $args = array(), $update_existing = false, $replace_interests = true) {
		$this->reset_error();

		$default_args = array(
			'status' => 'pending',
			'email_address' => $email_address,
		);
		$already_on_list = false;

		// setup default args
		$args = $args + $default_args;

		// first, check if subscriber is already on the given list
		try {
			$existing_member_data = $this->get_api()->get_list_member($list_id, $email_address);

			$exist = $existing_member_data->body['status'] == 'error' ? false : true;

			if ($exist) {
				$already_on_list = true;

				// if we're not supposed to update, bail.
				if (!$update_existing) {
					$this->error_code = 214;
					$this->error_message = 'That subscriber already exists.';
					return null;
				}

				$args['status'] = 'subscribed';

			} else {
				// delete list member so we can re-add it...
				$this->get_api()->delete_list_member($list_id, $email_address);
			}
		} catch (Avangpress_API_Resource_Not_Found_Exception $e) {
			// subscriber does not exist (not an issue in this case)
		} catch (Avangpress_API_Exception $e) {
			// other errors.
			$this->error_code = $e->getCode();
			$this->error_message = $e;
			return null;
		}

		try {
			$data = $this->get_api()->add_list_member($list_id, $args);
		} catch (Avangpress_API_Exception $e) {
			$this->error_code = $e->getCode();
			$this->error_message = $e;
			return null;
		}

		$status = isset($data->body) && isset($data->body['status']) ? $data->body['status'] : 'error';

		return (object) array(
			'was_already_on_list' => $already_on_list,
			'status' => $status,
		);
	}

	/**
	 * Changes the subscriber status to "unsubscribed"
	 *
	 * @param string $list_id
	 * @param string $email_address
	 *
	 * @return boolean
	 */
	public function list_unsubscribe($list_id, $email_address) {
		$this->reset_error();

		try {
			$this->get_api()->update_list_member($list_id, $email_address, array('status' => 'unsubscribed'));
		} catch (Avangpress_API_Resource_Not_Found_Exception $e) {
			// if email wasn't even on the list: great.
			return true;
		} catch (Avangpress_API_Exception $e) {
			$this->error_code = $e->getCode();
			$this->error_message = $e;
			return false;
		}

		return true;
	}

	/**
	 * Deletes the subscriber from the given list.
	 *
	 * @param string $list_id
	 * @param string $email_address
	 *
	 * @return boolean
	 */
	public function list_unsubscribe_delete($list_id, $email_address) {
		$this->reset_error();

		try {
			$this->get_api()->delete_list_member($list_id, $email_address);
		} catch (Avangpress_API_Resource_Not_Found_Exception $e) {
			// if email wasn't even on the list: great.
			return true;
		} catch (Avangpress_API_Exception $e) {
			$this->error_code = $e->getCode();
			$this->error_message = $e;
			return false;
		}

		return true;
	}

	/**
	 * Checks if an email address is on a given list with status "subscribed"
	 *
	 * @param string $list_id
	 * @param string $email_address
	 *
	 * @return boolean
	 */
	public function list_has_subscriber($list_id, $email_address) {
		try {
			$data = $this->get_api()->get_list_member($list_id, $email_address);
		} catch (Avangpress_API_Resource_Not_Found_Exception $e) {
			return false;
		}

		return !empty($data->id) && $data->status === 'subscribed';
	}

	/**
	 * Empty the Lists cache
	 */
	public function empty_cache() {
		global $wpdb;

		delete_option('avangpress_mail_list_ids');
		$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE 'avangpress_mail_list_%'");
		delete_transient('avangpress_list_counts');
	}

	/**
	 * Get Mail lists from cache.
	 *
	 * @param boolean deprecated parameter.
	 * @return array
	 */
	public function get_cached_lists() {
		return $this->get_lists(false);
	}

	/**
	 * Get a specific Mail list from local DB.
	 *
	 * @param string $list_id
	 * @return Avangpress_Mail_List
	 */
	public function get_cached_list($list_id) {
		return $this->get_list($list_id, false);
	}

	/**
	 * Get Mail lists, from cache or remote API.
	 *
	 * @param boolean $force Whether to force a result by hitting Mail API
	 * @return array
	 */
	public function get_lists($force = true) {

		// first, get all list id's
		$list_ids = $this->get_list_ids($force);

		// then, fill $lists array with individual list details
		$lists = array();
		foreach ($list_ids as $list_id) {
			$list = $this->get_list($list_id, $force);
			$lists["{$list_id}"] = $list;
		}

		return $lists;
	}

	/**
	 * Delete form from main list.
	 *
	 * @param string $form_id post id on wordpress system
	 * @return array
	 */
	public function delete_form($form_id){
		return wp_delete_post( $form_id, true );
	}

	/**
	 * @param string $list_id
	 *
	 * @return Avangpress_Mail_List
	 */
	private function fetch_list($list_id) {
		try {
			$list_data = $this->get_api()->get_list($list_id);

			$id = $list_data->body['data']['record']['general']['list_uid'];
			$name = $list_data->body['data']['record']['general']['name'];
			$description = $list_data->body['data']['record']['general']['description'];
			$defaults = $list_data->body['data']['record']['defaults']['from_name'];

			// create local object
			$list = new Avangpress_Mail_List($id, $name);
			$list->subscriber_count = 0;
			$list->web_id = $id;
			$list->campaign_defaults = $defaults;

			$list->merge_fields[] = null;

			$list->interest_categories[] = null;
		} catch (Avangpress_API_Exception $e) {
			return null;
		}

		// save in option
		update_option('avangpress_mail_list_' . $list_id, $list, false);
		return $list;
	}

	/**
	 * Get Mail list ID's
	 *
	 * @param bool $force Force result by hitting Mail API
	 * @return array
	 */
	public function get_list_ids($force = false) {
		$list_ids = (array) get_option('avangpress_mail_list_ids', array());

		if (empty($list_ids) && $force) {
			$list_ids = $this->fetch_list_ids();
		}

		return $list_ids;
	}

	/**
	 * @return array
	 */
	public function fetch_list_ids() {
		try {

			$lists_data = $this->get_api()->get_lists(array('count' => 200, 'fields' => 'lists.id'));


			if (count($lists_data) == 0) {
				return array();
			}

			$ret = array();

			foreach ($lists_data['records'] as $k => $v) {
				$ret[$k] = new stdClass();
				$ret[$k]->id = $v['general']['list_uid'];
			}

			//return $ret;

		} catch (Avangpress_API_Exception $e) {
			return array();
		}

		$list_ids = wp_list_pluck($ret, 'id');

		// store list id's
		update_option('avangpress_mail_list_ids', $list_ids, false);

		return $list_ids;
	}

	/**
	 * Fetch list ID's + lists from AvangPress Api Server.
	 *
	 * @return bool
	 */
	public function fetch_lists() {
		// try to increase time limit as this can take a while
		@set_time_limit(300);
		$list_ids = $this->fetch_list_ids();

		// randomize array order
		shuffle($list_ids);

		// fetch individual list details
		foreach ($list_ids as $list_id) {
			$list = $this->fetch_list($list_id);
		}

		return !empty($list_ids);
	}

	/**
	 * Get a given Mail list
	 *
	 * @param string $list_id
	 * @param bool $force Whether to force a result by hitting remote API
	 * @return Avangpress_Mail_List
	 */
	public function get_list($list_id, $force = false) {
		$list = get_option('avangpress_mail_list_' . $list_id);

		if (empty($list) && $force) {
			$list = $this->fetch_list($list_id);
		}

		if (empty($list)) {
			return new Avangpress_Mail_List($list_id, 'Unknown List');
		}

		return $list;
	}

	/**
	 * Get an array of list_id => number of subscribers
	 *
	 * @return array
	 */
	public function get_subscriber_counts() {

		// get from transient
		$list_counts = get_transient('avangpress_list_counts');
		if (is_array($list_counts)) {
			return $list_counts;
		}

		// transient not valid, fetch from API
		try {
			$lists = $this->get_api()->get_lists(array('count' => 100, 'fields' => 'lists.id,lists.stats'));
		} catch (Avangpress_API_Exception $e) {
			return array();
		}

		$list_counts = array();

		// we got a valid response
		foreach ($lists as $list) {
			$list_counts["{$list->id}"] = $list->stats->member_count;
		}

		$seconds = 3600;

		/**
		 * Filters the cache time for Mail lists configuration, in seconds. Defaults to 3600 seconds (1 hour).
		 *
		 * @since 2.0
		 * @param int $seconds
		 */
		$transient_lifetime = (int) apply_filters('avangpress_lists_count_cache_time', $seconds);
		set_transient('avangpress_list_counts', $list_counts, $transient_lifetime);

		// bail
		return $list_counts;
	}

	/**
	 * Returns number of subscribers on given lists.
	 *
	 * @param array|string $list_ids Array of list ID's, or single string.
	 * @return int Total # subscribers for given lists.
	 */
	public function get_subscriber_count($list_ids) {

		// make sure we're getting an array
		if (!is_array($list_ids)) {
			$list_ids = array($list_ids);
		}

		// if we got an empty array, return 0
		if (empty($list_ids)) {
			return 0;
		}

		// get total number of subscribers for all lists
		$counts = $this->get_subscriber_counts();

		// start calculating subscribers count for all given list ID's combined
		$count = 0;
		foreach ($list_ids as $id) {
			$count += (isset($counts["{$id}"])) ? $counts["{$id}"] : 0;
		}

		/**
		 * Filters the total subscriber_count for the given List ID's.
		 *
		 * @since 2.0
		 * @param string $count
		 * @param array $list_ids
		 */
		return apply_filters('avangpress_subscriber_count', $count, $list_ids);
	}

	/**
	 * Resets error properties.
	 */
	public function reset_error() {
		$this->error_message = '';
		$this->error_code = '';
	}

	/**
	 * @return bool
	 */
	public function has_error() {
		return !empty($this->error_code);
	}

	/**
	 * @return string
	 */
	public function get_error_message() {
		return $this->error_message;
	}

	/**
	 * @return string
	 */
	public function get_error_code() {
		return $this->error_code;
	}

	/**
	 * @return Avangpress_API_v3
	 */
	private function get_api() {
		return avangpress('api');
	}

}
