import axios from 'axios';
import _ from 'lodash';
import config from '../../constants/config';

import { 
	FETCH_GAME_FACTS, 
	GET_FACTS_FROM_STATE, 
	GET_GAME_FACTS,
	FLIP_GAME_CARDS,
	SELECT_ANSWER,
	START_GAME,
	STOP_GAME,
	CHANGE_TIMER,
	OPEN_RESULT,
	CLOSE_RESULT
} from '../../constants/actionTypes';
import { getRandomNumber } from '../../utils/random';
import { getDateNums, getYear, toApiFactDate } from '../../utils/date';


const ENV = config.env;
const API_ROOT_URL = config[ENV].apiRootUrl;

const fetchFacts = (state) => {
	return new Promise((resolve, reject) => {
		// const { online } = getState();
		const stateFacts = getFactsFromState(state);
		console.log('STATE FACTS')
		console.log(stateFacts)
		resolve(stateFacts);
	});
	
	// return {
	// 	type: FETCH_GAME_FACTS,

	// }
}

const getGameFacts = (state) => {
	return new Promise(async (resolve, reject) => {
		try {
			const facts = await fetchFacts(state);
			let fact1 = getRandomFact(facts);
			fact1.id = 0;
			let fact2 = getRandomFact(facts);
			fact2.id = 1;
			const gameFacts = [fact1, fact2]

			resolve(gameFacts);
		} catch(e) {
			console.log(e);
			reject(e);
		}
	});
}

let gameTimer = null;

export const startGame = () => async (dispatch, getState) => {
	clearInterval(gameTimer);
	const state = getState();
	const gameFacts = await getGameFacts(state);
	dispatch({
		type: START_GAME,
		gameFacts
	});
	gameTimer = setInterval(() => dispatch({type: CHANGE_TIMER, timeEdit: -1}), 1000);	
}

export const stopGame = () => {
	clearInterval(gameTimer);
	return {
		type: STOP_GAME
	}
}

export const flipCards = (flip) => {
	return {
		type: FLIP_GAME_CARDS,
		flip
	}
}

export const selectAnswer = (isCorrect) => dispatch => {
	dispatch(stopGame());
	dispatch(flipCards(true));
	setTimeout(() => {
		dispatch(openResult(isCorrect));
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
			const factDate = toApiFactDate(timestamp)
			bulkDates.push(factDate);
		}

		const response = await axios.get(`${API_ROOT_URL}/facts?date=${factApiDate}`);
		const { data, date } = response.data;
	});
}

const getFactsFromState = (state) => {
	const { historyOnDay: { facts } } = state;
	let events = {};
	if (!facts) { return; }

	for (date in facts) {
		events[date] = facts[date].Events;
	}

	return events;
}

const getRandomFact = (facts) => {
  if (_.isEmpty(facts)) { return null; }

  const factsKeys = Object.keys(facts);
  const factDaysLength = factsKeys.length - 1;
  const randomDateNum = getRandomNumber(0, factDaysLength);
  const factsSet = facts[factsKeys[randomDateNum]];
  const randomFactNum = getRandomNumber(0, factsSet.length -1);
  const { day, month } = getDateNums(new Date(factsKeys[randomDateNum]).getTime());

  let randomFact = factsSet[randomFactNum];
  const factTimestamp = new Date(getYear(randomFact.year), month, day).getTime();

  randomFact.timestamp = factTimestamp;

  console.log(randomFact);
  return randomFact;
}