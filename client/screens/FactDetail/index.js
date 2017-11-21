import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';

// SCREENS
import Articles from './Articles';
import Books from './Books';
import Videos from './Videos';
import Timeline from './Timeline';

import { addFavorite } from '../Favorite/actions';
import { copyToClipboard } from './actions';


const FactDetailNav = TabNavigator({
  articles: {  screen: Articles },
  books: { screen: Books },
  videos: { screen: Videos },
  timeline: { screen: Timeline }
}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false });

class FactDetail extends Component {
	render() {
		const { addFavorite, copyToClipboard, navigation } = this.props;
		return (
			<FactDetailNav screenProps={{addFavorite, copyToClipboard, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  }
});


export default connect(null, mapDispatchToProps)(FactDetail);
