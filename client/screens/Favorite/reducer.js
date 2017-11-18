import _ from 'lodash';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITE
} from '../../constants/actionTypes';


const defaultState = {
  facts: [],
  articles: [],
  books: [],
  videos: []
}


const favoriteReducer = (state = defaultState, action) => {
  let tmp = {}; // object used to assign a value to another object with a variable as a key
  switch(action.type) {
    case ADD_FAVORITE: 
      tmp[action.category] = [...state[action.category], action.item];
      return { 
        ...state, 
        ...tmp
      }
    case REMOVE_FAVORITE:
      tmp[action.category] = _.filter(state[action.category], (item) => item.id !== action.itemId);
      return { 
        ...state,
        ...tmp
      }
    default: 
      return state;
  }
}


export default favoriteReducer;