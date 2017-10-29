// REACT
import React, { Component } from 'react';
import { View } from 'react-native';

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
	        <MainNavigator />
	      </Provider>
	  	);
  	}
  	return <View />
  }

}
