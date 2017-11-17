import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking
} from 'react-native';
import HTMLView from 'react-native-htmlview'; // not same as webview
import { Icon } from 'react-native-elements';

import CardMenu from './CardMenu';

import { yearsAgo } from '../utils/date';
import { fixWikiLink } from '../utils/link';


class FactCard extends PureComponent {

  render() {
    const { year, html, text, links, isFavorite } = this.props;
    const fact = { text, year, html }

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
          
          {/* PLACE FOR MENU */}
          { this.props.children }

        </View>
          
        <HTMLView 
          value={html}
          RootComponent={Text}
          style={styles.factText}
          onLinkPress={(url) => Linking.openURL(fixWikiLink(url))}
        />

        { !isFavorite && 
          <Icon 
            name='chevron-double-right'
            type='material-community'
            size={40}
            color='#517fa4'
            style={styles.openDetailIcon}
            containerStyle={{ width: 50}}
            onPress={() => this.props.navigation.navigate('factDetail', { text, links })}
          /> 
        }

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
  factText: {
    // uncomment when finishing
    // fontSize: 18 
  },
  openDetailIcon: {
    alignSelf: 'flex-end',
  },
});


export default FactCard;
