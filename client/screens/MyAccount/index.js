import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import _ from 'lodash';

import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

import { fbLogIn, logout } from './actions';


class MyAccount extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'My Account',
    headerTitle: 'My Account'
  }

  _renderLoginError = () => {
    const { error } = this.props;
    if (!error) return null; 
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorMsg}>
          { error }
        </Text>
      </View>
    );
  }

  render() {
   const { user, token, isLoading, error } = this.props;
   const isOnline = this.props;

    if (token && !_.isEmpty(user)) {
      const { firstName = '', lastName = '' } = user;
      return (
        <View style={styles.signInContainer}>
          <Text>
            AUTHENTICATED
          </Text>
          <Text>
            { `${firstName} ${lastName}` }
          </Text>
          <Button 
            title='Log out'
            onPress={this.props.logout}
          />
        </View>
      )
    }

    if (isLoading) {
      return <Loader />;
    }

    if (!isOnline) {
      return <NetworkProblem />;
    }

    return (
      <View style={styles.signInContainer}>
        <Button 
          large
          title='Log in with Facebook'
          onPress={this.props.fbLogIn}
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
        { this._renderLoginError() }
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
  },
  errorBox: {
    margin: 8
  },
  errorMsg: {
    fontSize: 18,
    padding: 8,
    color: 'red'
  }
}

const mapStateToProps = ({ account, offline }) => {
  const { user, token, isLoading, error } = account;
  return {
    user,
    token,
    isLoading,
    error,
    isOnline: offline.online
  }
}

const mapDispatchToProps = (dispatch) => ({
  fbLogIn: () => {
    dispatch(fbLogIn());
  },
  logout: () => {
    dispatch(logout());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);