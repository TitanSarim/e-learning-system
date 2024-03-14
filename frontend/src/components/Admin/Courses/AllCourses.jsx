import React,{useState, useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import {AdminGetCourses, clearErrors} from '../../../actions/CoursesAction'

import './AllCourses.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AllCourses = () => {

  const dispatch = useDispatch()

    const {AllAdmincourses, error, loading, message} = useSelector((state)=>state.adminCourses);

    const [allCourses, setAllCourses] = useState([])


    console.log("allCourses", allCourses)
    useEffect(() => {

      if(error){
          toast.error(error);
          dispatch(clearErrors());
      }
      dispatch(AdminGetCourses());
      
  }, [dispatch, message, error])

  useEffect(() => {
      setAllCourses(AllAdmincourses)
  }, [AllAdmincourses])

  return (
    
    <div className='admin-container'>

        <div className='admin-dashboard-sidebar'>
            <SideBar/>
        </div>

        <div className='admin-wrapper'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/create-course'}>Add Course</Link>

                <div>

                  {/* filters */}
                  <div>
                    
                  </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default AllCourses