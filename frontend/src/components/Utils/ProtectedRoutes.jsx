import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const ProtectedRoutes = () => {

    const {isAuthenticated, user} = useSelector((state)=>state.user)

    console.log('user', user.token)

    useEffect(() => {
      if (user && user.token) {
          Cookies.set('token', user.token);
      }
  }, [user]);
  
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes