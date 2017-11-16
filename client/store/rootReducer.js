import { combineReducers } from 'redux';

// REDUCERS
import account from '../screens/MyAccount/reducer';
import factDetail from '../screens/FactDetail/reducer';
import historyOnDay from '../screens/TodayInHistory/reducers/factsReducer';
import news from '../screens/TodayInHistory/reducers/newsReducer';


const rootReducer = combineReducers({
  factDetail,
  historyOnDay,
  news,
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