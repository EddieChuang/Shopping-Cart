"use strict"

// CART REEUCERS
export function cartReducers(state={cart:[]}, action){
    
    console.log("cartReducers", action);    
    switch(action.type){
        case "ADD_TO_CART":
            return {cart:[...state.cart, ...action.payload]};
    }
    
    return state;
}