<?php

/**
 * Get absolute URL to main form
 *
 * @return string
 */
function avangpress_get_main_form_url() {
	$url = admin_url('admin.php?page=avangpress-forms&view=main-form');
	return $url;
}

/**
 * Get absolute URL to create a new form
 *
 * @return string
 */
function avangpress_get_add_form_url() {
	$url = admin_url('admin.php?page=avangpress-forms&view=add-form');
	return $url;
}

/**
 * Gets the absolute url to edit a form
 *
 * @param int $form_id ID of the form
 * @param string $tab Tab identifier to open
 *
 * @return string
 */
function avangpress_get_edit_form_url($form_id, $tab = '') {
	$url = admin_url(sprintf('admin.php?page=avangpress-forms&view=edit-form&form_id=%d', $form_id));

	if (!empty($tab)) {
		$url .= sprintf('&tab=%s', $tab);
	}

	return $url;
}

/**
 * Gets the absolute url to delete a form
 *
 * @param int $form_id ID of the form
 * @param string $tab Tab identifier to open
 *
 * @return string
 */
function avangpress_get_delete_form_url($form_id, $tab = '') {
	$url = admin_url(sprintf('admin.php?page=avangpress-forms&view=delete-form&form_id=%d', $form_id));

	if (!empty($tab)) {
		$url .= sprintf('&tab=%s', $tab);
	}

	return $url;
}
