"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {Provodier, Provider} from 'react-redux';


import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
import logger from 'redux-logger';

import BooksList from './components/pages/BooksList'

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);
// store.subscribe(function(){
//     console.log('current state is: ', store.getState());
// })
console.log(store.getState());
console.log("ReactDOM start");
ReactDOM.render(
    <Provider store={store}>
        <BooksList />
    </Provider>
        , document.getElementById("app")
);
console.log("ReactDOM end");

// store.dispatch(postBooks(
    
// ));

// store.dispatch(deleteBooks({id:1}));

// store.dispatch(updateBooks(
//     {
//         id: 2,
//         title: 'Learning React in 24H',
//     }
// ));

// store.dispatch(addToCart([{id:3}]));

