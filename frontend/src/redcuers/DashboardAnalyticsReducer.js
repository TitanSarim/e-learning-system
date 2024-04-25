import {
    GET_DASHBOARD_ANALYTICS_REQUEST,
    GET_DASHBOARD_ANALYTICS_SUCCESS,
    GET_DASHBOARD_ANALYTICS_FAIL,
    CLEAR_ERRORS
} from '../constants/AnalyticsConstants'

export const dashboardAnalyticsReducer = (state = {analytics: []}, action) =>{


    switch(action.type){

        case GET_DASHBOARD_ANALYTICS_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case GET_DASHBOARD_ANALYTICS_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                analytics: action.payload,
            }

        case GET_DASHBOARD_ANALYTICS_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                analytics: null,
                error: action.payload,
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