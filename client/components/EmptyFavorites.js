import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import gStyles from '../styles';

const EmptyFavorites = ({ message, loggedIn }) => {
	const loginMessage = "Did you save some to your account? Because you're not logged in.";
  return (
    <View style={gStyles.screenMiddle}>
      <Text style={styles.message}>
        { message }
      </Text>
      { !loggedIn && <Text style={styles.message}>
        { loginMessage }
      </Text>
    	}
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