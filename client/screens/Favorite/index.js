import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

// COMPONENTS
import Options from '../../components/Options';
import Header from '../../components/Header';
import MenuIcon from '../../components/MenuIcon';
import Modal from '../../components/Modal';

// ACTIONS
import { removeFavorite, changeFavoritesFilter } from './actions';
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
        underlayColor={COLORS.headerIconUnderlay}
        iconStyle={styles.searchIcon}
        containerStyle={{flex:1}}
        onPress={this._openSearchScreen}
      />
    )
  }

	render(){
		const { removeFavorite, changeFilter, filter, copyToClipboard, navigation } = this.props;
		return (
			<View style={{flex:1}}>
        <Header 
          title='Favorite'
          navigation={navigation}
          leftComponent={<MenuIcon navigation={navigation} />}
          rightComponent={this._renderSearchIcon()}
        />
        <View style={gStyles.screenBody}>
         <RoutesFavGroups screenProps={{removeFavorite, copyToClipboard, navigation}} />
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

const mapStateToProps = ({favorite}) => {
	const { facts, articles, books, videos, filter } = favorite;
	return {
		filter
	}
}

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (item, category) => {
    dispatch(removeFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  },
  openModal: (name) => {
  	dispatch(openModal(name))
  },
  changeFilter: (filter) => {
  	dispatch(changeFavoritesFilter(filter));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Favorite);