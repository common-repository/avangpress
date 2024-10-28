<h3><?php _e('Your AvangPress Account', 'avangpress');?></h3>
<p><?php _e('The table below shows your AvangPress lists and their details. If you just applied changes to your AvangPress lists, please use the following button to renew the cached lists configuration.', 'avangpress');?></p>


<div id="avangpress-list-fetcher">
	<form method="post" action="">
		<input type="hidden" name="avangpress_action" value="empty_lists_cache" />
		<p>
			<input type="submit" value="<?php _e('Renew AvangPress lists', 'avangpress');?>" class="button" />
		</p>
	</form>
</div>

<div class="avangpress-lists-overview">
	<?php if (empty($lists)) {?>
		<p><?php _e('No lists were found in your AvangPress account', 'avangpress');?>.</p>
	<?php } else {
	printf('<p>' . __('A total of %d lists were found in your AvangPress account.', 'avangpress') . '</p>', count($lists));

	echo '<table class="widefat striped">';

	$headings = array(
		__('List Name', 'avangpress'),
		__('ID', 'avangpress'),
		__('Subscribers', 'avangpress'),
	);

	echo '<thead>';
	echo '<tr>';
	foreach ($headings as $heading) {
		echo sprintf('<th>%s</th>', $heading);
	}
	echo '</tr>';
	echo '</thead>';

	foreach ($lists as $list) {
		/** @var Avangpress_List $list */
		echo '<tr>';
		echo sprintf('<td><code>%s</code></td>', esc_html($list->name));
		echo sprintf('<td><code>%s</code></td>', esc_html($list->id));
		echo sprintf('<td>%s</td>', esc_html($list->subscriber_count));
		echo '</tr>';

		echo sprintf('<tr class="list-details list-%s-details" style="display: none;">', $list->id);
		echo '<td colspan="3" style="padding: 0 20px 40px;">';

		echo sprintf('<p class="alignright" style="margin: 20px 0;"><a href="%s" target="_blank"><span class="dashicons dashicons-edit"></span> ' . __('Edit this list in AvangPress', 'avangpress') . '</a></p>', $list->get_web_url());

		echo '</td>';
		echo '</tr>';

		?>
		<?php } // end foreach $lists
	echo '</table>';
} // end if empty ?>
</div>
