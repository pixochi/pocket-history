import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class Favorite extends Component {
  static navigationOptions = {
    drawerLabel: 'Favorite'
  }

  render() {
    return (
      <View>
        <Text>
          Favorite
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Favorite;