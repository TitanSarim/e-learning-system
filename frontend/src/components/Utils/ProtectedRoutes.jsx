import { useSelector } from 'react-redux'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const ProtectedRoutes = () => {

    const {isAuthenticated} = useSelector((state)=>state.user)


    const token = Cookies.get('token')

    if (!isAuthenticated || !token) {
      toast.error('Session Expired Please Login again');
      return <Navigate to="/login" />;
    }

  return <Outlet />;
}

export default ProtectedRoutes