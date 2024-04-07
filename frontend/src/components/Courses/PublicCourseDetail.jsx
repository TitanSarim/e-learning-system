import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader';
import TeacherAvatar from '../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import {PublicGetSingleCourse, clearErrors} from '../../actions/CoursesAction'
import {addToCart, getCart, addToWishList, getWishList} from '../../actions/cartAction'
import { toast } from 'react-toastify';
import NavBar from '../NavBar/NavBar';
import moment from 'moment'
import { IoIosArrowForward } from 'react-icons/io';
import { CiCalendar } from "react-icons/ci";
import StarRatings from 'react-star-ratings';
import { BsDot } from "react-icons/bs";
import { PiGraduationCapThin } from "react-icons/pi";
import CourseDetailOverview from './CourseDetailTabs/CourseDetailOverview';
import CourseDetailCurriculum from './CourseDetailTabs/CourseDetailCurriculum';
import CourseDetailPreview from './CourseDetailTabs/CourseDetailPreview';
import CourseDetailReviews from './CourseDetailTabs/CourseDetailReviews';
import { HiOutlineChartBar, HiOutlineShoppingCart } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { PiCertificateThin, PiGraduationCapLight  } from "react-icons/pi";
import { FiBook } from "react-icons/fi";
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal } from "react-icons/fa";
import { RiMastercardLine } from "react-icons/ri";
import { CiBitcoin } from "react-icons/ci";
import { FaFacebookF, FaXTwitter, FaInstagram, FaWhatsapp  } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { CgLaptop } from "react-icons/cg";

import './PublicCourseDetail.css'
import RelatedPublicCourses from './RelatedPublicCourses';




