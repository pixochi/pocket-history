import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';


class Deaths extends Component {
  render() {
    const { currentFacts, renderFact, renderFactScreen, isReady } = this.props.screenProps;
    return renderFactScreen(currentFacts, renderFact, 'Deaths', isReady);
  }
}


export default Deaths;