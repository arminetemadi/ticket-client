import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { history } from './history';
import { Router } from 'react-router-dom';
import './index.css';

import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

const sagaMiddleware = createSagaMiddleware();

const routersMiddleware = routerMiddleware(history);

const composeSetup =
	process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
    
export const store = createStore(
	IndexReducer,
	composeSetup(applyMiddleware(sagaMiddleware, routersMiddleware))
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
