import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Loader from '../../components/Loader';
import BookCard from '../../components/BookCard';

// ACTIONS
import { fetchBooks } from './actions';


class Books extends Component {

  componentDidMount() {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.text);
  }

  _renderBooks(books) {
    return books.map(book => (
      <BookCard key={book.id} book={book} />
    ));
  }

  render() {
    const { books, isLoading } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <View>
        <View>
          { this._renderBooks(books) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = ({ factDetail: { books, isLoading }}) => (
  {
    books,
    isLoading
  }
)

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: (textQuery) => {
    dispatch(fetchBooks(textQuery));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Books);