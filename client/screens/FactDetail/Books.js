import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// ACTIONS
import { fetchBooks } from './actions';


class Books extends Component {

  componentDidMount() {
    const { navigation, fetchBooks } = this.props;
    fetchBooks(navigation.state.params.text);
  }

  _renderBooks(books) {
    return books.map(book => (
      <Text key={book.id}>
        { book.title }
      </Text>
    ));
  }

  render() {
    const { books } = this.props;

    return (
      <View>
      	<Text>
      	  Books
      	</Text>
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