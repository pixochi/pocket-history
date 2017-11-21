import axios from 'axios';
import { Clipboard } from 'react-native';

import { ToastActionsCreators } from 'react-native-redux-toast';

import config from '../../constants/config';
import { 
	FETCH_FACT_BOOKS,
	FETCH_FACT_VIDEOS,
	COPY_TO_CLIPBOARD
} from '../../constants/actionTypes';


const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// fetch books for the selected fact
export const fetchBooks = (textQuery) => dispatch => {
	const queryParams = {
		params: { textQuery }
	}
	const booksPromise = axios(`${API_ROOT_URL}/books`, queryParams);

	dispatch({ type: FETCH_FACT_BOOKS, payload: booksPromise })
	  .catch(e => console.log(e));
}

export const fetchVideos = (textQuery) => dispatch => {
	const queryParams = {
		params: { textQuery }
	}
	const videosPromise = axios(`${API_ROOT_URL}/videos`, queryParams);

	dispatch({ type: FETCH_FACT_VIDEOS, payload: videosPromise })
	  .catch(e => console.log(e));
}

export const copyToClipboard = (content) => dispatch => {
	Clipboard.setString(content);
	dispatch(ToastActionsCreators.displayInfo('Copied', 2000));
}