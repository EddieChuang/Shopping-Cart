"use strict"

// CART REEUCERS
export function cartReducers(state={cart:[]}, action){
    
    console.log("cartReducers", action);    
    switch(action.type){
        
        case "GET_CART":
            return {
                ...state,
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                quantity: totals(action.payload).quantity
                
            };

        case "ADD_TO_CART":
            let newCart = [...state.cart, ...action.payload];
            return {
                cart:newCart,
                totalAmount: totals(newCart).amount,
                quantity: totals(newCart).quantity
                
            };
        
        case "UPDATE_CART":
           
            return { 
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                quantity: totals(action.payload).quantity
                
            };

        case "DELETE_CART_ITEM":
            return {
                cart:[...action.payload],
                totalAmount: totals(action.payload).amount,    
                quantity: totals(action.payload).quantity
            };
    }
    
    return state;
}

export function totals(payloadArr){

    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0);

    const totalQty = payloadArr.map(function(cartArr){
        return cartArr.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0);


    return {
        amount: totalAmount.toFixed(2),
        quantity: totalQty
    };
}

