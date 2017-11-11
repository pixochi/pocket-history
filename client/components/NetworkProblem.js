import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import gStyles from '../styles';


const NetworkProblem = ({ solveConnection = () => null }) => {
  return (
    <View style={gStyles.screenMiddle}>
      <Text style={styles.connectionMsg}>
        Check your internet connection and try again.
      </Text>
      <Button 
	      title='Retry' 
	      onPress={solveConnection} 
	      buttonStyle={styles.retryBtn}
	      textStyle={styles.retryText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  retryBtn: {
  	paddingLeft: 30,
  	paddingRight: 30,
  	marginTop: 10
  },
  retryText: {
  	fontSize: 24
  },
  connectionMsg: {
  	fontSize: 24,
  	textAlign: 'center'
  }
});


export default NetworkProblem;