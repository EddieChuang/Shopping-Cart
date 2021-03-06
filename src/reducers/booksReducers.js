"use strict"

// BOOKS REDUCER
export function booksReducers(state={
    books:[]
    }, action){

    console.log("booksReducers", action);
    switch(action.type){
        case "GET_BOOK":
            return {...state, books:[...action.payload]};
        
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {
                books:[...state.books, ...action.payload], 
                msg:'Saved! Click to continue', 
                style:'success',
                validation:'success'
            };

        case "POST_BOOK_REJECTED":
            return {
                ...state, 
                msg:'Please, try again',
                style:'danger',
                validation:'error'
            };

        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                
                return book._id.toString() === action.payload._id;
            })
            console.log(indexToDelete);
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

        case "RESET_BUTTON":
             return {
                 ...state,
                 msg:null, 
                 style:'primary',
                 validation:null
                 
                };
        
    }
    // Reducer "books" returned undefined during initialization.
    return state;

}