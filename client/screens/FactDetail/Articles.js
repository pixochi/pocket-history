import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { Button } from 'react-native-elements';
import hash from 'string-hash';

import { dateRangeFromString } from '../../utils/date';

import Banner from '../../components/AdMob';
import ArticleCard from '../../components/ArticleCard';
import ArticlesLabel from '../../components/TabBarLabels/ArticlesLabel';
import Header from './Header';
import { copy, share, save } from '../../components/utils/cardMenuOptions';

import gStyles from '../../styles';


class Articles extends PureComponent {
	static navigationOptions = {
    tabBarLabel : <ArticlesLabel />
  }

	_cardMenuOptions = ({link, title}) => {
		const { addFavorite, copyToClipboard } = this.props.screenProps;
		const id = hash(link+title);
		const menuOptions = [
			copy({ onSelect: () => copyToClipboard(link), optionText: 'Copy Link' }),
			share({ message: title }),
			save({ onSelect: () => addFavorite({link, title, id}, 'articles') })
		]
		return menuOptions;
	}

	_renderArticle = (article) => {
		const { item, index } = article;
		const Article = (
			<ArticleCard 
				menuOptions={this._cardMenuOptions(item)}
				{...item}
			/>
		)
		if (index && index % 5 === 0) {
			return (
				<View>
					<Banner />
					{ Article }
				</View>
			)
		}
		return Article;
	}

  render() {
  	const { navigation } = this.props.screenProps;
  	const { links } = navigation.state.params;

  	return (
	    <View style={styles.container}>
	      <Header navigation={navigation} />
	      <View style={gStyles.screenBody}>
			    <FlatList
			    	contentContainerStyle={styles.articlesContainer}
	          data = {links}
	          extraData = {links}
	          keyExtractor = {(article) => article.title}
	          renderItem = {this._renderArticle}
			    />
	      </View>
	    </View>
	  ); 
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	articlesContainer: {
		
	}
});


export default Articles;