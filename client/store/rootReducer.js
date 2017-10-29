import { combineReducers } from 'redux';

// REDUCERS
import historyOnDay from '../screens/TodayInHistory/reducer';

const rootReducer = combineReducers({
    historyOnDay,
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