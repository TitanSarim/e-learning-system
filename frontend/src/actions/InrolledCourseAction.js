import {
    GET_ALL_INROLLED_COURSES_REQUEST,
    GET_ALL_INROLLED_COURSES_SUCCESS,
    GET_ALL_INROLLED_COURSES_FAIL,
    GET_SINGLE_INROLLED_COURSES_REQUEST,
    GET_SINGLE_INROLLED_COURSES_SUCCESS,
    GET_SINGLE_INROLLED_COURSES_FAIL,
    CLEAR_ERRORS
} from '../constants/CoursesConstants'
// import {ConfigApplicationJson} from './Config'
import axios from 'axios'
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3900';


export const GetAllInrolledCourses = () => async (dispatch) => {
    try {

      const token = Cookies.get('token');

      const ConfigApplicationJson = { headers: 
        { 
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
      }

      console.log("ConfigApplicationJson", ConfigApplicationJson)

      dispatch({ type: GET_ALL_INROLLED_COURSES_REQUEST });
  

      const { data } = await axios.get(`${BASE_URL}/api/v1/get-all-inrolled-courses`, ConfigApplicationJson);
  
      dispatch({
        type: GET_ALL_INROLLED_COURSES_SUCCESS,
        payload: data.InrolledCourses,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_INROLLED_COURSES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
export const GetSingleInrolledCourse = (formData) => async (dispatch) => {


  try {

    const token = Cookies.get('token');

      const ConfigApplicationJson = { headers: 
        { 
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
      }

    dispatch({ type:   GET_SINGLE_INROLLED_COURSES_REQUEST});


    const { data } = await axios.post(`${BASE_URL}/api/v1/get-single-inrolled-course`, formData, ConfigApplicationJson);

    dispatch({ type: GET_SINGLE_INROLLED_COURSES_SUCCESS, payload: data.InrolledCourses});
  } catch (error) {
    dispatch({
      type: GET_SINGLE_INROLLED_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};
  

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  