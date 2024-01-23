import React from 'react'
import SideBar from '../SideBar/SideBar'
import './AdminDashboard.css'
import NavBar from '../NavBar/NavBar'


const AdminDashboard = () => {
  return (
    <div className='admin-container'>

      <div className='admin-dashboard-sidebar'>
        <SideBar/>
      </div>

      <div className='admin-wrapper'>
        <NavBar/>


      </div>
    </div>
  )
}

export default AdminDashboard