import React, { PureComponent } from 'react';
import { View, Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFavorite } from '../Favorite/actions';
import { changeRoute } from '../../navigation/actions';
import { copyToClipboard } from './actions';
import { showInterstitial } from '../../components/AdMob/actions';

import Header from './Header';
import { RoutesFactDetail } from '../../navigation/factDetail';


class FactDetail extends PureComponent {

	componentDidMount() {
    if (Platform.OS === 'android') {
	    this.backBtnListener = BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
    	this.backBtnListener.remove();
    }
  }

	componentDidUpdate(prevProps, prevState) {
	  const { showInterstitial, adMobCounter } = this.props;
	  if (adMobCounter === 10) {
	  	showInterstitial('factDetailCounter');
	  }
	}

	_handleBackButtonPress = () => {
		const { navigation } = this.props;
		const { navigatedFrom } = navigation.state.params;
		if (navigatedFrom && navigatedFrom !== 'todayInHistory') {
			navigation.navigate(navigatedFrom);
			return true;
		}
		navigation.goBack();
		return true;
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

FactDetail.propTypes = {
	adMobCounter: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  showInterstitial: PropTypes.func.isRequired,
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
