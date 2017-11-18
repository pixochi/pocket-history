import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// SCREENS
import FavoriteFacts from './Facts';
import FavoriteArticles from './Articles';
import FavoriteBooks from './Books';
import FavoriteVideos from './Videos';

import MenuIcon from '../../components/MenuIcon';

import { removeFavorite } from '../Favorite/actions';


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
},{ navigationOptions: ({ navigation }) => ({
      headerRight: <MenuIcon navigation={navigation} />,
      headerTitle: 'Favorite'
	})
}); 

class Favorite extends Component {
	static navigationOptions = {
    drawerLabel: 'Favorite'
	}

	render(){
		const { removeFavorite, navigation } = this.props;
		return (
			<FavNavigator screenProps={{removeFavorite, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (item, category) => {
    dispatch(removeFavorite(item, category));
  }
});


export default connect(null, mapDispatchToProps)(Favorite);