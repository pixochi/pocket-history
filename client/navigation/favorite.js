import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Favorite from '../screens/Favorite';
import SearchFavorite from '../screens/Favorite/SearchScreen';

import { DRAWER_ICON_SIZE } from '../constants/components';


export const routesFavorite = StackNavigator(
	{
		favorite: {
		  screen: (props) =>  <Favorite {...props} />, 
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
