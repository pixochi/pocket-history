import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import TodayInHistory from '../screens/TodayInHistory';
import FactDetail from '../screens/FactDetail';


export const routesTodayInHistory = StackNavigator(
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

