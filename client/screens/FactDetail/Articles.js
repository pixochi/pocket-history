import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import hash from 'string-hash';

import Banner from '../../components/AdMob';
import ArticleCard from '../../components/ArticleCard';
import ArticlesLabel from '../../components/TabBarLabels/ArticlesLabel';
import Header from './Header';
import { copy, share, save } from '../../components/utils/cardMenuOptions';

import gStyles from '../../styles';
import { COLORS } from '../../constants/components';

class Articles extends PureComponent {
	static navigationOptions = {
    tabBarLabel : <ArticlesLabel />
  }

	_cardMenuOptions = ({link, title}) => {
		const { addFavorite, copyToClipboard } = this.props.screenProps;
		const id = hash(link+title);
		const message = `${title} - ${link}`
		const menuOptions = [
			copy({ onSelect: () => copyToClipboard(message), optionText: 'Copy Link' }),
			share({ message }),
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
		if (index && index % 4 === 0) {
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
  	let Main;

  	if (!links || !links.length) {
  		Main = (
  			<View style={gStyles.screenMiddle}>
	        <Text style={styles.message}>
	          No articles found
	        </Text>   
      	</View>
  		)
  	} else {
  		Main = (
	  		<FlatList
		    	contentContainerStyle={styles.articlesContainer}
	        data = {links}
	        extraData = {links}
	        keyExtractor = {(article) => article.title}
	        renderItem = {this._renderArticle}
		    />
			)
  	}

  	return (
	    <View style={styles.container}>
	      <Header navigation={navigation} />
	      <View style={gStyles.screenBody}>
			   { Main }
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
		
	},
	message: {
		fontSize: 20,
		color: COLORS.greyDark
	}
});


export default Articles;