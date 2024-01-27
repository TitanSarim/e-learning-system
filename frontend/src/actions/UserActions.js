import{
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

    CLEAR_ERRORS

} from '../constants/UserConstants'



import axios from 'axios'

// USER ACTIONS
export const register = (formData) => async (dispatch) => {

    try {
        dispatch({type: REGISTER_REQUEST});
        
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/register`, 
            formData,
            config
        )

        dispatch({type: REGISTER_SUCCESS, payload: data.user});
        
    } catch (error) {
        dispatch({type: REGISTER_FAIL, payload: error.response.data.message});
    }

}

export const login = (formData) => async (dispatch) => {

    try {
        dispatch({type: LOGIN_REQUEST});
        
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/loggedIn`, 
            formData,
            config
        )

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
        
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }

}

export const userLogOut = () => async (dispatch) => {

    try {


        await axios.get(`/api/v1/logout`);

        dispatch({
            type: LOGOUT_USER_SUCCESS,
        })
        
    } catch (error) {
        dispatch({type: LOGOUT_USER_FAIL, payload: error.response.data.message});
    }

}



export const UpdateUser = (formData) => async (dispatch) =>{

    try {
        dispatch({type: UPDATE_USER_REQUEST});
        
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/usernameupdate`, 
            formData,
            config
        )

        dispatch({type: UPDATE_USER_SUCCESS, payload: data.user});
        
    } catch (error) {
        dispatch({type: UPDATE_USER_FAILED, payload: error.response.data.message});
    }

}

// ADMIN ACTIONS
export const AdminGetUsers = () => async (dispatch) =>{

    try {
        dispatch({type: GET_ALL_USERS_ADMIN_REQUEST});
        
        const {data} = await axios.get(`/api/v1/getAll/users`)

        dispatch({type: GET_ALL_USERS_ADMIN_SUCCESS, payload: data.users});
        
    } catch (error) {
        dispatch({type: GET_ALL_USERS_ADMIN_FAIL, payload: error.response.data.message});
    }

}

export const AdmincreateNewUser = (formData) => async (dispatch) => {

    try {
        dispatch({type: CREATE_NEW_USER_ADMIN_REQUEST});
        
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/create/user`, 
            formData,
            config
        )

        dispatch({ type: CREATE_NEW_USER_ADMIN_SUCCESS, payload: [data] });
        
    } catch (error) {
        console.log(error)
        dispatch({type: CREATE_NEW_USER_ADMIN_FAIL, payload: error.response?.data?.message});
    }

}

export const adminDeleteUser = (userId) => async (dispatch) => {

    try {
        dispatch({type: DELETE_USER_ADMIN_REQUEST});
        
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.delete(`/api/v1/delete/user/${userId}`, 
            config
        )

        dispatch({ type: DELETE_USER_ADMIN_SUCCESS, payload: userId});
        
    } catch (error) {
        console.log(error)
        dispatch({type: DELETE_USER_ADMIN_FAIL, payload: error.response?.data?.message});
    }

}

export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}