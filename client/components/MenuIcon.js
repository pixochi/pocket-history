import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

import { COLORS } from '../constants/components';

class MenuIcon extends PureComponent {
  render() {
    const { props } = this;
    const { navigation } = props.screenProps ? props.screenProps : props;
    const { iconStyle, containerStyle = styles.containerStyle } = props;

    return (
      <Icon
        name='menu'
        color= '#fff'
        size={30}
        underlayColor={COLORS.underlay}
        iconStyle={iconStyle}
        containerStyle={containerStyle}
        onPress={() =>{ navigation.navigate('DrawerOpen')}}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  iconStyle: {
    padding: 4
  }
});

export default MenuIcon;