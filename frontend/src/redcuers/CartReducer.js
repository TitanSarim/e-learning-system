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

    ADD_TO_WISH_LIST_REQUEST,
    ADD_TO_WISH_LIST_SUCCESS,
    ADD_TO_WISH_LIST_FAIL,

    GET_FROM_WISH_LIST_REQUEST,
    GET_FROM_WISH_LIST_SUCCESS,
    GET_FROM_WISH_LIST_FAIL,

    REMOVE_FROM_WISH_LIST_REQUEST,
    REMOVE_FROM_WISH_LIST_SUCCESS,
    REMOVE_FROM_WISH_LIST_FAIL,

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


export const wishListReducer = (state = {wishList: []}, action) =>{


    switch(action.type){

        case ADD_TO_WISH_LIST_REQUEST:
        case GET_FROM_WISH_LIST_REQUEST:
        case REMOVE_FROM_WISH_LIST_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case ADD_TO_WISH_LIST_SUCCESS:
        case GET_FROM_WISH_LIST_SUCCESS:
        case REMOVE_FROM_WISH_LIST_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                wishList: action.payload,
            }

        case ADD_TO_WISH_LIST_FAIL:
        case GET_FROM_WISH_LIST_FAIL:
        case REMOVE_FROM_WISH_LIST_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                wishList: null,
                wishListError: action.payload,
            };
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                wishListError: null,
            }
            
        default:
            return state; 
    }
}