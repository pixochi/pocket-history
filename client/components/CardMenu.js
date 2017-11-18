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


// @param defaultOptions bool - use default options(share, copy, save, remove)
// @param optionProps obj - properties for the default options
// @param options array - any custom options

const CardMenu = ({ options }) => {

	const renderMenuOptions = (options) => {
    return options.map(({onSelect, iconProps, optionText}) => (
      <MenuOption key={optionText} onSelect={onSelect} >
        <View style={styles.optionContainer}>
          <Icon {...iconProps} />
          <View style={styles.optionText}>
            <Text>{optionText}</Text>
          </View>
        </View>
      </MenuOption>
    ));
  }

  return (
    <View style={styles.menuContainer}>
	    <Menu>
	      <MenuTrigger>
	        <Icon 
	          name='options-vertical' 
	          type='simple-line-icon'
	          color='#517fa4' 
	        />
	      </MenuTrigger>
	      <MenuOptions>
	        { renderMenuOptions(options) }
	      </MenuOptions>
	    </Menu>     
	  </View>
  );
  
}

const styles = StyleSheet.create({
	menuContainer: {
    justifyContent: 'flex-end'
  },
  optionContainer: {
    flexDirection: 'row'
  },
  optionText: {
    marginLeft: 10
  }
});


export default CardMenu;