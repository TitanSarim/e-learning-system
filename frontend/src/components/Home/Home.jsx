import React, { useState } from 'react'

import './Home.css'
import NavBar from '../NavBar/NavBar'
import { IoSearchOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import StarRatings  from "react-star-ratings";

import heroImg from '../../assets/Layer 2.png'
import partners1 from '../../assets/Group (1).png'
import partners2 from '../../assets/Group (2).png'
import partners3 from '../../assets/Group (3).png'
import partners4 from '../../assets/Group 512823.png'
import partners5 from '../../assets/Group.png'
import cardImg from '../../assets/Mask group.png'
import fromImg from '../../assets/Ellipse 1202.png'
import { Link } from 'react-router-dom';

const Home = () => {


    const [activeMainTab, setActiveMainTab] = useState('Design');

    const handleMainTabClick = (tab) => {
        setActiveMainTab(tab);
    }


  return (
    <div className='home-container'>

        <NavBar/>

        <div className='home-hero-container'>

            <div className='home-hero-wrapper'>
                <p>Best courses are <br/>waiting to enrich <br/>
                    your skill
                </p>
                <span>Provides you with the latest online learning system and material <br/>that help your knowledge growing.</span>

                <div className='home-hero-search'>
                    <IoSearchOutline/>
                    <input type='text' placeholder='Explore'/>
                    <button>Explore</button>
                </div>
            
            </div>

            <img src={heroImg} alt='image'/>
        </div>

        <div className='home-coursepartners'>
            <p>Our Course Partners</p>
            <div className='home-coursepartners-images'>
                <img src={partners1} alt='image1'/>
                <img src={partners2} alt='image1'/>
                <img src={partners3} alt='image1'/>
                <img src={partners4} alt='image1'/>
                <img src={partners5} alt='image1'/>

            </div>
        </div>

        <div className='home-popular-course'>
            
            <div className='home-popular-course-header'>
                <p>Popular Courses</p>
                <div className='home-popular-course-header-tabs'>
                    <button 
                        className={activeMainTab === 'Design' ? 'home-popular-course-header-tabs-active' : ''}
                        onClick={() => handleMainTabClick('Design')}   
                    >Design</button>
                    <button 
                        className={activeMainTab === 'Development' ? 'home-popular-course-header-tabs-active' : ''}
                        onClick={() => handleMainTabClick('Development')}    
                    >Development</button>
                </div>
            </div>

            <div className='home-popular-course-wrapper'>
                {activeMainTab === 'Design' && (
                    <div className='home-popular-course-card'>
                        <img src={cardImg} alt='card img'/>
                        <div className='home-popular-course-card-section-1'>
                            <div className='home-popular-course-card-section-1-a'>
                                <FaPlay/>
                                <span>10x Lesson</span>
                            </div>
                            <p>Design</p>
                        </div>
                        <p className='home-popular-course-card-section-2'>
                            Python for Financial Analysis Next
                            and Algorithmic Trading
                        </p>
                        <div className='home-popular-course-card-section-3'>
                            <div className='home-popular-course-card-section-3-a'>
                                <img src={fromImg} alt='user img'/>
                                <div className='home-popular-course-card-section-3-b'>
                                    <p>Adam Smith</p>
                                    <span>Python Developer</span>
                                </div>
                            </div>
                            <p>50+ Student</p>
                        </div>
                        <div className='home-popular-course-card-section-4'>
                            <StarRatings
                                rating={4.403}
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                starRatedColor="#FFFF00"
                            />
                            <Link>Enroll Now</Link>
                        </div>
                    </div>
                )}
                {activeMainTab === 'Development' && (
                    <div className='home-popular-course-card'>
                        <img src={cardImg} alt='card img'/>
                        <div className='home-popular-course-card-section-1'>
                            <div className='home-popular-course-card-section-1-a'>
                                <FaPlay/>
                                <span>10x Lesson</span>
                            </div>
                            <p>Development</p>
                        </div>
                        <p className='home-popular-course-card-section-2'>
                            Python for Financial Analysis Next
                            and Algorithmic Trading
                        </p>
                        <div className='home-popular-course-card-section-3'>
                            <div className='home-popular-course-card-section-3-a'>
                                <img src={fromImg} alt='user img'/>
                                <div className='home-popular-course-card-section-3-b'>
                                    <p>Adam Smith</p>
                                    <span>Python Developer</span>
                                </div>
                            </div>
                            <p>50+ Student</p>
                        </div>
                        <div className='home-popular-course-card-section-4'>
                            <StarRatings
                                rating={4.403}
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                starRatedColor="#FFFF00"
                            />
                            <Link>Enroll Now</Link>
                        </div>
                    </div>
                )}
            </div>

        </div>
        
    </div>
  )
}

export default Home