import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class FuturePredictions extends Component {
  static navigationOptions = {
    drawerLabel: 'Future Predictions'
  }

  render() {
    return (
      <View>
        <Text>
          FuturePredictions
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default FuturePredictions;