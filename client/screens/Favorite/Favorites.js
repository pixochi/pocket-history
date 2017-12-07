import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import EmptyFavorites from '../../components/EmptyFavorites';


class Favorites extends PureComponent {

  render() {
    const { data, category = 'favorites', renderFavorite } = this.props;

    if (!data.length) {
      return (
        <EmptyFavorites
          message={`No ${category} saved.`}
        />
      );
    }

    return (
      <View style={styles.listContainer}>
      	<FlatList
          contentContainerStyle={styles.list}
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

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  list: {
    padding: 4
  }
});

const mapStateToProps = ({ account }) => ({
  user: account.user
});


export default connect(mapStateToProps)(Favorites);