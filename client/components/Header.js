import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import { Header, SearchBar } from 'react-native-elements';

import MenuIcon from './MenuIcon';


class AppHeader extends PureComponent {

  _renderSearch = () => {
    const { search } = this.props;
     return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search.value}
          onChangeText={search.onChangeText}
          placeholder={search.placeholder}
          underlineColorAndroid='transparent'
        />
      </View>
    )
  }

  _renderTextTitle = () => {
    const { title } = this.props;
    return (
      <Text style={styles.title}>
        { title }
      </Text>
    )
  }

  _renderLeftComponent = () => {
    const { navigation } = this.props;
    return (
      <MenuIcon navigation={navigation} />
    )
  }

  render() {
  	const { rightComponent, leftComponent, search } = this.props;
    const _leftComponent = leftComponent ? leftComponent : this._renderLeftComponent();
    const _centerComponent = search ? this._renderSearch() : this._renderTextTitle();

    return (
      <Header
        outerContainerStyles={styles.outerHeaderStyles}
        innerContainerStyles={styles.innerHeaderStyles}
        backgroundColor='#33B38E'
      >
      
        <View style={styles.headerItemsContainer}>
          <View style={styles.leftComponent}>{_leftComponent}</View>
          <View style={styles.center}>{_centerComponent}</View>
          <View style={styles.rightComponent}>{rightComponent}</View>
        </View>
        
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  outerHeaderStyles: {
    zIndex:10000,
    borderBottomWidth: 0,
    alignItems: 'center',
    paddingTop: 0
  },
  innerHeaderStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  headerItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
    // height: 35
  },
  center: {
    flex: 5,
    padding: 4
  },
	title: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 5,
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontFamily: 'AmericanTypewriter-Condensed'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
	},
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal:10,
    backgroundColor: 'white',  
    borderRadius:5
  },
  leftComponent: {
    flex: 1,
    alignContent: 'center'
    // alignSelf: 'center'
  },
  rightComponent: {
    flex:1,
    alignContent: 'center'
  }
});


export default AppHeader;