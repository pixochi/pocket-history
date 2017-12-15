import { combineReducers } from 'redux';

// REDUCERS
import account from '../screens/MyAccount/reducer';
import adMob from '../components/AdMob/reducer';
import factDetail from '../screens/FactDetail/reducer';
import favorite from '../screens/Favorite/reducer';
import happenedSooner from '../screens/WhichHappenedSooner/reducer';
import historyOnDay from '../screens/TodayInHistory/reducers/factsReducer';
import modal from '../components/Modal/reducer';
import news from '../screens/TodayInHistory/reducers/newsReducer';
import { toastReducer as toast } from 'react-native-redux-toast';

const rootReducer = combineReducers({
  adMob,
  account,
  factDetail,
  favorite,
  happenedSooner,
  historyOnDay,
  modal,
  news,
  toast,
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