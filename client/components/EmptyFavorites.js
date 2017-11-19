import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import gStyles from '../styles';

const EmptyFavorites = ({ message }) => {
  return (
    <View style={gStyles.screenMiddle}>
      <Text style={styles.message}>
        { message }
      </Text> 	
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
  	margin: 10,
  	fontSize: 24,
  	textAlign: 'center'
  }
});


export default EmptyFavorites;