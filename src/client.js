"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

import reducers from './reducers';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';


import routes from './routes';


const middleware = applyMiddleware(thunk, logger);
const initialState = window.INITIAL_STATE;

const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

console.log("ReactDOM start");
ReactDOM.render(
    Routes, document.getElementById("app")
);
console.log("ReactDOM end");