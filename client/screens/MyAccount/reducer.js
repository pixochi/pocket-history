import { 
  FB_LOGIN_FULFILLED,
  FB_LOGIN_REJECTED 
} from '../../constants/actionTypes';


const defaultState = {
  token: '',
  user: {},
  error: ''
}

const myAccountReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FB_LOGIN_FULFILLED: 
      return {
        ...state,
        token: action.token,
        user: action.user,
        error: ''
      }
    case FB_LOGIN_REJECTED:
      return { ...state, error: action.message };
    default: 
      return state;
  }
}


export default myAccountReducer;