// REACT
import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { MenuContext } from 'react-native-popup-menu';
import { Toast } from 'react-native-redux-toast';

import { registerForPushNotificationsAsync } from './utils/notifications';

// STATE MANAGEMENT
import { Provider } from 'react-redux';
import configureStore from './store';

// COMPONENTS
import MainNavigator from './MainNavigator';

import { COLORS } from './constants/components';

export default class App extends Component {
	state = {
		store: null
	}

	async componentWillMount() {
	  await configureStore.then(store => {
	  	this.setState({ store });
	  }).catch(e => console.log(e));

	  registerForPushNotificationsAsync();
	}

  render() {
  	const { store } = this.state;
  	if (store) {
  		return (
	      <Provider store={store}>
	      	<MenuContext backHandler={true}>
	      		<Toast 
	      			messageStyle={styles.toastMessage} 
	      			containerStyle={styles.toastContainer}
	      		/>
	        	<MainNavigator />
	        </MenuContext>
	      </Provider>
	  	);
  	}
  	return <View />
  }
}

const styles = StyleSheet.create({
	toastContainer: {
		backgroundColor: COLORS.yellowDark
	},
	toastMessage: {
		padding: 2,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff'
	}
});
