import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  Clipboard
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import CardMenu from './CardMenu';
import { removeHtmlTags, replaceHtmlChars } from '../utils/string';
import gStyles from '../styles';
import { COLORS } from '../constants/components';


class BookCard extends PureComponent {

	_message404 = 'Sorry, we could not find a description for the selected book.'
	
	render() {
		const {book, onBookPress, menuOptions} = this.props;
		const fullScreenBookPreview = `${book.previewLink}#f=true`;
		let description = book.description || book.textSnippet;
		description = replaceHtmlChars(removeHtmlTags(description)) || this._message404;

		 return (
		 	<View style={styles.bookCard}>
		    <View style={styles.bookCardContainer}>
		    	<View style={styles.bookInfo}>
		    		<Text style={styles.title}>
		      	{ book.title }
			    	</Text>

			    	<Button 
			    		title='Read'
			    		onPress={() => Linking.openURL(fullScreenBookPreview)}
			    		buttonStyle={styles.btn}
			    		textStyle={styles.btnText}
			    	/>
			    	<Button 
			    		title='Buy'
			    		onPress={() => Linking.openURL(book.infoLink)}
			    		buttonStyle={styles.btn}
			    		textStyle={styles.btnText}
			    	/>
		    	</View>

		    	<TouchableOpacity 
		    		style={styles.imgContainer}
		    		activeOpacity={0.7}
		    		onPress={() => onBookPress(description)}
		    	>
			      	<Icon
			      		reverse
			      		name='magnifying-glass'
			      		type='entypo'
			      		size={18}
			      		color='#ff0000'
			      		containerStyle={styles.iconContainer}
			      	/>
				      <Image
				    		style={styles.img}
				        source={{uri: book.image}}
				      />
		      </TouchableOpacity>
		      <View style={[gStyles.cardMenu, styles.menu]}>
			    	<CardMenu options={menuOptions} />
			  	</View>
		    </View>
		  </View>
	  );
	}
}

const IMG_HEIGHT = 190;
const IMG_WIDTH = 130;

const styles = StyleSheet.create({
	bookCard: {
		marginVertical: 10,
		marginHorizontal: 15
	},
	bookCardContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 7,
		backgroundColor: COLORS.yellowLight,
    borderColor: '#fff',
		borderWidth: 6,
		borderRadius: 4,
	},
	bookInfo: {
		flex: .55,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10
	},
	imgContainer: {
		flex: 1,
		maxWidth: IMG_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		marginLeft: 0
	},
	img: {
		width: IMG_WIDTH,
		height: IMG_HEIGHT,
	},
	iconContainer: {
		position: 'absolute',
		zIndex: 1000
	},
	btn: {
		marginBottom: 10,
		borderRadius: 3,
		backgroundColor: '#444455'
	},
	btnText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	menu: {
		backgroundColor: '#222'
	}
});


export default BookCard;