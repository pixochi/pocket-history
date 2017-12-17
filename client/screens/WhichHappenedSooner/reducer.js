import _ from 'lodash';
import { 
  FETCH_GAME_FACTS_PENDING,
  FLIP_GAME_CARDS,
  SELECT_ANSWER,
  START_GAME,
  STOP_GAME,
  GAME_ERROR,
  CHANGE_TIMER,
  OPEN_RESULT,
  CLOSE_RESULT
} from '../../constants/actionTypes';


const defaultState = {
  facts: {},
  gameFacts: [],
  flip: false,
  score: 0,
  bestScore: 0,
  started: false,
  timer: 15, // number of seconds
  isResultOpen: false,
  isCorrect: false,
  isLoading: false,
  error: '',
}

const happenedSoonerReducer = (state = defaultState, action) => {
  switch(action.type) {

    case FLIP_GAME_CARDS:
      return { ...state, flip: action.flip }
    case START_GAME:
      return { 
        ...state, 
        started: true,
        isLoading: false,
        flip: false,
        timer: defaultState.timer,
        facts: action.facts,
        gameFacts: action.gameFacts 
      }
    case STOP_GAME: 
      return { ...state, flip: true, score: 0 }
    case GAME_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case CHANGE_TIMER:
      return { ...state, timer: state.timer + action.timeEdit }
    case SELECT_ANSWER:
      const newScore = action.isCorrect ? state.score + 1 : 0;
      const newBestScore = (newScore > state.bestScore) ? newScore : state.bestScore;
      return { ...state, score: newScore, bestScore: newBestScore }
    case OPEN_RESULT:
      return { ...state, isResultOpen: true, isCorrect: action.isCorrect }
    case CLOSE_RESULT: 
      return { ...state, isResultOpen: false }
    case FETCH_GAME_FACTS_PENDING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}




export default happenedSoonerReducer;