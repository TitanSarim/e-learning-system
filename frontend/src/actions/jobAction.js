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
import Cookies from 'js-cookie';
import axios from 'axios'

const BASE_URL = 'http://localhost:3900';


export const createJob = (formData) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: CREATE_JOB_REQUEST });

            
        const { data } = await axios.post( `${BASE_URL}/api/v1/create-job`, formData, ConfigApplicationJson);
    
        dispatch({ type: CREATE_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: CREATE_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const UpdateJob = (formData, slug) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: UPDATE_JOB_REQUEST });

            
        const { data } = await axios.put(`${BASE_URL}/api/v1/update-job/${slug}`, formData, ConfigApplicationJson);
    
        dispatch({ type: UPDATE_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const UpdateJobStatus = (formData, slug) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: UPDATE_JOB_REQUEST });

            
        const { data } = await axios.put(`${BASE_URL}/api/v1/update-job-status/${slug}`, formData, ConfigApplicationJson);
    
        dispatch({ type: UPDATE_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};

export const GetAllHRJobs = () => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: GET_ALL_HR_JOB_REQUEST });

            
        const { data } = await axios.get( `${BASE_URL}/api/v1/get-all-hr-job`, ConfigApplicationJson);
    
        dispatch({ type: GET_ALL_HR_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: GET_ALL_HR_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};


export const GetSingleHrJob = (slug) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: GET_SINGLE_HR_JOB_REQUEST });

            
        const { data } = await axios.get( `${BASE_URL}/api/v1/get-single-hr-job/${slug}`, ConfigApplicationJson);
    
        dispatch({ type: GET_SINGLE_HR_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: GET_SINGLE_HR_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};

export const DeleteJob = (slug) => async (dispatch) => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
    
        dispatch({ type: DELETE_JOB_REQUEST });

            
        const { data } = await axios.delete(`${BASE_URL}/api/v1/delete-job/${slug}`, ConfigApplicationJson);
    
        dispatch({ type: DELETE_JOB_SUCCESS, payload: data });
  
    } catch (error) {
        dispatch({
            type: DELETE_JOB_FAIL,
            payload: error?.response?.data.message,
        });
    }
};


export const GetAllPublicJobs = (page, filters) => async (dispatch) => {

    try {
    
        dispatch({ type: GET_ALL_PUBLIC_JOB_REQUEST });

        let queryString = `?page=${page}`;
        if (filters) {
            Object.keys(filters).forEach(key => {
                queryString += `&${key}=${filters[key]}`;
            });
        }

        const { data } = await axios.get( `${BASE_URL}/api/v1/get-all-jobs-public${queryString}`,);
    
        dispatch({ type: GET_ALL_PUBLIC_JOB_SUCCESS, payload: data.jobs });
  
    } catch (error) {
        dispatch({
            type: GET_ALL_PUBLIC_JOB_FAIL,
            payload: error?.response?.data.message,
        });
      console.log("error", error);
    }
};

export const ApplyOnJob = (formData) => async () => {

    try {
    
        const token = Cookies.get('token');

        const ConfigApplicationJson = { headers: 
            { 
            "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }
            
        await axios.post( `${BASE_URL}/api/v1/apply-on-job`, formData, ConfigApplicationJson);
    
  
    } catch (error) {
        console.log("error", error);
    }
};

export const ClearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  