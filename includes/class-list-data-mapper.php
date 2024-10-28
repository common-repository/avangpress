<?php

/**
* Class Avangpress_Field_Map
*
* @access private
* @since 4.0
* @ignore
*/
class Avangpress_List_Data_Mapper {

	/**
	* @var array
	*/
	private $data = array();

	/**
	* @var array
	*/
	private $list_ids = array();

	/**
	* @var Avangpress_Field_Formatter
	*/
	private $formatter;

	/**
	* @param array $data
	* @param array $list_ids
	*/
	public function __construct( array $data, array $list_ids ) {
		$this->data = array_change_key_case( $data, CASE_UPPER );
		$this->list_ids = $list_ids;
		$this->formatter = new Avangpress_Field_Formatter();

		if( ! isset( $this->data['EMAIL'] ) ) {
			throw new InvalidArgumentException( 'Data needs at least an EMAIL key.' );
		}
	}

	/**
	* @return Avangpress_Mail_Subscriber[]
	*/
	public function map() {
		$mail = new Avangpress_Mail();
		$map = array();

		foreach( $this->list_ids as $list_id ) {
			$list = $mail->get_list( $list_id, true );

			if( $list instanceof Avangpress_Mail_List ) {
				$map[ $list_id ] = $this->map_list( $list );
			}
		}

		return $map;
	}

	/**
	* @param Avangpress_Mail_List $list
	*
	* @return Avangpress_Mail_Subscriber
	*/
	protected function map_list( Avangpress_Mail_List $list ) {

		$subscriber = new Avangpress_Mail_Subscriber();
		$subscriber->email_address = $this->data['EMAIL'];

		// find interest categories
		if( ! empty( $this->data['INTERESTS'] ) ) {
			foreach( $list->interest_categories as $interest_category ) {
				foreach( $interest_category->interests as $interest_id => $interest_name ) {
					// straight lookup by ID as key with value copy.
					if( isset( $this->data['INTERESTS'][ $interest_id ] ) ) {
						$subscriber->interests[ $interest_id ] = $this->formatter->boolean( $this->data['INTERESTS'][ $interest_id ] );
					}

					// straight lookup by ID as top-level value
					if( in_array( $interest_id, $this->data['INTERESTS'], false ) ) {
						$subscriber->interests[ $interest_id ] = true;
					}

					// look in array with category ID as key.
					if( isset( $this->data['INTERESTS'][ $interest_category->id ] ) ) {
						$value = $this->data['INTERESTS'][ $interest_category->id ];
						$values = is_array( $value ) ? $value : array_map( 'trim', explode( '|', $value ) );

						// find by category ID + interest ID
						if( in_array( $interest_id, $values, false ) ) {
							$subscriber->interests[ $interest_id ] = true;
						}

						// find by category ID + interest name
						if( in_array( $interest_name, $values ) ) {
							$subscriber->interests[ $interest_id ] = true;
						}
					}
				}
			}
		}

		// find language
		/* @see http://kb.mail.com/lists/managing-subscribers/view-and-edit-subscriber-languages?utm_source=mc-api&utm_medium=docs&utm_campaign=apidocs&_ga=1.211519638.2083589671.1469697070 */
		if( ! empty( $this->data['MC_LANGUAGE'] ) ) {
			$subscriber->language = $this->formatter->language( $this->data['MC_LANGUAGE'] );
		}

		return $subscriber;
	}

}
