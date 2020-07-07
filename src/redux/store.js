import { createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import {persistStore} from 'redux-persist'

const middlewares = [];


// this is for not seing the logger during production and tests
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};