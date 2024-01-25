import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'


const ProtectedRoutes = () => {

    const {isAuthenticated} = useSelector((state)=>state.user)
  
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes