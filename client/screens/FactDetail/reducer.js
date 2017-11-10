import { 
  FETCH_FACT_BOOKS,
} from '../../constants/actionTypes';


const defaultState = {
  books: [],
  isLoading: false,
  error: false
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
      return { ...state, isLoading: true, books: [] };
    case `${FETCH_FACT_BOOKS}_FULFILLED`: 
      return {
        ...state,
        isLoading: false,
        books: action.payload.data
      }
    case `${FETCH_FACT_BOOKS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    default: 
      return state;
  }
}

export default factDetailReducer;