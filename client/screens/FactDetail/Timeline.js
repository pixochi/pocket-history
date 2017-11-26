import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import TimelineList from 'react-native-timeline-listview'
import HTMLView from 'react-native-htmlview'; // not same as webview
import { connect } from 'react-redux';
import _ from 'lodash';

import Options from '../../components/Options';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

import { dateRangeFromString, addLeadingChars } from '../../utils/date';
import { filterBySearch, sortByDate } from '../../utils/filters';

import { fetchTimeline, changeTimelineFilter } from './actions';

import gStyles from '../../styles';


class Timeline extends PureComponent {

  componentDidMount() {
    this._fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {
    const { isOnline, allTimelineFacts, filter } = this.props;
    const currentSort = filter.sort;
    const nextSort = nextProps.filter.sort;
    const gotConnected = !isOnline && nextProps.isOnline;

    if (allTimelineFacts !== nextProps.allTimelineFacts) {
      const { start, end} = this._timelineBorders();
      this._timelineStart = start;
      this._timelineEnd = end;
    }

    if (allTimelineFacts.length && currentSort !== nextSort) {
      const tmp = this._timelineStart;
      this._timelineStart = this._timelineEnd;
      this._timelineEnd = tmp;
    }

    if (gotConnected) {
      this._fetchTimeline();
    }
  }

  _fetchTimeline = (options = {}) => {
    const { isNew } = options;
    let { range } = options;
    const { screenProps, fetchTimeline, selectedTimestamp } = this.props;
    const { category, year, text } = screenProps.navigation.state.params;

    if (!this._timelineStart || !this._timelineEnd ) {    
      range = dateRangeFromString(text, category, selectedTimestamp, year);
    } 
    fetchTimeline({range, isNew});
  }

  _onEndReached = () => {
    const { isLastFetched, allTimelineFacts, timelineRange, isLoading } = this.props;
    if (!isLoading && !isLastFetched) {
      const lastFactDate = allTimelineFacts[allTimelineFacts.length-1].date

      // dates of timeline facts are from range 01/01/[YEAR] - 31/12/[YEAR]
      let [ year, month = 1, day = 1 ] = lastFactDate.split('/').map(d => parseInt(d));
      day += 1;
      if (day > 31) {
        day = 1;
        month += 1;
        year += month > 12 ? 1 : 0;
      }
      [month, day ] = [month, day ].map(d => addLeadingChars(d, 2, '0'));
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
    const isLoadingNext = (!isLastFetched && isLoading);
    const loader = (
      <View style={styles.footer}>
        <ActivityIndicator size='large' /> 
        <View style={styles.loadingMsgContainer}>
          <Text>
            Loading...
          </Text>
        </View>
      </View>  
    )
    const footer = isLoadingNext ? loader : <Text/>;
    return footer;
  }

  _renderDetail = (rowData, sectionID, rowID) => {
    if (!rowData) { return <View/> }
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
    if (!rowData) { return <View/> }
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

    if (_.isEmpty(timelineRange)) {
      return {};
    }

    if (category === 'Events') {
      timelineStart = {
        date: `${start.year}/01/01`,
        description: `What else happened in ${start.year}?`
      }
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
    const { timelineFacts, allTimelineFacts, changeFilter, filter, isLoading, isOnline } = this.props;
    let Main;
    let facts = timelineFacts;

    if (!timelineFacts.length) {
      const searchMessage = filter.search ? `containing - ${filter.search} -` : '';
      facts = [{description: `<b>No events ${searchMessage} were found.</b>`}];
    } 

    if (!isOnline && !timelineFacts.length) {
      Main = <NetworkProblem />
    } else if (isLoading && !allTimelineFacts.length) {
      Main = <Loader />
    } else {
      const { _timelineStart = {}, _timelineEnd = {} } = this;
      Main = (
        <View style={styles.listContainer}>
          <TimelineList 
            data={[_timelineStart, ...facts, _timelineEnd]}
            renderTime={this._renderTime}
            renderDetail={this._renderDetail}
            options={{
              renderFooter: this._renderFooter,
              onEndReached: this._onEndReached
            }}
            lineWidth={1}
            style={styles.timeline}
          />
        </View>      
      );
    }

    return (
      <View style={{flex:1}}>
        <Header
          search={{
            value:filter.search,
            onChangeText: (text) => changeFilter({ search: text }),
            placeholder: 'Search in Timeline'
          }}
          navigation={this.props.screenProps.navigation}
          rightComponent={<Options changeFilter={changeFilter} />}
        />
        <View style={gStyles.screenBody}>
          { Main }
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ historyOnDay, factDetail, offline }) => {
  const { timeline } = factDetail;
  const { data, range, filter, prevFilter, isLoading, isLastFetched } = timeline;
  return {
    allTimelineFacts: data,
    timelineFacts: sortByDate(filterBySearch(data, filter.search, ['description']), filter.sort, 'date'),
    timelineRange: range,
    filter: timeline.filter,
    isLastFetched,
    isLoading,
    selectedTimestamp: historyOnDay.selectedDate.timestamp,
    isOnline: offline.online
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTimeline: (options) => {
    dispatch(fetchTimeline(options));
  },
  changeFilter: (filter) => {
    dispatch(changeTimelineFilter(filter));
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    marginBottom: 10
  },
  loadingMsgContainer: {
    marginHorizontal: 5
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#fff'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Timeline);