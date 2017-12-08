import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ActivityIndicator
} from 'react-native';
import HTMLView from 'react-native-htmlview'; // not same as webview
import TimelineList from 'react-native-timeline-listview'

import { connect } from 'react-redux';
import _ from 'lodash';

// COMPONENTS
import DateRangeFilter from '../../components/DateRangeFilter';
import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';
import TimelineLabel from '../../components/TabBarLabels/TimelineLabel';

import { dateRangeFromString, addLeadingChars } from '../../utils/date';
import { filterBySearch, filterTimelineByDate, sortByDate } from '../../utils/filters';

import { buildTimelineBorders, renderTimelineFact,
  getTimeRange, getRangeFilterProps } from './helpers/timeline';

import { fetchTimeline, changeFilter } from './actions';

import { COLORS } from '../../constants/components';
import gStyles from '../../styles';


class Timeline extends PureComponent {

  static navigationOptions = {
    tabBarLabel : <TimelineLabel />
  }

  _rangeFilterProps = {}

  componentDidMount() {
    this._fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {
    const { screenProps, allTimelineFacts, timelineRange, filter, isOnline } = this.props;
    const category = screenProps.navigation.state.params.category;
    const currentSort = filter.sort;
    const nextSort = nextProps.filter.sort;
    const gotConnected = !isOnline && nextProps.isOnline;

    if (allTimelineFacts[0] !== nextProps.allTimelineFacts[0] || _.isEmpty(nextProps.allTimelineFacts)) {
      const { text, category } = screenProps.navigation.state.params;
      const { timelineRange } = nextProps;
      const { start, end} = buildTimelineBorders(timelineRange, text, category);
      this._timelineStart = start;
      this._timelineEnd = end;
      this._rangeFilterProps = getRangeFilterProps(category, timelineRange);
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

    if (!this._timelineStart || !this._timelineEnd) {    
      range = dateRangeFromString(text, category, selectedTimestamp, year);
    } 
    fetchTimeline({range, isNew});
  }

  _onEndReached = () => {
    const { isLastFetched, allTimelineFacts, timelineRange, isLoading } = this.props;
    if (!isLoading && !isLastFetched) {
      const lastFactDate = allTimelineFacts[allTimelineFacts.length-1].date
      const nextRange = getTimeRange(lastFactDate, timelineRange.end);
      this._fetchTimeline({ range: nextRange, isNew: false});
    }
  }

  _renderFooter = () => {
    const { isLastFetched, isLoading } = this.props;
    const isLoadingNext = (!isLastFetched && isLoading);
    const loader = (
      <View style={styles.footer}>
        <ActivityIndicator size='large' /> 
        <View style={styles.loadingMsgContainer}>
          <Text style={styles.textLoading} >
            Loading...
          </Text>
        </View>
      </View>  
    )
    const footer = isLoadingNext ? loader : <Text/>;
    return footer;
  }

  _renderTime = (rowData, sectionID, rowID) => {
    if (_.isEmpty(rowData)) { return <View/> }
    return (
      <View style={styles.timeWrapper}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{rowData.date}</Text>
        </View>
      </View>
    );
  }

  _renderTimelineFact = (rowData, sectionID, rowID) => {
    if (_.isEmpty(rowData)) { return <View/> }

    const borderItemStyle = rowData.isBorder ? styles.borderItem : null;

    return (
      <View style={styles.container}>
        <HTMLView 
          value={rowData.description}
          RootComponent={Text}
          style={[styles.description, borderItemStyle]}
          onLinkPress={(url) => Linking.openURL(url)}
          stylesheet={htmlViewStyles}
        />
      </View>
    )
  }

  _onRangeFilterChanged = (values, rangeKey) => {
    const { changeFilter } = this.props;
    let rangeFilter = { start: {}, end: {} }

    rangeFilter.start[rangeKey] = values[0];
    rangeFilter.end[rangeKey] = values[1];
    changeFilter({ range: rangeFilter });
  }

  render() {
    const { screenProps, timelineFacts, allTimelineFacts, timelineRange, 
      changeFilter, filter, isLoading, isOnline } = this.props;
    const { category } = screenProps.navigation.state.params;
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
        <View style={styles.timelineContainer}>
          <TimelineList 
            data={[_timelineStart, ...facts, _timelineEnd]}
            renderTime={this._renderTime}
            renderDetail={this._renderTimelineFact}
            options={{
              renderFooter: this._renderFooter,
              onEndReached: this._onEndReached
            }}
            lineWidth={1}
            lineColor={COLORS.greyLight}
            circleColor={COLORS.header}
            innerCircle='dot'
            dotColor='#fff'
            style={styles.timeline}
          />
        </View>      
      );
    }

    const { min, max, labelMin, labelMax, rangeKey } = this._rangeFilterProps;
    return (
      <View style={styles.container}>
        <View style={[gStyles.screenBody, styles.screenBody]}>
          <DateRangeFilter
            values={filter.range.start[rangeKey], filter.range.end[rangeKey]}
            min={min}
            max={max}
            labelMin={labelMin}
            labelMax={labelMax}
            rangeKey={rangeKey}
            onValuesChanged={this._onRangeFilterChanged} 
           />
          { Main }
        </View>
      </View>
    );
  }
}

const htmlViewStyles = {
  a: {
    color: COLORS.link,
    fontWeight: 'bold'
  }
}

const styles = StyleSheet.create({
  screenBody: {
    // backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },
  borderItem: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    color: COLORS.greyDark,
    fontSize: 15,
    marginTop: 4,
  },
  timelineContainer: {
    flex: 1,
  },
  timeline: {
    paddingHorizontal: 4
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
    fontSize: 15,
    color: '#2a2a2a',
  },
  text: {
    fontSize: 20,
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
    marginHorizontal: 5,
  },
  textLoading: {
    color: COLORS.greyLight,
    fontSize: 18
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const filterTimeline = (data, searchValue, dateRange, sortOrder) => {
  data = filterBySearch(data, searchValue, ['description']);
  data = filterTimelineByDate(data, dateRange);
  data = sortByDate(data, sortOrder, 'date');
  return data;
}

const mapStateToProps = ({ historyOnDay, factDetail, offline }) => {
  const { timeline } = factDetail;
  const { data, range, filter, prevFilter, isLoading, isLastFetched } = timeline;
  return {
    allTimelineFacts: data,
    timelineFacts: filterTimeline(data, filter.search, filter.range, filter.sort),
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
    dispatch(changeFilter(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);