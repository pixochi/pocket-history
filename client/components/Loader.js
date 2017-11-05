import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';


const Loader = ({animating}) => {
	return (
		<View style={styles.spinner}>
			<ActivityIndicator 
				size={70} 
				animating={animating}
				color='#B351E1'
			/>
		</View>
	); 
}

const styles = StyleSheet.create({
	spinner: {
		position: 'absolute',
		zIndex: -1000,
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});
 
 
 export default Loader; 
