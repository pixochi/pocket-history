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

// SCREENS
import Events from './Events';
import Births from './Births';
import Deaths from './Deaths';
import News from './News';


// ACTIONS
import { fetchFacts } from './actions';

// // COMPONENTS
import Loader from '../../components/Loader';
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
}, { tabBarPosition: 'bottom' });


class TodayInHistory extends Component {
  static navigationOptions = {
    headerTitle: 'Today In History',
    drawerLabel: 'Today In History'
  };

  static propTypes = {
    facts: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        Births: factShape,
        Deaths: factShape,
        Events: factShape
      })
    ),
    isLoading: PropTypes.bool.isRequired,
    selectedDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }

  componentDidMount() {
    // AsyncStorage.clear();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchFacts, selectedDate } = this.props;
    const { facts, rehydrated, isLoading } = nextProps;

    const factsLoaded = facts.filter(factsForDay => factsForDay.date === selectedDate);
    const dateChanged = nextProps.selectedDate !== selectedDate;

    if (!isLoading && (dateChanged || (rehydrated && factsLoaded.length === 0 ))) {
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

  renderFactScreen = (currentFacts, renderFact, category, isReady) => {
     if (!isReady){
      return <Loader />
    }

    if(!currentFacts){
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
        <FlatList
          data = {currentFacts[category]}
          renderItem = {renderFact}
          extraData = {currentFacts[category]}
          keyExtractor = {(fact) => fact.text}
        />
      </View>
    )
  }

  render() {
    const { facts, isLoading, rehydrated, selectedDate } = this.props;
    const currentFacts = facts.find(day => day.date === selectedDate);


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
    dispatch(fetchFacts(date))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);