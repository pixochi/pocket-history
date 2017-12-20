import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { MONTHS } from '../utils/date';
import { COLORS } from '../constants/components';


class DateRangeFilter extends PureComponent {

	// the picker with rangeStart loses its selected value
	// when its items are changed
	state = { rangeEndUpdated: false }

	static propTypes = {
	  values: PropTypes.arrayOf(PropTypes.number).isRequired,
	  rangeKey: PropTypes.string,
	  min: PropTypes.number,
	  max: PropTypes.number,
	  onRangeChange: PropTypes.func
	}

	_onRangeStartChange = (rangeStart) => {
		if (this.state.rangeEndUpdated) { 
			this.setState({ rangeEndUpdated: false });
			return;
		}
		const { values, max, rangeKey, onRangeChange } = this.props;
		const rangeEnd = values[1] ? values[1] : max;
		const newRangeValues = [rangeStart, rangeEnd];
		onRangeChange(newRangeValues, rangeKey);
	}

	_onRangeEndChange = (rangeEnd) => {
		const { values, min, rangeKey, onRangeChange } = this.props;
		const rangeStart = values[0] ? values[0] : min;
		const newRangeValues = [rangeStart, rangeEnd];

		this.setState({ rangeEndUpdated: true }, () => {
			onRangeChange(newRangeValues, rangeKey);
		});
	}

	// @param type ['month', 'year']
	_renderPickerItems = (min, max, type) => {
		let pickerItems = [];
		
		for(let i = min; i <= max; i++){
			const label = type === 'month' ? MONTHS[i-1] : (i + '');
			const pickerItem = (
				<Picker.Item
					key = {label}
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
		      		ref = 'rangeStartPicker'
						  selectedValue={valueStart}
						  onValueChange={this._onRangeStartChange}
						  mode='dropdown'
						  style = {styles.rangePicker}
						>
						  { this._renderPickerItems(min, valueEnd, rangeKey) }
						</Picker>
					</View>

					<View style={styles.rangeSeparator}>
						<Icon
							name = 'dash'
							type = 'octicon'
							size = {18}
							color = {COLORS.greyDark}
							iconStyle = {styles.separatorIcon}
						/>
					</View>

					<View style={styles.pickerContainer}>
		      	<Picker
						  selectedValue={valueEnd}
						  onValueChange={this._onRangeEndChange}
						  mode='dropdown'
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