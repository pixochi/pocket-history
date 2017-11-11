import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const BookDescriptionModal = (props) => {
	const { isVisible, closeModal, bookDescription } = props;
	const bookNotFoundMsg = "Sorry, we couldn't find a description for the selected book.";

  return (
	  <Modal 
      isVisible={isVisible} 
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
    >	
	    <ScrollView style={styles.descriptionContainer}>
	    	<Text style={styles.descriptionText}>
	    	  { bookDescription || bookNotFoundMsg }
	    	</Text>
	    	<Button 
	    		title='Close'
	    		onPress={closeModal}
	    		buttonStyle={styles.closeBtn}
	    		textStyle={styles.closeBtnText}
	    	/>
	    </ScrollView>
    </Modal>
  );

}

const styles = StyleSheet.create({
	modal: {
		flex: 1
	},
	descriptionContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#fff'
	},
	descriptionText: {
		fontSize: 18
	},
	closeBtn: {
		margin: 20,
		backgroundColor: 'rgb(255, 87, 35)'
	},
	closeBtnText: {
		padding: 5,
		fontSize: 16
	}
});


export default BookDescriptionModal;