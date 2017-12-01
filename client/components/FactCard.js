import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview'; // not same as webview
import Image from 'react-native-scalable-image';

import CardMenu from './CardMenu';

import { yearsAgo } from '../utils/date';
import { fixWikiLink } from '../utils/link';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

class FactCard extends Component {

  render() {
    const { year, html, text, img, links, category, isFavorite, menuOptions } = this.props;

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
          <CardMenu options={menuOptions} />
        </View>

        {
          img && 
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{uri: img}}
              width={SCREEN_WIDTH - 70}
              maxHeight={SCREEN_HEIGHT/2 - 30}
            />  
          </View>
        }
          
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
            onPress={() => this.props.navigation.navigate('factDetail', { html, text, links, category, year })}
          /> 
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  factCard: {
    flex: 1,
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
  imgContainer: {
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    flex: 1,
  },
  factText: {
    // uncomment when finishing
    // fontSize: 16 
  },
  openDetailIcon: {
    alignSelf: 'flex-end',
  },
});


export default FactCard;
