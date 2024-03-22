import{
    GET_MY_PROFILE_REQUEST,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAIL,
    UPDATE_MY_PROFILE_REQUEST,
    UPDATE_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_FAIL,

    CLEAR_ERRORS

} from '../constants/ProfileConstants'
import {uploadResumeToAzure} from '../middlewares/ResumeUpload'
import {uploadAvatarToAzure} from '../middlewares/AvatarUpload'

import axios from 'axios'

export const getMyProfile = () => async (dispatch) => {

    try {
        dispatch({type: GET_MY_PROFILE_REQUEST});

        const {data} = await axios.get(`/api/v1/get-my-profile`)

        dispatch({type: GET_MY_PROFILE_SUCCESS, payload: data?.myProfile});
        
    } catch (error) {
        dispatch({type: GET_MY_PROFILE_FAIL, payload: error?.response?.data.message});
    }

}


// Update profile
export const updateMyProfile = (formData, oldResume, NewAvatar) => async (dispatch) => {
    console.log("newAvatar234", NewAvatar)

    try {

        const {cv, ...restFormData } = formData;

        dispatch({type: UPDATE_MY_PROFILE_REQUEST});

        let uploadedResumeUrl = cv;
        if (cv && cv.name) {
            uploadedResumeUrl = await uploadResumeToAzure(cv, oldResume);
        }

        const jsonData = {
            ...restFormData,
            cv: uploadedResumeUrl,
        };



        const jsonString = JSON.stringify(jsonData);


        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/update-my-profile`, 
            jsonString,
            config
        )

        dispatch({type: UPDATE_MY_PROFILE_SUCCESS, payload: data?.myProfile});
        
    } catch (error) {
        dispatch({type: UPDATE_MY_PROFILE_FAIL, payload: error?.response?.data?.message});
    }

}


export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}