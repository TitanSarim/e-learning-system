import{
    GET_MY_PROFILE_REQUEST,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAIL,
    UPDATE_MY_PROFILE_REQUEST,
    UPDATE_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_FAIL,

    CLEAR_ERRORS

} from '../constants/ProfileConstants'


export const myPorfileReducer = (state = {myProfile: []}, action) =>{

    switch(action.type){
        
        case GET_MY_PROFILE_REQUEST:
        case UPDATE_MY_PROFILE_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case GET_MY_PROFILE_SUCCESS:
        case UPDATE_MY_PROFILE_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                myProfileData: action.payload,
            }

        case GET_MY_PROFILE_FAIL:
        case UPDATE_MY_PROFILE_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                myProfileData: null,
                error: action.payload,
            }
            
        default:
            return state;
    }

}