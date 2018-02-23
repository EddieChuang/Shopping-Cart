"use strict"

// BOOKS REDUCER
export function booksReducers(state={
    books:[{
        _id:1,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 33.33
    },
    {
        _id: 2,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 44.44
    }]
    }, action){

    console.log("booksReducers", action);
    switch(action.type){
        case "GET_BOOK":
            return {...state, books:[...state.books]};
            break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload]};
            break;

        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                return book._id === action.payload._id;
            })
            return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]};
           
        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(function(book){
                return book._id === action.payload._id;
            });
            
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };
            // console.log('what is it newBookToUpdate', newBookToUpdate);
            return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]};

    }
    // Reducer "books" returned undefined during initialization.
    return state;

}