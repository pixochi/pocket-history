import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Linking,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

import CardMenu from './CardMenu';
import { copy, share, save } from './utils/cardMenuOptions';

import gStyles from '../styles';


const NewsCard = (props) => {

	const openArticle = (link) => {
		Linking.openURL(link);
	}

	const { title, description, img, link } = props;
	const menuOptions = [
  	copy({ content: `${title}. ${description}` }),
		share({ message: `${title}. ${description}` })
	]

  return (
	  	<TouchableHighlight onPress={() => openArticle(link)}>
	  		<View>
		  		<View style={[gStyles.cardMenu, styles.menu]}>
	  				<CardMenu options={menuOptions}/>
	    		</View>
		    	<View style={styles.cardContainer}>
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
		    </View>
		  </TouchableHighlight>
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: 10,
		marginRight: 10
	},
	title: {
		flex: .9,
		padding: 6,
		paddingBottom: 2,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#777'
	},
	menu: {
		marginTop: 7,
		marginRight: 10
	},
	descriptionContainer: {

	},
	description: {
		textAlign: 'center',
		fontSize: 17,
		padding: 6,
		paddingTop: 2
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