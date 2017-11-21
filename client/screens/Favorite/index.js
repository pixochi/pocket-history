import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// SCREENS
import FavoriteFacts from './Facts';
import FavoriteArticles from './Articles';
import FavoriteBooks from './Books';
import FavoriteVideos from './Videos';

import MenuIcon from '../../components/MenuIcon';

import { removeFavorite } from './actions';
import { copyToClipboard } from '../FactDetail/actions';


const FavNavigator = StackNavigator({
	favorite: { 
		screen: TabNavigator({
			  facts: { screen: FavoriteFacts },
			  articles: { screen: FavoriteArticles },
			  books: { screen: FavoriteBooks },
			  videos: { screen: FavoriteVideos }
			}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false }
		)
	}
},{ navigationOptions: (props) => ({
			headerTitle: 'Favorite',
      headerRight: <MenuIcon {...props} />
	})
}); 

class Favorite extends Component {
	render(){
		const { removeFavorite, copyToClipboard, navigation } = this.props;
		return (
			<FavNavigator screenProps={{removeFavorite, copyToClipboard, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (item, category) => {
    dispatch(removeFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  }
});


export default connect(null, mapDispatchToProps)(Favorite);