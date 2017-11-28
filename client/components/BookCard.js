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


class BookCard extends PureComponent {

	_message404 = 'Sorry, we could not find a description for the selected book.'
	
	render() {
		const {book, onBookPress, menuOptions} = this.props;
		const fullScreenBookPreview = `${book.previewLink}#f=true`;
		let description = book.description || book.textSnippet;
		description = replaceHtmlChars(removeHtmlTags(description)) || this._message404;

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
		      		color='#f2ff38'
		      	/>
		      </View>
	      </TouchableOpacity>
		    <View style={gStyles.cardMenu}>
		    	<CardMenu options={menuOptions} />
		    </View>
	    </View>
	  );
	}
}

const styles = StyleSheet.create({
	bookCardContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		minHeight: 190,
		backgroundColor: '#333',
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 3,
    margin: 4,
    marginVertical: 8,
    padding: 4
	},
	bookInfo: {
		flex: .65,
	},
	title: {
		color: '#fff',
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
	btn: {
		marginBottom: 10,
		backgroundColor: '#94269d'
	},
	btnText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
	}
});


export default BookCard;