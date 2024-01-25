import React from 'react'

import './NavBar.css'

import Logo1 from '../../assets/icons8-book.gif'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  console.log("isAuthenticated", isAuthenticated)

  return (
    <div className='navbar-container'>

        <div className='navbar-logo'>
            <img src={Logo1} alt='logo'/>
            <p>M-Time</p>
        </div>

        <div className='navbar-pages'>
            <Link to='/'>Home</Link>
            <Link to='/'>Courses</Link>
            <Link to='/'>Jobs</Link>
            <Link to='/'>Contact</Link>
        </div>


        <div className='navbar-login'>
          {isAuthenticated && user?.role === 'Student' && (
            <Link to='/Student/Profile'>Profile</Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link to='/admin/dashboard'>Admin</Link>
          )}
          {!isAuthenticated && (
            <Link to='/login'>Login</Link>
          )}
        </div>

    </div>
  )
}

export default NavBar