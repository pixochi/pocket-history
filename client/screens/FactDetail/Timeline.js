import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { dateRangeFromString } from '../../utils/date';

import { fetchTimeline } from './actions';


class Timeline extends Component {

  componentDidMount() {
    const { screenProps, fetchTimeline, selectedTimestamp } = this.props;
    const { category, year, text } = screenProps.navigation.state.params;
    // const dateRange = dateRangeFromString(text, category, selectedTimestamp, year);
    // const dateRange1 = dateRangeFromString('fgfgfg', 'Births', selectedTimestamp, '250 BC');
    // const dateRange2 = dateRangeFromString('fgfgfg (d. 1300 BC)', 'Births', selectedTimestamp, '1400 BC');
    const dateRange3 = dateRangeFromString('fgfgfg (d. 10)', 'Births', selectedTimestamp, '70 BC');
    const dateRange4 = dateRangeFromString('fgfgfg (d. 310)', 'Births', selectedTimestamp, '250');

    const dateRange5 = dateRangeFromString('fgfgfg', 'Deaths', selectedTimestamp, '250 BC');
    const dateRange6 = dateRangeFromString('fgfgfg (b. 1500 BC)', 'Deaths', selectedTimestamp, '1400 BC');
    const dateRange7 = dateRangeFromString('fgfgfg (b. 10 BC)', 'Deaths', selectedTimestamp, '70');
    const dateRange8 = dateRangeFromString('fgfgfg (b. 210)', 'Deaths', selectedTimestamp, '250');
     const dateRange9 = dateRangeFromString('fgfgfg (b. 210)', 'Deaths', selectedTimestamp, '250');

    // console.log('DATA RANGE 1')
    // console.log(dateRange1)
    // console.log('DATA RANGE 2')
    // console.log(dateRange2)
    console.log('DATA RANGE 3')
    console.log(dateRange3)
    console.log('DATA RANGE 4')
    console.log(dateRange4)
    console.log('DATA RANGE 5')
    console.log(dateRange5)
    console.log('DATA RANGE 6')
    console.log(dateRange6)
    console.log('DATA RANGE 7')
    console.log(dateRange7)
    console.log('DATA RANGE 8')
    console.log(dateRange8)


    // console.log('DATA RANGE')
    // console.log(dateRange)
    // fetchTimeline(dateRange);
  }

  render() {
    console.log(this.props)
    return (
      <View>
      	<Text>
      	  Timeline
      	</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ historyOnDay, factDetail, offline }) => (
  {
    selectedTimestamp: historyOnDay.selectedDate.timestamp,
    isLoading: factDetail.isLoading,
    isOnline: offline.online
  }
);

const mapDispatchToProps = (dispatch) => ({
  fetchTimeline: (range) => {
    dispatch(fetchTimeline(range));
  }
});

const styles = StyleSheet.create({

});


export default connect(mapStateToProps, mapDispatchToProps)(Timeline);