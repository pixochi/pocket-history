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
  switch(action.type) {
    case ADD_FAVORITE: {
      let stateField = {};
      stateField[action.category] = [...state[action.category], action.item];
      return { 
        ...state, 
        ...stateField  
      }
    }
    default: 
      return state;
  }
}


export default favoriteReducer;