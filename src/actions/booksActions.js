"use strict"

export function getBooks(){
    return {
        type:"GET_BOOK"
    }
}

export function postBooks(book){
    return {
        type:"POST_BOOK", 
        payload: book
    }
}

export function deleteBooks(_id){
    return {
        type:"DELETE_BOOK", 
        payload: {_id: _id}
    }
}

export function updateBooks(book){
    return {
        type:"UPDATE_BOOK", 
        payload: book
    }
}