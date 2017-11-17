import React from 'react';
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


const BookCard = ({book, onBookPress, addToFavorite}) => {
	const fullScreenBookPreview = `${book.previewLink}#f=true`;
	let description = book.description || book.textSnippet || '';
	description = replaceHtmlChars(removeHtmlTags(description));

	const menuOptions = [
		{
      onSelect: () => Share.share({ title: 'Pocket History', message: book.title }),
      iconProps: { name: 'share' },
      optionText: 'Share'
    },
    {
      onSelect: () => addToFavorite(book, 'books'),
      iconProps: { name: 'star' },
      optionText: 'Save'
    },
    {
      onSelect: () => Clipboard.setString(book.title),
      iconProps: { name: 'clipboard', type: 'font-awesome' },
      optionText: 'Copy'
    }
	]

  return (
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
    		onPress={() => onBookPress(description)}
    	>
	    	<Image
	    		style={styles.img}
	        source={{uri: book.image}}
	      />
	      <View style={gStyles.overlay}>
	      	<Icon
	      		name='magnifying-glass'
	      		type='entypo'
	      		size={50}
	      		color='#962939'
	      	/>
	      </View>
      </TouchableOpacity>
      <View style={styles.menu}>
      	<CardMenu options={menuOptions}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	bookCardContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		minHeight: 190,
		backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B351E1',
    borderRadius: 3,
    margin: 4,
    padding: 4
	},
	bookInfo: {
		flex: .65,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 5,
		marginBottom: 15
	},
	imgContainer: {
		flex: .35,
		alignItems: 'center',
		justifyContent: 'center',
		height: 180,
		margin: 5,
		marginLeft: 0,
	},
	img: {
		width: 130,
		height: 180,
		borderColor: '#ddd',
		borderWidth: 1
	},
	menu: {
		position: 'absolute',
		right: 2,
		top: 2,
		zIndex: 1000,
		padding: 4,
		backgroundColor:'#fff'
	},
	btn: {
		marginBottom: 10,
		backgroundColor: '#B351E1'
	},
	btnText: {
		fontSize: 16
	}
});


export default BookCard;