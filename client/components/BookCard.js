import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

const removeHtmlTags = (str) => {
  if ((str == null) || (str === '')) return false;
  return str.replace(/<[^>]*>/g, '');
}

const BookCard = ({book, onBookPress}) => {
	const fullScreenBookPreview = `${book.previewLink}#f=true`;
	const description = book.description || removeHtmlTags(book.textSnippet);

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
	    	/>
	    	<Button 
	    		title='Buy'
	    		onPress={() => Linking.openURL(book.infoLink)}
	    		buttonStyle={styles.btn}
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
	      <View style={styles.bookOverlay}>
	      	<Icon 
	      		name='magnifying-glass'
	      		type='entypo'
	      		size={50}
	      		color='#962939'
	      		style={styles.bookIcon}
	      	/>
	      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	bookCardContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
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
	bookOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,.3)'
	},
	btn: {
		marginBottom: 10,
		backgroundColor: '#B351E1'
	}
});


export default BookCard;