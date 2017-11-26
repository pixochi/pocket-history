import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { openModal } from '../../components/Modal/actions';

import Favorites from './Favorites';
import Modal from '../../components/Modal';
import BookCard from '../../components/BookCard';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';

class FavoriteBooks extends PureComponent {
  state = { 
    bookDescription: "Sorry, we couldn't find a description for the selected book." 
  }

  _cardMenuOptions = ({id, title}) => {
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(title)}),
      share({ message: title }),
      remove({ onSelect: () => removeFavorite(id, 'books') })
    ]
    return menuOptions;
  }

  _onBookPress = (bookDescription) => {
    this.setState({ bookDescription }, () => this.props.openModal('favBook'));
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
        <Modal name='favBook'>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              { bookDescription }
            </Text>
          </View> 
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 18
  }
})

const mapStateToProps = ({ favorite }) => ({
  books: favorite.books
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooks);