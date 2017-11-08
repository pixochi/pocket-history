import axios from 'axios';

import { 
	FETCH_FACT_BOOKS, 
} from '../../constants/actionTypes';


const API_ROOT_URL = 'http://192.168.99.1:8000';

// fetch books for the selected fact
export const fetchBooks = (textQuery) => dispatch => {

	const queryParams = {
		params: { textQuery }
	}

	const booksPromise = axios(`${API_ROOT_URL}/api/booksForOneFact`, queryParams);

	dispatch({ type: FETCH_FACT_BOOKS, payload: booksPromise })
	  .catch(e => console.log(e));
}