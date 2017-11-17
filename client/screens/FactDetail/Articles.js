import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import ArticleCard from '../../components/ArticleCard';


const Articles = ({ screenProps }) => {
	console.log('ARTICLES')
	console.log(screenProps)
	const renderArticles = (links) => {
		return links.map((link,i) => (
			<ArticleCard 
				key= {i}
				addToFavorite={screenProps.addToFavorite}
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