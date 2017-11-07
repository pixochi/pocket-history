import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView
} from 'react-native';

const Articles = ({ navigation }) => {

	const _renderArticles = (links) => {
		return links.map((link,i) => (
			<View key={i} style={styles.article}>
				<Text style={styles.articleTitle} onPress={() => Linking.openURL(link.link)}>
				  { link.title }
				</Text>
			</View>
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
	article: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 8,
		padding: 12,
		backgroundColor: '#B351E1',
		borderRadius: 4
	},
	articleTitle: {
		fontSize: 20
	}
});


export default Articles;