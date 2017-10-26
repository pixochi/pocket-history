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
    title: 'Today In History',
    drawerLabel: 'Today In History',
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
    const { fetchFacts, selectedDate } = this.props;
    fetchFacts(selectedDate);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchFacts, selectedDate } = this.props;

    if (nextProps.selectedDate !== selectedDate) {
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
    const { facts, selectedDate, isLoading } = this.props;
    const currentFacts = facts.find(day => day.date === selectedDate);

    if (isLoading){
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if(!isLoading && !currentFacts){
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
  ({ historyOnDay: { facts, selectedDate, isLoading }}) => (
    {
      facts,
      selectedDate,
      isLoading
    }
)

const mapDispatchToProps = (dispatch) => ({
  fetchFacts: (date) => {
    dispatch(fetchFacts(date))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);