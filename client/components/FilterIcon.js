import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

const FilterIcon = (props) => {
  return (
    <Icon
      color='white'
      underlayColor='rgba(0,0,0,0)'
      name='search'
      type='material-icons'
      onPress={props.onPress}
    />
  )
}

const styles = StyleSheet.create({

});


export default FilterIcon;