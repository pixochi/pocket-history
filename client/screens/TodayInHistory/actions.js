import axios from 'axios';
import _ from 'lodash';

import { 
	FETCH_FACTS,
	FETCH_NEWS,
	CHANGE_DATE,
	CHANGE_FACTS_FILTER
} from '../../constants/actionTypes';
import { toApiFactDate, toFactDate } from '../../utils/date';
import config from '../../constants/config';

const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;

const _fetchFacts = (timestamp, dispatch, factsState) => {
	return new Promise(async (resolve, reject) => {	
		try {
			const { facts, selectedDate } = factsState;
			// [month]/[day] -> 12/30
			const factApiDate = toApiFactDate(timestamp);
			// facts - events, births, deaths
			const response = await axios.get(`http://history.muffinlabs.com/date/${factApiDate}`);
			const { data, date } = response.data;

			let titles = '';
			data['Births'].forEach((fact,i) => {

				titles += fact.links[0].title + '|';

				if (i === 49) {
					console.log(fact)
				}
				
			})
			console.log(titles)


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