// REACT
import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

// COMPONENTS
import MenuIcon from './components/MenuIcon';

// SCREENS
import FactDetail from './screens/FactDetail';
import Favorite from './screens/Favorite';
import FuturePredictions from './screens/FuturePredictions';
import MyAccount from './screens/MyAccount';
import Diary from './screens/Diary';
import TodayInHistory from './screens/TodayInHistory';
import WhichHappenedSooner from './screens/WhichHappenedSooner';


const todayInHistoryScreen = StackNavigator(
  {
    todayInHistory: {screen: TodayInHistory },
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
		  diary: { screen: Diary },
		  favorite: { screen: Favorite },
		  myAccount: { screen: MyAccount }
		});

    return <MainNavigator />
  }
}
