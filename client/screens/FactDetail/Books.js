import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import BookCard from '../../components/BookCard';
import { copy, share, save } from '../../components/utils/cardMenuOptions';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import NetworkProblem from '../../components/NetworkProblem';

// ACTIONS
import { fetchBooks } from './actions';
import { openModal } from '../../components/Modal/actions';

import gStyles from '../../styles';


class Books extends Component {
  state = { 
    bookDescription: "Sorry, we couldn't find a description for the selected book." 
  }

  componentDidMount() {
    const { screenProps, fetchBooks } = this.props;
    fetchBooks(screenProps.navigation.state.params.text);
  } 

  componentWillReceiveProps(nextProps) {
    const { books, isLoading, isOnline, navigation, fetchBooks } = nextProps;
    const connectionChanged = !this.props.isOnline && isOnline;

    if (!isLoading && connectionChanged && books.length === 0 ) {
      fetchBooks(navigation.state.params.text);
    }
  }

  _cardMenuOptions = (book) => {
    const { title } = book;
    const { addFavorite, copyToClipboard } = this.props.screenProps;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(title) }),
      share({ message: title }),
      save({ onSelect: () => addFavorite(book, 'books')})
    ]
    return menuOptions;
  }

  _refetchBooks = () => {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.html);
  }

  _onBookPress = (bookDescription) => {
    this.setState({ bookDescription }, () => this.props.openModal('factBook'));
  }
 
  _renderBooks(books) {
    return books.map(book => (
      <BookCard 
        key={book.id} 
        book={book}
        onBookPress={this._onBookPress}
        menuOptions={this._cardMenuOptions(book)}
      />
    ));
  }

  render() {
    const { books, isLoading, isOnline, screenProps } = this.props;
    const { bookDescription = "Sorry, we couldn't find a description for the selected book." 
     } = this.state;
    let Main;

    if (isLoading) {
      Main = <Loader />;
    } else if (!isOnline && books.length === 0) {
      Main = <NetworkProblem solveConnection={this._refetchBooks} />;
    } else if (books.length === 0) {
      Main = (
        <View style={gStyles.screenMiddle}>
          <Text>
            No books found.
          </Text>
        </View>
      )
    } else {
      Main = (
        <View style={{flex:1}}>
          <ScrollView style={styles.bookList}>
          { this._renderBooks(books) }
          </ScrollView>
          <Modal name='factBook'>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                { bookDescription }
              </Text>
            </View> 
          </Modal>
        </View> 
      )
    }

    return (
     <View style={{flex:1}}>
      <Header 
        title='Library'
        navigation={screenProps.navigation}
      />
      <View style={gStyles.screenBody}>
        { Main }
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  bookList: {
    paddingLeft: 16,
    paddingRight: 16
  },
  descriptionContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 18
  }
});

const mapStateToProps = ({ factDetail: { books }, offline}) => {
  const { data, isLoading } = books;
  return {
    books: data,
    isLoading,
    isOnline: offline.online
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: (textQuery) => {
    dispatch(fetchBooks(textQuery));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Books);