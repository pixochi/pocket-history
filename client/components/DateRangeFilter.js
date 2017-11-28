import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import Slider from 'react-native-multi-slider';

class DateRangeFilter extends PureComponent {

  render() {
  	const { onValuesChanged, labelMin = 'Date start', labelMax = 'Date end', rangeKey } = this.props;
		let { min = 1, max = 12, values = [] } = this.props;

		min = parseInt(min);
		max = parseInt(max);
		max += min === max ? 1 : 0;
		values = values[0] ? values : [min, max];

		let sliderRange = max - min;
		sliderRange += sliderRange > 1 ? 1 : 2;
		const sliderOptions = Array.from(Array(sliderRange), (_, i) => min+i);

    return (
      <View style={styles.sliderContainer}>
			  <Slider
		  		values={values}
			    minimumValue={min}
			    maximumValue={max}
			    optionsArray={sliderOptions}
			    step={1}
			    onValuesChangeFinish={(values) => { onValuesChanged(values, rangeKey) }}
			    onValuesChangeStart={() => null}
			    onValuesChange={() => null}
			    selectedStyle={styles.sliderSelected}
			    containerStyle={styles.slider}
			   />
			   <View style={styles.labelsContainer}>
			   	<Text style={[styles.label, styles.labelLeft]}>{labelMin}</Text>
			  	<Text style={[styles.label, styles.labelRight]}>{labelMax}</Text>
			   </View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
	sliderContainer: {
		height: 50,
		alignSelf: 'center',
		justifyContent: 'center'
	},
	slider: {
		position: 'relative',
		bottom: -10,
		alignSelf: 'center'
	},
	labelsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	label: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold'
	},
	labelLeft: {
		position: 'relative',
		left: -15
	},
	labelRight: {
		position: 'relative',
		right: -15
	},
	sliderSelected: {
		backgroundColor: '#a31c15'
	}
});


export default DateRangeFilter;