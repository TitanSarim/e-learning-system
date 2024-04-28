import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../constants/ChatConstants'

export const messageReducer = (state = {messageData: []}, action) =>{


    switch(action.type){

        case SEND_MESSAGE_REQUEST:
        case GET_MESSAGES_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case SEND_MESSAGE_SUCCESS:
        case GET_MESSAGES_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                messageData: action.payload,
            }

        case SEND_MESSAGE_FAIL:
        case GET_MESSAGES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                messageData: null,
                chatError: action.payload,
            };
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                chatError: null,
            }
            
        default:
            return state; 
    }
}
