import { 
  FETCH_FACT_BOOKS,
  FETCH_FACT_VIDEOS,
  FETCH_TIMELINE_FACTS,
  CHANGE_TIMELINE_RANGE
} from '../../constants/actionTypes';


const defaultState = {
  books: {
    data: [],
    isLoading: false,
    error: null
  },
  videos: {
    data: [],
    isLoading: false,
    error: null
  },
  timeline: {
    data: [],
    range: {},
    isLoading: false,
    error: null
  }
}

// // @param max - number of daily facts saved
// // returns the specified number of facts
// const saveFactsSubset = (facts, max, todaysDate) => {
//   const todaysFacts = facts[todaysDate]; // always save today's facts
//   let savedFacts = _.pick(facts, _.keys(facts).slice(-max+1));

//   if(todaysFacts !== null && _.isEmpty(savedFacts[todaysDate])){  
//     savedFacts[todaysDate] = todaysFacts;
//   }

//   return savedFacts;
// }

const factDetailReducer = (state = defaultState, action) => {
  const { books, videos, timeline } = state;
  switch(action.type) {

    // BOOKS
    case `${FETCH_FACT_BOOKS}_PENDING`:
      return { ...state, books: {...books, isLoading: true }};
    case `${FETCH_FACT_BOOKS}_FULFILLED`: 
      return {
        ...state,
        books: {
          ...books, 
          isLoading: false,
          data: action.payload.data
        } 
      }
    case `${FETCH_FACT_BOOKS}_REJECTED`:
      return {
        ...state,
        books: {
          ...books, 
          isLoading: false,
          error: action.payload.message 
        } 
      };

    // VIDEOS
    case `${FETCH_FACT_VIDEOS}_PENDING`:
      return { ...state, videos: {...videos, isLoading: true }}; 
    case `${FETCH_FACT_VIDEOS}_FULFILLED`: 
      return {
        ...state,
        videos: {
          ...videos, 
          isLoading: false,
          data: action.payload.data 
        }
      }
    case `${FETCH_FACT_VIDEOS}_REJECTED`:
      return { 
        ...state,
        videos: {
          ...videos, 
          isLoading: false,
          error: action.payload.message 
        }
      };

    // TIMELINE
    case `${FETCH_TIMELINE_FACTS}_PENDING`:
      return { ...state, timeline: {...timeline, isLoading: true }};
    case `${FETCH_TIMELINE_FACTS}_FULFILLED`:
      const { payload } = action;
      const data = payload.isNew ? payload.facts : [...timeline.data, ...payload.facts];
      return {
        ...state,
        timeline: {
          ...timeline,
          data,
          isLoading: false,
          range: payload.range,
          isLastFetched: payload.isLastFetched
        }
      }
    case `${FETCH_TIMELINE_FACTS}_REJECTED`:
      return { 
        ...state,
        timeline: {
          ...timeline, 
          isLoading: false,
          isLastFetched: true,
          error: action.payload.message 
        }
      };
    case CHANGE_TIMELINE_RANGE:
      return { 
        ...state,
        timeline: {
          ...timeline,
          data: [],
          range: action.range
        }
      }
    
    default: 
      return state;
  }
}

export default factDetailReducer;