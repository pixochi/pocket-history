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
import { copy, share, save } from './utils/cardMenuOptions';

import { fixWikiLink } from '../utils/link';

import gStyles from '../styles';


const ArticleCard = ({ link, title, addToFavorite }) => {

	const id = hash(link+title);
	const menuOptions = [
		copy({ content: link, optionText: 'Copy Link' }),
		share({ message: title }),
		save({ onSelect: () => addToFavorite({link, title, id}, 'articles') })
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
			<View style={[gStyles.cardMenu,styles.menu]}>
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
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 8,
		backgroundColor: '#fff'
	},
});


export default ArticleCard;