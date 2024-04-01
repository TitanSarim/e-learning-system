import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_FROM_CART_REQUEST,
    GET_FROM_CART_SUCCESS,
    GET_FROM_CART_FAIL,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,

    CLEAR_ERRORS
} from '../constants/CartConstants'

export const cartReducer = (state = {cart: []}, action) =>{


    switch(action.type){

        case ADD_TO_CART_REQUEST:
        case GET_FROM_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case ADD_TO_CART_SUCCESS:
        case GET_FROM_CART_SUCCESS:
        case REMOVE_FROM_CART_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                cart: action.payload,
            }

        case ADD_TO_CART_FAIL:
        case GET_FROM_CART_FAIL:
        case REMOVE_FROM_CART_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                cart: null,
                cartError: action.payload,
            };
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                cartError: null,
            }
            
        default:
            return state; 
    }
}