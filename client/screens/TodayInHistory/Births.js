import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';


class Births extends Component {
  render() {
    const { currentFacts, renderFact } = this.props.screenProps;
    return (
      <View>
        <FlatList
          data = {currentFacts['Births']}
          renderItem = {renderFact}
          extraData = {currentFacts['Births']}
          keyExtractor = {(fact) => fact.text}
        />
      </View>
    )
  }
}


export default Births;