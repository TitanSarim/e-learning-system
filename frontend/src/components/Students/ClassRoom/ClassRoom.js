import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar'
import "./classRoom.css"
import LeaderBoardList from './LeaderBoardList'
import VideoSection from './VideoSection'
import CourseChat from './CourseChat'
import {GetSingleInrolledCourse, clearErrors} from '../../../actions/InrolledCourseAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Utils/Loader'
import { toast } from 'react-toastify';

const ClassRoom = () => {

    const dispatch = useDispatch()
    let { slug } = useParams();
    
    const{InrolledCourse, loading, error} = useSelector((state)=>state.userInrolledCourses);
    const weekIndex = localStorage.getItem('selectedWeekIndex');

    const [courseDetails, setCourseDetails] = useState([])
    const [courseContent, setCourseContent] = useState([])
    const [selectWeek, setSelectWeek] = useState([])
    const [selectWeekIndex, setSelectWeekIndex] = useState(0)
    const [selectVideoToPlay, setSelectVideoToPlay] = useState([])

    console.log("selectWeek", selectWeek)

    const handleSelectedIndex = (content, index) => {
        localStorage.setItem('selectedWeekIndex', index);
        setSelectWeekIndex(index)
        setSelectWeek(content)
    }

    useEffect(() => {
        if(error){
          toast.error(error);
          dispatch(clearErrors());
        }
        
    }, [dispatch, error])

    useEffect(() => {
    const formData = {
        slug: slug
    }
    dispatch(GetSingleInrolledCourse(formData))
    }, [dispatch, slug])
    
    useEffect(() => {
        setCourseDetails(InrolledCourse)
        setCourseContent(InrolledCourse?.course_content)
    }, [InrolledCourse])

    useEffect(() => {
        if (weekIndex !== null && courseContent && courseContent.length > 0) {
          const index = parseInt(weekIndex, 10);
          if (!isNaN(index) && index >= 0 && index < courseContent.length) {
            setSelectWeek(courseContent[index]);
          }
        }
    }, [weekIndex, courseContent]);

  return (
    <div className='class-container'>
        <div className='navbar-container-class' >
            <NavBar />
        </div>
        
        <div className='class-container-1'>

            <div className='class-main-container'>
                <div className='class-description-section'>

                    <div className='class-description-section-a'>
                        <div className='class-description-section-heading'>
                           <h2>Course Content</h2>
                        </div>

                        <div className='class-description-course-info'>
                           <div className='class-description-section-content-container'>
                                {courseContent?.map((content, index) => (
                                <div className='class-description-section-content' key={index}>
                                    <h2>{content.weekTitle}</h2>
                                    <div>
                                        <p>{content.videos.length} videos</p>
                                        <span>Incomplete</span>
                                    </div>
                                    <button onClick={() => handleSelectedIndex(content, index)}>Take Lecture</button>
                                </div>
                                ))}
                           </div>
                        </div>
                    </div>

                    <div className='class-description-leader-section'>
                        <div className='class-description-leader-content'>
                           <h2> Leaderboard</h2>
                        </div>

                        <LeaderBoardList />
                    
                    </div>
                </div>       


            <div className='class-video-container-1'>
                <VideoSection selectVideToPlay={selectVideoToPlay} courseDetails={courseDetails}/>
            </div>

            <div className='class-course-container-1'>
               <CourseChat selectWeek={selectWeek} courseDetails={courseDetails} setSelectVideoToPlay={setSelectVideoToPlay}/>
            </div>

        </div> 
        </div>
       
    </div>
  )
}

export default ClassRoom
