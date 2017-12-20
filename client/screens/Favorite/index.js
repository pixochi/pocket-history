import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
import Header from '../../components/Header';
import MenuIcon from '../../components/MenuIcon';

// ACTIONS
import * as actionCreators from './actions';
import { copyToClipboard } from '../FactDetail/actions';
import { openModal } from '../../components/Modal/actions';

import { COLORS } from '../../constants/components';
import gStyles from '../../styles';

import { RoutesFavGroups } from '../../navigation/favorites';


class Favorite extends PureComponent {

	_openSearchScreen = () => {
    const { navigation } = this.props;
		navigation.navigate('searchFavorite');
	}

  _renderSearchIcon = () => {
    return (
      <Icon 
        name='search'
        color={COLORS.headerIcon}
        underlayColor={COLORS.underlay}
        iconStyle={styles.searchIcon}
        containerStyle={{flex:1}}
        onPress={this._openSearchScreen}
      />
    )
  }

	render(){
		const { removeFavorite, copyToClipboard, navigation } = this.props;
		return (
			<View style={{flex:1}}>
        <Header 
          title='Favorite'
          navigation={navigation}
          leftComponent={<MenuIcon navigation={navigation} />}
          rightComponent={this._renderSearchIcon()}
        />
        <View style={gStyles.screenBody}>
         <RoutesFavGroups screenProps={{ mainNavigation: navigation, copyToClipboard, removeFavorite }} />
        </View>
      </View>			
		)
	}
}

const styles = StyleSheet.create({
  searchIcon: {
    padding: 4
  }
});


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch),
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  },
  openModal: (name) => {
  	dispatch(openModal(name))
  },
});


export default connect(null, mapDispatchToProps)(Favorite);