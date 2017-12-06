// REACT
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerNavigator} from 'react-navigation';
import { Constants } from 'expo';

import { routesDrawer, DrawerContent } from './navigation/mainDrawer';


export default class MainNavigator extends PureComponent {
  render() {
  	const MainNavigator = DrawerNavigator(routesDrawer, {
      contentComponent: DrawerContent
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
