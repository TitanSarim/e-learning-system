import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import StudentProfileChart from '../../../Charts/StudentProfileChart'
import { Link } from 'react-router-dom'
import Loader from '../../Utils/Loader'
import { FiEdit2 } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { IoPlay } from "react-icons/io5";
import { BiMessageSquare } from "react-icons/bi";

import store from "../../../Store";
import {userLogOut } from "../../../actions/UserActions";
import { getMyProfile } from '../../../actions/ProfileAction';
import { GetAllHRJobs, ClearErrors } from '../../../actions/jobAction';
import { IoEyeOutline } from "react-icons/io5";

import profileImage from '../../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import './HrProfile.css'

const HrProfile = () => {

  const dispatch = useDispatch()
  const{myProfileData} = useSelector((state)=>state.myPorfile);
  const{jobs, loading, error} = useSelector((state)=>state.hrJob);

  const [myJobs, setMyJobs] = useState([])
  

  const handleLogOut = () => {
    store.dispatch(userLogOut());
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(ClearErrors());
    }
    dispatch(getMyProfile());
    dispatch(GetAllHRJobs())
  }, [dispatch, error])

  useEffect(() => {
    setMyJobs(jobs)
  }, [jobs])

  return (
    <div className='class-container'>
      <div className='navbar-container-class' >
        <NavBar />
      </div>

      <div className='student-profile'>

        <div className='profile-courses-list'>

            <div className='student-courses-banner'>
                <p>Online Jobs Portal</p>
                <span>Get Your Dream Job And Become A Valuable Resource</span>
                <Link to='/all-jobs'>Apply Now<IoPlay/></Link>
            </div>

            <div className='student-profile-no-course'>
              {setMyJobs?.length > 0 ? (
                <>
                  <p>Your Jobs</p>
                  <Link to='/hr/create-job'>Post Job <IoPlay/></Link>
                </>
              ) : (
                <>
                  <p>Currently you don't have any active Job</p>
                  <Link to='/hr/create-job'>Post Job <IoPlay/></Link>
                </>
              )}
          
              {loading ? <Loader/> : (
                <div className='student-profile-add-new-courses'>
                  {myJobs?.map((job) => (
                  <div className='hr-profile-job-card' key={job.id}>
                      <p>{job?.jobTitle?.length > 38 ? job?.jobTitle?.slice(0, 38): job?.jobTitle}..</p>
                      <div className='hr-profile-job-location'>
                        <p>{job?.company}</p>
                        <span>{job?.country.name}, {job?.city.name}</span>
                      </div>
                      <span dangerouslySetInnerHTML={{__html: job?.jobDesc.slice(0, 135)}}>
                      </span>
                      <div className='hr-profile-job-footer'>
                          <p>{job?.status}</p>
                          <Link to={`/hr/job-applications/${job.slug}`}><IoEyeOutline size={24}/></Link>
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
                  <Link to="/chat/job-chat"><BiMessageSquare size={27}/></Link>
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

export default HrProfile