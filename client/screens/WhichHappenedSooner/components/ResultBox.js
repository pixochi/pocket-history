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
  	const { isOpen, isCorrect, onClosed } = this.props;

    return (
     	<Modal
	      isOpen={isOpen}
	      onClosed={onClosed}
	      style={styles.modal}
	    >
	      <Text>
	        { this._getMessage(isCorrect) }
	      </Text>
	    </Modal>
    );
  }
}

ResultBox.propTypes = {
  isOpen: PropTypes.bool,
  result: PropTypes.bool,
  onPlay: PropTypes.func,
  onCancel: PropTypes.func
}

ResultBox.defaultProps = {
	isOpen: false
}

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
    alignItems: 'center',
    height: height/2,
    width: width-30,
	}
});


export default ResultBox;