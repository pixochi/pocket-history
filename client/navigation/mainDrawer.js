import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Constants } from 'expo';

import { RoutesFavorites } from './favorites';
import { RoutesTodayInHistory } from './todayInHistory';
import About from '../screens/About';
import WhichHappenedSooner from '../screens/WhichHappenedSooner';

import { COLORS } from '../constants/components'

export class DrawerContent extends PureComponent {
	render() {
		return (
			<ScrollView style={styles.drawer}>
		    <View style={styles.drawerContent} forceInset={{ top: 'always', horizontal: 'never' }}>
		      <DrawerItems 
			      {...this.props}
			      inactiveTintColor='#444'
			      activeTintColor='#fff'
			      activeBackgroundColor={ COLORS.yellowDark }
			      inactiveBackgroundColor='#fff'
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
		backgroundColor: '#fff',
	},
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
  	fontSize: 20
  }
});

export const routesDrawer = {
  todayInHistory: { screen: RoutesTodayInHistory },
  happenedSooner: { screen: WhichHappenedSooner },
  favorite: { screen: RoutesFavorites }, 
  about: { screen: About }
}