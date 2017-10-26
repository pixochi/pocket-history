// REACT
import React, { Component } from 'react';

// STATE MANAGEMENT
import { Provider } from 'react-redux';
import store from './store';

// COMPONENTS
import MainNavigator from './MainNavigator';


export default class App extends Component {
        render() {
                return (
                        <Provider store={store}>
                                        <MainNavigator />
                        </Provider>
                );
        }
}
