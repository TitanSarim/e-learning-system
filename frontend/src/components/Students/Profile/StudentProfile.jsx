import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import StudentProfileChart from '../../../Charts/StudentProfileChart'
import { Link } from 'react-router-dom'
import Loader from '../../Utils/Loader'
import { SlBell } from "react-icons/sl";
import { FiEdit2 } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { IoPlay } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import StarRatings  from "react-star-ratings";
import store from "../../../Store";
import {userLogOut } from "../../../actions/UserActions";
import { GetAllInrolledCourses, clearErrors } from '../../../actions/InrolledCourseAction'; 

import profileImage from '../../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'

import './Student.css'



const StudentProfile = () => {

  const dispatch = useDispatch()
  const{myProfileData} = useSelector((state)=>state.myPorfile);
  const{InrolledCourses, loading, error} = useSelector((state)=>state.userInrolledCourses);

  const [inrolledCourses, setAllInrolledCourses] = useState([])
  

  const handleLogOut = () => {
    store.dispatch(userLogOut());
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(GetAllInrolledCourses())
  }, [dispatch, error, ])

  useEffect(() => {
    setAllInrolledCourses(InrolledCourses)
  }, [InrolledCourses])

  return (
    <div className='class-container'>
      <div className='navbar-container-class' >
        <NavBar />
      </div>

      <div className='student-profile'>

        <div className='profile-courses-list'>

            <div className='student-courses-banner'>
                <p>Online Course</p>
                <span>Sharpen  Your Skills With Professional Online Courses</span>
                <Link to='/courses'>Join Now <IoPlay/></Link>
            </div>

            <div className='student-profile-no-course'>
              {inrolledCourses?.length > 0 ? (
                  <p>Your introlled courses</p>
              ) : (
                <>
                  <p>Currently you don't have any active course</p>
                  <Link to='/courses'>Select Course <IoPlay/></Link>
                </>
              )}
          
              {loading ? <Loader/> : (
                <div className='student-profile-add-new-courses'>
                  {InrolledCourses?.map((course) => (
                  <div className='student-profile-course-card' key={course.id}>
                    <img src={course.course_thumbnail} alt='card img'/>
                      <div className='student-profile-course-card-section-1'>
                          <div className='student-profile-course-card-section-1-a'>
                              <FaPlay/>
                              <span>{course?.course_content?.reduce((total, week) => total + week.videos.length, 0)}x Lesson</span>
                          </div>
                          <p>{course?.category}</p>
                      </div>
                    <p className='student-profile-course-card-section-2'>
                        {course?.course_title}
                    </p>
                    <div className='student-profile-course-card-section-3'>
                        <div className='student-profile-course-card-section-3-a'>
                            {/* <img src={fromImg} alt='user img'/> */}
                            <div className='student-profile-course-card-section-3-b'>
                                <p><span>By</span> {course?.teacher_name}</p>
                            </div>
                        </div>
                        <p>{course?.inrolled_by?.id?.length}+ Student</p>
                    </div>
                    <div className='student-profile-course-card-section-4'>
                      {course?.reviews === 0 || course?.reviews === ""? (
                        <StarRatings
                            rating={0}
                            starDimension="20px"
                            starSpacing="2px"
                            numberOfStars={5}
                            starRatedColor="#FFFF00"
                        />
                      ): (
                        <StarRatings
                            rating={course?.reviews}
                            starDimension="20px"
                            starSpacing="2px"
                            numberOfStars={5}
                            starRatedColor="#FFFF00"
                        />
                      )}
                        <Link to={`/Student/class/${course?.slug}`}>Class</Link>
                    </div>
                  </div>
                  ))}
                </div>
              )}

            </div>
        </div>

        <div className='profile-profile-rightbar'>
            
            <p className='profile-profile-rightbar-heading'>Your Profile</p>

            <div className='profile-profile-rightbar-container'>
                <span>
                  {myProfileData?.avatar === "" ? <img src={profileImage} alt='profile'/> : <img src={myProfileData?.avatar} alt='profile'/> }
                </span>

                <div>
                  <p>good Morning {myProfileData?.username}</p>
                  <span>{myProfileData?.Headline}</span>
                </div>

                <div className='profile-profile-rightbar-setting'>
                  <Link><SlBell size={27}/></Link>
                  <Link to='/Profile/detail'><FiEdit2 size={27}/></Link>
                </div>
            </div>

            <div className='profile-profile-rightbar-stats'>
              <p>Weekly activity</p>
              <div>
                <StudentProfileChart/>
              </div>
            </div>

            <p className='profile-profile-rightbar-aboutme' dangerouslySetInnerHTML={{ __html: myProfileData?.about}}></p>

            <button className='profile-profile-rightbar-logout' onClick={handleLogOut}><CiLogout/>Logout</button>


        </div>

      </div>
      
    </div>
  )
}

export default StudentProfile