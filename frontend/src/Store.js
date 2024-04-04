import { configureStore } from '@reduxjs/toolkit';
import {combineReducers } from "redux"
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {userReducer, AdminUserReducer, ForgetPasswordReducer} from './redcuers/UserReducer'
import {AdminCourseReducer, PublicCourseReducer} from './redcuers/CourseReducer'
import {myPorfileReducer} from './redcuers/ProfileReducer'
import {cartReducer} from './redcuers/CartReducer'
import {orderReducer} from './redcuers/OrderReducer'
import {InrolledCourseReducer} from './redcuers/InrolledCourseReducer'

const reducer = combineReducers({

    user: userReducer,
    forgetPassword: ForgetPasswordReducer,
    adminUsers: AdminUserReducer,
    adminCourses: AdminCourseReducer,

    myPorfile: myPorfileReducer,
    cart: cartReducer,
    order: orderReducer,
    userInrolledCourses: InrolledCourseReducer,

    PublicCourse: PublicCourseReducer

});


const persistConfig = {
    key: 'root',
    storage,
  };
  
  
const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({

    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false, // Ignore serializability for now
    }).concat(thunk),

    devTools: process.env.NODE_ENV !== 'production',


})

export const persistor = persistStore(store);
export default store;