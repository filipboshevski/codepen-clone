import { applyMiddleware, createStore } from 'redux';
import rootReducer from './RootReducer';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { rootSagaReducer } from '../redux-saga/RootReducerSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSagaReducer);

export default store;