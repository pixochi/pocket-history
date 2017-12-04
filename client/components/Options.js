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
            style={[styles.separator, styles.optionsContainer]} 
            disabled
          >
            <Text style={styles.separatorText}> Sort </Text>
          </MenuOption>

          <MenuOption 
            style={styles.optionsContainer} 
            onSelect={() => changeFilter({ sort: 'latest' })} 
          >
            <Text> Latest first </Text>
          </MenuOption>
          
          <MenuOption 
            style={styles.optionsContainer} 
            onSelect={() => changeFilter({ sort: 'oldest' })}
          >
            <Text> Oldest first </Text>
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
    paddingVertical: 8
  },
  separator: {
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderBottomColor: '#555'
  },
  separatorText: {
    fontWeight: '500',
    color: '#343'
  }
});


export default Options;