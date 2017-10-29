// REACT
import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import MenuIcon from './components/MenuIcon';

// SCREENS
import TodayInHistory from './screens/TodayInHistory';
import FactDetail from './screens/FactDetail';
import Favorite from './screens/Favorite';
import FuturePredictions from './screens/FuturePredictions';
import MyHistory from './screens/MyHistory';
import WhichHappenedSooner from './screens/WhichHappenedSooner';
import LogOut from './screens/LogOut';


const todayInHistoryScreen = StackNavigator(
  {
    todayInHistory: { screen: TodayInHistory },
    factDetail: { screen: FactDetail }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <MenuIcon navigation={navigation} />
    }),
  }
);


export default class MainNavigator extends Component {
  render() {
  	const MainNavigator = DrawerNavigator({
		  todayInHistory: { screen: todayInHistoryScreen },
		  happenedSooner: { screen: WhichHappenedSooner },
		  predictions: { screen: FuturePredictions },
		  MyHistory: { screen: MyHistory },
		  favorite: { screen: Favorite },
		  logOut: { screen: LogOut }
		});

    return <MainNavigator />
  }
}
