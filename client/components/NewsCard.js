import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

import gStyles from '../styles';


const NewsCard = (props) => {

	const openArticle = (link) => {
		Linking.openURL(link);
	}

	const { title, description, img, link } = props;

  return (
    <View
    	onPress={() => openArticle(link)}
    	style={styles.cardContainer}
    >
	    <View style={styles.titleContainer}>
	    	<Text style={styles.title}>
	    	  { title }
	    	</Text>
	    </View>

	    <View style={styles.imgContainer}>
	    	<Image
	    	  style={styles.image}
	    	  source={{uri: img}}
	    	  resizeMode="contain"
	    	/>
	    </View>   	
    	
	    <View style={styles.descriptionContainer}>
	    	<Text style={styles.description}>
	    	  { description }
	    	</Text>
	   	</View>
    </View>
  );

}

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		marginBottom: 5,
		backgroundColor: '#fff',
		borderColor: '#ddd',
		borderWidth: 1
	},
	titleContainer: {
		marginBottom: 4
	},
	title: {
		padding: 6,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#777'
	},
	descriptionContainer: {
		marginBottom: 4
	},
	description: {
		textAlign: 'center',
		fontSize: 17,
		padding: 6
	},
	imgContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		height: SCREEN_DIMENSIONS.width * 0.6,
		width: SCREEN_DIMENSIONS.width * 0.9
	},
});


export default NewsCard;