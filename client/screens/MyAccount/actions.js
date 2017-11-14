import { Facebook } from 'expo';
import axios from 'axios';

import config from '../../constants/config';
import { 
  FB_LOGIN_FULFILLED,
  FB_LOGIN_REJECTED 
} from '../../constants/actionTypes';


const FB_APP_ID = config.common.fbAppId;
const { NODE_ENV = 'development' } = process.env;
const API_ROOT_URL = `${config[NODE_ENV].apiRootUrl}/api`;

export const fbLogIn = () => async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ['public_profile'],
  });
  if (type === 'success') {
    try {
      // don't change the property name 'access_token'
      const response = await axios.post(`${API_ROOT_URL}/auth/fb`, { access_token: token }); 
      const userToken = response.headers['x-auth-token'];
      if (userToken) {
        return dispatch({
          type: FB_LOGIN_FULFILLED,
          token: userToken,
          user: response.data
        });
      }
    } catch(e) {
      return dispatch({
        type: FB_LOGIN_REJECTED, 
        message: e.message
      });
    }
    
  } else {
    return dispatch({
      type: FB_LOGIN_REJECTED, 
      message: 'Failed to log in with Facebook.' 
    });
  }
}