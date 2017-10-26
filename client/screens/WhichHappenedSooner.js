import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class WhichHappenedSooner extends Component {
  static navigationOptions = {
    drawerLabel: 'Which Happened Sooner'
  }

  render() {
    return (
      <View>
        <Text>
          WhichHappenedSooner
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default WhichHappenedSooner;