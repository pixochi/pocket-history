import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

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
        underlayColor='rgba(0,0,0,.2)'
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