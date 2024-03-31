import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader';
import TeacherAvatar from '../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import {PublicGetSingleCourse, clearErrors} from '../../actions/CoursesAction'
import { toast } from 'react-toastify';
import NavBar from '../NavBar/NavBar';
import moment from 'moment'
import { IoIosArrowForward } from 'react-icons/io';
import { CiCalendar } from "react-icons/ci";
import StarRatings from 'react-star-ratings';
import { BsDot } from "react-icons/bs";
import { PiGraduationCapThin } from "react-icons/pi";

import './PublicCourseDetail.css'
import CourseDetailOverview from './CourseDetailTabs/CourseDetailOverview';
import CourseDetailCurriculum from './CourseDetailTabs/CourseDetailCurriculum';
import CourseDetailPreview from './CourseDetailTabs/CourseDetailPreview';
import CourseDetailReviews from './CourseDetailTabs/CourseDetailReviews';



const PublicCourseDetail = () => {

    const dispatch = useDispatch()

    const { slug } = useParams();
    const courseSlug = slug.substring(slug.lastIndexOf('/') + 1);

    const {Publiccourse, error, loading} = useSelector((state)=>state.PublicCourse);

    const [courseDetails, setCourseDetails] = useState([])
    const [activeTab, setActiveTab] = useState('Overview');

    console.log("courseDetails", courseDetails)

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      dispatch(PublicGetSingleCourse(courseSlug))
    }, [courseSlug, dispatch, error])
  
    useEffect(() => {
      setCourseDetails(Publiccourse)
    }, [Publiccourse])

    const handleMainTabClick = (tab) => {
      setActiveTab(tab);
    };
  
  
  return (

    <div className='public-single-course'>

      <NavBar/>

      <div className='public-single-course-banner'>
        <div>
          <span><Link to='/'>Home</Link> <IoIosArrowForward/> <Link to='/courses'>Courses</Link>  <IoIosArrowForward/> <p>{courseDetails?.course_title}</p></span>
        </div>
      </div>


      {/* content */}
      <div className='public-single-course-content'>

        <div className='public-single-course-content-container'>

            <img src={courseDetails?.course_thumbnail} alt='course thumbnail'/>

            <div className='public-single-course-content-category-review'>
              <p>{courseDetails?.category}</p>
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


        <div className='public-single-course-content-sidebar'>
          {/* sidebar */}
          asd
        </div>


      </div>

    </div>
  )
}

export default PublicCourseDetail