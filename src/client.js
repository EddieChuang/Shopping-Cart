"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provodier, Provider} from 'react-redux';


import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
import logger from 'redux-logger';

import BooksList from './components/pages/BooksList';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Main from './components/Main';



const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);
// store.subscribe(function(){
//     console.log('current state is: ', store.getState());
// })
console.log(store.getState());
console.log("ReactDOM start");

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(
    
    Routes, document.getElementById("app")
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

