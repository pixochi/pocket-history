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
import { createCardMenuOptions } from './helpers/facts';


class FavoriteFacts extends PureComponent {

  _renderFact = ({item}) => {
    const { navigation } = this.props;
    const { copyToClipboard, removeFavorite } = this.props.screenProps;
    return (
      <FactCard 
        {...item}
        isFavorite={true}
        navigation={navigation}
        menuOptions={createCardMenuOptions(item, copyToClipboard, removeFavorite)} 
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