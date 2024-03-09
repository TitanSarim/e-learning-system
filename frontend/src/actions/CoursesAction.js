import {
    CREATE_COURSES_REQUEST,
    CREATE_COURSES_SUCCESS,
    CREATE_COURSES_FAIL,

    CLEAR_ERRORS,
} from '../constants/CoursesConstants' 
import axios from 'axios'
import {uploadVideosToAzure} from '../middlewares/VideoUpload'

// CREATE COURSES ACTIONS
export const adminCreateCourse = (formData) => async (dispatch) => {

    console.log("formData123", formData)

    try {
        dispatch({type: CREATE_COURSES_REQUEST});
        
        const data = await createCourseWithFormData(formData);

        console.log("data", data)
        // dispatch({type: CREATE_COURSES_SUCCESS, payload: data.courses});
        
    } catch (error) {
        // dispatch({type: CREATE_COURSES_FAIL, payload: error.response.data.message});
        console.log("error", error)
    }

}

const createCourseWithFormData = async (formData) => {
    const { videoDivsArray, ...restFormData } = formData;

    const form = new FormData();

    Object.entries(restFormData).forEach(([key, value]) => {
        form.append(key, value);
    });

    const uploadedVideoUrls = await uploadVideosToAzure(videoDivsArray);

    console.log("uploadedVideoUrls", uploadedVideoUrls)

    const config = {
        headers: {
            "Content-Type": "application/json",
            // "Action": "application/json"
        },
    };

    return await axios.post(`/api/v1/createCourse`, form, config);
};



export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}