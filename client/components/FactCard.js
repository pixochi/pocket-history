import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Clipboard,
  Share,
  Linking
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

import { yearsAgo } from '../utils/date';
import { fixWikiLink } from '../utils/link';


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
    const { year, html, text, links } = this.props;
    
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
                { yearsAgo(year) } years ago
              </Text>
            </View>
          </View>
          
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
                { this._renderMenuOptions(options) }
              </MenuOptions>
            </Menu>     
          </View>
             
        </View>
          
        <HTMLView 
          value={html}
          RootComponent={Text}
          style={styles.factText}
          onLinkPress={(url) => Linking.openURL(fixWikiLink(url))}
        />

        <Icon 
          name='chevron-double-right'
          type='material-community'
          size={40}
          color='#517fa4'
          style={styles.openDetailIcon}
          containerStyle={{ width: 50}}
          onPress={() => this.props.navigation.navigate('factDetail', { text, links })}
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  factCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B351E1',
    borderRadius: 3,
    margin: 6,
    padding: 8
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
  },
  factText: {
    // uncomment when finishing
    // fontSize: 18 
  }
});


export default FactCard;
