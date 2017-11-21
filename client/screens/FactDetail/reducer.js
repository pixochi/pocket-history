import { 
  FETCH_FACT_BOOKS,
  FETCH_FACT_VIDEOS,
  FETCH_TIMELINE_FACTS
} from '../../constants/actionTypes';


const defaultState = {
  books: [],
  videos: [],
  timeline: [],
  isLoading: false,
  error: ''
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
  switch(action.type) {
    case `${FETCH_FACT_BOOKS}_PENDING`:
    case `${FETCH_FACT_VIDEOS}_PENDING`:
    case `${FETCH_TIMELINE_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACT_BOOKS}_FULFILLED`: 
      return {
        ...state,
        isLoading: false,
        books: action.payload.data
      }
    case `${FETCH_FACT_VIDEOS}_FULFILLED`: 
      return {
        ...state,
        isLoading: false,
        videos: action.payload.data
      }
    case `${FETCH_TIMELINE_FACTS}_FULFILLED`: 
      return {
        ...state,
        isLoading: false,
        timeline: action.payload.result.event
      }
    case `${FETCH_FACT_BOOKS}_REJECTED`:
    case `${FETCH_FACT_VIDEOS}_REJECTED`:
    case `${FETCH_TIMELINE_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: action.payload.message };
    
    default: 
      return state;
  }
}

export default factDetailReducer;