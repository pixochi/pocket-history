import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AdMobBanner } from 'expo';
import PropTypes from 'prop-types';


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
	      adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
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