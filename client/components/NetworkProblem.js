import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import gStyles from '../styles';


class NetworkProblem extends PureComponent {

  render() {
    const { solveConnection, message } = this.props;

    return (
      <View style={gStyles.screenMiddle}>
        <Text style={styles.connectionMsg}>
          { message }
        </Text>
        <Button 
          title='Retry' 
          onPress={solveConnection} 
          buttonStyle={styles.retryBtn}
          textStyle={styles.retryText}
        />
      </View>
    );
  }
}

NetworkProblem.propTypes = {
  message: PropTypes.string,
  solveConnection: PropTypes.func,
}

NetworkProblem.defaultProps = {
  message: 'Check your internet connection and try again.',
  solveConnection: () => null,
}

const styles = StyleSheet.create({
  retryBtn: {
  	paddingLeft: 30,
  	paddingRight: 30,
  	marginTop: 10
  },
  retryText: {
  	fontSize: 24
  },
  connectionMsg: {
  	fontSize: 24,
  	textAlign: 'center'
  }
});


export default NetworkProblem;