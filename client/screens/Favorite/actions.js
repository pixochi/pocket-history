import axios from 'axios';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITE
} from '../../constants/actionTypes';

// @param item object - enum(event, book, video, article)
// @param category string - enum(event, book, video, article)
export const addToFavorite = (item, category) => (dispatch, getState) => {
	const store = getState();
	const { online } = store.offline;
	const { user } = store.account;

	return dispatch({
		type: ADD_FAVORITE,
		category,
		item
	});

}

const saveFavorite = (item) => {

}

