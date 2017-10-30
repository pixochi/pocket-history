import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
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
import Loader from '../../components/Loader';
import FactCard from '../../components/FactCard';
import { Calendar } from 'react-native-calendars';

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
}, { tabBarPosition: 'bottom' });


class TodayInHistory extends Component {
  static navigationOptions = {
    headerTitle: 'Today In History',
    drawerLabel: 'Today In History'
  };

  componentDidMount() {
    // AsyncStorage.clear();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchFacts, selectedDate } = this.props;
    const { facts, rehydrated, isLoading, isOnline } = nextProps;

    const selectedFacts = facts[selectedDate];
    const dateChanged = nextProps.selectedDate !== selectedDate;

    if (dateChanged) {
      console.log('DATE CHANGED')
      console.log(nextProps.selectedDate)
      console.log(selectedDate)
    } else {
      console.log('(rehydrated && _.isEmpty(selectedFacts)')
      console.log(selectedFacts)
    }

    if (!isLoading && isOnline && (dateChanged || (rehydrated && _.isEmpty(selectedFacts) ))) {
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

  renderFactScreen = (selectedFacts, renderFact, category, isReady) => {

    // no facts after a try to rehydrate
    // or fetch the facts from API
    if(isReady && _.isEmpty(selectedFacts)){
      return (
        <View style={styles.screenMiddle}>
          <Text>
            NO FACTS FOR THIS DATE
          </Text>
        </View>
      )
    }

    return (
      <View>
        <Loader animating={!isReady} />
        <Button title='change date' onPress={() => this.props.changeDate('October 31')} />
        { _.has(selectedFacts, category) &&
          <FlatList
            data = {selectedFacts[category]}
            renderItem = {renderFact}
            extraData = {selectedFacts[category]}
            keyExtractor = {(fact) => fact.text}
          />
        }
      </View>
    )
  }

  render() {
    const { facts, isLoading, rehydrated, selectedDate } = this.props;
    const currentFacts = facts[selectedDate];


    const screenProps = {
      currentFacts,
      renderFact: this.renderFact,
      renderFactScreen: this.renderFactScreen,
      isReady: (!isLoading && rehydrated)
    }

    return (
      <View style={styles.factsContainer}>
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
  },
  screenMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  }
});

const mapStateToProps =
  ({ historyOnDay: { facts, selectedDate, isLoading, category }, offline, persist}) => (
    {
      facts,
      selectedDate,
      category,
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