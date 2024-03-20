import React from 'react'

import StudentProfileChart from '../../../Charts/StudentProfileChart'

import { Link } from 'react-router-dom'

import { SlBell } from "react-icons/sl";
import { FiEdit2 } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { IoPlay } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import StarRatings  from "react-star-ratings";

import store from "../../../Store";
import {userLogOut } from "../../../actions/UserActions";

import profileImage from '../../../assets/oliver-ragfelt-khV4fTy6-D8-unsplash.jpg'
import cardImg from '../../../assets/Mask group.png'
import fromImg from '../../../assets/Ellipse 1202.png'

import './Student.css'



const StudentProfile = () => {

  const handleLogOut = () => {
    store.dispatch(userLogOut());
  }

  return (
    <div className='student-profile'>

      <div className='profile-courses-list'>

          <div className='student-courses-banner'>
              <p>Online Course</p>
              <span>Sharpen  Your Skills With Professional Online Courses</span>
              <Link>Join Now <IoPlay/></Link>
          </div>

          <div className='student-profile-no-course'>
            <p>Currently you don't have any active course</p>
            <Link>Select Course <IoPlay/></Link>

            <div className='student-profile-add-new-courses'>
              <div className='home-popular-course-card'>
                <img src={cardImg} alt='card img'/>
                  <div className='home-popular-course-card-section-1'>
                      <div className='home-popular-course-card-section-1-a'>
                          <FaPlay/>
                          <span>10x Lesson</span>
                      </div>
                      <p>Design</p>
                  </div>
                <p className='home-popular-course-card-section-2'>
                    Python for Financial Analysis Next
                    and Algorithmic Trading
                </p>
                <div className='home-popular-course-card-section-3'>
                    <div className='home-popular-course-card-section-3-a'>
                        <img src={fromImg} alt='user img'/>
                        <div className='home-popular-course-card-section-3-b'>
                            <p>Adam Smith</p>
                            <span>Python Developer</span>
                        </div>
                    </div>
                    <p>50+ Student</p>
                </div>
                <div className='home-popular-course-card-section-4'>
                    <StarRatings
                        rating={4.403}
                        starDimension="20px"
                        starSpacing="2px"
                        numberOfStars={5}
                        starRatedColor="#FFFF00"
                    />
                    <Link>Enroll Now</Link>
                </div>
              </div>
            </div>

          </div>
      </div>

      <div className='profile-profile-rightbar'>
          
          <p className='profile-profile-rightbar-heading'>Your Profile</p>

          <div className='profile-profile-rightbar-container'>
              <span>
                <img src={profileImage} alt='profile'/>
              </span>

              <div>
                <p>good Morning Sarim</p>
                <span>continue your journey and achieve Your Target</span>
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

          <p className='profile-profile-rightbar-aboutme'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

          <button className='profile-profile-rightbar-logout' onClick={handleLogOut}><CiLogout/>Logout</button>


      </div>

    </div>
  )
}

export default StudentProfile