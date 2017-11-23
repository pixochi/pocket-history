import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ActivityIndicator
} from 'react-native';
import TimelineList from 'react-native-timeline-listview'
import HTMLView from 'react-native-htmlview'; // not same as webview
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

import { dateRangeFromString } from '../../utils/date';

import { fetchTimeline } from './actions';

import gStyles from '../../styles';


class Timeline extends Component {

  componentDidMount() {
    this._fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {
    const gotConnected = !this.props.isOnline && nextProps.isOnline;
    if (gotConnected) {
      this._fetchTimeline();
    }
  }

  _fetchTimeline = (options = {}) => {
    const { limit, isNew } = options;
    let { range } = options;
    const { screenProps, fetchTimeline, selectedTimestamp } = this.props;
    const { category, year, text } = screenProps.navigation.state.params;

    if (!range || !range.start || !range.end ) {    
      range = dateRangeFromString(text, category, selectedTimestamp, year);
    } 
    fetchTimeline({range, limit, isNew});
  }

  _onEndReached = () => {
    const { isLastFetched, timelineFacts, timelineRange, isLoading } = this.props;
    if (!isLoading && !isLastFetched) {
      const lastFactDate = timelineFacts[timelineFacts.length-1].date
      const [ year, month, day ] = lastFactDate.split('/');
      const start = {
        api: year + month + day,
        year,
        month,
        day
      }
      const range = {
        start,
        end: timelineRange.end
      }
      this._fetchTimeline({ range, isNew: false});
    }
  }

  _renderFooter = () => {
    const { isLastFetched, isLoading } = this.props;
    const isLoadingNext = !isLastFetched && isLoading;
    const loader = (
      <View style={styles.footer}>
        <ActivityIndicator size='large' />
      </View>  
    )
    const footer = isLoadingNext ? loader : <Text/>;
    return footer;
  }

  _renderDetail = (rowData, sectionID, rowID) => {
    const { timelineFacts } = this.props;
    const isBorderItem = rowID === '0' || rowID === ''+(timelineFacts.length+1);
    const borderItemStyle = isBorderItem ? styles.borderItem : null;

    return (
      <View style={styles.container}>
        <HTMLView 
          value={rowData.description}
          RootComponent={Text}
          style={[styles.description, borderItemStyle]}
          onLinkPress={(url) => Linking.openURL(url)}
        />
      </View>
    )
  }

  _renderTime = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.timeWrapper}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{rowData.date}</Text>
        </View>
      </View>
    );
  }

  _timelineBorders = () => {
    let timelineStart;
    let timelineEnd;
    const { screenProps, timelineRange } = this.props;
    const { start, end } = timelineRange;
    const { text, category } = screenProps.navigation.state.params;

    if (category === 'Events') {
      timelineStart = {
        date: `${start.year}/01/01`,
        description: `What else happened in ${start.year}?`
      },
      timelineEnd = {
        date: `${end.year}/12/31`,
        description: 'End of the year'
      }
    } else if (category === 'Births') {
      const { year, month, day } = start;
      let note = end.approximate ? ' * The date of death is approximate.' : '';
      timelineStart = {
        date: `${year}/${month}/${day}`,
        description: `Birth: ${text}`,
      }
      const isAlive = end.approximate && end.year === new Date().getFullYear();
      const description = isAlive ? 'TODAY' : `Death: ${text} ${note}`;
      timelineEnd = {
        date: end.year,
        description
      }
    } else {
      const { year, month, day } = end;
      let note = start.approximate ? ' * The date of birth is approximate.' : '';
      timelineStart = {
        date: start.year,
        description:`Birth: ${text} ${note}`,
      }
      timelineEnd = {
        date: `${year}/${month}/${day}`,
        description: `Death: ${text}`,
      }
    }

    return { start: timelineStart, end: timelineEnd }
  }

  render() {
    const { timelineFacts, isLoading, isOnline } = this.props;

    if (!isOnline && !timelineFacts.length) {
      return <NetworkProblem />
    }

    if (isLoading && !timelineFacts.length) {
      return <Loader />
    }

    if (timelineFacts && timelineFacts.length) {
      const { start, end } = this._timelineBorders();
      const options = {
        renderFooter: this._renderFooter,
        onEndReached: this._onEndReached
      }
      return (
        <View style={styles.listContainer}>
          <TimelineList 
            data={[start, ...timelineFacts, end]}
            renderTime={this._renderTime}
            renderDetail={this._renderDetail}
            options={options}
            style={styles.timeline}
          />
        </View>      
      );
    }

    if (!timelineFacts.length) {
      return (
        <View style={gStyles.screenMiddle}>
          <Text style={styles.text}>
            No events were found 
          </Text>
        </View>
      )
    }

    return (
      <View />
    );
  }
}

const mapStateToProps = ({ historyOnDay, factDetail, offline }) => {
  const { timeline } = factDetail;
  const { data, range, isLoading, isLastFetched } = timeline;
  return {
    timelineFacts: data,
    timelineRange: range,
    isLastFetched,
    isLoading,
    selectedTimestamp: historyOnDay.selectedDate.timestamp,
    isOnline: offline.online
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTimeline: (options) => {
    dispatch(fetchTimeline(options));
  }
});

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 4
  },
  timeline: {

  },
  container: {
    flex: 1
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  timeWrapper: {
    alignItems: 'flex-end'
  },
  timeContainer: {    
    minWidth: 75
  },
  time: {
    textAlign: 'right',
    fontSize: 14,
    color: '#000',
  },
  description: {
    // UNCOMMENT LATER
    // fontSize: 14,
    // marginTop: 4,
  },
  borderItem: {
    // UNCOMMENT LATER
    // fontSize: 18,
    // fontWeight: 'bold'
  },
  text: {
    fontSize: 20
  },
  footer: {
    paddingBottom: 10
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Timeline);