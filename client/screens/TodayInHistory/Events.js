import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';


class Events extends Component {
  render() {
    const { currentFacts, renderFact } = this.props.screenProps;
    return (
      <View>
        <FlatList
          data = {currentFacts['Events']}
          renderItem = {renderFact}
          extraData = {currentFacts['Events']}
          keyExtractor = {(fact) => fact.text}
        />
      </View>
    )
  }
}


export default Events;