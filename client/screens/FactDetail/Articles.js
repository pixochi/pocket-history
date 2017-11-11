import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';

import { fixWikiLink } from '../../utils/link';


const Articles = ({ navigation }) => {

	const _renderArticles = (links) => {
		return links.map((link,i) => (
			<Button
				key={i}
				title={link.title}
				onPress={() => Linking.openURL(fixWikiLink(link.link))}
				buttonStyle={styles.articleBtn}
				textStyle={styles.articleTitle}
			/>
		));
	}

  const { links } = navigation.state.params;

  return (
  	<ScrollView style={styles.articlesContainer}>
    	{ _renderArticles(links) }
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
	articlesContainer: {
		margin: 20
	},
	articleBtn: {
		marginBottom: 8,
		padding: 12,
		borderRadius: 4,
		backgroundColor: '#B351E1'
	},
	articleTitle: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
	}
});


export default Articles;