import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { addFavorite } from '../Favorite/actions';
import { copyToClipboard } from './actions';
import { changeRoute } from '../../navigation/actions';

import Header from './Header';
import { RoutesFactDetail } from '../../navigation/factDetail';


class FactDetail extends PureComponent {

	_onNavigationStateChange = (prevState, nextState, action) => {
    const { changeRoute } = this.props;
    changeRoute(action.routeName);
  }

	render() {
		const { addFavorite, copyToClipboard, navigation, changeRoute } = this.props;
		return (
			<View style={{flex: 1}}>
				<Header navigation={navigation} changeRoute={changeRoute} />
				<RoutesFactDetail 
					screenProps={{addFavorite, copyToClipboard, navigation}}
					onNavigationStateChange={this._onNavigationStateChange}
				/>
			</View>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  },
  changeRoute: (route) => {
  	dispatch(changeRoute(route));
  }
});


export default connect(null, mapDispatchToProps)(FactDetail);
