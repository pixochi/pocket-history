import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class FactCard extends Component {
  render() {
        const { year, text } = this.props;
    return (
      <View>
        <Text>
          { year }
        </Text>
        <Text>
          { text }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default FactCard;