import _ from 'lodash';
import { 
  FETCH_FACTS,
  CHANGE_DATE 
} from '../../../constants/actionTypes';
import { toFactDate } from '../../../utils/date';


// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;

const currentTimestamp = new Date().getTime();

const defaultState = {
  facts: {},
  selectedDate: {
    timestamp: currentTimestamp,
    factDate: toFactDate(currentTimestamp)
  },
  isLoading: false,
  error: false
}

// @param max - number of daily facts saved
// returns the specified number of facts
const saveFactsSubset = (facts, max, todaysDate) => {
  const todaysFacts = facts[todaysDate]; // always save today's facts
  let savedFacts = _.pick(facts, _.keys(facts).slice(-max+1));

  if(todaysFacts !== null && _.isEmpty(savedFacts[todaysDate])){  
    savedFacts[todaysDate] = todaysFacts;
  }

  return savedFacts;
}

// @param data object - {Events, Births, Deaths}
// @param keys array - keys of properties to be deleted
// deletes specified properties from facts
const deleteProps = (data, keys) => {
  if (!data || !keys) return false;

  _.forEach(data, (factCategory) => {
    _.forEach(factCategory, (fact) => {
      _.unset(fact, keys);
    })
  });
  return data;
}

const factsReducer = (state = defaultState, action) => {
  switch(action.type) {
    // FETCHING FACTS BLOCK
    case `${FETCH_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACTS}_FULFILLED`: {
      let { data, date } = action.payload.data;
      let newFacts = {};
      newFacts[date] = {...data};
      return {
        ...state,
        isLoading: false,
        facts: saveFactsSubset({...state.facts, ...newFacts }, MAX_FACTS, state.selectedDate)
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    case CHANGE_DATE: {
      // const { factDate, timestamp } = action.date;
      return { ...state, selectedDate: {...action.date} }
    }
    default:
      return state;
  }
}


export default factsReducer;