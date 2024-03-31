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
} from '../constants/CoursesConstants' 

export const AdminCourseReducer = (state = {Admincourses: []}, action) =>{

    switch(action.type){


        case CREATE_COURSES_REQUEST:
        case GET_ALL_ADMIN_COURSES_REQUEST:
        case GET_SINGLE_ADMIN_COURSES_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case UPDATE_ADMIN_COURSES_REQUEST:
            return{
                ...state,
                updateLoading: true,
                loading: true,
                isAuthenticated: false,
            }
        
        case DELETE_ADMIN_COURSES_REQUEST:
            return{
                ...state,
                loading: true,
                isAuthenticated: false,
            }


        case CREATE_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                Admincourses: state.Admincourses,
                isSuccess: true,
            };

        case UPDATE_ADMIN_COURSES_SUCCESS:
            return{
                ...state,
                updateLoading: false,
                loading: false,
                isAuthenticated: true,
                Admincourses: state.Admincourses,
                isSuccess: true,
            }

        case DELETE_ADMIN_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                isDeleted: true,
                message: 'Course Deleted Successfully',
                Admincourses: state.Admincourses.filter((course) => course.slug !== action.payload),
            }

        case GET_ALL_ADMIN_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                AllAdmincourses: action.payload, 
            }

        case GET_SINGLE_ADMIN_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                AdminSinglecourse: action.payload,
                isSuccess: true,
            };


        case CREATE_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                Admincourses: null,
                isSuccess: true,
                error: action.payload,
            };
            

        case UPDATE_ADMIN_COURSES_FAIL:
            return{
                ...state,
                updateLoading: false,
                loading: false,
                isAuthenticated: false,
                Admincourses: null,
                isSuccess: true,
                error: action.payload,
            }

        case GET_ALL_ADMIN_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                AllAdmincourses: null,
                isSuccess: true,
                error: action.payload,
            };
        
        case GET_SINGLE_ADMIN_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                AdminSinglecourse: null,
                isSuccess: true,
                error: action.payload,
            };
        
        case DELETE_ADMIN_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                Admincourses: null,
                error: action.payload,
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

export const PublicCourseReducer = (state = {Publiccourses: []}, action) => {

    switch(action.type){


        case GET_ALL_PUBLIC_COURSES_REQUEST:
        case GET_SINGLE_PUBLIC_COURSES_REQUEST:
            return{
                loading: true,
            }

        case GET_ALL_PUBLIC_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                Publiccourses: action.payload, 
            }
        
        case GET_SINGLE_PUBLIC_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                Publiccourse: action.payload, 
            }
    
        case GET_ALL_PUBLIC_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                Publiccourses: null,
                error: action.payload,
            }

        case GET_SINGLE_PUBLIC_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                Publiccourse: null,
                error: action.payload,
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