import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/OrderConstants'

import axios from "axios";
import Cookies from 'js-cookie';


const BASE_URL = "http://localhost:3900"
// const BASE_URL = "http://20.6.81.5:3900"


export const makeOrder = (FormData) => async (dispatch) => {

    try {

      const token = Cookies.get('token');

      const ConfigApplicationJson = { headers: 
          { 
          "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
          }
      }

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
  