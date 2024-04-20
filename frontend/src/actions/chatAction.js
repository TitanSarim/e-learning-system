import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../constants/ChatConstants'

import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = 'http://localhost:3900';

export const sendMessage = (formData) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: SEND_MESSAGE_REQUEST });

            
        const { data } = await axios.post( `${BASE_URL}/api/v1/send-job-message`, formData, ConfigApplicationJson);
    
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.messageData });
  
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};

export const sendJobSeekerMessage = (formData) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: SEND_MESSAGE_REQUEST });

            
        const { data } = await axios.post( `${BASE_URL}/api/v1/send-job-seeker-message`, formData, ConfigApplicationJson);
    
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.messageData });
  
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const getMessages = () => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: GET_MESSAGES_REQUEST });

            
        const { data } = await axios.get( `${BASE_URL}/api/v1/get-job-messages`, ConfigApplicationJson);
    
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data.messageData });
  
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const getJobSeekerMessages = () => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: GET_MESSAGES_REQUEST });

            
        const { data } = await axios.get( `${BASE_URL}/api/v1/get-job-seeker-messages`, ConfigApplicationJson);
    
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data.messageData });
  
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const chatClearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};