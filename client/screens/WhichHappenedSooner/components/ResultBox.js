import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';


class ResultBox extends PureComponent {

	_getMessage = (isCorrect) => {
		let message = '';
		if (isCorrect) {
			message = 'CORRECT!';
		} else {
			message = 'WRONG...';
		}

		return message;
	}

  render() {
  	const { message, isOpen, isCorrect, onClosed } = this.props;
  	const style = isCorrect ? styles.modalCorrect : styles.modalWrong;
  	const iconName = isCorrect ? 'check' : 'cross';
    return (
     	<Modal
	      isOpen={isOpen}
	      onClosed={onClosed}
	      swipeThreshold={20}
	      animationDuration={0}
	      style={[styles.modal, style]}
	    >
	      <View style={styles.messageContainer}>
	      	<Icon 
	      		name={iconName}
	      		type='entypo'
	      		color='#fff'
	      		size={40}
	      	/>
	        { message }
	      </View>
	    </Modal>
    );
  }
}

ResultBox.propTypes = {
	message: PropTypes.node,
  isOpen: PropTypes.bool,
  result: PropTypes.bool,
  onPlay: PropTypes.func,
  onCancel: PropTypes.func
}

ResultBox.defaultProps = {
	message: '',
	isOpen: false
}

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
    alignItems: 'center',
    height: height/4,
    width: width-30,
    borderRadius: 5
	},
	modalCorrect: {
		backgroundColor: '#4db03a',
	},
	modalWrong: {
		backgroundColor: '#c63030',
	},
	messageContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}
});


export default ResultBox;