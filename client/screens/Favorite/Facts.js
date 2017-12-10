import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FactCard from '../../components/FactCard';
import FactsLabel from '../../components/TabBarLabels/FactsLabel';
import Favorites from './Favorites';

import { removeFavorite } from './actions';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';
import { createCardMenuOptions } from './helpers/facts';


class FavoriteFacts extends PureComponent {
  static navigationOptions = {
    tabBarLabel: <FactsLabel />
  }

  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  _cardMenuOptions = (fact) => {
    const { id, text, date, year } = fact;
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    const copyText = `${date}, ${year} - ${text}`;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(copyText)}),
      share({ message: copyText }),
      remove({ onSelect: () => removeFavorite(id, 'facts') })
    ]

    return menuOptions;
  }

  _renderFact = ({item}) => {
    const { navigation } = this.props;
    const { copyToClipboard, removeFavorite } = this.props.screenProps;
    return (
      <FactCard 
        {...item}
        isFavorite={true}
        navigation={navigation}
        menuOptions={this._cardMenuOptions(item)} 
      />
    );
  }

  render() {
    const { facts } = this.props;
    return (
      <Favorites
        data={facts}
        category='facts'
        renderFavorite={this._renderFact}
      />
    );
  }
}

const mapStateToProps = ({ favorite }) => ({
  facts: favorite.facts,
});

export default connect(mapStateToProps)(FavoriteFacts);