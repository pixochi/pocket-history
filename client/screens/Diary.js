import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


class Diary extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Diary',
    title: 'Diary'
  }

  render() {
    return (
      <View>
        <Text>
          Diary
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Diary;