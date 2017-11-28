import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
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
    <View style={{flex:1}}>
      <Text style={styles.title}>
        { title }
       </Text>
    </View>
    )
  }

  render() {
  	const { navigation, title ='', rightComponent, search } = this.props;

    const _center = search ? this._renderSearch() : this._renderTextTitle();

    return (
      <Header
        outerContainerStyles={styles.outerHeaderStyles}
        innerContainerStyles={styles.innerHeaderStyles}
        backgroundColor='#ff0000'
      >
        <View style={styles.innerHeaderStyles}>
          <View style={{flex:1}}><MenuIcon navigation={navigation}/></View>
          <View style={styles.center}>{_center}</View>
          <View style={styles.rightComponent}>{rightComponent}</View>
        </View>
        
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  outerHeaderStyles: {
    position: 'absolute', 
    zIndex:10000,    
  },
  innerHeaderStyles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    height: 35
  },
  center: {
    flex:10,
    marginLeft: 17,
    marginRight: 10
  },
	title: {
    flex: 1,
    textAlign: 'center',
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
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
  rightComponent: {
    flex:1,
    alignSelf: 'center'
  }
});


export default AppHeader;