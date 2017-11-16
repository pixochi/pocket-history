import { 
  LOGIN_PENDING,
  FB_LOGIN_FULFILLED,
  FB_LOGIN_REJECTED,
  LOG_OUT
} from '../../constants/actionTypes';


const defaultState = {
  token: '',
  user: {},
  error: '',
  isLoading: false
}

const myAccountReducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN_PENDING: {
      return { ...state, isLoading: true }
    }
    case FB_LOGIN_FULFILLED: 
      return {
        ...state,
        token: action.token,
        user: action.user,
        error: '',
        isLoading: false
      }
    case FB_LOGIN_REJECTED:
      return { ...state, error: action.message, isLoading: false };
    case LOG_OUT:
      return {};
    default: 
      return state;
  }
}


export default myAccountReducer;