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
    // Get the user's id using Facebook's Graph API
    const response = await fetch(`https://graph.facebook.com/me?fields=id&access_token=${token}`);
    const { id } = await response.json();

    const userInfo = { token, id };
    axios.post(`${API_ROOT_URL}/auth/fb`, userInfo);
  } else {
    return dispatch({
      type: FB_LOGIN_REJECTED, 
      message: 'Failed to log in with Facebook.' 
    });
  }
}