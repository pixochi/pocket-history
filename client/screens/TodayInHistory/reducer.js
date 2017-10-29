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
const getDate = () => {
  const d = new Date();
  // format: October 25
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];

  return `${month} ${day}`;
}

const defaultState = {
  facts: [],
  selectedFacts: [],
  selectedDate: getDate(),
  category: 'Events', // enum ['Events', 'Births', 'Deaths']
  isLoading: false,
  error: false
}

const factsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case `${FETCH_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_FACTS}_FULFILLED`: {
      const { data } = action.payload;
      const newFacts = { ...data.data, date: data.date };
      return {
        ...state,
        isLoading: false,
        selectedFacts: newFacts,
        facts: [...state.facts, newFacts].slice(-MAX_FACTS)
      }
    }
    case `${FETCH_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };
    case CHANGE_FACTS_CATEGORY:
      return { ...state, category: action.category }
  }
  return state;
}

export default factsReducer;