// REACT
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

// COMPONENTS
import MenuIcon from './components/MenuIcon';

// SCREENS
import FactDetail from './screens/FactDetail';
import Favorite from './screens/Favorite';
import SearchFavorite from './screens/Favorite/SearchScreen';
import FuturePredictions from './screens/FuturePredictions';
import MyAccount from './screens/MyAccount';
import Diary from './screens/Diary';
import TodayInHistory from './screens/TodayInHistory';
import WhichHappenedSooner from './screens/WhichHappenedSooner';


const todayInHistoryScreen = StackNavigator({
  todayInHistory: {screen: TodayInHistory },
  factDetail: { screen: FactDetail }
},{ navigationOptions: ({navigation}) => ({
      header: null
  })
});

export default class MainNavigator extends Component {
  render() {
  	const MainNavigator = DrawerNavigator({
		  todayInHistory: { screen: todayInHistoryScreen },
		  happenedSooner: { screen: WhichHappenedSooner },
		  predictions: { screen: FuturePredictions },
		  diary: { screen: Diary },
		  favorite: { 
        screen: StackNavigator({
          favorite: {
            screen: (props) =>  <Favorite {...props} />, 
          },
          searchFavorite: { screen: SearchFavorite }
        }, { navigationOptions: {
            drawerLabel: 'Favorite',
            header: null
          }
        }
        )
      }, 
		  myAccount: { screen: MyAccount }
		});

    return (
      <View style={styles.appContainer}>
        <MainNavigator />
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
})
