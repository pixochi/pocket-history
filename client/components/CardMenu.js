import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { COLORS } from '../constants/components';


// @param defaultOptions bool - use default options(share, copy, save, remove)
// @param optionProps obj - properties for the default options
// @param options array - any custom options

class CardMenu extends PureComponent {

	_renderMenuOptions = (options) => {
    return options.map(({onSelect, iconProps, optionText}) => (
      <MenuOption key={optionText} onSelect={onSelect} >
        <View style={styles.optionContainer}>
          <Icon color={COLORS.greyDark} {...iconProps} />
          <View style={styles.optionText}>
            <Text>{optionText}</Text>
          </View>
        </View>
      </MenuOption>
    ));
  }

  render() {
    const { options } = this.props;
    return (
      <View style={styles.menuContainer}>
        <Menu>
          <MenuTrigger style={styles.trigger}>
            <Icon 
              name='options-vertical' 
              type='simple-line-icon'
              color={COLORS.actionIcon}
              iconStyle={styles.triggerIcon}
              containerStyle={{flex:1}}
            />
          </MenuTrigger>
          <MenuOptions>
            { this._renderMenuOptions(options) }
          </MenuOptions>
        </Menu>     
      </View>
    );  
  }
}

const styles = StyleSheet.create({
	menuContainer: {
    justifyContent: 'flex-end'
  },
  optionContainer: {
    flexDirection: 'row',
    paddingLeft: 5
  },
  optionText: {
    paddingLeft: 15
  },
  trigger: {
    flex: 1
  },
  triggerIcon: {
    padding: 4
  }
});


export default CardMenu;