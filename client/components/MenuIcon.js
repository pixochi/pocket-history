import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

const MenuIcon = ({ navigation }) => {
        return (
                <Icon
                        name='menu'
                        iconStyle={{marginRight: 15}}
                        onPress={() => navigation.navigate('DrawerOpen')}
                />
        )
}

export default MenuIcon;