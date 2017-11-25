// REACT
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { MenuContext } from 'react-native-popup-menu';
import { Toast } from 'react-native-redux-toast';

// STATE MANAGEMENT
import { Provider } from 'react-redux';
import configureStore from './store';

// COMPONENTS
import MainNavigator from './MainNavigator';


export default class App extends Component {
	state = {
		store: null
	}

	async componentWillMount() {
	  await configureStore.then(store => {
	  	this.setState({ store });
	  }).catch(e => console.log(e));
	}

  render() {
  	const { store } = this.state;
  	if (store) {
  		return (
	      <Provider store={store}>
	      	<MenuContext backHandler={true}>
	      		<Toast messageStyle={{ color: 'white' }} />
	        	<MainNavigator />
	        </MenuContext>
	      </Provider>
	  	);
  	}
  	return <View />
  }

}
