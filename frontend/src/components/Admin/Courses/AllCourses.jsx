import React,{useState, useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import {AdminGetCourses, clearErrors} from '../../../actions/CoursesAction'
import  moment from 'moment'
import './AllCourses.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../Utils/Loader';
import { TbTimeDuration10 } from "react-icons/tb";
import { CgDollar } from "react-icons/cg";
import { BsCalendar2Date } from "react-icons/bs";

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

                {loading ? <Loader/> : (
                <div className='admin-allcourses-wrapper'>

                  {/* filters */}
                  <div>

                  </div>

                  {/* card */}
                  <div className='admin-allcourses-cards'>
                    {allCourses?.map((item) => (
                      <div key={item.id} className='admin-allcourses-card-container'>

                        <img src={JSON.parse(item.course_thumbnail).url} alt="Course Thumbnail" />
                        <div className='admin-allcourses-card-header'>
                          {item.status === 'active' ? <span className='admin-allcourses-card-header-status-acitve'>{item.status}</span> : <span className='admin-allcourses-card-header-status-inacitve'>{item.status}</span>}
                          <p>{item.category}</p>
                        </div>
                        <p className='admin-allcourses-card-title'>{item.course_title}</p>
                        <div className='admin-allcourses-card-length-price'>
                          <p> 
                              <TbTimeDuration10 size={25}/>
                              <span>{item.timeline}</span> 
                              Weeks
                          </p>
                          <p> {item.price}<CgDollar/></p>
                        </div>
                        <div className='admin-allcourses-card-footer'>
                          <p><BsCalendar2Date size={25}/> {moment(item.updatedAt).format("MMM Do YY")}</p>
                          <Link>View</Link>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                )}

            </div>

        </div>

    </div>
  )
}

export default AllCourses