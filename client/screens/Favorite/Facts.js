import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import { removeFavorite } from './actions';

import Favorites from './Favorites';
import FactCard from '../../components/FactCard';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';


class FavoriteFacts extends PureComponent {

  _createCardMenuOptions = ({id, text}) => {
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    return [
      copy({ onSelect: () => copyToClipboard(text)}),
      share({ message: text }),
      remove({ onSelect: () => removeFavorite(id, 'facts') })
    ]
  }

  _renderFact = ({item}) => {
    const { navigation } = this.props;
    return (
      <FactCard 
        {...item}
        isFavorite={true}
        navigation={navigation}
        menuOptions={this._createCardMenuOptions(item)} 
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