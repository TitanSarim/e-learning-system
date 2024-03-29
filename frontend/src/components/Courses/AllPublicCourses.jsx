import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar';
import AllPublicCoursesFilters from './AllPublicCoursesFilters';
import StarRatings from 'react-star-ratings'

import { IoIosArrowForward } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { TbCategoryMinus } from "react-icons/tb";
import courseImg from '../../assets/laura-rivera-ArH3dtoDQc0-unsplash.jpg'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import './AllPublicCourses.css'
const AllPublicCourses = () => {


  const [showDiv, setShowDiv] = useState('tbCategoryMinus');

  const handleTbCategoryMinusClick = () => {
      setShowDiv('tbCategoryMinus');
  };

  const handleCiCircleListClick = () => {
      setShowDiv('ciCircleList');
  };

  return (
    <div className='pubic-all-courses'>
      
      <NavBar/>
      
      {/* banner */}
      <div className='pubic-all-courses-banner'>
        <div>
          <p>All Courses</p>
          <span><Link to='/'>Home</Link> <IoIosArrowForward/> <p>Courses</p></span>
        </div>
      </div>

      <div className='pubic-all-courses-container'>
        
        {/* filters */}
        <AllPublicCoursesFilters/>

        {/* Content */}
        <div className='pubic-all-courses-list'>

          <div className='pubic-all-courses-list-style'>
            <p>Showing 230 Total Results</p>

              <div>
                <div onClick={handleTbCategoryMinusClick}>
                  <TbCategoryMinus size={25}/>
                </div>
                <div onClick={handleCiCircleListClick}>
                  <CiCircleList size={25} />
                </div>
              </div>
          </div>

          {showDiv === 'tbCategoryMinus' && (
            <div className='pubic-all-courses-boxes-view'>
              <div className='pubic-single-course-box-view'>
                <img src={courseImg} alt='Course'/>
                <div className='pubic-single-course-box-view-header'>
                  <p>Development</p>
                  <span>
                    <StarRatings 
                      rating={4.403}
                      starDimension="20px"
                      starSpacing="2px"
                      numberOfStars={1}
                      starRatedColor="#FFFF00"
                    />
                    (4.4 Reviews)
                  </span>
                </div>
                  <p className='pubic-single-course-box-view-title'>Learning Javascript With imagination</p>
                  <p className='pubic-single-course-box-view-teacher'><span>By </span> Sarimxahid</p>
                <div className='pubic-single-course-box-view-price'>
                  <Link>Enroll Now</Link>
                  <p>$15.00</p>
                </div>
              </div>
              
            </div>
          )}

          {/* list view */}
          {showDiv === 'ciCircleList' && (
            <div className='pubic-all-courses-list-view'>
              <div className='pubic-single-course-list-view'>
                <img src={courseImg} alt='Course'/>

                <div className='pubic-single-course-list-view-container'>

                  <div className='pubic-single-course-list-view-header'>
                    <p className='pubic-single-course-list-view-title'>Learning Javascript With imagination</p>
                    <div>
                      <p className='pubic-single-course-list-view-category'>Development</p>
                      <span>
                        <StarRatings 
                          rating={4.403}
                          starDimension="20px"
                          starSpacing="2px"
                          numberOfStars={1}
                          starRatedColor="#FFFF00"
                        />
                        (4.4 Reviews)
                      </span>
                    </div>
                    <p className='pubic-single-course-list-view-teacher'><span>By </span> Sarimxahid</p>
                  </div>

                  <div className='pubic-single-course-list-view-price'>
                    <Link>Enroll Now</Link>
                    <p>$15.00</p>
                  </div>

                </div>

              </div>
            </div>
          )}

          <div className='pubic-all-courses-pagination'>
            <Link className='pubic-all-courses-pagination-active'><MdOutlineKeyboardDoubleArrowLeft/></Link>
            <Link className='pubic-all-courses-pagination-active'><MdOutlineKeyboardArrowLeft/></Link>
            <Link className='pubic-all-courses-pagination-active'>1</Link>
            <Link className='pubic-all-courses-pagination-active'>2</Link>
            <Link className='pubic-all-courses-pagination-active'>3</Link>
            <Link className='pubic-all-courses-pagination-active'><MdOutlineKeyboardArrowRight/></Link>
            <Link className='pubic-all-courses-pagination-inActive'><MdOutlineKeyboardDoubleArrowRight/></Link>
          </div>
        
        </div>
        
      </div>

    </div>
  )
}

export default AllPublicCourses