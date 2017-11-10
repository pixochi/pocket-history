import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking
} from 'react-native';


const BookCard = ({book}) => {
  return (
    <View style={styles.bookCardContainer}>
    	<View>
    		<Text>
      	{ book.title }
	    	</Text>
	    	<Text onPress={()=>Linking.openURL(book.previewLink)}>
	      	Preview
	    	</Text>
    	</View>
    	
    	<Image
        style={styles.img}
        source={{uri: book.image}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	bookCardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B351E1',
    borderRadius: 3,
    margin: 4,
    padding: 4
	},
	bookInfo: {
		flex: 3
	},
	img: {
		flex: 1
	}
});


export default BookCard;