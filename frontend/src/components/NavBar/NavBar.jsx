import React, { useState } from 'react'
import Select from 'react-select';
import Logo1 from '../../assets/icons8-book.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";

import './NavBar.css'


const searchCategory = [
  { value: 'Courses', label: 'Courses' },
  { value: 'Jobs', label: 'Jobs' },
];


const NavBar = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(searchCategory[0]);

  console.log("selectedCategoryOption", selectedCategoryOption)

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 120,
      backgroundColor: 'transparent',
      border: state.isFocused ? 'none' : 'none',
      outline: state.isFocused ? 'none' : 'none',
      borderRadius: 50, 
      boxShadow: 'none',
      cursor: "pointer"
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white', 
      }),  
      placeholder: (provided) => ({
        ...provided,
        color: 'rgb(163, 163, 163)', 
      }),
  };

  return (
    <div className='navbar-container'>

        <div className='navbar-logo'>
            <img src={Logo1} alt='logo'/>
            {/* <p>M-Time</p> */}
        </div>

        <div className='navbar-pages'>
            <Link to='/'>Home</Link>
            <Link to='/courses'>Courses</Link>
            <Link to='/'>Jobs</Link>
            <Link to='/'>Contact</Link>
        </div>

      <div className='nav-search-cart-login'>

        <div className='nav-search-cart'>
          <div className='nav-search'>
            <TbCategoryPlus size={23}/>
            <Select
              defaultValue={selectedCategoryOption} 
              onChange={(selectedOption) => setSelectedCategoryOption(selectedOption.value)}
              options={searchCategory}
              styles={customStyles}
              
            />
            <span></span>
            <input type='text' placeholder={`Search for ${selectedCategoryOption?.value}`}/>
            <button><IoIosSearch size={23}/></button>
          </div>

        </div>

        <div className='nav-cart'>
            <Link><IoMdHeartEmpty size={23}/> <span>0</span></Link>
            <Link><HiOutlineShoppingCart size={23}/> <span>0</span></Link>
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

    </div>
  )
}

export default NavBar