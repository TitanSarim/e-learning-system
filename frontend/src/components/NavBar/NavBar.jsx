import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Logo1 from '../../assets/icons8-book.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import {getWishList, getCart} from '../../actions/cartAction'
import axios from 'axios';
import './NavBar.css'


const searchCategory = [
  { value: 'Courses', label: 'Courses' },
  { value: 'Jobs', label: 'Jobs' },
];
const BASE_URL = "http://localhost:3900" 
//const BASE_URL = "http://40.124.120.87:3900" //Azure API endpoint


const NavBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {cart } = useSelector((state) => state.cart);
  const {wishList} = useSelector((state)=>state.wishList);

  const [selectedCategoryOption, setSelectedCategoryOption] = useState(searchCategory[0]);
  const [cartItems, setCartItems] = useState([])
  const [wishListItems, setWishListItems] = useState([])
  const [searchInput, setSearchInput] = useState('') 
  const [searchResults, setSearchResults] = useState([])

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategoryOption(selectedOption);
  };

  useEffect(() => {
    dispatch(getCart())
    dispatch(getWishList())
  }, [dispatch])

  useEffect(() => {
    setCartItems(cart)
    setWishListItems(wishList)
  }, [cart, wishList])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
        if (searchInput && selectedCategoryOption.value === "Courses") {
            try {
                const response = await axios.post(`${BASE_URL}/api/v1/related-words`, { searchTitle: searchInput });
                setSearchResults(response?.data)
            } catch (error) {
                console.error("Error fetching related words:", error);
            }
        }else if(searchInput && selectedCategoryOption.value === "Jobs"){
          try {
            const response = await axios.post(`${BASE_URL}/api/v1/get-job-search-results`, { searchTitle: searchInput });
            setSearchResults(response?.data)
          } catch (error) {
              console.error("Error fetching related words:", error);
          }
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
}, [searchInput, selectedCategoryOption]);


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

  const handlePageClick = (searchTitle) => {
    if(searchInput && selectedCategoryOption.value === "Courses"){
      const url = `/courses?page=1&search=${searchTitle}`;
      navigate(url)
    }else if(searchInput && selectedCategoryOption.value === "Jobs"){
      const url = `/all-jobs?page=1&search=${searchTitle}`;
      navigate(url)
    }
  }

  return (
    <div className='navbar-container'>

        <div className='navbar-logo'>
            <img src={Logo1} alt='logo'/>
            {/* <p>M-Time</p> */}
        </div>

        <div className='navbar-pages'>
            <Link to='/'>Home</Link>
            <Link to='/courses'>Courses</Link>
            <Link to='/all-jobs'>Jobs</Link>
            <Link to='/'>Contact</Link>
        </div>

      <div className='nav-search-cart-login'>

        <div className='nav-search-cart'>
          <div className='nav-search'>
            <TbCategoryPlus size={23}/>
            <Select
              defaultValue={selectedCategoryOption} 
              onChange={handleCategoryChange}
              options={searchCategory}
              styles={customStyles}
              
            />
            <span></span>
            <input type='text' placeholder={`Search for ${selectedCategoryOption?.value}`} onChange={(e) => setSearchInput(e.target.value)}/>
            <button onClick={() => handlePageClick(searchInput)}><IoIosSearch size={23}/></button>
          </div>

          {searchResults.length > 0 && searchInput && (
              <div className='search-results-container'>
                {searchResults?.map((item, i) => {
                  return(
                    <p key={i} onClick={() => handlePageClick(item)}>{item.length > 42 ? item.slice(0, 42) : item}</p>
                  )
                })}
              </div>
          )}
        </div>

        {isAuthenticated === true ? (
          <div className='nav-cart'>
            <Link to="/Student/wishList"><IoMdHeartEmpty size={23}/> {wishListItems?.length > 0 ? <span>{wishListItems?.length}</span>: <span>0</span>}</Link>
            <Link to="/Student/Cart"><HiOutlineShoppingCart size={23}/> {cartItems?.length > 0 ? <span>{cartItems?.length}</span>: <span>0</span>}</Link>
          </div>
        ) : ""}
       

        <div className='navbar-login'>
          {isAuthenticated && user?.role === 'Student' && (
            <Link to='/Student/Profile'>Profile</Link>
          )}
          {isAuthenticated && user?.role === 'HR Manager' && (
            <Link to='/hr/HrProfile'>Profile</Link>
          )}
          {isAuthenticated && user?.role === 'Job Seeker' && (
            <Link to='/JobSeeker/JobSeeker-profile'>Profile</Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link to='/admin/dashboard'>Admin</Link>
          )}
          {isAuthenticated && user?.role === 'Teacher' && (
            <Link to='/admin/dashboard'>Office</Link>
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