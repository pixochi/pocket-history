import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyFavorites from '../../components/EmptyFavorites';


class Favorites extends PureComponent {

  render() {
    const { data, category, renderFavorite } = this.props;

    if (!data.length) {
      return (
        <EmptyFavorites
          message={`No ${category} found.`}
        />
      );
    }

    return (
      <View style={styles.listContainer}>
      	<FlatList
          data = {data}
          extraData = {data}
          keyExtractor = {(item) => item.id}
          renderItem = {renderFavorite}
          initialNumToRender={8}
        />
      </View>
    );
  }
}

Favorites.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  renderFavorite: PropTypes.func,
}

Favorites.defaultProps = {
  category: 'favorites'
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
});

const mapStateToProps = ({ account }) => ({
  user: account.user
});


export default connect(mapStateToProps)(Favorites);