import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

// SCREENS
import FavoriteFacts from './Facts';
import FavoriteArticles from './Articles';
import FavoriteBooks from './Books';
import FavoriteVideos from './Videos';


const FavNavigator = TabNavigator({
  facts: { screen: FavoriteFacts },
  articles: { screen: FavoriteArticles },
  books: { screen: FavoriteBooks },
  videos: { screen: FavoriteVideos },
}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false });

class Favorite extends Component {
	static navigationOptions = {
    drawerLabel: 'Favorite',
    headerTitle: 'Favorite'
	}

	render(){
		return (
			<FavNavigator />
		)
	}
}


export default Favorite;