import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import config from '../../constants/config';
import { 
  LOG_OUT,
  LOGIN_PENDING,
  FB_LOGIN_FULFILLED,
  FB_LOGIN_REJECTED 
} from '../../constants/actionTypes';


const FB_APP_ID = config.common.fbAppId;
const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

const logInRejected = (dispatch, message = 'Failed to log in with Facebook.') => {
  return dispatch({
    type: FB_LOGIN_REJECTED,
    message
  });
}

export const fbLogIn = () => async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ['public_profile'],
  });
  if (type === 'success') {
    try {
      dispatch({ type: LOGIN_PENDING });
      // DON'T change the property name 'access_token'
      const response = await axios.post(`${API_ROOT_URL}/auth/fb`, { access_token: token });
      console.log('RESPONSE')
      console.log(response)
      const userToken = response.headers['x-auth-token'];
      const { user } = response.data;

      if (userToken) {
        return dispatch({
          type: FB_LOGIN_FULFILLED,
          token: userToken,
          user
        });
      }
      const errorMsg = user ? user.error : 'Failed to log in';
      return logInRejected(dispatch, errorMsg);
    } catch(e) {
      console.log(e);
      return logInRejected(dispatch);
    }   
  } else {
    return logInRejected(dispatch);
  }
}

export const logout = () => dispatch => {
  AsyncStorage.removeItem('account', () => {
    dispatch({ type: LOG_OUT });
  });
}