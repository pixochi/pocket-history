import axios from 'axios';

import { 
	FETCH_FACTS,
	FETCH_NEWS,
	CHANGE_DATE,
} from '../../constants/actionTypes';
import { toApiFactDate, toFactDate } from '../../utils/date';
import config from '../../constants/config';

const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// fetch facts for the selected date
export const fetchFacts = (timestamp) => dispatch => {

// [month]/[day] -> 12/30
const factApiDate = toApiFactDate(timestamp);

// facts - events, births, deaths
const factsPromise = axios.get(`http://history.muffinlabs.com/date/${factApiDate}`);

dispatch({ type: FETCH_FACTS, payload: factsPromise })
  .catch(e => console.log(e));
}

export const fetchNews = () => dispatch => {
	const newsUrl = `${API_ROOT_URL}/news`;
	const newsPromise = axios.get(newsUrl);

	dispatch({ type: FETCH_NEWS, payload: newsPromise })
		.catch(e => console.log(e));
}

export const changeDate = (timestamp) => {
	return {
		type: CHANGE_DATE,
		date: {
			timestamp,
			factDate: toFactDate(timestamp)
		}
	}
}