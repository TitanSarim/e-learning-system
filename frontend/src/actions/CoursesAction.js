import {
  CREATE_COURSES_REQUEST,
  CREATE_COURSES_SUCCESS,
  CREATE_COURSES_FAIL,
  GET_ALL_ADMIN_COURSES_REQUEST,
  GET_ALL_ADMIN_COURSES_SUCCESS,
  GET_ALL_ADMIN_COURSES_FAIL,
  GET_SINGLE_ADMIN_COURSES_REQUEST,
  GET_SINGLE_ADMIN_COURSES_SUCCESS,
  GET_SINGLE_ADMIN_COURSES_FAIL,
  UPDATE_ADMIN_COURSES_REQUEST,
  UPDATE_ADMIN_COURSES_SUCCESS,
  UPDATE_ADMIN_COURSES_FAIL,
  DELETE_ADMIN_COURSES_REQUEST,
  DELETE_ADMIN_COURSES_SUCCESS,
  DELETE_ADMIN_COURSES_FAIL,
  GET_ALL_PUBLIC_COURSES_REQUEST,
  GET_ALL_PUBLIC_COURSES_SUCCESS,
  GET_ALL_PUBLIC_COURSES_FAIL,
  GET_SINGLE_PUBLIC_COURSES_REQUEST,
  GET_SINGLE_PUBLIC_COURSES_SUCCESS,
  GET_SINGLE_PUBLIC_COURSES_FAIL,
  CLEAR_ERRORS,
} from "../constants/CoursesConstants";
import axios from "axios";
import { uploadVideosToAzure } from "../middlewares/CourseVideoUpload";
import { uploadImageToAzure } from "../middlewares/CourseImageUplaod";
import {updateUploadImageToAzure} from '../middlewares/CourseImageUpdate';
import {updateUploadVideosToAzure} from '../middlewares/CourseVideoUpdate'
import {deleteVideosFromAzure, deleteImageFromAzure} from '../middlewares/DeleteCourseDataAzure'
import Cookies from 'js-cookie';


const BASE_URL = 'http://localhost:3900';

// CREATE COURSES ACTIONS
export const adminCreateCourse = (formData, onProgress) => async (dispatch) => {

  try {
    dispatch({ type: CREATE_COURSES_REQUEST });

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    const { thumbnailFile, videoDivsArray, ...restFormData } = formData;

    const uploadedImageUrl = await uploadImageToAzure(thumbnailFile);
    const uploadedVideoUrls = await uploadVideosToAzure(
      videoDivsArray,
      onProgress
    );

    const jsonData = {
      ...restFormData,
      thumbnailUrl: uploadedImageUrl,
      videoUrls: uploadedVideoUrls,
    };

    const jsonString = JSON.stringify(jsonData);


    const { data } = await axios.post(
      `${BASE_URL}/api/v1/createCourse`,
      jsonString,
      ConfigApplicationJson
    );

    dispatch({ type: CREATE_COURSES_SUCCESS, payload: data.Admincourses });
  } catch (error) {
    dispatch({
      type: CREATE_COURSES_FAIL,
      payload: error.response.data.message,
    });
    console.log("error", error);
  }
};


// CREATE UPDATE COURSES ACTIONS
export const adminUpdateCourse = (formData, onProgress, slug, imgUrl) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_ADMIN_COURSES_REQUEST });

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    const { thumbnailFile, videoDivsArray, ...restFormData } = formData;

    let uploadedImageUrl = imgUrl
    if(thumbnailFile && thumbnailFile.name) {
      uploadedImageUrl = await updateUploadImageToAzure(formData, imgUrl);
    }

    const uploadedVideoUrls = await updateUploadVideosToAzure(
      videoDivsArray,
      onProgress
    );

    const jsonData = {
      ...restFormData,
      thumbnailUrl: uploadedImageUrl,
      videoUrls: uploadedVideoUrls,
    };

    const jsonString = JSON.stringify(jsonData);


    const { data } = await axios.put( `${BASE_URL}/api/v1/updateCourse/${slug}`, jsonString, ConfigApplicationJson);

    dispatch({ type: UPDATE_ADMIN_COURSES_SUCCESS, payload: data?.Admincourses });

  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_COURSES_FAIL,
      payload: error?.response?.data.message,
    });
    console.log("error", error);
  }
};


