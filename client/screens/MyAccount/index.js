import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import { fbLogIn } from './actions';


class MyAccount extends Component {
  static navigationOptions = {
    drawerLabel: 'My Account',
    headerTitle: 'My Account'
  }

  render() {
    const { authenticated } = this.props;

    if(authenticated) {
      return (
        <View>
          <Text>
            AUTHENTICATED
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.signInContainer}>
        <Button 
          large
          title='Log in with Facebook'
          onPress={() => this.props.fbLogIn()}
          icon={{name: 'facebook', type: 'entypo', size:35}}
          backgroundColor='#3b5998'
          textStyle={styles.signInBtnText}
          buttonStyle={styles.signInBtn}
        />
        <Button 
          large
          title='Sign in with Google'
          icon={{name: 'google-', type: 'entypo', size:35}}
          backgroundColor='#dd4b39'
          textStyle={styles.signInBtnText}
          buttonStyle={styles.signInBtn}
        />
      </View>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = {
  signInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInBtn: {
    width: SCREEN_WIDTH * 0.7,
    margin: 6
  },
  signInBtnText: { 
    padding: 8,
    paddingLeft: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
}

const mapStateToProps = ({ account: { user, authenticated, isLoading }, offline}) => (
  {
    user,
    authenticated,
    isLoading,
    isOnline: offline.online
  }
)

const mapDispatchToProps = (dispatch) => ({
  fbLogIn: () => {
    dispatch(fbLogIn());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);