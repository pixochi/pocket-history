import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// SCREENS
import Births from '../screens/TodayInHistory/Births';
import Deaths from '../screens/TodayInHistory/Deaths';
import Events from '../screens/TodayInHistory/Events';
import FactDetail from '../screens/FactDetail';
import News from '../screens/TodayInHistory/News';
import TodayInHistory from '../screens/TodayInHistory';

import { tabBarOptions } from './common';


export const RoutesTodayInHistory = StackNavigator(
	{
	  todayInHistory: { screen: TodayInHistory },
	  factDetail: { screen: FactDetail }
	},
	{ 
		navigationOptions: ({navigation}) => ({
      header: null,
      drawerLabel: 'Today In History',
    	drawerIcon: ({tintColor}) => <Icon name='home' color={tintColor} size={28} />
  	})
	}
);

export const RoutesFactCategories = TabNavigator(
	{
	  Events: { screen: Events },
	  Births: { screen: Births },
	  Deaths: { screen: Deaths },
	  News: { screen: News }
	},
	{
	  tabBarPosition: 'bottom',
	  lazy: true,
	  tabBarOptions
	}
);