const PublicCourseDetail = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const courseSlug = slug.substring(slug.lastIndexOf('/') + 1);
    const currentUrl = window.location.origin + location.pathname;

    const {isAuthenticated, user} = useSelector((state)=>state.user);
    const {Publiccourse, error, loading} = useSelector((state)=>state.PublicCourse);
    const {cart} = useSelector((state)=>state.cart);
    const {wishList} = useSelector((state)=>state.wishList);

    const [courseDetails, setCourseDetails] = useState([])
    const [userDetail, setUserDetail] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [wishListItems, setWishListItems] = useState([])
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishList, setIsInWishList] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');


    const checkCart = () => {
      const found = cartItems?.some(item => item.slug === courseSlug);
      setIsInCart(found);
    }
    const checkWishList = () => {
      const found = wishListItems?.some(item => item.slug === courseSlug);
      setIsInWishList(found);
    }

    const handleMainTabClick = (tab) => {
      setActiveTab(tab);
    };

    const handleCopyLink = () => {
      navigator.clipboard.writeText(currentUrl);
      toast.success('URL Copyed')      
    };

    const handleAddToCart = () => {
      if (!isAuthenticated) {
        navigate('/login')
        // localStorage.setItem('historyRoute', courseSlug)
      }else{
        const formData = {
          slug: courseSlug
        }
        dispatch(addToCart(formData))
        toast.success('Successfully added')
      }
    }
    const handleAddToWishList = () => {

      const formData = {
        slug: courseSlug
      }
      dispatch(addToWishList(formData))
      toast.success('Successfully added')
    }

    let IsEnrolled = false
    const isUserEnrolled = courseDetails?.inrolled_by?.id.includes(userDetail?.id);
    if(isUserEnrolled === true){
      IsEnrolled = true
    }else{
      IsEnrolled = false
    }

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      dispatch(PublicGetSingleCourse(courseSlug))
      dispatch(getCart())
      dispatch(getWishList())
    }, [courseSlug, dispatch, error])
  
    useEffect(() => {
      setCourseDetails(Publiccourse)
      setUserDetail(user)
      setCartItems(cart)
      setWishListItems(wishList)
    }, [Publiccourse, user, cart, wishList])

    useEffect(() => {
      checkCart();
      checkWishList()
    }, [cartItems, wishListItems]);

  
  
  return (

    <div className='public-single-course'>

      <NavBar/>

      <div className='public-single-course-banner'>
        <div>
          <span><Link to='/'>Home</Link> <IoIosArrowForward/> <Link to='/courses'>Courses</Link>  <IoIosArrowForward/> <p>{courseDetails?.course_title}</p></span>
        </div>
      </div>


      {/* content */}
      {loading ? <div className='public-single-course-loader'><Loader/></div> : (
      <div className='public-single-course-content'>

        <div className='public-single-course-content-container'>

            <img src={courseDetails?.course_thumbnail} alt='course thumbnail'/>

            <div className='public-single-course-content-category-review'>
              <p>{courseDetails?.category}</p>
              
                {courseDetails?.reviews === "0" || courseDetails?.reviews === "" ? (
                  <span>
                  <StarRatings
                    rating={0}
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStars={5}
                    starRatedColor="#FFFF00"
                  />
                  (0 Reviews)
                  </span>
                ) : (
                  <span>
                  <StarRatings
                    rating={courseDetails?.reviews}
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStars={5}
                    starRatedColor="#FFFF00"
                  />
                  ({courseDetails?.reviews} Reviews)
                  </span>
                )}
            </div>
            <p className='public-single-course-content-title'>{courseDetails?.course_title}</p>
            <div className='public-single-course-content-teacher-detail'>
              {courseDetails?.TeacherAvatar?.length ? (
              <img src={courseDetails?.TeacherAvatar} alt='Teacher'/>
              ) : (
                <img src={TeacherAvatar} alt='Teacher'/>
              )}
              <div className='public-single-course-content-teacher-name'><span>By</span> {courseDetails?.teacher_name}</div>
              <BsDot size={24}/>
              <div className='public-single-course-content-teacher-course-date'>
                <CiCalendar size={28}/> {moment(courseDetails?.updatedAt).format('l')}
              </div>
              <BsDot size={24}/>
              <div className='public-single-course-content-teacher-course-intoll'>
                <PiGraduationCapThin size={28}/>
                <p>{Array.isArray(courseDetails?.inrolled_by?.id) ? courseDetails?.inrolled_by?.id.length : 0} Students</p>
              </div>
            </div>

            <div className='public-single-course-content-tab-buttons'>
              <button className={activeTab === 'Overview' ? 'public-single-course-content-tab-button-avtive' : 'public-single-course-content-tab-button-inactive'} 
                onClick={() => handleMainTabClick('Overview')}>Overview</button>

              <button className={activeTab === 'Curriculum' ? 'public-single-course-content-tab-button-avtive' : 'public-single-course-content-tab-button-inactive'} 
                onClick={() => handleMainTabClick('Curriculum')}>Curriculum</button>

              <button className={activeTab === 'Preview' ? 'public-single-course-content-tab-button-avtive' : 'public-single-course-content-tab-button-inactive'} 
                onClick={() => handleMainTabClick('Preview')}>Preview</button>

              <button className={activeTab === 'Reviews' ? 'public-single-course-content-tab-button-avtive' : 'public-single-course-content-tab-button-inactive'} 
                onClick={() => handleMainTabClick('Reviews')}>Reviews</button>
            </div>
            
            {activeTab === 'Overview' && (
              <CourseDetailOverview courseDesc={courseDetails?.course_desc}/>
            )}
            {activeTab === 'Curriculum' && (
              <CourseDetailCurriculum curriculum={courseDetails?.course_content}/>
            )}
            {activeTab === 'Preview' && (
              <CourseDetailPreview videos={courseDetails?.featuredVideos}/>
            )}
            {activeTab === 'Reviews' && (
              <CourseDetailReviews/>
            )}


        </div>

        {/* sidebar */}
        <div className='public-single-course-content-sidebar'>
          
          <div className='public-single-course-content-sidebar-price'>
            <p>This course fee:</p>
            <span>$ {courseDetails?.price}.00</span>
          </div>

          <div className='public-single-course-content-sidebar-offers'>
            <p>Course includes:</p>
            <div className='public-single-course-content-sidebar-offer'>
              <div><HiOutlineChartBar size={24}/> <p>Level</p></div>
              <p>{courseDetails?.level}</p>
            </div>
            <div className='public-single-course-content-sidebar-offer'>
              <div><GoClock size={24}/> <p>Duration</p></div>
              <p>{courseDetails?.hours}</p>
            </div>
            <div className='public-single-course-content-sidebar-offer'>
              <div><FiBook size={24}/> <p>Lessons</p></div>
              <p>{courseDetails?.course_content?.reduce((total, week) => total + week.videos.length, 0)}</p>
            </div>
            <div className='public-single-course-content-sidebar-offer'>
              <div><PiCertificateThin size={25}/> <p>Certification</p></div>
              <p>Yes</p>
            </div>
            <div className='public-single-course-content-sidebar-offer'>
              <div><PiGraduationCapLight size={24}/> <p>Graduation</p></div>
              <p>{Array.isArray(courseDetails?.inrolled_by?.id) ? courseDetails?.inrolled_by?.id.length : 0}</p>
            </div>

          </div>

          <div className='public-single-course-content-sidebar-payment'>
            <p>Secure Payments:</p>
            <div>
              <RiVisaLine size={30}/>
              <FaCcPaypal size={36}/>
              <RiMastercardLine size={28}/>
              <CiBitcoin size={28}/>
            </div>
          </div>

          <div className='public-single-course-content-sidebar-social'>
            <p>Share this course:</p>
            <div>
              <button><FaFacebookF size={26} onClick={handleCopyLink}/></button>
              <button><FaInstagram  size={27} onClick={handleCopyLink}/></button>
              <button><FaXTwitter size={27} onClick={handleCopyLink}/></button>
              <button><FaWhatsapp size={27} onClick={handleCopyLink}/></button>
            </div>
          </div>

          <div className='public-single-course-content-sidebar-cart'>
            {IsEnrolled === true ? (
              <>
                <Link to={`/Student/class/${courseDetails?.slug}`}><CgLaptop size={25}/>ClassRoom</Link>
              </>
            ) : (
              <>
                {isInCart === true ? 
                  <Link to='/Student/Cart'><HiOutlineShoppingCart size={25}/>Go to cart</Link> : 
                  <button onClick={handleAddToCart}><HiOutlineShoppingCart size={25}/>Add to cart</button>
                }
                {isInWishList === true ? 
                  <Link to='/Student/wishList'><HiOutlineShoppingCart size={25}/>Go to Wishlist</Link> : 
                  <button onClick={handleAddToWishList}><IoMdHeartEmpty size={25}/>Add To Wishlist</button>
                }
              </>
            )}
          </div>
          

        </div>
        
      </div>

      )}

      <RelatedPublicCourses relatedCourses={courseDetails?.relatedCourses}/>


    </div>
  )
}

export default PublicCourseDetail