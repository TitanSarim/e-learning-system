import React, { useEffect, useState } from 'react'
import { PublicGetHomeCourses, clearErrors} from '../../actions/CoursesAction';
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import NavBar from '../NavBar/NavBar'
import { IoSearchOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { PiPenNibStraightBold } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaBehance } from "react-icons/fa";
import StarRatings  from "react-star-ratings";
import heroImg from '../../assets/Layer 2.png'
import partners1 from '../../assets/Group (1).png'
import partners2 from '../../assets/Group (2).png'
import partners3 from '../../assets/Group (3).png'
import partners4 from '../../assets/Group 512823.png'
import partners5 from '../../assets/Group.png'
import cardImg from '../../assets/Mask group.png'
import fromImg from '../../assets/Ellipse 1202.png'
import layer from "../../assets/layer.png"
import Frame from "../../assets/Frame.png"
import Logo1 from '../../assets/icons8-book.png'
import Profiles from "../../assets/profiles.png"
import { Link } from 'react-router-dom';
import Testimonial from './Testimonial';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Temporary
const categoryName= ["Design", "Website", "Apps" , "Software", "Development", "Photography", "Marketing", "Music"]

const Home = () => {

    const dispatch = useDispatch()

    const {Publiccourses, error, loading} = useSelector((state)=>state.PublicCourse);
    const {isAuthenticated} = useSelector((state)=>state.user);

    const [courses, setCourses] = useState([])
    const [activeMainTab, setActiveMainTab] = useState('Apps');

    const handleMainTabClick = (tab) => {
        setActiveMainTab(tab);
    }

    console.log("courses", courses)

    useEffect(() => {
        if(error){
          toast.error(error);
          dispatch(clearErrors());
        }
        dispatch(PublicGetHomeCourses())
      }, [dispatch, error])
    
    useEffect(() => {
        setCourses(Publiccourses)
    }, [Publiccourses])


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
                    <Link to="/courses">Explore</Link>
                </div>
            
            </div>

            <img src={heroImg} alt='hero'/>
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
                    {courses?.Apps && (
                        <button 
                            className={activeMainTab === 'Apps' ? 'home-popular-course-header-tabs-active' : ''}
                            onClick={() => handleMainTabClick('Apps')}   
                        >Apps</button>
                    )}
                    {courses?.Apps && (
                    <button 
                        className={activeMainTab === 'Website' ? 'home-popular-course-header-tabs-active' : ''}
                        onClick={() => handleMainTabClick('Website')}    
                    >Website</button>
                    )}
                    {courses?.Apps && (
                    <button 
                        className={activeMainTab === 'Development' ? 'home-popular-course-header-tabs-active' : ''}
                        onClick={() => handleMainTabClick('Development')}    
                    >Development</button>
                    )}
                </div>
            </div>

            <div className='home-popular-course-wrapper'>
                {activeMainTab === 'Apps' && (
                    <div className='pubic-all-courses-boxes-view-home'>
                    {courses?.Apps?.map((course) => (
                        <div className='pubic-single-course-box-view' key={course.id}>
                            <LazyLoadImage src={course.course_thumbnail.url} alt='Course'/>
                            <div className='pubic-single-course-box-view-header'>
                                <p>{course.category}</p>
                                <span>
                                    {course.reviews === "" ? 
                                    (
                                    <StarRatings 
                                        rating={0}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        numberOfStars={1}
                                        starRatedColor="#FFFF00"
                                    />
                                    ): (
                                    <StarRatings 
                                        rating={course.reviews}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        numberOfStars={1}
                                        starRatedColor="#FFFF00"
                                    />
                                    )}
                                
                                    {course.reviews === "" ? "0 Reviews" : `(${course.reviews} Reviews)`}
                                    
                                </span>
                            </div>
                            <p className='pubic-single-course-box-view-title'>{course.course_title.length > 38 ? course.course_title.slice(0, 38):course.course_title}..</p>
                            <p className='pubic-single-course-box-view-teacher'><span>By </span> {course.teacher_name}</p>
                            <div className='pubic-single-course-box-view-price'>
                                    {isAuthenticated === true ? (
                                        <Link to={`/courses/course/${course.slug}`}>Enroll Now</Link>
                                    ): (
                                        <Link to="/login">View</Link>
                                    )}
                                <p>${course.price}.00</p>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                {activeMainTab === 'Website' && (
                    <div className='pubic-all-courses-boxes-view'>
                        {courses?.Website?.map((course) => (
                            <div className='pubic-single-course-box-view' key={course.id}>
                                <LazyLoadImage src={course.course_thumbnail.url} alt='Course'/>
                                <div className='pubic-single-course-box-view-header'>
                                    <p>{course.category}</p>
                                    <span>
                                        {course.reviews === "" ? 
                                        (
                                        <StarRatings 
                                            rating={0}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            numberOfStars={1}
                                            starRatedColor="#FFFF00"
                                        />
                                        ): (
                                        <StarRatings 
                                            rating={course.reviews}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            numberOfStars={1}
                                            starRatedColor="#FFFF00"
                                        />
                                        )}
                                    
                                        {course.reviews === "" ? "0 Reviews" : `(${course.reviews} Reviews)`}
                                        
                                    </span>
                                </div>
                                <p className='pubic-single-course-box-view-title'>{course.course_title.length > 38 ? course.course_title.slice(0, 38):course.course_title}..</p>
                                <p className='pubic-single-course-box-view-teacher'><span>By </span> {course.teacher_name}</p>
                                <div className='pubic-single-course-box-view-price'>
                                    {isAuthenticated === true ? (
                                        <Link to={`/courses/course/${course.slug}`}>Enroll Now</Link>
                                    ): (
                                        <Link to="/login">View</Link>
                                    )}
                                    <p>${course.price}.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeMainTab === 'Development' && (
                    <div className='pubic-all-courses-boxes-view'>
                        {courses?.Development?.map((course) => (
                            <div className='pubic-single-course-box-view' key={course.id}>
                                <LazyLoadImage src={course.course_thumbnail.url} alt='Course'/>
                                <div className='pubic-single-course-box-view-header'>
                                    <p>{course.category}</p>
                                    <span>
                                        {course.reviews === "" ? 
                                        (
                                        <StarRatings 
                                            rating={0}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            numberOfStars={1}
                                            starRatedColor="#FFFF00"
                                        />
                                        ): (
                                        <StarRatings 
                                            rating={course.reviews}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            numberOfStars={1}
                                            starRatedColor="#FFFF00"
                                        />
                                        )}
                                    
                                        {course.reviews === "" ? "0 Reviews" : `(${course.reviews} Reviews)`}
                                        
                                    </span>
                                </div>
                                <p className='pubic-single-course-box-view-title'>{course.course_title.length > 38 ? course.course_title.slice(0, 38):course.course_title}..</p>
                                <p className='pubic-single-course-box-view-teacher'><span>By </span> {course.teacher_name}</p>
                                <div className='pubic-single-course-box-view-price'>
                                    {isAuthenticated === true ? (
                                        <Link to={`/courses/course/${course.slug}`}>Enroll Now</Link>
                                    ): (
                                        <Link to="/login">View</Link>
                                    )}
                                    <p>${course.price}.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='home-popular-course-btn'>
                <Link type='button' to="/courses">Explore All Courses</Link>
            </div>

        </div>

        {/* Papular Category */}

        <div className='home-course-category'>
            <div className='home-course-category-header'>
                <p>Most Popular <span>Category</span>  </p>
            </div>

            <div className='home-course-category-list'>
                {categoryName.map((item)=>(
                    <div className='home-course-category-card'>
                         <div className='home-course-category-content'>
                            <PiPenNibStraightBold size={20}/>
                            <p>{item}</p>
                        </div>
                     <button className='home-course-category-btn'><MdArrowOutward /></button>
                    </div>
                ))}
                
            </div>
           
        </div>

         {/*  Differnce Section */}

         <div className='home-difference-section'>

            <div className='home-difference-section1'> 
                <div className='home-difference-section1-content'>
                    <h2>What is our <span>difference</span> </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ex ea commodo consequat.</p>
                    <p>ut labore et dolore magna aliqua. ex ea commodo consequat.</p>
                    <button>Learn more</button>

                    <img src={Frame} alt="grill" />
                </div>
            </div>

            <div className='home-difference-section2'>
              <img src={layer} alt="Hero" />
            </div>


            <div className='home-difference-section3'>
               <div className='home-difference-section3-content'>
                    <div className='home-difference-section3-content-a'>
                        <PiGraduationCap />
                    </div>

                    <div className='home-difference-section3-content-b'>
                        <p>300</p>
                        <p>instructor</p>
                    </div>
               </div>

                <div className='home-difference-section3-content'>
                    <div className='home-difference-section3-content-a'>
                        <PiGraduationCap />
                    </div>

                    <div className='home-difference-section3-content-b'>
                        <p>20,000+</p>
                        <p>student</p>
                    </div>
               </div>
            </div>
         </div>

          {/*  Testmonial  */}

            <div className='Testimonials-section'>

                <div className='Testimonials-section-header'>
                    <p>Testimonials</p>  
                </div>

                <div className='Testimonials-section-a'>
                    <div className='Testimonials-section-slider'>
                        <Testimonial />
                    </div>

                    <div className='Testimonials-section-image'>
                        <img src={Profiles} alt="profile" />
                    </div> 
                </div>

            </div>

          {/*  Footer  */}

          <div className='footer-section'>

               <div className='footer-section-section-a'>
                    <div className='footer-section-section-a-content'>
                        <h2>Join our <span> world's largest</span> learning platform today</h2>
                        <p>Start learning by registering and get 30 days free trail</p>
                    </div>

                    <div className='footer-section-section-a-button'>
                        <Link to="/login">Join as Instructor</Link>
                        <Link to="/login">Join as Student</Link>
                    </div>
                </div>

                <div className='footer-section-b'>
                
                    <div className='footer-section-b-grid'>
                    
                        <div className='footer-section-b-a'>
                            
                            <div className='navbar-logo'>
                                <img src={Logo1} alt='logo'/>
                                {/* <p>M-Time</p> */}
                            </div>   

                            <p>Veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                        </div>

                        <div className='footer-section-b-b'>
                            <p>Quick Links</p>

                            <div className='footer-section-b-b-links'>
                                <p>About</p>
                                <p>Blog</p>
                                <p>Course</p>
                                <p>Contact</p>
                            </div>
                        </div>

                        <div className='footer-section-b-c'>
                           <p>Contact  us</p>
                                <div className='footer-section-b-c-links'>
                                    <p>(209) 555-0104</p>
                                    <p>michelle.rivera@example.com</p>
                                </div>
                       </div>

                        <div className='footer-section-b-d'>
                            <p>2715 Ash Dr. San Jose, South Dakota 83475</p>
                        </div>
                    </div>

                    <div className='footer-section-3'>

                        <div className='home-testimonial-card-rule' />

                        <div className='footer-section-3-icons-section'>
                            <p>Copyright 2023 | All Rights Reserved</p>

                                <div className='footer-section-3-icons'>
                                    <button><CiFacebook /></button>
                                    <button><CiInstagram/></button>
                                    <button><CiTwitter /></button>
                                    <button><FaBehance /></button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
      


        
    </div>
  )
}

export default Home