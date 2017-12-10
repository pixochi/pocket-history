import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import gStyles from '../styles';

class EmptyFavorites extends PureComponent {
  render() {
    const { message } = this.props;
    
    return (
      <View style={gStyles.screenMiddle}>
        <Text style={styles.message}>
          { message }
        </Text>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
  	margin: 8,
  	fontSize: 20,
  	textAlign: 'center'
  }
});


export default EmptyFavorites;