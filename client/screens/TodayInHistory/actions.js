import axios from 'axios';
import _ from 'lodash';

import { 
	FETCH_FACTS,
	FETCH_FACTS_IMAGES,
	FETCH_NEWS,
	CHANGE_DATE,
	CHANGE_FACTS_CATEGORY,
	CHANGE_FACTS_FILTER,
} from '../../constants/actionTypes';
import { toApiFactDate, toFactDate } from '../../utils/date';
import config from '../../constants/config';

const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;
const IMAGES_PER_LOAD = 4;

const _fetchFacts = (timestamp, factsState) => {

	return new Promise(async (resolve, reject) => {	
		if (isNaN(timestamp)) {
			reject('Timestamp is not a number.');
		}
		try {
			const { facts, selectedDate } = factsState;
			// [month]/[day] -> 12/30
			const factApiDate = toApiFactDate(timestamp);
			// facts - events, births, deaths
			const response = await axios.get(`http://history.muffinlabs.com/date/${factApiDate}`);
			const { data, date } = response.data;

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

export const fetchFactsImages = (date, category, facts, filterSort, lastImgIndex = 0) => async dispatch => {
	
	if (!date || !category || !filterSort || _.isEmpty(facts[date])) return;

	let selectedFacts = facts[date][category];

	const firstAwaitingIndex = lastImgIndex === 0 ? 0 : lastImgIndex+1;
	// facts which will receive images
	let factsAwaitingImgs = selectedFacts.slice(firstAwaitingIndex, firstAwaitingIndex+1+IMAGES_PER_LOAD);

	if (_.isEmpty(factsAwaitingImgs)) return; 

	const imagesUrl = `${API_ROOT_URL}/wikiImages?pageTitles=`;

	const factsTitles = factsAwaitingImgs.map(fact => fact.links[0].title);
	if (!factsTitles.length) return; 

	const pageTitlesQuery = factsTitles.join('|');

	try {
		const { data } = await axios.get(imagesUrl+pageTitlesQuery);	

		// add img urls to facts
		factsAwaitingImgs = factsAwaitingImgs.map((fact, i) => {
			if (!data[i] || !data[i].src) {
				return fact;
			}

			fact.img = data[i].src;

			return fact;
		});

		// all currently selected facts after images were added
		let factsWithImages = {};
		factsWithImages[category] = [
			...selectedFacts.slice(0, firstAwaitingIndex),
			...factsAwaitingImgs,
			...selectedFacts.slice(firstAwaitingIndex+factsAwaitingImgs.length)
		];

		// get a new index of the last fact with an image
		let metaImgIndexes = _.get(facts[date], `meta.images[${category}]`, {});

		if (filterSort === 'latest') {
			const prevLastFromLatest = metaImgIndexes.lastFromLatest || -1;
			metaImgIndexes.lastFromLatest = data.length + prevLastFromLatest;
		} else {
			const prevLastFromOldest = metaImgIndexes.lastFromOldest || -1;
			metaImgIndexes.lastFromOldest = data.length + prevLastFromOldest;
		}

		
		let updatedMeta = facts[date].meta || {};
		updatedMeta.images = updatedMeta.images || {};
		updatedMeta.images[category] = metaImgIndexes;
		

		let factsForDay = {};
		factsForDay[date] = { 
			...facts[date],
			...factsWithImages, 
			meta: { 
				...updatedMeta
			}
		}

		facts = { ...facts, ...factsForDay }

		dispatch({
			type: FETCH_FACTS_IMAGES,
			facts
		});
	} catch(e) {
		console.log(e);
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

export const changeFactsFilter = (filter) => {
	return {
		type: CHANGE_FACTS_FILTER,
		filter
	}
}

export const changeCategory = (category) => {
	return {
		type: CHANGE_FACTS_CATEGORY,
		category
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