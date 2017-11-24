import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Header } from 'react-native-elements';

import MenuIcon from './MenuIcon';


class AppHeader extends Component {
  render() {
  	const { navigation, title, rightComponent } = this.props;

    return (
      <Header
        outerContainerStyles={{position: 'absolute', zIndex:10000}}
        backgroundColor='red'
        leftComponent={<MenuIcon navigation={navigation} />}
        centerComponent={{ text: title, style: styles.title }}
        rightComponent={rightComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
	title: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
	}
});


export default AppHeader;