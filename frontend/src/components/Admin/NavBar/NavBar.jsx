import React from 'react'
import { FiLogOut } from "react-icons/fi";

import img1 from '../../../assets/Ellipse 1202.png'
import './NavBar.css'
import store from "../../../Store";
import {userLogOut } from "../../../actions/UserActions";

const NavBar = () => {

  const handleLogOut = () => {
    store.dispatch(userLogOut());
  }
  return (
    <div className='admin-navbar'>

        <div>
            <img src={img1} alt='user image'/>
            <FiLogOut size={28} onClick={handleLogOut}/>
        </div>
    </div>
  )
}

export default NavBar