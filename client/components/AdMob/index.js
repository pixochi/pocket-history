import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AdMobBanner } from 'expo';
import PropTypes from 'prop-types';

import CONFIG from '../../constants/config';

class Banner extends PureComponent {

	static propTypes = {
	  style: PropTypes.object,
	  size: PropTypes.string
	}

	static defaultProps = {
	  size: 'mediumRectangle'
	}

  render() {
  	const { style, size } = this.props;
    return (
      <AdMobBanner
	      bannerSize={size}
	      adUnitID={CONFIG.common.adMob.testBanner} // Test ID, Replace with your-admob-unit-id
	      testDeviceID="EMULATOR"
	      style={[bannerStyle, style]}
	    />
    );
  }
}

const bannerStyle = {
	flex: 1,
	alignSelf: 'center',
};


export default Banner;