import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { removeFavorite } from './actions';

import FactCard from '../../components/FactCard';
import FactsLabel from '../../components/TabBarLabels/FactsLabel';
import Favorites from './Favorites';
import { createCardMenuOptions } from './helpers/facts';


class FavoriteFacts extends PureComponent {
  static navigationOptions = {
    tabBarLabel: <FactsLabel />
  }

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