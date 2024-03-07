import {
    CREATE_COURSES_REQUEST,
    CREATE_COURSES_SUCCESS,
    CREATE_COURSES_FAIL,

    CLEAR_ERRORS,
} from '../constants/CoursesConstants' 
import axios from 'axios'

// CREATE COURSES ACTIONS
export const adminCreateCourse = (formData) => async (dispatch) => {

    try {
        dispatch({type: CREATE_COURSES_REQUEST});
        
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        
        const {data} = await axios.post(`/api/v1/createCourse`, 
            formData,
            config
        )

        dispatch({type: CREATE_COURSES_SUCCESS, payload: data.courses});
        
    } catch (error) {
        dispatch({type: CREATE_COURSES_FAIL, payload: error.response.data.message});
    }

}



export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}