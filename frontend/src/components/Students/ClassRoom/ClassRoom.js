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
    const [courseDetails, setCourseDetails] = useState([])
    const [courseContent, setCourseContent] = useState([])
    const [selectWeek, setSelectWeek] = useState([])
    const [selectWeekIndex, setSelectWeekIndex] = useState(0)
    const [selectVideoToPlay, setSelectVideoToPlay] = useState({})
    const [couseCompletion, setCouseCompletion] = useState()
    const [videoPercentage, setVideoPercentage] = useState([])

    const handleSelectedIndex = (content, index) => {
        let ActivevideosArray = JSON.parse(localStorage.getItem('selectedWeekIndex')) || [];

        const existingVideoIndex = ActivevideosArray?.findIndex(video => video.slug === courseDetails?.slug);

        const newVideoObject = { 
            slug: courseDetails?.slug, 
            weekIndex: index, 
            videoUrl: courseContent[0]?.videos[0]?.videoFile, 
            videoId: courseContent[0]?.videos[0]?.id, 
            videoTitle: courseContent[0]?.videos[0]?.videoTitle 
        };

        if (existingVideoIndex !== -1) {
            ActivevideosArray[existingVideoIndex].weekIndex = newVideoObject.weekIndex
            ActivevideosArray[existingVideoIndex].videoUrl = newVideoObject.videoUrl;
            ActivevideosArray[existingVideoIndex].videoId = newVideoObject.videoId;
            ActivevideosArray[existingVideoIndex].videoTitle = newVideoObject.videoTitle;
        } else {
            ActivevideosArray.push(newVideoObject);
        }
        
        localStorage.setItem('selectedWeekIndex', JSON.stringify(ActivevideosArray));
        setSelectWeekIndex(index)
        setSelectWeek(content)

        // integrate API
    }

    console.log('courseDetails',courseContent)

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
        const weekIndexArray = JSON.parse(localStorage.getItem('selectedWeekIndex'));
        let isMounted = true;

        if (weekIndexArray && courseContent?.length > 0 && isMounted) {
            const weekIndex = weekIndexArray?.find(item => item.slug === courseDetails?.slug);
            if (weekIndex) {
                const index = parseInt(weekIndex.weekIndex, 10);
                if (!isNaN(index) && index >= 0 && index < courseContent?.length) {
                    setSelectWeek(courseContent[index]);
                    if (!selectVideoToPlay.id) {
                        setSelectVideoToPlay({
                            id: weekIndex.videoId,
                            url: weekIndex.videoUrl,
                            title: weekIndex.videoTitle
                        });
                    }
                }
            } 
            
        }else {
            setSelectWeek(courseContent?.[0]);
            setSelectVideoToPlay({
                id: courseContent?.[0]?.videos[0]?.id,
                url: courseContent?.[0]?.videos[0]?.videoFile ,
                title: courseContent?.[0]?.videos[0]?.videoTitle
            });
        }
    
        return () => {
            isMounted = false;
        };
    }, [courseContent, courseDetails, selectVideoToPlay]);

  return (
    <div className='class-container'>
        <div className='navbar-container-class' >
            <NavBar />
        </div>
        
        {loading ? <div className='class-container-loader'><Loader/></div> :(
            <div className='class-container-1'>

                <div className='class-main-container'>
                    <div className='class-description-section'>

                        <div className='class-description-section-a'>
                            <div className='class-description-section-heading'>
                            <h2>Course Content</h2>
                            </div>

                            <div className='class-description-course-info'>
                            <div className='class-description-section-content-container'>
                            {courseContent?.map((content, index) => {
                                        const weekData = courseDetails?.CompletionRate?.weekData?.find(week => week.weekTitle === content.weekTitle);

                                        const allVideosCompleted = weekData && weekData.videos.every(video => video.completed);

                                        return (
                                            <div className='class-description-section-content' key={index}>
                                                <h2>{content.weekTitle}</h2>
                                                <div>
                                                    <p>{content.videos.length} videos</p>
                                                    <span>{allVideosCompleted ? "Complete" : "Incomplete"}</span>
                                                </div>
                                                <button onClick={() => handleSelectedIndex(content, index)}>Take Lecture</button>
                                            </div>
                                        );
                                    })}
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
                    <VideoSection selectVideToPlay={selectVideoToPlay} courseDetails={courseDetails} setVideoPercentage={setVideoPercentage} videoPercentage={videoPercentage} selectWeekIndex={selectWeekIndex} setCouseCompletion={setCouseCompletion}/>
                </div>

                <div className='class-course-container-1'>
                <CourseChat selectWeek={selectWeek} courseDetails={courseDetails} setSelectVideoToPlay={setSelectVideoToPlay} videoPercentage={videoPercentage} couseCompletion={couseCompletion}/>
                </div>

            </div> 
            </div>
        )}
       
    </div>
  )
}

export default ClassRoom
