import { Notifications } from 'expo';
import axios from 'axios';
import _ from 'lodash';

import {
	FETCH_GAME_FACTS_PENDING, 
	FLIP_GAME_CARDS,
	SELECT_ANSWER,
	START_GAME,
	STOP_GAME,
	GAME_LOST,
	GAME_ERROR,
	CHANGE_TIMER,
	OPEN_RESULT,
	CLOSE_RESULT,
	SCHEDULE_GAME_NOTIFICATION
} from '../../constants/actionTypes';
import config from '../../constants/config';
import { getRandomNumber } from '../../utils/random';
import { getYear, toApiFactDate } from '../../utils/date';


const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;
const MONTHS =  [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const fetchFacts = (state) => {
	return new Promise(async (resolve, reject) => {
		const factsMin = 250; // min number of facts for start
		const avgEventsPerDay = 50; // average number of events in a set of facts
		let allFacts = {};
		const stateFacts = getFactsFromState(state);
		const stateFactsLength = Object.keys(stateFacts).length*avgEventsPerDay;
		allFacts = {...stateFacts};

		if (stateFactsLength < factsMin && state.offline.online) {
			try {
				const datesNum = Math.ceil((factsMin - stateFactsLength) / avgEventsPerDay);
				const apiFacts = await getFactsFromAPI(datesNum);
				allFacts = {...allFacts, ...apiFacts};
			} catch(e) {
				if (allFacts.length) {
					resolve(allFacts);
				} else {
					reject(e);
				}
			}
		}
		resolve(allFacts);
	});
}

const getGameFacts = (allFacts) => {
	let fact1 = getRandomFact(allFacts);
	fact1.id = 0;
	let fact2 = getRandomFact(allFacts);
	fact2.id = 1;
	const gameFacts = [fact1, fact2];

	return gameFacts;
}

let gameTimer = null;

export const startGame = () => async (dispatch, getState) => {
	clearInterval(gameTimer);
	const state = getState();
	let allFacts;

	try {
		const factsForGame = state.happenedSooner.facts;
		if (_.isEmpty(factsForGame)) {
			dispatch({ type: FETCH_GAME_FACTS_PENDING });
			allFacts = await fetchFacts(state)
		} else {
			allFacts = factsForGame;
		}

		if (Object.keys(allFacts).length === 0) {
			dispatch({
				type: GAME_ERROR,
				error: 'Sorry, the Internet connection appears to be offline and there are no saved facts on your device.'
			});
			return;
		}
		
		const gameFacts = getGameFacts(allFacts);
		dispatch({
			type: START_GAME,
			gameFacts,
			facts: allFacts
		});
		gameTimer = setInterval(() => dispatch({type: CHANGE_TIMER, timeEdit: -1}), 1000);	
	} catch(e) {
		console.log(e);
		dispatch({
			type: GAME_ERROR,
			error: 'Sorry, the Internet connection appears to be offline and there are no saved facts on your device.'
		});
	}
}

export const stopGame = () => (dispatch) => {
	clearInterval(gameTimer);
	dispatch({ type: STOP_GAME });
	dispatch(scheduleGameNotification());
}

export const scheduleGameNotification = () => (dispatch, getState) => {

	const { happenedSooner } = getState();

	if (!happenedSooner.isNotificationScheduled) {
		dispatch({type: SCHEDULE_GAME_NOTIFICATION});
		Notifications.cancelAllScheduledNotificationsAsync();

		const gameNotification = {
	    title: 'Beat Your Best Score',
	    body: 'It\'s time to pump those numbers up!' ,
	    sound: true,
	    vibrate: true,
	    priority: 'high', 
	  }
	  // SCHEDULING
	  let d = new Date();
		d.setHours(d.getHours() + 4);
		const schedulingOptions = {
	    time: d,
	    repeat: 'day',
	  };

	  Notifications.scheduleLocalNotificationAsync(gameNotification, schedulingOptions);
	}
}

export const flipCards = (flip) => {
	return {
		type: FLIP_GAME_CARDS,
		flip
	}
}

export const selectAnswer = (isCorrect) => dispatch => {
	clearInterval(gameTimer);
	dispatch(flipCards(true));
	setTimeout(() => {	
		dispatch(openResult(isCorrect));
		if (!isCorrect) {
			dispatch({ type: GAME_LOST });
		}
		dispatch({ type: SELECT_ANSWER, isCorrect});
	}, 500);
}

export const openResult = (isCorrect) => {
	return {
		type: OPEN_RESULT,
		isCorrect
	}
}

export const closeResult = () => {
	return {
		type: CLOSE_RESULT
	}
}

// @param numberOfDays int - for how many days to fetch facts
const getFactsFromAPI = (numberOfDays = 4) => {
	return new Promise(async (resolve, reject) => {

		const month = new Date().getMonth();
		const day = getRandomNumber(1, 31-numberOfDays);
		const randomDate = new Date(2017, month, day);
		let bulkDates = [];

		// create a bulk of dates
		for (let i = numberOfDays - 1; i >= 0; i--) {
			const nextDateTimestamp = randomDate.setDate(randomDate.getDate() + i);
			const factDate = toApiFactDate(nextDateTimestamp);
			bulkDates.push(factDate);
		}

		const datesParam = bulkDates.join(',');
		try {
			const { data } = await axios.get(`${API_ROOT_URL}/facts?date=${datesParam}`);
			let events = {};
			for (factDate of data) {
				events[factDate.date] = factDate.data.Events;
			}
			resolve(events);
		} catch(e) {
			console.log(e);
			reject(e);
		}
	});
}

const getFactsFromState = (state) => {
	const { happenedSooner, historyOnDay } = state;
	const factsForGame = happenedSooner.facts;
	const factsOnDay = historyOnDay.facts;
	const facts = {...factsForGame, ...factsOnDay}
	let events = {};
	if (!factsForGame && ! factsOnDay) { return; }

	for (date in facts) {
		// if facts[date] is undefined
		if (!facts[date]) { continue; }
		events[date] = facts[date].Events;
	}

	return events;
}

const getRandomFact = (facts) => {
  if (_.isEmpty(facts)) { return {}; }

  let factsKeys = Object.keys(facts);
  factsKeys = factsKeys.filter(factDate => factDate);
  const factDaysLength = factsKeys.length - 1;
  const randomDateNum = getRandomNumber(0, factDaysLength);
  const factsSet = facts[factsKeys[randomDateNum]];
  const randomFactNum = getRandomNumber(0, factsSet.length -1);
  const factDate = factsKeys[randomDateNum]; // factDate - "October 17"
  const arr = factDate.split(" ");
  month = MONTHS.findIndex(m => arr[0] === m);
  day = arr[1];
  let randomFact = factsSet[randomFactNum];
  const factTimestamp = new Date(getYear(randomFact.year), month, day).getTime();
 	randomFact.timestamp = factTimestamp;
  randomFact.date = `${month+1}/${day}`;

  return randomFact;
}