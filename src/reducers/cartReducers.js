"use strict"

// CART REEUCERS
export function cartReducers(state={cart:[]}, action){
    
    console.log("cartReducers", action);    
    switch(action.type){
        case "ADD_TO_CART":
            return {cart:[...state.cart, ...action.payload]};
        
        case "UPDATE_CART":
            const currentCartToUpdate = [...state.cart];
            const indexToUpdate = currentCartToUpdate.findIndex(function(cart){
                return cart._id === action.payload._id;
            });
            
            const newCartToUpdate = {
                ...currentCartToUpdate[indexToUpdate],
                quantity: currentCartToUpdate[indexToUpdate].quantity + action.payload.unit
            };

            let cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCartToUpdate, ...currentCartToUpdate.slice(indexToUpdate + 1)];

            return { 
                ...state,
                cart: cartUpdate
            };

        case "DELETE_CART_ITEM":
            return {cart:[...action.payload]};

    }
    
    return state;
}