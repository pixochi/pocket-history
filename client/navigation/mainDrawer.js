import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Constants } from 'expo';

import { routesFavorite } from './favorite';
import { routesTodayInHistory } from './todayInHistory';


export class DrawerContent extends PureComponent {
	render() {
		return (
			<ScrollView style={styles.drawer}>
		    <View style={styles.drawerContent} forceInset={{ top: 'always', horizontal: 'never' }}>
		      <DrawerItems 
			      {...this.props}
			      inactiveTintColor='#444'
			      activeTintColor='#fff'
			      activeBackgroundColor='#ffbf00'
			      inactiveBackgroundColor='#ddd'
			      labelStyle={styles.label}
		      />
		    </View>
		  </ScrollView>
		)
	}
};

const styles = StyleSheet.create({
	drawer: {
		marginTop: Constants.statusBarHeight - 4,
		paddingTop: 0,
		backgroundColor: '#eee',
	},
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  drawerItem: {
  	backgroundColor: 'red'
  },
  label: {
  	fontSize: 20
  },
  iconContainer: {
  	flex: 1,
  	padding: 20,
  	margin: 8
  }
});

export const routesDrawer = {
  todayInHistory: { screen: routesTodayInHistory },
  // happenedSooner: { screen: WhichHappenedSooner },
  // predictions: { screen: FuturePredictions },
  // diary: { screen: Diary },
  favorite: { screen: routesFavorite }, 
  // myAccount: { screen: MyAccount }
}