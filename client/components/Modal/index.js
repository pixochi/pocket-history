import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import { closeModal } from './actions';


class ReduxModal extends Component {

	_btnClose = () => {
		const { closeModal } = this.props;
		return (
			<Button 
	  		title='Close'
	  		onPress={() => closeModal()}
	  		buttonStyle={styles.closeBtn}
	  		textStyle={styles.closeBtnText}
	  	/>
		)
	}

	render() {
		const { 
			isVisible,
			closeModal,
			isScrollable = true,
			name = '', 
			currentName,
			btnClose = this._btnClose(),
			modalStyle = styles.modal,
			children = null
		} = this.props;
		let ContentContainer = isScrollable ? ScrollView : View;

		return (
		  <Modal 
	      isVisible={isVisible && name === currentName} 
	      onBackdropPress={closeModal}
	      onBackButtonPress={closeModal}
	      style={modalStyle}
	    >
		    <ContentContainer style={styles.flex} >
		    	{ children }
		    	{ btnClose }
		    </ContentContainer>
	    </Modal>
  	);
	}
}


const styles = StyleSheet.create({
	modal: {
		flex: 1,
		margin: 12
	},
	flex: {
		flex: 1
	},
	closeBtn: {
		height: 40,
		margin: 10,
		backgroundColor: 'rgb(255, 87, 35)'
	},
	closeBtnText: {
		padding: 5,
		fontSize: 24
	}
});

const mapStateToProps = ({ modal }) => ({
	isVisible: modal.isVisible,
	currentName: modal.currentName
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal);