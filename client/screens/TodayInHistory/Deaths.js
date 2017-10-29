import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';


class Deaths extends Component {
  render() {
    const { currentFacts, renderFact } = this.props.screenProps;
    return (
      <View>
        <FlatList
          data = {currentFacts['Deaths']}
          renderItem = {renderFact}
          extraData = {currentFacts['Deaths']}
          keyExtractor = {(fact) => fact.text}
        />
      </View>
    )
  }
}


export default Deaths;