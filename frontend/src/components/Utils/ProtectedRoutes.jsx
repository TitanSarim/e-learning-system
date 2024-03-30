import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';

const ProtectedRoutes = () => {

    const {isAuthenticated, user} = useSelector((state)=>state.user)

    
  //   useEffect(() => {
  //     if (user && user.token) {
  //         Cookies.set('token', user.token);
  //     }else{
  //         const persistData = localStorage.getItem('persist:root');
  //         const parsedPersistData = JSON.parse(persistData);
  //         const userData = JSON.parse(parsedPersistData.user);
  //         if(userData.isAuthenticated === true){
  //           const token = userData.user.token;
  //           console.log("token", token)
  //           if (token) {
  //             Cookies.set('token', token);
  //           }
  //         }
  //     }
  // }, [user]);
  
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes