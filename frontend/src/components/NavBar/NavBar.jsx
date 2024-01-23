import React from 'react'

import './NavBar.css'

import Logo1 from '../../assets/icons8-book.gif'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            <Link to='/login'>Join Us</Link>
        </div>

    </div>
  )
}

export default NavBar