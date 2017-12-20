import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FactCard from '../../components/FactCard';
import FactsLabel from '../../components/TabBarLabels/FactsLabel';
import Favorites from './Favorites';

class FavoriteFacts extends PureComponent {
  static navigationOptions = {
    tabBarLabel: <FactsLabel />
  }

  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  _renderFact = ({item}) => {
    const { mainNavigation } = this.props.screenProps;
    return (
      <FactCard 
        fact={item}
        date={item.date}
        canShowDate={true}
        isFavorite={true}
        navigation={mainNavigation}
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