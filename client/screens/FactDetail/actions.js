import axios from 'axios';
import { Clipboard } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import { parseXml } from '../../utils/xmlParser'
import config from '../../constants/config';
import { 
	FETCH_FACT_BOOKS,
	FETCH_FACT_VIDEOS,
	FETCH_TIMELINE_FACTS,
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

// fetch videos for the selected fact
export const fetchVideos = (textQuery) => dispatch => {
	const queryParams = {
		params: { textQuery }
	}
	const videosPromise = axios(`${API_ROOT_URL}/videos`, queryParams);

	dispatch({ type: FETCH_FACT_VIDEOS, payload: videosPromise })
	  .catch(e => console.log(e));
}

const _fetchTimeline = (range, queryWord) => {
	return new Promise(async (resolve, reject) => {
		const TIMELINE_API_ROOT = 'http://www.vizgr.org/historical-events/search.php';
		const { start, end } = range;
		console.log('RANGE')
		console.log(range)
		const queryParams = {
			params: { 
				begin_date: start,
				end_date: end,
				granularity: 'all'
			}
		}
		try {
			const { data } = await axios(TIMELINE_API_ROOT, queryParams);
			const json = await parseXml(data);
			if (!json) {
				reject();
			}
			resolve(json);
		} catch(e) {
			console.log(e);
			reject(e);
		}
	});
}

// fetches facts between a specified range of dates
// @param range obj - { rangeStart: [YYYYMMDD], rangeEnd: [YYYYMMDD] }
export const fetchTimeline = (range, queryWord) => dispatch => {
	dispatch({ type: FETCH_TIMELINE_FACTS, payload: _fetchTimeline(range, queryWord) })
	  .catch(e => console.log(e));
}

export const copyToClipboard = (content) => dispatch => {
	Clipboard.setString(content);
	dispatch(ToastActionsCreators.displayInfo('Copied', 2000));
}