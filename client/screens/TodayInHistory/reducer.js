import _ from 'lodash';
import { 
  FETCH_FACTS, 
  CHANGE_DATE 
} from '../../constants/actionTypes';
import { toStateDate } from '../../utils/date';


// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;

const today = toStateDate(new Date());

const defaultState = {
  facts: {},
  selectedDate: today,
  category: 'Events', // enum ['Events', 'Births', 'Deaths']
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

const factsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case `${FETCH_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACTS}_FULFILLED`: {
      const { data } = action.payload;
      let newFacts = {};
      newFacts[data.date] = {...data.data};
      return {
        ...state,
        isLoading: false,
        selectedFacts: newFacts,
        facts: saveFactsSubset({...state.facts, ...newFacts }, MAX_FACTS, state.selectedDate)
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    case CHANGE_DATE: {
      return { ...state, selectedDate: action.date }
    }
    default: return state
  }
}

export default factsReducer;