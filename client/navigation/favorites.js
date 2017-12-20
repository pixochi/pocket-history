import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// SCREENS
import Favorite from '../screens/Favorite';
import SearchFavorite from '../screens/Favorite/SearchScreen';
import FavoriteFacts from '../screens/Favorite/Facts';
import FavoriteArticles from '../screens/Favorite/Articles';
import FavoriteBooks from '../screens/Favorite/Books';
import FavoriteVideos from '../screens/Favorite/Videos';

import { tabBarOptions } from './common';
import { DRAWER_ICON_SIZE } from '../constants/components';


export const RoutesFavorites = StackNavigator(
	{
		favorite: {
		  screen: (props) => <Favorite {...props} />,
		 },
		searchFavorite: { screen: SearchFavorite }
	},
	{ 
		navigationOptions: {
			header: null,
	  	drawerLabel: 'Favorite',
	  	drawerIcon: ({tintColor}) => (
	    	<Icon 
		    	name='favorite'
		    	type='material-icon'
		    	size={DRAWER_ICON_SIZE}
		    	color={tintColor}
	    	/>
	    )    
		}
	}
);

export const RoutesFavGroups = StackNavigator(
	{
		favorite: {
			screen: TabNavigator(
				{
				  facts: { screen: FavoriteFacts },
				  articles: { screen: FavoriteArticles },
	        videos: { screen: FavoriteVideos },
				  books: { screen: FavoriteBooks }, 
				}, 
				{ 
					tabBarPosition: 'bottom',
	  			tabBarOptions
				}
			),
		}
	},
	{ 
		navigationOptions: {
				header: null
		}
	}
);
