import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class MyHistory extends Component {
  static navigationOptions = {
    drawerLabel: 'Log Out'
  }

  render() {
    return (
      <View>
        <Text>
          MyHistory
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default MyHistory;