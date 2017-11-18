import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import EmptyFavorites from '../../components/EmptyFavorites';


class Favorites extends Component {

  render() {
    const { data, user, renderFavorite } = this.props;

    if (!data || !data.length) {
      return (
        <EmptyFavorites 
          message='No favorites yet.'
          loggedIn={user && user.id}
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