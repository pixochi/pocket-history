import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
 

const Loader = () => {
	return (
		<View style={styles.spinner}>
			<ActivityIndicator size='large' />
		</View>
	); 
}
 
const styles = StyleSheet.create({
	spinner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15
	}
});
 
 
 export default Loader; 
