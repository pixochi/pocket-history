import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';

// MIDDLEWARES
import { createLogger } from 'redux-logger'; //logs changes of state to console
import thunk from 'redux-thunk'; // async actions
import promiseMiddleware from 'redux-promise-middleware';
import { offline } from 'redux-offline';
import config from 'redux-offline/lib/defaults';
import { createFilter } from 'redux-persist-transform-filter';

import rootReducer from './rootReducer';

// shows all dispatched actions in the console
const reduxLogger = createLogger();

// redux-offline configuration
const offlineConfig = {
  ...config,
  effect: (effect, action) => axios(effect),
  // persistOptions: {
  //   transforms: [
  //     createFilter('historyOnDay', ['facts'])
  //   ]
  // }
};

const configureStore = new Promise((resolve, reject) => {
  try {
    const store = createStore(
      rootReducer,
      {},
      compose(
        offline(offlineConfig),
        applyMiddleware(thunk, reduxLogger, promiseMiddleware()),
      )
    );
    resolve(store);
  } catch(e) {
    reject(e);
  }
});


export default configureStore;