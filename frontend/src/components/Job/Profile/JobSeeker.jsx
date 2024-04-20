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
import store from "../../../Store";
import {userLogOut } from "../../../actions/UserActions";
import { getMyProfile, clearErrors } from '../../../actions/ProfileAction';

import profileImage from '../../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import { BiMessageSquare } from 'react-icons/bi';



const JobSeeker = () => {

  const dispatch = useDispatch()
  const{myProfileData, error} = useSelector((state)=>state.myPorfile);


  const handleLogOut = () => {
    store.dispatch(userLogOut());
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyProfile())
  }, [dispatch, error])



  return (
    <div className='class-container'>
      <div className='navbar-container-class' >
        <NavBar />
      </div>

      <div className='student-profile'>

        <div className='profile-courses-list'>

            <div className='student-courses-banner'>
                <p>Dream Jobs</p>
                <span>Get Your Dream Job And Become A Valuable Resource</span>
                <Link to='/all-jobs'>Apply Now<IoPlay/></Link>
            </div>

            {/* <div className='student-profile-no-course'>
             
                <p>Currently you don't have any active course</p>
                <Link to='/courses'>Select Course <IoPlay/></Link>

            </div> */}
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
                  <Link to="/chat/job-seeker-chat"><BiMessageSquare size={27}/></Link>
                  <Link to='/Profile/detail'><FiEdit2 size={27}/></Link>
                </div>
            </div>

            <div className='profile-profile-rightbar-stats'>
              <p>Weekly activity</p>
              <div>
                <StudentProfileChart/>
              </div>
            </div>

            <p className='profile-profile-rightbar-aboutme' dangerouslySetInnerHTML={{ __html: myProfileData?.about.slice(0, 200)}}></p>

            <button className='profile-profile-rightbar-logout' onClick={handleLogOut}><CiLogout/>Logout</button>


        </div>

      </div>
      
    </div>
  )
}

export default JobSeeker