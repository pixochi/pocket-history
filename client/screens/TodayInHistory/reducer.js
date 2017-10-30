import _ from 'lodash';
import { 
  FETCH_FACTS, 
  CHANGE_FACTS_CATEGORY 
} from '../../constants/actionTypes';


// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;
const MONTHS =  [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// returns the current month and day
// format: October 25
const getDate = () => {
  const d = new Date();
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];

  return `${month} ${day}`;
}

const defaultState = {
  facts: {},
  selectedFacts: {},
  selectedDate: getDate(),
  category: 'Events', // enum ['Events', 'Births', 'Deaths']
  isLoading: false,
  error: false
}

// @param max - number of daily facts saved
// saves the specified number of facts
const saveFactsSubset = (facts, max) => {
  return _.pick(facts, Object.keys(facts).slice(-max))
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
        facts: saveFactsSubset({...state.facts, ...newFacts })
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    default: 
      return state
  }
}

export default factsReducer;