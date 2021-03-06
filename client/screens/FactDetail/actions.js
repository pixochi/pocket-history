import axios from 'axios';
import { Clipboard } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';
import _ from 'lodash';

import { parseXml } from '../../utils/xmlParser'

import config from '../../constants/config';

import { 
	FETCH_FACT_BOOKS,
	FETCH_FACT_VIDEOS,
	FETCH_TIMELINE_FACTS,
	CHANGE_TIMELINE_RANGE,
	CHANGE_TIMELINE_FILTER,
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

// @param isNew bool - indicates whether the next timeline facts belong to the same timeline
const _fetchTimeline = ({ range, limit = 1000, isNew = true }, currentTimelineFacts) => {
	return new Promise(async (resolve, reject) => {

		if (_.isEmpty(range)) {
			reject('Range does not contain either start or end date.');
		}

		const TIMELINE_API_ROOT = 'http://www.vizgr.org/historical-events/search.php';
		const { start, end } = range;
		limit = currentTimelineFacts.length > 0 ? 2500 : limit;
		const queryParams = {
			params: { 
				begin_date: start.api,
				end_date: end.api,
				limit,
				granularity: 'year',
				html: true,
			}
		}
		try {
			const { data } = await axios(TIMELINE_API_ROOT, queryParams);
			const { result } = await parseXml(data);
			let facts = result.event;
			const isLastFetched = (facts.length < limit);

			// removes repeating timeline facts
			if (currentTimelineFacts && currentTimelineFacts.length) {
				const lastTimelineFact = currentTimelineFacts[currentTimelineFacts.length-1];
				const index = facts.findIndex((fact) => fact.description === lastTimelineFact.description);
				facts = facts.slice(index+1);
				facts = [...currentTimelineFacts, ...facts];
			}

			facts.forEach((fact) => {
				fact.description = fact.description.replace(/{{.*(<a href=.*<\/a>).*}}/g, ' $1')
				fact.description = fact.description.replace(/amp|quot(?:.*quot)?|nbsp|ndash|ref\sname=\w*/g, '');
			});

			resolve({ facts, isLastFetched });
		} catch(e) {
			console.log(e);
			reject(e);
		}
	});
}

// fetches facts between a specified range of dates
// @param range obj - { rangeStart: [YYYYMMDD], rangeEnd: [YYYYMMDD] }
export const fetchTimeline = (options) => (dispatch, getState) => {
	const { isNew = true, range } = options;
	if (isNew) {
		dispatch({ type: CHANGE_TIMELINE_RANGE, range });
	}
	const currentTimelineFacts = getState().factDetail.timeline.data;
	dispatch({ type: FETCH_TIMELINE_FACTS, payload: _fetchTimeline(options, currentTimelineFacts) })
	  .catch(e => console.log(e));
}

export const changeFilter = (filter) => {
	return {
		type: CHANGE_TIMELINE_FILTER,
		filter
	}
}

export const copyToClipboard = (content) => dispatch => {
	Clipboard.setString(content);
	dispatch(ToastActionsCreators.displayInfo('Copied', 2000));
}