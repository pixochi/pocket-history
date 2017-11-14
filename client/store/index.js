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

let { NODE_ENV } = process.env;
NODE_ENV = 'production';
NODE_ENV = 'dev';

// redux-offline configuration
const offlineConfig = {
  ...config,
  effect: (effect, action) => axios(effect),
  persistOptions: {
    transforms: [
      createFilter('historyOnDay', ['facts']),
      createBlacklistFilter('auth'),
      createBlacklistFilter('factDetail', ['books', 'videos']),
      createBlacklistFilter('persist', ['rehydrated']),      
    ]
  }
};

let middleware = [thunk, promiseMiddleware()];
if(NODE_ENV !== 'production'){
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