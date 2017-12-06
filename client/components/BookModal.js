import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Modal from './Modal';


class BookModal extends PureComponent {
  render() {
  	const { bookDescription = "Sorry, we couldn't find a description for the selected book."  } = this.props;

    return (
    	<View>
	      <Modal name='factBook'>
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
});


export default BookModal;