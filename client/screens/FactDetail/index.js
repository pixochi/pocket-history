import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';

// SCREENS
import Articles from './Articles';
import Books from './Books';
import Videos from './Videos';

import { addToFavorite } from '../Favorite/actions';


const FactDetailNav = TabNavigator({
  articles: { screen: Articles },
  books: { screen: Books },
  videos: { screen: Videos },
}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false });

class FactDetail extends Component {
	render() {
		const { addToFavorite, navigation } = this.props;
		return (
			<FactDetailNav screenProps={{addToFavorite, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  addToFavorite: (item, category) => {
    dispatch(addToFavorite(item, category));
  }
});


export default connect(null, mapDispatchToProps)(FactDetail);
