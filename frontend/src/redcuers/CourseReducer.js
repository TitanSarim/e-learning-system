import {
    CREATE_COURSES_REQUEST,
    CREATE_COURSES_SUCCESS,
    CREATE_COURSES_FAIL,

    CLEAR_ERRORS,
} from '../constants/CoursesConstants' 

export const AdminCourseReducer = (state = {Admincourses: []}, action) =>{

    switch(action.type){


        case CREATE_COURSES_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }


        case CREATE_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                Admincourses: state.Admincourses,
            };


        case CREATE_COURSES_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                Admincourses: null,
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