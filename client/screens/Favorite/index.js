import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// SCREENS
import FavoriteFacts from './Facts';
import FavoriteArticles from './Articles';
import FavoriteBooks from './Books';
import FavoriteVideos from './Videos';
import SearchScreen from './SearchScreen';

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


const FavNavigator = StackNavigator({
	favorite: { 
		screen: TabNavigator({
			  facts: { screen: FavoriteFacts },
			  articles: { screen: FavoriteArticles },
        videos: { screen: FavoriteVideos },
			  books: { screen: FavoriteBooks }, 
			}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false }
		),
	}
},{ navigationOptions: {
			header: null,
      drawerIcon: ({tintColor}) => <Icon name='home' color={tintColor} size={28} />
	}
}); 

class Favorite extends PureComponent {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => <Icon name='home' color={tintColor} size={28} />
  };

	_openSearchScreen = () => {
    const { navigation } = this.props;
		navigation.navigate('searchFavorite');
	}

  _renderSearchIcon = () => {
    return (
      <Icon 
        name='search'
        color={COLORS.actionIcon}
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
          rightComponent={this._renderSearchIcon()}
        />
        <View style={gStyles.screenBody}>
         <FavNavigator screenProps={{removeFavorite, copyToClipboard, navigation}} />
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