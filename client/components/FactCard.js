import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview'; // not same as webview
import Image from 'react-native-scalable-image';

import CardMenu from './CardMenu';

import { yearsAgo } from '../utils/date';
import { fixWikiLink } from '../utils/link';

import { COLORS } from '../constants/components';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

class FactCard extends PureComponent {

  state = {
    isImageLoaded: false
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isImageLoaded && nextProps.isImgShown) {
      this.setState({ isImageLoaded: true });
    }
  }

  _openFactDetail = () => {
    const { navigation, html, text, links, category, year  } = this.props;
      navigation.navigate('factDetail', { html, text, links, category, year });
  }

  _openFactLink = (url) => {
    url = fixWikiLink(url);
    Linking.openURL(url);
  }

  render() {
    const { year, html, text, img, isImgShown, links,
      category, isFavorite, menuOptions } = this.props;

    return (
      <View style={styles.factCard}>

      {
        (img && (isImgShown || isFavorite)) &&
        <View style={styles.imgContainer}>
          <Image
            resizeMode='cover'
            style={styles.img}
            source={{uri: img}}
            maxHeight={SCREEN_HEIGHT *0.6}
            width={SCREEN_WIDTH}
          />  
        </View>
      }

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <View style={styles.yearsContainer}>
              <Text style={styles.year}>
                { year }
              </Text>
              <View style={styles.yearsAgoContainer}>
                <Text style={styles.yearsAgoText}>
                  { yearsAgo(year) } years ago
                </Text>
              </View>
            </View> 
            <CardMenu options={menuOptions} />
          </View>
          
          <View style={styles.htmlView}>
            <HTMLView 
              value={html}
              RootComponent={Text}
              style={styles.factText}
              stylesheet={htmlViewStyles}
              onLinkPress={(url) => this._openFactLink(url)}
            />
          </View>

          { !isFavorite &&
            <Icon
              name='chevron-double-right'
              type='material-community'
              size={40}
              color={COLORS.actionIcon}
              underlayColor={COLORS.underlayColor}
              style={styles.openDetailIcon}
              onPress={this._openFactDetail}
            /> 
          }
        </View>
        
      </View>
    );
  }
}


const TEXT_COLOR = COLORS.greyDark;

const htmlViewStyles = {
  a: {
      color: COLORS.link,
      fontWeight: 'bold'
  }
}

const styles = StyleSheet.create({
  factCard: {
    flex: 1,
    marginVertical: 4,
    marginBottom: 2,
    borderColor: COLORS.cardBorder,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: COLORS.cardBackground
  },
  cardBody: {
    paddingHorizontal: 8,
    paddingTop: 4,
    justifyContent: 'center',
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
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'monospace'
      }
    })
  },
  yearsAgoContainer: {
    marginLeft: 15
  },
  yearsAgoText: {
    fontSize: 16,
    color: TEXT_COLOR,
    ...Platform.select({
      android: {
        fontFamily: 'monospace'
      }
    })
  },
  htmlView: {
    marginBottom: 2,
    paddingHorizontal: 3
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex: 1
  },
  factText: {
    fontSize: 16,
    color: TEXT_COLOR,
    ...Platform.select({
      ios: {
        fontFamily: 'San Francisco',
      },
      android: {
        fontFamily: 'notoserif'
      },
    }),
  },
  openDetailIcon: {
    alignSelf: 'flex-end'
  },
});


export default FactCard;
