import _ from 'lodash';
import { FETCH_NEWS } from '../../../constants/actionTypes';


const date = new Date();

const defaultState = {
  articles: [],
  lastTimeFetched: 0, // timestamp when the news were fetched
  isLoading: false,
  error: false
}

const newsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case `${FETCH_NEWS}_PENDING`:
      return { ...state, isLoading: true, error: false };
    case `${FETCH_NEWS}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        error: false,
        articles: action.payload.data,
        lastTimeFetched: date.getTime()
      }
    }
    case `${FETCH_NEWS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}


export default newsReducer;