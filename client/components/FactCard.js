import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview'; // not same as webview
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import hash from 'string-hash';

import CardMenu from './CardMenu';

import { addFavorite, removeFavorite } from '../screens/Favorite/actions';
import { copyToClipboard } from '../screens/FactDetail/actions';
import { copy, share, save, remove } from './utils/cardMenuOptions';

import { yearsAgo, factDateToNumbers } from '../utils/date';
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
    const { fact, navigation, category } = this.props;
    const { html, text, links, year } = fact;
    navigation.navigate('factDetail', { 
      navigatedFrom: navigation.state.routeName,
      html, 
      text, 
      links, 
      category, 
      year,
    }); 
  }

  _openFactLink = (url) => {
    url = fixWikiLink(url);
    WebBrowser.openBrowserAsync(url);
  }

  _addFactToFavorite = (fact) => {
    const { addFavorite } = this.props;
    let { date } = this.props;
    if (!fact.date) {
      // date e.g. October 17
      const { day, month } = factDateToNumbers(date);
      date = `${month+1}/${day}`;
    }
    const id = hash(fact.html+fact.year);
    const favoriteFact = { ...fact, date, id }
    addFavorite(favoriteFact, 'facts');
  }

  _cardMenuOptions = (fact) => {
    if (!fact) { return null; }
    const { text, year, id } = fact;
    const { copyToClipboard, removeFavorite, isFavorite, date } = this.props;
    const copyText = `${date}, ${year} - ${text}`;
    let options = [
      copy({ onSelect: () => copyToClipboard(copyText)}),
      share({ message: copyText }),    
    ]
    if (isFavorite && id) {
      options.push(remove({ onSelect: () => removeFavorite(id) }));
    } else {
      options.push(save({ onSelect: () => this._addFactToFavorite(fact) }));
    }
    return options;
  }

  render() {
    const { fact, date, isImgShown, category, isFavorite,
     canShowDetail, canShowDate } = this.props;
    const { year, html, text, img, links } = fact;

    return (
      <View style={styles.factCard}>

      {
        (img && (isImgShown || isFavorite)) &&
        <TouchableOpacity 
          activeOpacity={0.8}   
          onPress={this._openFactDetail}
          style={styles.imgContainer} 
        >
          <Image
            resizeMode='cover'
            style={styles.img}
            source={{uri: img}}
            maxHeight={SCREEN_HEIGHT *0.6}
            width={SCREEN_WIDTH}
          />  
        </TouchableOpacity>
      }

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <View style={styles.yearsContainer}>
              <Text style={styles.year}>
                { year }
              </Text>
              { canShowDate &&
                <Text style={styles.yearsAgoText}>
                  /{ date }
                </Text>
              }
              <View style={styles.yearsAgoContainer}>
                { year && 
                  <Text style={styles.yearsAgoText}>
                    { yearsAgo(year) } years ago
                  </Text>
                }
              </View>
            </View>
            {
              canShowDetail &&
              <CardMenu options={this._cardMenuOptions(fact)} />
            }
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
          {
            canShowDetail &&
            <Icon
              name='chevron-double-right'
              type='material-community'
              size={40}
              color={COLORS.actionIcon}
              underlayColor={COLORS.underlay}
              style={styles.openDetailIcon}
              onPress={this._openFactDetail}
            />     
          }      
        </View>
        
      </View>
    );
  }
}

FactCard.propTypes = {
  fact: PropTypes.object,
  canShowDetail: PropTypes.bool,
  category: PropTypes.string,
  isFavorite: PropTypes.bool,
  isImgShown: PropTypes.bool,
  menuOptions: PropTypes.arrayOf(PropTypes.object),
}

FactCard.defaultProps = {
  canShowDetail: true,
  isFavorite: false,
  isImgShown: false,
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
    marginVertical: 5,
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

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (fact) => dispatch(addFavorite(fact, 'facts')),
  removeFavorite: (id) => dispatch(removeFavorite(id, 'facts')),
  copyToClipboard: (content) => dispatch(copyToClipboard(content))
});

export default connect(null, mapDispatchToProps)(FactCard);