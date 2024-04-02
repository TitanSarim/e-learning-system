import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/OrderConstants'

import axios from "axios";
import {ConfigApplicationJson} from './Config'


const BASE_URL = 'http://localhost:3900';


export const makeOrder = (FormData) => async (dispatch) => {

    try {
      dispatch({ type: ORDER_REQUEST });
        
      const { data } = await axios.post( `${BASE_URL}/api/v1/make-order`, FormData, ConfigApplicationJson);
  
      dispatch({ type: ORDER_SUCCESS, payload: data.order });
  
    } catch (error) {
      dispatch({
        type: ORDER_FAIL,
        payload: error?.response?.data.message,
      });
      console.log("error", error);
    }
};
  


export const cartClearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  