import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  GET_ALL_USERS_ADMIN_REQUEST,
  GET_ALL_USERS_ADMIN_SUCCESS,
  GET_ALL_USERS_ADMIN_FAIL,
  CREATE_NEW_USER_ADMIN_REQUEST,
  CREATE_NEW_USER_ADMIN_SUCCESS,
  CREATE_NEW_USER_ADMIN_FAIL,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAIL,
  DELETE_USER_ADMIN_REQUEST,
  DELETE_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_FAIL,
  CLEAR_ERRORS,
  FORGET_PASSWORD_SUCESS,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCESS
} from "../constants/UserConstants";

import axios from "axios";
import Cookies from 'js-cookie';


const BASE_URL = "http://localhost:3900" 
//const BASE_URL = "http://40.124.120.87:3900" //Azure API endpoint

// USER ACTIONS
export const register = (formData, setIsRegistsred, setRegisterMessage) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/register`, formData, config);

    console.log("data", data)

    if(data.success === true){
      setIsRegistsred(true)
      setRegisterMessage("Successfully registered, Now Login")
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error?.response?.data?.message });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

   

     const token = Cookies.get('token');

    const config = { 
      headers: 
      { 
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
      }
    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/loggedIn`, formData, config);

    if(data.token){
      Cookies.set('token', data.token, { expires: 365 });
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data?.user });

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message });
  }
};

export const ForgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/password/forget`, email, config);

    console.log(data);
    dispatch({ type: FORGET_PASSWORD_SUCESS, payload: data });
  } catch (error) {
    dispatch({type: FORGET_PASSWORD_FAIL, payload: error})
  }
};

export const ResetPasswordAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/reset/password`, formData, config);

    
    dispatch({ type: RESET_PASSWORD_SUCESS, payload: data });

  } catch (error) {

     dispatch({type: RESET_PASSWORD_FAIL, payload: error})

  }
};

export const userLogOut = () => async (dispatch) => {
  try {

    
    await axios.get(`${BASE_URL}/api/v1/logout`);

    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });

    Cookies.remove('token')

  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error?.response?.data?.message });
  }
};

export const UpdateUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/usernameupdate`,
      formData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};

// working on it
export const AdminRequestUserUpdate = (formData, id) => async (dispatch) =>{
    try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/request/user/${id}`,
      formData
    );
    console.log(data);

  } catch (error) {
    console.log(error);
  }

}

// ADMIN ACTIONS
export const AdminGetUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_ADMIN_REQUEST });

    const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.get(`${BASE_URL}/api/v1/getAll/users`, config);

    dispatch({ type: GET_ALL_USERS_ADMIN_SUCCESS, payload: data?.users });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdmincreateNewUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEW_USER_ADMIN_REQUEST });

    const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/create/user`, formData, config);

    // will work
    dispatch({ type: CREATE_NEW_USER_ADMIN_SUCCESS, payload: [data] });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_NEW_USER_ADMIN_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const AdminUpdateNewUser = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ADMIN_REQUEST });

      const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/user/${id}`,
      formData,
      config
    );

    dispatch({ type: UPDATE_USER_ADMIN_SUCCESS, payload: [data] });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_USER_ADMIN_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const adminDeleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_ADMIN_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/delete/user/${userId}`,
      config
    );

    dispatch({ type: DELETE_USER_ADMIN_SUCCESS, payload: userId });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_USER_ADMIN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};




