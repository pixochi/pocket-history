import { combineReducers } from 'redux';

// REDUCERS
import historyOnDay from '../screens/TodayInHistory/reducer';
import factDetail from '../screens/FactDetail/reducer';


const rootReducer = combineReducers({
  historyOnDay,
  factDetail,
  persist: (state={rehydrated: false}, action) => {
  	switch(action.type) {
  		case 'persist/REHYDRATE' : {
  			return { rehydrated: true }
  		}
  		default: return state
  	}
  }
});


export default rootReducer;