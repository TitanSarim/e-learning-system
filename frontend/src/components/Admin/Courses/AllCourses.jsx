import React from 'react'


import './AllCourses.css'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'

const AllCourses = () => {
  return (
    
    <div className='admin-container'>

        <div className='admin-dashboard-sidebar'>
            <SideBar/>
        </div>

        <div className='admin-wrapper'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/create-course'}>Add Course</Link>

            </div>

        </div>

    </div>
  )
}

export default AllCourses