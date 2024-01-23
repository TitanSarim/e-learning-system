import React from 'react'
import { FiLogOut } from "react-icons/fi";

import img1 from '../../../assets/Ellipse 1202.png'
import './NavBar.css'


const NavBar = () => {
  return (
    <div className='admin-navbar'>

        <div>
            <img src={img1} about='user image'/>
            <FiLogOut size={28}/>
        </div>
    </div>
  )
}

export default NavBar