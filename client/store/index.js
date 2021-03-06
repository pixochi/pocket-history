import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';

// MIDDLEWARES
import { createLogger } from 'redux-logger'; //logs changes of state to console
import thunk from 'redux-thunk'; // async actions
import promiseMiddleware from 'redux-promise-middleware';
import { offline } from 'redux-offline';
import config from 'redux-offline/lib/defaults';
import { createFilter, createBlacklistFilter  } from 'redux-persist-transform-filter';

import rootReducer from './rootReducer';

import appConfig from '../constants/config';


const ENV = appConfig.env;

// redux-offline configuration
const offlineConfig = {
  ...config,
  effect: (effect, action) => axios(effect),
  persistOptions: {
    transforms: [
      createFilter('historyOnDay', ['facts']),
      createFilter('news', ['articles', 'lastTimeFetched']),
      createFilter('adMob', ['counter']),
      createFilter('happenedSooner', ['score', 'bestScore']),
      createBlacklistFilter('factDetail', ['books', 'videos', 'timeline', 'error', 'isLoading', 'selectedRoute' ]),
      createBlacklistFilter('favorite', ['filter']),
      createBlacklistFilter('persist', ['rehydrated']),
      createBlacklistFilter('toast', ['message', 'error', 'warning', 'duration']),
      createBlacklistFilter('modal', ['isVisible', 'currentName'])
    ]
  }
};

let middleware = [thunk, promiseMiddleware()];
if(ENV !== 'production'){
  const reduxLogger = createLogger();
  middleware = [...middleware, reduxLogger]
}

const configureStore = new Promise((resolve, reject) => {
  try {
    const store = createStore(
      rootReducer,
      {},
      compose(
        offline(offlineConfig),
        applyMiddleware(...middleware)
      )
    );
    resolve(store);
  } catch(e) {
    reject(e);
  }
});


export default configureStore;