import _ from 'lodash';

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
import { getDateNums, getYear } from '../../utils/date';


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
		const facts = await fetchFacts(state);
		let fact1 = getRandomFact(facts);
		fact1.id = 0;
		let fact2 = getRandomFact(facts);
		fact2.id = 1;
		const gameFacts = [ fact1, fact2 ]

		resolve(gameFacts);
	});
}

let gameTimer = null;

export const startGame = () => async (dispatch, getState) => {
	const state = getState();
	const gameFacts = await getGameFacts(state);
	clearInterval(gameTimer);
	dispatch({
		type: START_GAME,
		gameFacts
	});
	gameTimer = setInterval(() => dispatch({type: CHANGE_TIMER, timeEdit: -1}), 1000);	
}

// export const continueGame = () => async (dispatch, getState) => {
// 	const state = getState();
// 	const gameFacts = await getGameFacts(state);
// 	clearInterval(gameTimer);
// 	dispatch({
// 		type: START_GAME,
// 		gameFacts
// 	});
// 	gameTimer = setInterval(() => dispatch({type: CHANGE_TIMER, timeEdit: -1}), 1000);	
// }

export const stopGame = () => {
	clearInterval(gameTimer);
	return {
		type: STOP_GAME
	}
}

export const flipCards = () => {
	return {
		type: FLIP_GAME_CARDS
	}
}

export const selectAnswer = (isCorrect) => dispatch => {
	dispatch(stopGame());
	dispatch(flipCards());
	setTimeout(() => {
		dispatch(openResult(isCorrect));
		dispatch({ type: SELECT_ANSWER, isCorrect});
	}, 600);
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