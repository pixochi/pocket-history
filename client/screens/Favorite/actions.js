import axios from 'axios';
import _ from 'lodash';

import { ToastActionsCreators } from 'react-native-redux-toast';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITE
} from '../../constants/actionTypes';


// @param item object - enum(event, book, video, article)
// @param category string - enum('events', 'books', 'videos', 'articles')
export const addFavorite = (item, category) => (dispatch, getState) => {
	const store = getState();
	// const { online } = store.offline;
	// const { user } = store.account;
	const { favorite } = store;
	const favoriteItem = _.find(favorite[category], (fact) => fact.id === item.id);

	if (!favoriteItem) {
		dispatch({
			type: ADD_FAVORITE,
			item,
			category
		});
	}
	 dispatch(ToastActionsCreators.displayInfo('Saved', 2500));
}

const saveFavorite = (item) => {

}

// @param category string - enum('events', 'books', 'videos', 'articles')
export const removeFavorite = (itemId, category) => (dispatch, getState) => {
	// const store = getState();
	// const { online } = store.offline;
	// const { user } = store.account;

	dispatch({
		type: REMOVE_FAVORITE,
		itemId,
		category
	});
	dispatch(ToastActionsCreators.displayInfo('Removed', 2500));
}

