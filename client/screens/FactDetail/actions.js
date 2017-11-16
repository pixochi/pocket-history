import axios from 'axios';

import config from '../../constants/config';
import { 
	FETCH_FACT_BOOKS,
	FETCH_FACT_VIDEOS
} from '../../constants/actionTypes';


const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// fetch books for the selected fact
export const fetchBooks = (textQuery) => dispatch => {
	const queryParams = {
		params: { textQuery }
	}
	const booksPromise = axios(`${API_ROOT_URL}/api/books`, queryParams);

	dispatch({ type: FETCH_FACT_BOOKS, payload: booksPromise })
	  .catch(e => console.log(e));
}

export const fetchVideos = (textQuery) => dispatch => {
	const queryParams = {
		params: { textQuery }
	}
	const videosPromise = axios(`${API_ROOT_URL}/api/videos`, queryParams);

	dispatch({ type: FETCH_FACT_VIDEOS, payload: videosPromise })
	  .catch(e => console.log(e));
}