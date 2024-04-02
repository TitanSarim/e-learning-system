import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/OrderConstants'

export const orderReducer = (state = {order: []}, action) =>{


    switch(action.type){

        case ORDER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
                success: false,
            }

        case ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                order: action.payload,
                success: true,
            }

        case ORDER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                order: null,
                error: action.payload,
                success: false,
            };
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }
            
        default:
            return state; 
    }
}