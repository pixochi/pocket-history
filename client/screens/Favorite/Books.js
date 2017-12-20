import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { openModal } from '../../components/Modal/actions';

import BookCard from '../../components/BookCard';
import BooksLabel from '../../components/TabBarLabels/BooksLabel';
import BookModal from '../../components/BookModal';
import Favorites from './Favorites';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';

class FavoriteBooks extends PureComponent {
  static navigationOptions = {
    tabBarLabel: <BooksLabel />
  }

  state = {}

  _cardMenuOptions = ({id, title, previewLink}) => {
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    const shareText = `${title} - ${previewLink}`
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(shareText)}),
      share({ message: shareText }),
      remove({ onSelect: () => removeFavorite(id, 'books') })
    ]
    return menuOptions;
  }

  _onBookPress = (bookDescription) => {
    this.setState({ bookDescription }, () => this.props.openModal('factBook'));
  }

  _renderBook = ({item}) => {
    return (
      <BookCard 
        book={item}
        onBookPress={this._onBookPress}
        menuOptions={this._cardMenuOptions(item)}
      />
    );
  }

  render() {
   const { books } = this.props;
   const { bookDescription = "Sorry, we couldn't find a description for the selected book." 
     } = this.state;
    return (
      <View style={{flex: 1}}>
        <Favorites
          data={books}
          category='books'
          renderFavorite={this._renderBook}
        />
        <BookModal
          bookDescription={bookDescription}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ favorite }) => ({
  books: favorite.books
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooks);