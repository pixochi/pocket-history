import axios from 'axios';
import _ from 'lodash';

import { ToastActionsCreators } from 'react-native-redux-toast';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CHANGE_FAVORITES_FILTER
} from '../../constants/actionTypes';


// @param item object - enum(event, book, video, article)
// @param category string - enum('events', 'books', 'videos', 'articles')
export const addFavorite = (item, category) => (dispatch, getState) => {
	const store = getState();
	const { token } = store.account;
	const { favorite } = store;
	const favoriteItemExists = _.find(favorite[category], (fact) => fact.id === item.id);

	if (!favoriteItemExists) {
		dispatch({
			type: ADD_FAVORITE,
			item,
			category
		});
		if (token) {
			saveFavorite(item)
		}
	}
	 dispatch(ToastActionsCreators.displayInfo('Saved', 2000));
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
	dispatch(ToastActionsCreators.displayInfo('Removed', 2000));
}

export const changeFilter = (filter) => {
	return {
		type: CHANGE_FAVORITES_FILTER,
		filter
	}
}
