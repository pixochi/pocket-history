import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

const MenuIcon = (props) => {
  const { navigation } = props.screenProps ? props.screenProps : props;
  const { iconStyle, containerStyle = styles.containerStyle } = props;
  return (
    <Icon
      name='menu'
      color= '#fff'
      size={30}
      underlayColor='rgba(0,0,0,0)'
      iconStyle={iconStyle}
      containerStyle={containerStyle}
      onPress={() =>{ navigation.navigate('DrawerOpen')}}
    />
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  iconStyle: {

  }
});

export default MenuIcon;