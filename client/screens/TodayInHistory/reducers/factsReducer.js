import _ from 'lodash';
import { 
  FETCH_FACTS,
  FETCH_FACTS_IMAGES,
  CHANGE_DATE,
  CHANGE_FACTS_FILTER,
  CHANGE_FACTS_CATEGORY
} from '../../../constants/actionTypes';
import { toFactDate } from '../../../utils/date';

import { DEFAULT_FACTS_FILTER } from '../constants';

const currentTimestamp = new Date().getTime();

const defaultState = {
  facts: {},
  images: {
    lastWithPic: {
      fromStart: 0,
      fromEnd: 0
    }
  },
  filter: DEFAULT_FACTS_FILTER,
  selectedDate: {
    timestamp: currentTimestamp,
    factDate: toFactDate(currentTimestamp)
  },
  selectedCategory: 'Events',
  isLoading: false,
  error: false
}

const factsReducer = (state = defaultState, action) => {
  switch(action.type) {
    // FETCHING FACTS BLOCK
    case `${FETCH_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACTS}_FULFILLED`: {     
      return {
        ...state,
        isLoading: false,
        facts: { ...state.facts, ...action.payload },
        // filter: DEFAULT_FACTS_FILTER
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    case FETCH_FACTS_IMAGES:
      return { ...state, facts: action.facts }
    case CHANGE_DATE: {
      return { ...state, selectedDate: {...action.date} }
    }
    case CHANGE_FACTS_CATEGORY:
      return { ...state, selectedCategory: action.category }
    case CHANGE_FACTS_FILTER: {
      return {...state, filter: action.filter}
    }
    // case SCROLL_CHANGED:
    //   return {...state, state[selectedDate].meta.images[selectedCategory]}
    default:
      return state;
  }
}




export default factsReducer;