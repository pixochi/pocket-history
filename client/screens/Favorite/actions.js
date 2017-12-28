import _ from 'lodash';

import { ToastActionsCreators } from 'react-native-redux-toast';
import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CHANGE_SEARCH,
  TOGGLE_CATEGORY
} from '../../constants/actionTypes';


// @param item object - enum(event, book, video, article)
// @param category string - enum('events', 'books', 'videos', 'articles')
export const addFavorite = (item, category) => (dispatch, getState) => {
	const store = getState();
	const { favorite } = store;
	const favoriteItemExists = _.find(favorite[category], (fact) => fact.id === item.id);

	if (!favoriteItemExists) {
		dispatch({
			type: ADD_FAVORITE,
			item,
			category
		});
	}
	dispatch(ToastActionsCreators.displayInfo('Saved', 2000));
}

// @param category string - enum('events', 'books', 'videos', 'articles')
export const removeFavorite = (itemId, category) => (dispatch) => {
	dispatch({
		type: REMOVE_FAVORITE,
		itemId,
		category
	});
	dispatch(ToastActionsCreators.displayInfo('Removed', 2000));
}

export const changeSearch = (search) => {
	return {
		type: CHANGE_SEARCH,
		search
	}
}

export const toggleCategory = (category) => {
	return {
		type: TOGGLE_CATEGORY,
		category
	}
}
