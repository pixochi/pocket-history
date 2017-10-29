import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ACTIONS
import { fetchFacts } from './actions';

// COMPONENTS
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
    selectedDate: PropTypes.string.isRequired
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

  renderFact = ({ item }) => {
    return (
      <FactCard
        text={item.text}
        year={item.year}
      />
    )
  }

  render() {
    const { facts, selectedDate, isLoading, rehydrated } = this.props;
    const currentFacts = facts.find(day => day.date === selectedDate);

    if (isLoading || !rehydrated){
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if(!currentFacts){
      return (
        <View style={styles.spinner}>
          <Text>
            NO FACTS FOR THIS DATE
          </Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data = {currentFacts.Events}
          renderItem = {this.renderFact}
          extraData = {currentFacts}
          keyExtractor = {(fact) => fact.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
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
    dispatch(fetchFacts(date))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);