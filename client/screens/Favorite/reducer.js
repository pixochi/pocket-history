import _ from 'lodash';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITE,
  CHANGE_SEARCH,
  TOGGLE_CATEGORY
} from '../../constants/actionTypes';


const defaultState = {
  facts: [],
  articles: [],
  books: [],
  videos: [],
  search: '',
  categories: {
    facts: true,
    articles: true,
    videos: true,
    books: true
  }
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
    case CHANGE_SEARCH: 
      return {
        ...state,
        search: action.search
      }
    case TOGGLE_CATEGORY:
      let toggledCategory = {};
      const { category } = action;
      toggledCategory[category] = !state.categories[category];
      console.log('TOGGLE_CATEGORY')
      console.log(toggledCategory)
      return {
        ...state,
        categories: {
          ...state.categories,
          ...toggledCategory
        }
      }
    default: 
      return state;
  }
}


export default favoriteReducer;