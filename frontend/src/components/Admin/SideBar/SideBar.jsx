import React from 'react'
import {Link} from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { TfiBook } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import LogoIcon from '../../../assets/icons8-book.png'
import {useSelector } from 'react-redux'

import './SideBar.css'

const SideBar = () => {

  const {user} =  useSelector((state)=>state.user);

  return (
    <div className='admin-sidebar'>

      <div className='admin-sidebar-container'>

        <img src={LogoIcon} alt="Logo"/>

        <div className='admin-sidebar-tabs'>
          {user?.role === "admin" && <Link to="/admin/dashboard"><GrHomeRounded/> <p>Dashboard</p></Link>}
          <Link to={'/admin/all-courses'}><TfiBook/> <p>Courses</p></Link>
          {user?.role === "admin" && <Link to='/admin/all-users'><CiUser/> <p>Users</p></Link>}
          <Link to="/admin/profile"><CgProfile/> <p>Profile</p></Link>
        </div>

      </div>

    </div>
  )
}

export default SideBar