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

import CardMenu from './CardMenu';

import { fixWikiLink } from '../utils/link';

import gStyles from '../styles';


const ArticleCard = ({ link, title, menuOptions }) => {

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
				<CardMenu options={menuOptions}/>
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
	articleContainer: {
		marginBottom: 8,
		padding: 12,
		paddingRight: 20,
		paddingLeft: 4,
		borderRadius: 4,
		backgroundColor: '#B351E1'
	},
	articleTitle: {
		paddingRight: 15,
		paddingLeft: 9,
		fontSize: 20,
		color: '#fff'
	},
	menu: {
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 8,
		backgroundColor: '#fff'
	},
});


export default ArticleCard;