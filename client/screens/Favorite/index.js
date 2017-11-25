import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// SCREENS
import FavoriteFacts from './Facts';
import FavoriteArticles from './Articles';
import FavoriteBooks from './Books';
import FavoriteVideos from './Videos';

import Options from '../../components/Options';
import Header from '../../components/Header';
import MenuIcon from '../../components/MenuIcon';
import Modal from '../../components/Modal';


import { removeFavorite, changeFavoritesFilter } from './actions';
import { copyToClipboard } from '../FactDetail/actions';
import { openModal } from '../../components/Modal/actions';

import gStyles from '../../styles';


const FavNavigator = StackNavigator({
	favorite: { 
		screen: TabNavigator({
			  facts: { screen: FavoriteFacts },
			  articles: { screen: FavoriteArticles },
			  books: { screen: FavoriteBooks },
			  videos: { screen: FavoriteVideos }
			}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false }
		)
	}
},{ navigationOptions: (props) => ({
			header: null
	})
}); 

class Favorite extends Component {

	_openFilter = () => {
		this.props.openModal('favoritesFilter');
	}

	render(){
		const { removeFavorite, changeFilter, filter, copyToClipboard, navigation } = this.props;
		return (

			 <View style={{flex:1}}>
        <Header 
          title='Favorite'
          navigation={navigation}
          rightComponent={<Options onPress={this._openFilter} />}
        />
        <View style={gStyles.screenBody}>
         <FavNavigator screenProps={{removeFavorite, copyToClipboard, navigation}} />

         <Modal name='favoritesFilter' modalStyle={{flex:1}}>
            <View style={{flex:1}}>
               <SearchBar
                  value={filter.search}
                  onChangeText={(text) => changeFilter({ search: text })}
                  onClearText={() => changeFilter({ search: '' })}
                  placeholder='Type Here...' 
                />
            </View>
          </Modal>
        </View>
      </View>


			
		)
	}
}

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