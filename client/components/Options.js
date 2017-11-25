import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon, Button, Slider } from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Options = ({ changeFilter }) => {
  return (
    <Menu> 
      <MenuTrigger>
        <Icon 
          name='options-vertical' 
          type='simple-line-icon'
          color='#fff'
        />
      </MenuTrigger>

      <MenuOptions>

        <MenuOption disabled>
           <Text>
             Sort
           </Text>
        </MenuOption>

        <MenuOption onSelect={() => changeFilter({ sort: 'latest' })} >
          <Text>
            Latest first
          </Text>
        </MenuOption>
        
        <MenuOption onSelect={() => changeFilter({ sort: 'oldest' })}>
          <Text>
            Oldest first
          </Text>
        </MenuOption>

      </MenuOptions>
    </Menu>     
  ); 
}

const styles = StyleSheet.create({

});


export default Options;