import _ from 'lodash';

import { 
	FETCH_GAME_FACTS, 
	GET_FACTS_FROM_STATE, 
	GET_GAME_FACTS,
	FLIP_GAME_CARDS,
	SELECT_ANSWER,
} from '../../constants/actionTypes';
import { getRandomNumber } from '../../utils/random';
import { getDateNums, getYear } from '../../utils/date';


export const fetchFacts = () => (dispatch, getState) => {
	const { online } = getState();

	dispatch(getFactsFromState());

	// return {
	// 	type: FETCH_GAME_FACTS,

	// }
}

export const getGameFacts = (facts) => {
	let fact1 = getRandomFact(facts);
	fact1.id = 0;
	let fact2 = getRandomFact(facts);
	fact2.id = 1;
	const gameFacts = [ fact1, fact2 ]

	return {
		type: GET_GAME_FACTS,
		gameFacts
	}
}

export const flipCards = () => {
	return {
		type: FLIP_GAME_CARDS
	}
}

// @param correct bool
export const selectAnswer = (correct) => {
	return {
		type: SELECT_ANSWER,
		correct
	}
}

const getFactsFromState = () => (dispatch, getState) => {
	const { historyOnDay: { facts } } = getState();
	let events = {};
	
	if (!facts) { return; }

	for (date in facts) {
		events[date] = facts[date].Events;
	}

	dispatch({
		type: GET_FACTS_FROM_STATE,
		facts: events
	});
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