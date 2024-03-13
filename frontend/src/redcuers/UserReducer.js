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

    FORGET_PASSWORD_SUCESS,
    FORGET_PASSWORD_REQUEST,

    CLEAR_ERRORS

} from '../constants/UserConstants'


export const userReducer = (state = {user: []}, action) =>{

    switch(action.type){

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case UPDATE_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGOUT_USER_SUCCESS:
            return{
                loading: false,
                user: null,
                isAuthenticated: false
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case UPDATE_USER_FAILED:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };


        case LOGOUT_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
 
        

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;    
    }
}

export const ForgetPasswordReducer = (state, action) =>{

    switch(state.action){
     
        case FORGET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
         
        case FORGET_PASSWORD_SUCESS:
            return {
                loading: false,
                data: action.payload
            }  
    }
}



export const AdminUserReducer = (state = {users: []}, action) =>{

    switch(action.type){


        case GET_ALL_USERS_ADMIN_REQUEST:
        case CREATE_NEW_USER_ADMIN_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case UPDATE_USER_ADMIN_REQUEST:
        case DELETE_USER_ADMIN_REQUEST:
            return{
                ...state,
                loading: true,
                isAuthenticated: false,
            }

        case CREATE_NEW_USER_ADMIN_SUCCESS:
        case UPDATE_USER_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                users: state.users,
            };

        case GET_ALL_USERS_ADMIN_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                users: action.payload,
            }
        
        case DELETE_USER_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isDeleted: true,
                message: 'User Deleted Successfully',
                users: state.users.filter((user) => user.id !== action.payload)
            };

        case GET_ALL_USERS_ADMIN_FAIL:
        case CREATE_NEW_USER_ADMIN_FAIL:
        case UPDATE_USER_ADMIN_FAIL:
        case DELETE_USER_ADMIN_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                users: null,
                error: action.payload,
            };


        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;    
    }
}