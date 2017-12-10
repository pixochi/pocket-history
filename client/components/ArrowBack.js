import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLORS } from '../constants/components';


class ArrowBack extends PureComponent {
	
  static propTypes = {
    navigation: PropTypes.object,
    onPress: PropTypes.func
  }

	_goBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
	}

  render() {
    const { onPress } = this.props;
    const _onPress = onPress ? onPress : this._goBack;

    return (
    	<Icon
    		name='keyboard-arrow-left'
    		type='material-icon'
    		size={40}
    		color={COLORS.headerIcon}
    		underlayColor={COLORS.underlay}
    		onPress={_onPress}
    		iconStyle={styles.arrowBack}
    		containerStyle={{flex:1}}
    	/>
    );
  }
}

const styles = StyleSheet.create({
	arrowBack: {
		padding: 4
	}
});


export default ArrowBack;