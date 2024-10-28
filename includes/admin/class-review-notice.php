<?php

/**
 * Class Avangpress_Admin_Review_Notice
 *
 * @ignore
 */
class Avangpress_Admin_Review_Notice {

    /**
     * @var Avangpress_Admin_Tools
     */
    protected $tools;

    /**
     * @var string
     */
    protected $meta_key_dismissed = 'avangpress_review_notice_dismissed';

    /**
     * Avangpress_Admin_Review_Notice constructor.
     *
     * @param Avangpress_Admin_Tools $tools
     */
    public function __construct( Avangpress_Admin_Tools $tools ) {
        $this->tools = $tools;
    }

    /**
     * Add action & filter hooks.
     */
    public function add_hooks() {
        add_action( 'admin_notices', array( $this, 'show' ) );
        add_action( 'avangpress_admin_dismiss_review_notice', array( $this, 'dismiss' ) );
    }

    /**
     * Set flag in user meta so notice won't be shown.
     */
    public function dismiss() {
        $user = wp_get_current_user();
        update_user_meta( $user->ID, $this->meta_key_dismissed, 1 );
    }

    /**
     * @return bool
     */
    public function show() {
        // only show on AvangPress' pages.
        if( ! $this->tools->on_plugin_page() ) {
            return false;
        }

        // only show if 2 weeks have passed since first use.
        $two_weeks_in_seconds = ( 60 * 60 * 24 * 14 );
        if( $this->time_since_first_use() <= $two_weeks_in_seconds ) {
            return false;
        }

        // only show if user did not dismiss before
        $user = wp_get_current_user();
        if( get_user_meta( $user->ID, $this->meta_key_dismissed, true ) ) {
            return false;
        }

        echo '<div class="notice notice-info avangpress-is-dismissible" id="avangpress-review-notice">';
        echo '<p>';
        echo __( 'You\'ve been using AvangPress for WordPress for some time now; we hope you love it!', 'avangpress' ) . ' <br />';
        echo sprintf( __( 'If you do, please <a href="%s">leave us a 5★ rating on WordPress.org</a>. It would be of great help to us.', 'avangpress' ), 'https://wordpress.org/support/view/plugin-reviews/avangpress?rate=5#new-post' );
        echo '</p>';
        echo '<form method="POST" id="avangpress-dismiss-review-form"><button type="submit" class="notice-dismiss"><span class="screen-reader-text">'. __( 'Dismiss this notice.', 'avangpress' ) .'</span></button><input type="hidden" name="avangpress_action" value="dismiss_review_notice"/></form>';
        echo '</div>';
        return true;
    }

    /**
     * @return int
     */
    private function time_since_first_use() {
        $options = get_option( 'avangpress' );

        // option was never added before, do it now.
        if( empty( $options['first_activated_on'] ) ) {
            $options['first_activated_on'] = time();
            update_option( 'avangpress', $options );
        }

        return time() - $options['first_activated_on'];
    }
}
