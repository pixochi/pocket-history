import { 
  INIT_INTERSTITIAL, 
  SHOW_INTERSTITIAL,
  FETCH_FACTS,
  FETCH_NEWS,
  FETCH_FACT_BOOKS,
  FETCH_FACT_VIDEOS,
  FETCH_TIMELINE_FACTS,
} from '../../constants/actionTypes';


const defaultState = {
  initiated: false,
  factsCounter: 0,
  factDetailCounter: 0
}

const adMobReducer = (state = defaultState, action) => {
  switch(action.type) {
    case INIT_INTERSTITIAL:
      return { ...state, initiated: true };
    case SHOW_INTERSTITIAL: 
      let counterReset = {};
      counterReset[action.counterName] = 0;
      return { ...state, ...counterReset };
    case `${FETCH_FACTS}_FULFILLED`:
    case `${FETCH_NEWS}_FULFILLED`: 
      return { ...state, imagesCounter: ++state.factsCounter }
    case `${FETCH_FACT_BOOKS}_FULFILLED`:
    case `${FETCH_FACT_VIDEOS}_FULFILLED`:
    case `${FETCH_TIMELINE_FACTS}_FULFILLED`:
      return { ...state, factDetailCounter: ++state.factDetailCounter }
    default: 
      return state;
  }
}

export default adMobReducer;