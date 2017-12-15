import _ from 'lodash';
import { 
  FETCH_GAME_FACTS, 
  GET_FACTS_FROM_STATE,
  GET_GAME_FACTS,
  FLIP_GAME_CARDS,
  SELECT_ANSWER,
} from '../../constants/actionTypes';


const defaultState = {
  facts: {},
  gameFacts: [],
  flip: false,
  score: 0,
  bestScore: 0,
  isLoading: false,
  error: false,
}

const happenedSoonerReducer = (state = defaultState, action) => {
  switch(action.type) {

    case GET_FACTS_FROM_STATE:
      return { ...state, facts: { ...state.facts, ...action.facts }}
    case GET_GAME_FACTS:
      return { ...state, gameFacts: action.gameFacts }
    case FLIP_GAME_CARDS:
      return { ...state, flip: !state.flip }
    case SELECT_ANSWER:
      const newScore = action.correct ? state.score + 1 : 0;
      const newBestScore = (newScore > state.bestScore) ? newScore : state.bestScore;
      return { ...state, score: newScore, bestScore: newBestScore }
    case `${FETCH_GAME_FACTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${FETCH_GAME_FACTS}_FULFILLED`:      
      return {
        ...state,
        isLoading: false,
        facts: { ...state.facts, ...action.payload },
      }
    case `${FETCH_GAME_FACTS}_REJECTED`:
      return { ...state, isLoading: false, error: true };

    default:
      return state;
  }
}




export default happenedSoonerReducer;