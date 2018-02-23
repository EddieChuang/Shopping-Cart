"user strict"
import {combineReducers} from 'redux';
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

console.log("combineReducers");    
export default combineReducers({
    books: booksReducers,
    cart: cartReducers
})
