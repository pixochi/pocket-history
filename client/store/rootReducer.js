import { combineReducers } from 'redux';

// REDUCERS
import account from '../screens/MyAccount/reducer';
import factDetail from '../screens/FactDetail/reducer';
import historyOnDay from '../screens/TodayInHistory/reducer';


const rootReducer = combineReducers({
  factDetail,
  historyOnDay,
  account,
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