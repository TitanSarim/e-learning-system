import {
    GET_DASHBOARD_ANALYTICS_REQUEST,
    GET_DASHBOARD_ANALYTICS_SUCCESS,
    GET_DASHBOARD_ANALYTICS_FAIL,
    CLEAR_ERRORS
} from '../constants/AnalyticsConstants'
import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = "http://localhost:3900" 
//const BASE_URL = "http://40.124.120.87:3900" //Azure API endpoint

export const getDashboardAnalytics = () => async (dispatch) => {

    try {

        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: GET_DASHBOARD_ANALYTICS_REQUEST });


        const { data } = await axios.get( `${BASE_URL}/api/v1/get-analytics`, ConfigApplicationJson);

        dispatch({ type: GET_DASHBOARD_ANALYTICS_SUCCESS, payload: data.analytics });

    } catch (error) {
        dispatch({
            type: GET_DASHBOARD_ANALYTICS_FAIL,
            payload: error?.response?.data.message,
        });
        console.log("error", error);
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  