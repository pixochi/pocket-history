import axios from 'axios';

import config from '../../constants/config';
import { 
	FETCH_FACT_BOOKS, 
} from '../../constants/actionTypes';

const API_ROOT_URL = config[config.env].apiRootUrl;

// fetch books for the selected fact
export const fetchBooks = (textQuery) => dispatch => {

	const queryParams = {
		params: { textQuery }
	}

	const booksPromise = axios(`${API_ROOT_URL}/api/books`, queryParams);

	dispatch({ type: FETCH_FACT_BOOKS, payload: booksPromise })
	  .catch(e => console.log(e));
}