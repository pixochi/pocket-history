import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import hash from 'string-hash';

import { dateRangeFromString } from '../../utils/date';

import ArticleCard from '../../components/ArticleCard';
import { copy, share, save } from '../../components/utils/cardMenuOptions';


const Articles = (props) => {
	const { screenProps, navigation } = props;
	const { html } =  screenProps.navigation.state.params;


	const cardMenuOptions = ({link, title}) => {
		const { addFavorite, copyToClipboard } = screenProps;
		const id = hash(link+title);
		const menuOptions = [
			copy({ onSelect: () => copyToClipboard(link), optionText: 'Copy Link' }),
			share({ message: title }),
			save({ onSelect: () => addFavorite({link, title, id}, 'articles') })
		]
		return menuOptions;
	}

	const renderArticles = (links) => {
		return links.map((link,i) => (
			<ArticleCard 
				key= {i}
				menuOptions={cardMenuOptions(link)}
				{...link}
			/>
		));
	}

  const { links } = screenProps.navigation.state.params;

  return (
  	<ScrollView style={styles.articlesContainer}>
    	{ renderArticles(links) }
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
	articlesContainer: {
		margin: 20
	}
});


export default Articles;