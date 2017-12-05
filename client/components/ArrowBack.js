import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { COLORS } from '../constants/components';


class ArrowBack extends PureComponent {
	

	_goBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
	}

  render() {
    return (
      	<Icon
      		name='keyboard-arrow-left'
      		type='material-icon'
      		size={40}
      		color={COLORS.actionIcon}
      		underlayColor={COLORS.headerIconUnderlay}
      		onPress={this._goBack}
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