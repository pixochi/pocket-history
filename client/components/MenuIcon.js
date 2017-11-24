import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

const MenuIcon = (props) => {
  const { navigation } = props.screenProps ? props.screenProps : props;
  return (
    <Icon
      name='menu'
      color= '#fff'
      underlayColor='rgba(0,0,0,0)'
      iconStyle={{marginRight: 15}}
      onPress={() =>{ navigation.navigate('DrawerOpen')}}
    />
  )
}

export default MenuIcon;