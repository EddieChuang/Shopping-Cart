"use strict"
import axios from 'axios';

export function getBooks(){
    return function(dispatch){
        console.log("getBooks()");
        axios.get('/api/books')
          .then(function(response){
              console.log(response);
              dispatch({type:"GET_BOOK", payload:response.data})
          })
          .catch(function(err){
            dispatch({type:"GET_BOOK_REJECTED", payload:err})
        })
    }
    // return {
    //     type:"GET_BOOK"
    // }
}

export function postBooks(book){
    return function(dispatch){
        axios.post('/api/books', book)
          .then(function(response){
              dispatch({type:"POST_BOOK", payload:response.data})
          })
          .catch(function(err){
              dispatch({type:"POST_BOOK_REJECTED", payload:err})
          })
    }
    // return {
    //     type:"POST_BOOK", 
    //     payload: book
    // }
}

export function deleteBooks(_id){
    return function(dispatch){
        axios.delete('/api/books/'+_id)
          .then(function(response){
              dispatch({type:"DELETE_BOOK", payload:{_id:_id}})
          })
          .catch(function(err){
              dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
          })
    }
    // return {
    //     type:"DELETE_BOOK", 
    //     payload: {_id: _id}
    // }
}

export function updateBooks(book){
    return {
        type:"UPDATE_BOOK", 
        payload: book
    }
}

export function resetButton(book){
    return {
        type:"RESET_BUTTON"
    }
}