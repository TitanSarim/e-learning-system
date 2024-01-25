import React from 'react'
import {Link} from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { TfiBook } from "react-icons/tfi";
import { PiStudent } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";

import './SideBar.css'
const SideBar = () => {
  return (
    <div className='admin-sidebar'>

      <div className='admin-sidebar-container'>

        <p>M-Time</p>

        <div className='admin-sidebar-tabs'>
          <Link to="/admin/dashboard"><GrHomeRounded/> <p>Dashboard</p></Link>
          <Link><TfiBook/> <p>Courses</p></Link>
          <Link><PiStudent/> <p>Students</p></Link>
          <Link to='/admin/all-users'><CiUser/> <p>Users</p></Link>
          <Link><TfiStatsUp/> <p>Stats</p></Link>
        </div>

      </div>

    </div>
  )
}

export default SideBar