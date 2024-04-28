import {
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_FAIL,
    GET_ALL_HR_JOB_REQUEST,
    GET_ALL_HR_JOB_SUCCESS,
    GET_ALL_HR_JOB_FAIL,
    GET_SINGLE_HR_JOB_REQUEST,
    GET_SINGLE_HR_JOB_SUCCESS,
    GET_SINGLE_HR_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAIL,
    GET_ALL_PUBLIC_JOB_REQUEST,
    GET_ALL_PUBLIC_JOB_SUCCESS,
    GET_ALL_PUBLIC_JOB_FAIL,
    CLEAR_ERRORS
} from '../constants/JobConstants'


export const hrJobReducer = (state = {jobs: []}, action) =>{


    switch(action.type){

        case CREATE_JOB_REQUEST:
        case UPDATE_JOB_REQUEST:
        case GET_ALL_HR_JOB_REQUEST:
        case GET_SINGLE_HR_JOB_REQUEST:
        case DELETE_JOB_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case CREATE_JOB_SUCCESS:
        case UPDATE_JOB_SUCCESS:
        case GET_ALL_HR_JOB_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                jobs: action.payload,
            }

        case GET_SINGLE_HR_JOB_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                job: action.payload,
            }
        
        case DELETE_JOB_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
            }

        case CREATE_JOB_FAIL:
        case UPDATE_JOB_FAIL:
        case GET_ALL_HR_JOB_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                jobs: null,
                error: action.payload,
            };
        
        case GET_SINGLE_HR_JOB_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                job: null,
                error: action.payload,
            };
        
        case DELETE_JOB_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false, 
                error: action.payload,
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }
            
        default:
            return state; 
    }
}



export const publicJobReducer = (state = {jobs: []}, action) =>{

    switch(action.type){

        case GET_ALL_PUBLIC_JOB_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case GET_ALL_PUBLIC_JOB_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                jobs: action.payload,
            }
        
        case GET_ALL_PUBLIC_JOB_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                jobs: null,
                error: action.payload,
            }


        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }


        default:
            return state; 
    }

}