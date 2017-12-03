import _ from 'lodash';
import { 
  FETCH_FACTS,
  FETCH_FACTS_IMAGES,
  CHANGE_DATE,
  CHANGE_FACTS_FILTER,
  CHANGE_FACTS_CATEGORY,
  CHANGE_IMG_AJAX_SRC
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
  selectedCategory: 'Events',
  imgFetchSrc: null,
  isFetchingImages: false,
  isLoading: false,
  error: false,
  imgErr: false
}

const factsReducer = (state = defaultState, action) => {
  switch(action.type) {

    // FETCHING FACTS BLOCK
    case `${FETCH_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACTS}_FULFILLED`:      
      return {
        ...state,
        isLoading: false,
        facts: { ...state.facts, ...action.payload },
      }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };

    // FETCHING IMAGES FOR FACTS
    case `${FETCH_FACTS_IMAGES}_PENDING`:
      return { ...state, isFetchingImages: true }
    case `${FETCH_FACTS_IMAGES}_FULFILLED`:
      return { 
        ...state, 
        facts: action.payload, 
        isFetchingImages: false,
        imgErr: false 
      }
    case `${FETCH_FACTS_IMAGES}_REJECTED`:
      return { ...state,  isFetchingImages: false, imgErr: true }

    case CHANGE_DATE: 
      return { ...state, selectedDate: {...action.date} }
    case CHANGE_FACTS_CATEGORY:
      return { ...state, selectedCategory: action.category }
    case CHANGE_FACTS_FILTER: 
      return {...state, filter: action.filter}
    case CHANGE_IMG_AJAX_SRC: 
      return { 
        ...state,
        imgFetchSrc: action.source,
        isFetchingImages: true
      }
    default:
      return state;
  }
}




export default factsReducer;