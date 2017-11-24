import _ from 'lodash';
import { 
  FETCH_FACTS,
  CHANGE_DATE,
  CHANGE_FACTS_FILTER
} from '../../../constants/actionTypes';
import { toFactDate } from '../../../utils/date';

import { DEFAULT_FACTS_FILTER } from '../constants';

const currentTimestamp = new Date().getTime();

const defaultState = {
  facts: {},
  filter: DEFAULT_FACTS_FILTER,
  selectedDate: {
    timestamp: currentTimestamp,
    factDate: toFactDate(currentTimestamp)
  },
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
        facts: action.payload,
        filter: DEFAULT_FACTS_FILTER
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    case CHANGE_DATE: {
      // const { factDate, timestamp } = action.date;
      return { ...state, selectedDate: {...action.date} }
    }
    case CHANGE_FACTS_FILTER: {
      return {...state, filter: action.filter}
    }
    default:
      return state;
  }
}


export default factsReducer;