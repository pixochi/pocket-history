import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';


class Births extends Component {
  render() {
    const { currentFacts, renderFact, renderFactScreen, isReady } = this.props.screenProps;
    return renderFactScreen(currentFacts, renderFact, 'Births', isReady);
  }
}


export default Births;