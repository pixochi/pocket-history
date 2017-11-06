import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Clipboard,
  Share
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';


class FactCard extends PureComponent {

  _renderMenuOptions(options) {
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

  _copyToClipboard(content) {
    Clipboard.setString(content);
  }

  _shareFact(message) {
    Share.share({ title: 'Pocket History', message });
  }

  render() {
    const { year, html, text } = this.props;
    const currentYear = new Date().getFullYear();

    const  options = [
      {
        onSelect: () => this._shareFact(text),
        iconProps: { name: 'share' },
        optionText: 'Share'
      },
      {
        onSelect: () => null,
        iconProps: { name: 'star' },
        optionText: 'Save'
      },
      {
        onSelect: () => this._copyToClipboard(text),
        iconProps: { name: 'clipboard', type: 'font-awesome' },
        optionText: 'Copy'
      }
    ]

    return (
      <View style={styles.factCard}>

        <View style={styles.cardHeader}>

          <View style={styles.yearsContainer}>
            <Text style={styles.year}>
              { year }
            </Text>
            <View style={{marginLeft: 15}}>
              <Text>
                { currentYear - year } years ago
              </Text>
            </View>
          </View>
          
          <View style={styles.menuContainer}>
            <Menu>
              <MenuTrigger>
                <Icon name='options-vertical' type='simple-line-icon' />
              </MenuTrigger>
              <MenuOptions>
                { this._renderMenuOptions(options) }
              </MenuOptions>
            </Menu>     
          </View>
             
        </View>
          
        <HTMLView 
          value={html}
          RootComponent={Text}
          style={styles.factText}
        />

        <Icon 
          name='arrow-right-bold-circle'
          type='material-community'
          size={30}
          style={styles.openDetailIcon} 
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  factCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B351E1',
    borderRadius: 3,
    margin: 4,
    padding: 4
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  yearsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  year: {
    fontSize: 21,  
  },
  menuContainer: {
    justifyContent: 'flex-end'
  },
  optionContainer: {
    flexDirection: 'row'
  },
  optionText: {
    marginLeft: 10
  },
  openDetailIcon: {
    alignSelf: 'flex-end',
  }

});


export default FactCard;
