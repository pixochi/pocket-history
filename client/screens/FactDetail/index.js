import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';

// SCREENS
import Articles from './Articles';
import Books from './Books';
import Videos from './Videos';

import { addFavorite } from '../Favorite/actions';


const FactDetailNav = TabNavigator({
  articles: { screen: Articles },
  books: { screen: Books },
  videos: { screen: Videos },
}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false });

class FactDetail extends Component {
	render() {
		const { addFavorite, navigation } = this.props;
		return (
			<FactDetailNav screenProps={{addFavorite, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  }
});


export default connect(null, mapDispatchToProps)(FactDetail);
