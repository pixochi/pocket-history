import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import { closeModal } from './actions';


class ReduxModal extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		children: PropTypes.node,
		isScrollable: PropTypes.bool,
	  closeModal: PropTypes.func,
	  modalStyle: PropTypes.oneOf(PropTypes.object, PropTypes.number),
	}

	static defaultProps = {
	  isScrollable: true
	}

	_btnClose = () => {
		const { closeModal } = this.props;
		return (
			<View style={styles.btnContainer}>
				<Button 
		  		title='Close'
		  		onPress={() => closeModal()}
		  		buttonStyle={styles.closeBtn}
		  		textStyle={styles.closeBtnText}
		  	/>
	  	</View>
		)
	}

	render() {
		const { 
			isVisible,
			closeModal,
			isScrollable,
			name, 
			currentName,
			btnClose = this._btnClose(),
			modalStyle,
			children
		} = this.props;
		let ContentContainer = isScrollable ? ScrollView : View;

		return (
		  <Modal 
	      isVisible={isVisible && name === currentName} 
	      onBackdropPress={closeModal}
	      onBackButtonPress={closeModal}
	      style={[styles.modal, modalStyle]}
	    >
		    <ContentContainer style={styles.container}>
		    	{ children }
		    	{ btnClose }
		    </ContentContainer>
	    </Modal>
  	);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modal: {
		margin: -5
	},
	btnContainer: {
		marginHorizontal: -10
	},
	closeBtn: {
		backgroundColor: '#db4437',
		borderRadius: 2,
	},
	closeBtnText: {
		fontSize: 18
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