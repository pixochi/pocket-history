import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';


class NumberInput extends PureComponent {

	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		min: PropTypes.number,
		max: PropTypes.number,
	  onChangeValue: PropTypes.func,
	  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
	}

	_stripNonNumeric = (value) => {
		value = String(value).replace(/\D/g,'');

		return parseInt(value);
	}

	_checkMinValue = (value, min) => {
		if (!min) { return value; }
		if (value < min) {
			return min;
		}
		return value;
	}

	_checkMaxValue = (value, max) => {
		if (!max) { return value; }
		if (value > max) {
			return max;
		}
		return value;
	}

	_normalizeInput = (input, min, max) => {
		input = parseInt(input);
		input = this._stripNonNumeric(input);
		input = this._checkMinValue(input, min);
		input = this._checkMaxValue(input, max);

		return String(input);
	}

	_onChangeText = (text) => {
		const { min, max, onChangeValue } = this.props;

		text = this._normalizeInput(text, min, max);
		onChangeValue(text);
	}

  render() {
  	const { value, style } = this.props;

    return (
      <TextInput
      	value = {value + ''}
      	keyboardType = 'numeric'
      	onChangeText = {this._onChangeText}
      	style = {style}
      />
    );
  }
}

const styles = StyleSheet.create({

});


export default NumberInput;