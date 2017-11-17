import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Share,
  Clipboard,
  TouchableHighlight
} from 'react-native';
import hash from 'string-hash';

import CardMenu from './CardMenu';

import { fixWikiLink } from '../utils/link';


const ArticleCard = ({ link, title, addToFavorite }) => {

	const id = hash(link+title);
	const menuOptions = [
			{
	      onSelect: () => Share.share({ title: 'Pocket History', message: title }),
	      iconProps: { name: 'share' },
	      optionText: 'Share'
	    },
	    {
	      onSelect: () => addToFavorite({link, title, id}, 'articles'),
	      iconProps: { name: 'star' },
	      optionText: 'Save'
	    },
	    {
	      onSelect: () => Clipboard.setString(link),
	      iconProps: { name: 'clipboard', type: 'font-awesome' },
	      optionText: 'Copy Link'
	    }
	]

  return (
  	<View>
			<TouchableHighlight
			  onPress={() => Linking.openURL(fixWikiLink(link))}
			>
			  <View style={styles.articleContainer}>
					<Text style={styles.articleTitle}>
					  { title }
					</Text>
				</View>
			</TouchableHighlight>
			<View style={styles.menu}>
				<CardMenu options={menuOptions} />
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
	articleContainer: {
		marginBottom: 8,
		padding: 12,
		borderRadius: 4,
		backgroundColor: '#B351E1'
	},
	articleTitle: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
	},
	menu: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		right: 0,
		top: 0,
		bottom: 8,
		zIndex: 1000,
		padding: 4,
		backgroundColor:'#fff'
	},
});


export default ArticleCard;