// DELETE COURSES ACTIONS
export const adminDeleteCourse = (formData, slug) => async (dispatch) => {

  try {
    dispatch({ type: DELETE_ADMIN_COURSES_REQUEST });

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    await deleteVideosFromAzure(formData[0].course_content.data)
    await deleteVideosFromAzure(formData[0].course_thumbnail)

    const { data } = await axios.delete( `${BASE_URL}/api/v1/delete-admin-course/${slug}`, ConfigApplicationJson);

    dispatch({ type: DELETE_ADMIN_COURSES_SUCCESS, payload: slug });

  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_COURSES_FAIL,
      payload: error?.response?.data.message,
    });
    console.log("error", error);
  }
};


// CREATE UPDATE COURSES ACTIONS
export const adminUpdateCourseStatus = (formData, slug) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_ADMIN_COURSES_REQUEST });

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    const { data } = await axios.put( `${BASE_URL}/api/v1/updateCourseStatus/${slug}`, formData, ConfigApplicationJson);

    dispatch({ type: UPDATE_ADMIN_COURSES_SUCCESS, payload: data?.Admincourses });

  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_COURSES_FAIL,
      payload: error?.response?.data.message,
    });
    console.log("error", error);
  }
};


// GET ADMIN COURSES ACTIONS
export const AdminGetCourses = () => async (dispatch) => {

  try {

    dispatch({ type: GET_ALL_ADMIN_COURSES_REQUEST });

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/get-all-admin-courses`, ConfigApplicationJson
    );

    dispatch({
      type: GET_ALL_ADMIN_COURSES_SUCCESS,
      payload: data.Admincourses,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADMIN_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};


// GET ADMIN COURSE ACTION
export const AdminGetSingleCourses = (slug) => async (dispatch) => {


  try {

    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    dispatch({ type:   GET_SINGLE_ADMIN_COURSES_REQUEST});


    const { data } = await axios.get(
      `${BASE_URL}/api/v1/get-single-admin-courses/${slug}`, ConfigApplicationJson
    );

    dispatch({ type: GET_SINGLE_ADMIN_COURSES_SUCCESS, payload: data.AdminSinglecourse});
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ADMIN_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get All Public Courses
export const PublicGetHomeCourses = () => async (dispatch) => {
  try {

    
    dispatch({ type: GET_ALL_PUBLIC_COURSES_REQUEST });


    const { data } = await axios.get(`${BASE_URL}/api/v1/get-all-public-courses-home`);

    dispatch({
      type: GET_ALL_PUBLIC_COURSES_SUCCESS,
      payload: data.Publiccourses,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PUBLIC_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const PublicGetCourses = (page, filters, searchQuery) => async (dispatch) => {
  try {

    
    dispatch({ type: GET_ALL_PUBLIC_COURSES_REQUEST });

    let queryString = `?page=${page}&search=${searchQuery}`;
    if (filters) {
      Object.keys(filters).forEach(key => {
        queryString += `&${key}=${filters[key]}`;
      });
    }

    const { data } = await axios.get(`${BASE_URL}/api/v1/get-all-public-courses${queryString}`);

    dispatch({
      type: GET_ALL_PUBLIC_COURSES_SUCCESS,
      payload: data.Publiccourses,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PUBLIC_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const PublicGetSingleCourse = (slug) => async (dispatch) => {


  try {

    dispatch({ type:   GET_SINGLE_PUBLIC_COURSES_REQUEST});


    const { data } = await axios.get(
      `${BASE_URL}/api/v1/get-single-public-course/${slug}`);

    dispatch({ type: GET_SINGLE_PUBLIC_COURSES_SUCCESS, payload: data.PubliccoursesObject});
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PUBLIC_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postComment = async (formData, slug) => {

  try {


    const token = Cookies.get('token');

    const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }

    await axios.post(`${BASE_URL}/api/v1/add-comment/${slug}`, formData, ConfigApplicationJson);


  } catch (error) {
      console.log(error);
  }

}


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
