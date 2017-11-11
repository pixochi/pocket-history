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
import BookDescriptionModal from '../../components/BookDescriptionModal';
import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

// ACTIONS
import { fetchBooks } from './actions';

import gStyles from '../../styles';


class Books extends Component {
  state = {
    isDescriptionModalVisible: false,
    selectedDescription: ''
  }

  componentDidMount() {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.text);
  } 

  componentWillReceiveProps(nextProps) {
    const { books, isLoading, isOnline, navigation, fetchBooks } = nextProps;
    const connectionChanged = !this.props.isOnline && isOnline;

    if (!isLoading && connectionChanged && books.length === 0 ) {
      fetchBooks(navigation.state.params.text);
    }
  }  

  _refetchBooks = () => {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.text);
  }

  _closeDescriptionModal = () => {
    this.setState({ isDescriptionModalVisible: false });
  }

  _openDescriptionModal = () => {
    this.setState({ isDescriptionModalVisible: true });
  }

  _onBookPress = (description) => {
    this.setState({ selectedDescription: description }, () => {
      this._openDescriptionModal();
    });
  }
 
  _renderBooks(books) {
    return books.map(book => (
      <BookCard 
        key={book.id} 
        book={book}
        onBookPress={this._onBookPress}
      />
    ));
  }

  render() {
    const { books, isLoading, isOnline } = this.props;
    const { isDescriptionModalVisible, selectedDescription } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (!isOnline && books.length === 0) {
      return <NetworkProblem solveConnection={this._refetchBooks} />
    }

    if (books.length === 0) {
      <View style={gStyles.screenMiddle}>
        <Text>
          No books found.
        </Text>
      </View>
    } 

    return (
      <View>
        <ScrollView style={styles.bookList}>
          { this._renderBooks(books) }
        </ScrollView>
        <BookDescriptionModal 
          bookDescription={selectedDescription}
          isVisible={isDescriptionModalVisible}
          closeModal={this._closeDescriptionModal}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ factDetail: { books, isLoading }, offline}) => (
  {
    books,
    isLoading,
    isOnline: offline.online
  }
)

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: (textQuery) => {
    dispatch(fetchBooks(textQuery));
  }
});

const styles = StyleSheet.create({
  bookList: {
    paddingLeft: 16,
    paddingRight: 16
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Books);