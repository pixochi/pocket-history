import React, { PureComponent } from 'react';
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

import { COLORS } from '../constants/components';


class Options extends PureComponent {
  render() {
    const { changeFilter } = this.props;
    
    return (
      <Menu> 
        <MenuTrigger style={styles.triggerContainer}>
          <Icon 
            name='options-vertical' 
            type='simple-line-icon'
            color='#fff'
            style={styles.triggerIcon}
          />
        </MenuTrigger>

        <MenuOptions>

          <MenuOption 
            style={styles.separator} 
            disabled
          >
            <Text style={styles.separatorText}> Sort </Text>
          </MenuOption>

          <MenuOption 
            style={styles.optionsContainer} 
            onSelect={() => changeFilter({ sort: 'latest' })} 
          >
            <Text style={styles.optionText}> Latest first </Text>
          </MenuOption>
          
          <MenuOption 
            style={styles.optionsContainer} 
            onSelect={() => changeFilter({ sort: 'oldest' })}
          >
            <Text style={styles.optionText}> Oldest first </Text>
          </MenuOption>

        </MenuOptions>
      </Menu>     
    );
  } 
}

const styles = StyleSheet.create({
  triggerContainer: {
    position: 'relative',
    left: 2,
    padding: 2
  },
  triggerIcon: {
    padding: 4,
    alignSelf: 'center'
  },
  optionsContainer: {
    paddingLeft: 8,
    paddingVertical: 14
  },
  optionText: {
    fontSize: 15,
    color: COLORS.greyDark
  },
  separator: {
    paddingVertical: 7,
    paddingLeft: 8,
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderBottomColor: COLORS.cardBorder
  },
  separatorText: {
    fontWeight: '500',
    color: COLORS.greyDark
  }
});


export default Options;