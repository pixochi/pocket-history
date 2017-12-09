import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { MONTHS } from '../utils/date';
import { COLORS } from '../constants/components';


class DateRangeFilter extends PureComponent {

	static propTypes = {
	  values: PropTypes.arrayOf(PropTypes.number).isRequired,
	  rangeKey: PropTypes.string,
	  min: PropTypes.number,
	  max: PropTypes.number,
	  labelMin: PropTypes.string,
	  labelMax: PropTypes.string,
	  onChangeRange: PropTypes.func
	}

	static defaultProps = {
	  labelMin: 'Date start',
	  labelMax: 'Date end'
	}

	_onRangeStartChange = (rangeStart) => {
		const { values, max, rangeKey, onChangeRange } = this.props;
		const rangeEnd = values[1] ? values[1] : max;
		const newRangeValues = [rangeStart, rangeEnd];
		onChangeRange(newRangeValues, rangeKey);
	}

	_onRangeEndChange = (rangeEnd) => {
		const { values, min, rangeKey, onChangeRange } = this.props;
		const rangeStart = values[0] ? values[0] : min;
		const newRangeValues = [rangeStart, rangeEnd];
		onChangeRange(newRangeValues, rangeKey);
	}

	// @param type ['month', 'year']
	_renderPickerItems = (min, max, type) => {
		let pickerItems = [];
		
		for(let i = min; i <= max; i++){
			const label = type === 'month' ? MONTHS[i-1] : (i + '');
			const pickerItem = (
				<Picker.Item
					key = {i}
					label = {label}
					value = {i}
				/>
			)
			pickerItems.push(pickerItem);
		}

		return pickerItems;
	}

  render() {
  	const { values, rangeKey, min, max, labelMin, labelMax } = this.props;
  	const [ valueStart = min, valueEnd = max ] = values;

    return (
      <View style={styles.rangeContainer}>

      	<View style={styles.inputContainer}>
	      	<View style={styles.pickerContainer}>
		      	<Picker
						  selectedValue={valueStart}
						  onValueChange={this._onRangeStartChange}
						  style = {styles.rangePicker}
						>
						  { this._renderPickerItems(min, valueEnd, rangeKey) }
						</Picker>
					</View>

					<View style={styles.rangeSeparator}>
						<Icon
							name = 'dash'
							type = 'octicon'
							size = {22}
							color = {COLORS.greyDark}
							iconStyle = {styles.separatorIcon}
						/>
					</View>

					<View style={styles.pickerContainer}>
		      	<Picker
						  selectedValue={valueEnd}
						  onValueChange={this._onRangeEndChange}
						  style = {styles.rangePicker}
						>
					  	{ this._renderPickerItems(valueStart, max, rangeKey) }
						</Picker>
					</View> 	
      	</View>
			</View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
	rangeContainer: {
		height: 40,
		width: DEVICE_WIDTH,
		alignSelf: 'center',
		justifyContent: 'center',
		paddingHorizontal: 6,
		backgroundColor: '#eee'
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',		
	},
	pickerContainer: {
		flex: 1,
	},
	rangePicker: {
		flex: 1
	},
	rangeSeparator: {
		flex: .2
	},
	separatorIcon: {
		paddingLeft: 10
	}
});


export default DateRangeFilter;