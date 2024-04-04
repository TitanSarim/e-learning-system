import {
    GET_ALL_INROLLED_COURSES_REQUEST,
    GET_ALL_INROLLED_COURSES_SUCCESS,
    GET_ALL_INROLLED_COURSES_FAIL,
    GET_SINGLE_INROLLED_COURSES_REQUEST,
    GET_SINGLE_INROLLED_COURSES_SUCCESS,
    GET_SINGLE_INROLLED_COURSES_FAIL,
    CLEAR_ERRORS
} from '../constants/CoursesConstants'

export const InrolledCourseReducer = (state = {InrolledCourses: []}, action) => {

    switch(action.type){


        case GET_ALL_INROLLED_COURSES_REQUEST:
        case GET_SINGLE_INROLLED_COURSES_REQUEST:
            return{
                loading: true,
            }

        case GET_ALL_INROLLED_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                InrolledCourses: action.payload, 
            }
        
        case GET_SINGLE_INROLLED_COURSES_SUCCESS:
            return{
                ...state,
                loading: false,
                InrolledCourse: action.payload, 
            }
    
        case GET_ALL_INROLLED_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                InrolledCourses: null,
                error: action.payload,
            }

        case GET_SINGLE_INROLLED_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                InrolledCourse: null,
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