import React, { Component } from 'react';
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


class FavoriteFacts extends Component {

  _createCardMenuOptions = (fact) => {
    const { removeFavorite } = this.props.screenProps;
    return [
      copy({ content: fact.text }),
      share({ message: fact.text }),
      remove({ onSelect: () => removeFavorite(fact.id, 'facts') })
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