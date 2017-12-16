import axios from 'axios';
import _ from 'lodash';

import { 
	FETCH_FACTS,
	FETCH_FACTS_IMAGES,
	FETCH_NEWS,
	CHANGE_DATE,
	CHANGE_FACTS_FILTER,
	CHANGE_IMG_AJAX_SRC
} from '../../constants/actionTypes';
import { toApiFactDate, toFactDate } from '../../utils/date';
import { addImagesToFacts, getTitlesFromFacts } from './helpers/images';
import config from '../../constants/config';

const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;

const _fetchFacts = (timestamp, factsState) => {

	return new Promise(async (resolve, reject) => {	
		if (isNaN(timestamp)) {
			reject('Parameter "timestamp" is not a number.');
		}
		try {
			const { facts, selectedDate } = factsState;
			// [month]/[day] -> 12/30
			const factApiDate = toApiFactDate(timestamp);
			// facts - events, births, deaths
			const response = await axios.get(`${API_ROOT_URL}/facts?date=${factApiDate}`);
			const { data, date } = response.data[0];

			let newFacts = {};
			newFacts[date] = data;
			newFacts = await saveFactsSubset({...facts, ...newFacts }, MAX_FACTS, selectedDate);
			resolve(newFacts);
		} catch(e) {
			reject(e)
		}	
	});
}

// fetch facts for the selected date
export const fetchFacts = (timestamp) => (dispatch, getState) => {
	const { historyOnDay } = getState();
	dispatch({ type: FETCH_FACTS, payload: _fetchFacts(timestamp, dispatch, historyOnDay) })
	  .catch(e => console.log(e));
}

export const _fetchFactsImages = (selectedDate, category, facts, axiosSrcToken) => {
	return new Promise( async (resolve, reject) => {
		const { factDate } = selectedDate;
		if (!selectedDate || !category || _.isEmpty(facts[factDate])) {
			reject('Parameters are not correct.');
		}

		let selectedFacts = facts[factDate][category];
		const imagesUrl = `${API_ROOT_URL}/wikiImages?pageTitles=`;
		const factsTitles = getTitlesFromFacts(selectedFacts);

		if (!factsTitles.length){
			reject('Titles are empty');
		};

		const pageTitlesQuery = factsTitles.join('|');

		try {
			const apiDate = toApiFactDate(selectedDate.timestamp);
			const apiUrl = imagesUrl + pageTitlesQuery + `&date=${apiDate}&category=${category}`;
			const { data } = await axios.get(apiUrl, { cancelToken: axiosSrcToken });

			const images = data.imagesOnly;

			if (images) {
				const factWithImages = addImagesToFacts(images, selectedFacts);

				facts[factDate][category] = factWithImages;
				let imagesMeta = facts[factDate].images || {};
				imagesMeta[category] = true;
				facts[factDate].images = imagesMeta;
			} else {
				facts[factDate] = data.data
			}

			resolve(facts)

		} catch(e) {
			console.log(e);
			reject(e);
		}
	});
}

export const fetchFactsImages = (selectedDate, category, facts) => dispatch => {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	dispatch({ type: CHANGE_IMG_AJAX_SRC, source });
	if (category !== 'News') {
		dispatch({ 
			type: FETCH_FACTS_IMAGES, 
			payload: _fetchFactsImages(selectedDate, category, facts, source.token) 
		});
	}	
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

export const changeFilter = (filter) => {
	return {
		type: CHANGE_FACTS_FILTER,
		filter
	}
}

// @param max - number of daily facts saved
// returns the specified number of facts
const saveFactsSubset = (facts, max, todaysDate) => {
	return new Promise((resolve, reject) => {
		const todaysFacts = facts[todaysDate]; // always save today's facts
	  let savedFacts = _.pick(facts, _.keys(facts).slice(-max+1));

	  if(todaysFacts !== null && _.isEmpty(savedFacts[todaysDate])){  
	    savedFacts[todaysDate] = todaysFacts;
	  }
	  resolve(savedFacts);
	});
}

// @param data object - {Events, Births, Deaths}
// @param keys array - keys of properties to be deleted
// deletes specified properties from facts
const deleteProps = (data, keys) => {
  if (!data || !keys) return false;

  _.forEach(data, (factCategory) => {
    _.forEach(factCategory, (fact) => {
      _.unset(fact, keys);
    })
  });
  return data;
}