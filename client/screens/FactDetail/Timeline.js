import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import TimelineList from 'react-native-timeline-listview'
import { connect } from 'react-redux';

import { dateRangeFromString } from '../../utils/date';

import { fetchTimeline } from './actions';


class Timeline extends Component {

  componentDidMount() {
    const { screenProps, fetchTimeline, selectedTimestamp } = this.props;
    const { category, year, text } = screenProps.navigation.state.params;

    const dateRange = dateRangeFromString(text, category, selectedTimestamp, year);
    fetchTimeline(dateRange);
  }

  render() {
    const data = this.props.timeline.map(fact => {
      return {
        time: fact.date,
        description: fact.description,
        title: 'TITLE'
      }
    });
    console.log(data)
    if (data && data.length) {
      return <TimelineList data={data} />
    }
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
    timeline: factDetail.timeline,
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