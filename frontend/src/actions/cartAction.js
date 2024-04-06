import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_FROM_CART_REQUEST,
    GET_FROM_CART_SUCCESS,
    GET_FROM_CART_FAIL,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,

    
    ADD_TO_WISH_LIST_REQUEST,
    ADD_TO_WISH_LIST_SUCCESS,
    ADD_TO_WISH_LIST_FAIL,

    GET_FROM_WISH_LIST_REQUEST,
    GET_FROM_WISH_LIST_SUCCESS,
    GET_FROM_WISH_LIST_FAIL,

    REMOVE_FROM_WISH_LIST_REQUEST,
    REMOVE_FROM_WISH_LIST_SUCCESS,
    REMOVE_FROM_WISH_LIST_FAIL,

    CLEAR_ERRORS
} from '../constants/CartConstants'

import axios from "axios";
import {ConfigApplicationJson} from './Config'

const BASE_URL = 'http://localhost:3900';


export const addToCart = (slug) => async (dispatch) => {

    try {
      dispatch({ type: ADD_TO_CART_REQUEST });

      console.log("slug", slug)
        
      const { data } = await axios.post( `${BASE_URL}/api/v1/add-to-cart`, slug, ConfigApplicationJson);
  
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cart });
  
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: error?.response?.data.message,
      });
      console.log("error", error);
    }
};
  
export const getCart = () => async (dispatch) => {

    try {
        dispatch({ type: GET_FROM_CART_REQUEST });


        const { data } = await axios.get( `${BASE_URL}/api/v1/get-cart`, ConfigApplicationJson);

        dispatch({ type: GET_FROM_CART_SUCCESS, payload: data.cart });

    } catch (error) {
        dispatch({
            type: GET_FROM_CART_FAIL,
            payload: error?.response?.data.message,
        });
        console.log("error", error);
    }
};


export const deleteFromCart = (slug) => async (dispatch) => {

    try {

        dispatch({ type: REMOVE_FROM_CART_REQUEST });

        const { data } = await axios.delete( `${BASE_URL}/api/v1/remove-to-cart/${slug}`, ConfigApplicationJson);

        dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: data.cart });

    } catch (error) {
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: error?.response?.data.message,
        });
        console.log("error", error);
    }
};



export const addToWishList = (slug) => async (dispatch) => {

    try {
      dispatch({ type: ADD_TO_WISH_LIST_REQUEST });

      console.log("slug", slug)
        
      const { data } = await axios.post( `${BASE_URL}/api/v1/add-to-wishlist`, slug, ConfigApplicationJson);
  
      dispatch({ type: ADD_TO_WISH_LIST_SUCCESS, payload: data.wishList });
  
    } catch (error) {
      dispatch({
        type: ADD_TO_WISH_LIST_FAIL,
        payload: error?.response?.data.message,
      });
      console.log("error", error);
    }
};
  
export const getWishList = () => async (dispatch) => {

    try {
        dispatch({ type: GET_FROM_WISH_LIST_REQUEST });


        const { data } = await axios.get( `${BASE_URL}/api/v1/get-wishlist`, ConfigApplicationJson);

        dispatch({ type: GET_FROM_WISH_LIST_SUCCESS, payload: data.wishList });

    } catch (error) {
        dispatch({
            type: GET_FROM_WISH_LIST_FAIL,
            payload: error?.response?.data.message,
        });
        console.log("error", error);
    }
};


export const deleteFromWishList = (slug) => async (dispatch) => {

    try {

        dispatch({ type: REMOVE_FROM_WISH_LIST_REQUEST });


        const { data } = await axios.delete( `${BASE_URL}/api/v1/remove-to-wishlist/${slug}`, ConfigApplicationJson);

        dispatch({ type: REMOVE_FROM_WISH_LIST_SUCCESS, payload: data.wishList });

    } catch (error) {
        dispatch({
            type: REMOVE_FROM_WISH_LIST_FAIL,
            payload: error?.response?.data.message,
        });
        console.log("error", error);
    }
};

export const cartClearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  