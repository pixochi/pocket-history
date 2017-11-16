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
      return { ...state, isLoading: true }
    }
    default: 
      return state;
  }
}


export default favoriteReducer;