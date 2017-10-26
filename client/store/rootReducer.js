import { combineReducers } from 'redux';

// REDUCERS
import historyOnDay from '../screens/TodayInHistory/reducer';

const rootReducer = combineReducers({
    historyOnDay
});


export default rootReducer;