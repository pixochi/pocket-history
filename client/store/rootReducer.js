import { combineReducers } from 'redux';

// REDUCERS
import { toastReducer as toast } from 'react-native-redux-toast';
import modal from '../components/Modal/reducer';
import account from '../screens/MyAccount/reducer';
import factDetail from '../screens/FactDetail/reducer';
import historyOnDay from '../screens/TodayInHistory/reducers/factsReducer';
import news from '../screens/TodayInHistory/reducers/newsReducer';
import favorite from '../screens/Favorite/reducer';


const rootReducer = combineReducers({
  toast,
  modal,
  factDetail,
  historyOnDay,
  news,
  account,
  favorite,
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