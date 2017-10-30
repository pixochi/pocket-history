import axios from 'axios';

import { 
	FETCH_FACTS, 
	CHANGE_DATE 
} from '../../constants/actionTypes';
import { textDateToNumbers } from '../../utils/date';


// fetch facts for the selected date
export const fetchFacts = (date) => dispatch => {

// [month]/[day]
const apiDateFormat = textDateToNumbers(date);

// facts - events, births, deaths
const factsPromise = axios.get(`http://history.muffinlabs.com/date/${apiDateFormat}`);

dispatch({ type: FETCH_FACTS, payload: factsPromise })
  .catch(e => console.log(e));
}

export const changeDate = (newDate) => {
	return {
		type: CHANGE_DATE,
		date: newDate
	}
}