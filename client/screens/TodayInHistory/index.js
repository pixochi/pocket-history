import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

// ACTIONS
import { fetchFacts, changeDate } from './actions';

// SCREENS
import Events from './Events';
import Births from './Births';
import Deaths from './Deaths';
import News from './News';

// // COMPONENTS
import { Calendar } from 'react-native-calendars';
import FactCard from '../../components/FactCard';

// shape of a birth, death and an event object
const factShape = PropTypes.arrayOf(
  PropTypes.shape({
    html: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    text: PropTypes.string,
    year: PropTypes.string.isRequired
  })
);

const FactsCategories = TabNavigator({
  events: { screen: Events },
  births: { screen: Births },
  deaths: { screen: Deaths },
  news: { screen: News }
}, { tabBarPosition: 'bottom', lazy: true });


class TodayInHistory extends Component {
  static navigationOptions = {
    headerTitle: 'Today In History',
    drawerLabel: 'Today In History'
  };

  componentDidMount() {
    // AsyncStorage.clear();
  }

  componentWillReceiveProps(nextProps) {
    const { facts, rehydrated, isLoading, 
      isOnline, selectedDate, fetchFacts } = nextProps;

    const selectedFacts = facts[selectedDate];
    const dateChanged = selectedDate !== this.props.selectedDate;

    if (!isLoading && isOnline && rehydrated && _.isEmpty(selectedFacts) ) {
      fetchFacts(nextProps.selectedDate);
    }
  }

  // default rendering of each fact
  renderFact = ({ item }) => {
    return (
      <FactCard
        text={item.text}
        year={item.year}
      />
    )
  }

  moveByDay = (direction) => {
    const d = new Date(this.props.selectedDate);
    d.setDate(d.getDate() + direction);
    this.props.changeDate(d);
  }

  render() {
    const { facts, isLoading, rehydrated, selectedDate, changeDate } = this.props;
    const selectedFacts = facts[selectedDate];

    const screenProps = {
      selectedFacts,
      renderFact: this.renderFact,
      isReady: (!isLoading && rehydrated)
    }

    return (
      <View style={styles.factsContainer}>
        <Button title='prev date' onPress={() => this.moveByDay(-1)} />
        <Button title='next date' onPress={() => this.moveByDay(1)} />
        <FactsCategories
          screenProps={screenProps} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  factsContainer: {
    flex: 1
  }
});

const mapStateToProps =
  ({ historyOnDay: { facts, selectedDate, isLoading }, offline, persist}) => (
    {
      facts,
      selectedDate,
      isLoading,
      isOnline: offline.online,
      rehydrated: persist.rehydrated
    }
)

const mapDispatchToProps = (dispatch) => ({
  fetchFacts: (date) => {
    dispatch(fetchFacts(date));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);