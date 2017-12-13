import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFavorite } from '../Favorite/actions';
import { changeRoute } from '../../navigation/actions';
import { copyToClipboard } from './actions';
import { showInterstitial } from '../../components/AdMob/actions';

import Header from './Header';
import { RoutesFactDetail } from '../../navigation/factDetail';


class FactDetail extends PureComponent {

	static propTypes = {
		adMobCounter: PropTypes.number.isRequired,
	  navigation: PropTypes.object.isRequired,
	  changeRoute: PropTypes.func.isRequired,
	  copyToClipboard: PropTypes.func.isRequired,
	  addFavorite: PropTypes.func.isRequired,
	  showInterstitial: PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps, prevState) {
	  const { showInterstitial, adMobCounter } = this.props;
	  if (adMobCounter === 9) {
	  	showInterstitial('factDetailCounter');
	  }
	}

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

const mapStateToProps = ({adMob}) => ({
	adMobCounter: adMob.factDetailCounter
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  },
  changeRoute: (route) => {
  	dispatch(changeRoute(route));
  },
  showInterstitial: (counterName) => {
  	dispatch(showInterstitial(counterName));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FactDetail);
