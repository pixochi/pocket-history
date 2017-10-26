import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class LogOut extends Component {
  static navigationOptions = {
    drawerLabel: 'Log Out'
  }

  render() {
    return (
      <View>
        <Text>
          LogOut
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default LogOut;