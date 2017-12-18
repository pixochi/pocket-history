import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Banner from '../../components/AdMob';
import BookCard from '../../components/BookCard';
import BookModal from '../../components/BookModal';
import BooksLabel from '../../components/TabBarLabels/BooksLabel';
import Header from './Header';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import NetworkProblem from '../../components/NetworkProblem';
import { copy, share, save } from '../../components/utils/cardMenuOptions';

// ACTIONS
import { fetchBooks } from './actions';
import { openModal } from '../../components/Modal/actions';

import gStyles from '../../styles';


class Books extends PureComponent {
  static navigationOptions = {
    tabBarLabel : <BooksLabel />
  }

  state = {}

  componentDidMount() {
    const { screenProps, fetchBooks } = this.props;
    fetchBooks(screenProps.navigation.state.params.text);
  } 

  componentWillReceiveProps(nextProps) {
    const { books, isLoading, isOnline, screenProps, fetchBooks } = nextProps;
    const gotConnected = !this.props.isOnline && isOnline;

    if (!isLoading && gotConnected) {
      fetchBooks(screenProps.navigation.state.params.text);
    }
  }

  _cardMenuOptions = (book) => {
    const { title, previewLink } = book;
    const { addFavorite, copyToClipboard } = this.props.screenProps;
    const shareText = `${title} - ${previewLink}`
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(shareText) }),
      share({ message: shareText }),
      save({ onSelect: () => addFavorite(book, 'books')})
    ]
    return menuOptions;
  }

  _refetchBooks = () => {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.html);
  }

  _onBookPress = (bookDescription) => {
    const { openModal } = this.props;
    this.setState({ bookDescription }, () => openModal('factBook'));
  }
 
  _renderBook = (book) => {
    const { item, index } = book;
    const Book = (
      <BookCard
        key={item.id} 
        book={item}
        onBookPress={this._onBookPress}
        menuOptions={this._cardMenuOptions(item)}
      />
    )
    if (index && index % 4 === 0) {
      return (
        <View>
          <Banner />
          { Book }
        </View>
      )
    }
    return Book;
  }

  render() {
    const { books, isLoading, isOnline, screenProps } = this.props;
    const { bookDescription } = this.state;
    let Main;

    if (isLoading) {
      Main = <Loader isAnimating={isLoading}/>;
    } else if (!isOnline && !books.length) {
      Main = <NetworkProblem />;
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
        <View>
          <FlatList
            data={books}
            extraData={books}
            keyExtractor = {(book) => book.infoLink}
            renderItem = {this._renderBook}
            contentContainerStyle={styles.booksContainer}
          />
          <BookModal 
            bookDescription={bookDescription}
          />
        </View> 
      )
    }

    return (
     <View style={styles.container}>
      <Header navigation={screenProps.navigation} />
      <View style={gStyles.screenBody}>
        { Main }
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  booksContainer: {
    
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