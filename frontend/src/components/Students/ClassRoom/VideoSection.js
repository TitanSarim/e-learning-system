import React, { useEffect, useRef, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { Player, ControlBar, LoadingSpinner, BigPlayButton} from 'video-react';
import 'video-react/dist/video-react.css';
import axios from 'axios';
import { ConfigApplicationJson } from '../../../actions/Config';
const BASE_URL = "http://localhost:3900"
// const BASE_URL = "http://20.6.81.5:3900"


const VideoSection = ({selectVideToPlay, courseDetails, setVideoPercentage, videoPercentage, selectWeekIndex, setCouseCompletion}) => {

  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef(null);

  const handleProgress = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getState();
      const { currentTime, duration, paused, ended } = playerState.player;
  
      const progressPercentage = (currentTime / duration) * 100;
  
      if (ended) {
        setIsCompleted(true); 
      } else if (!paused && progressPercentage >= 80) {
        setIsCompleted(true);
      } else if (paused && !ended) {
        setIsPaused(true);
      }
    }
    console.log("videoPercentage", videoPercentage)

  };


  const handleProgressUpdateApi = async (formData) => {
    
    try {
      
      const res = await axios.post(`${BASE_URL}/api/v1/save-completion-content`, formData, ConfigApplicationJson)
      if(res.status === 201){
        setCouseCompletion(res.data.completionPercentage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    const progressInterval = setInterval(handleProgress, 1000);
  
    if (isPaused === true || isCompleted === true) {
      clearInterval(progressInterval);
      setVideoPercentage(
        {
          slug: courseDetails?.slug,
          Week: selectWeekIndex,
          weekStatus: 'inComplete',
          isCompleted: true,
          id: selectVideToPlay?.id,
        }
      );
      const formData = {
        slug: courseDetails.slug,
        url: selectVideToPlay.url,
        isViewd: true
      }
      handleProgressUpdateApi(formData)
    }
      return () => clearInterval(progressInterval);
  }, [isCompleted]); 

  return (
    <section className='class-video-container'>
      <div className='class-video-section'>
        
        <div className='class-video-section-1'>
          <Player ref={playerRef}  src={selectVideToPlay.url} preload='auto'>
            <LoadingSpinner />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="my-class" />
          </Player>
        </div>

        <div className='class-video-section-2'> 
            <div className='class-video-section-contant-a'>
                <div className='class-video-section-contant-a-1'>

                  <h2>{selectVideToPlay?.title}</h2>

                    <div className='class-video-section-contant-user'>
                      <img src={courseDetails?.TeacherAvatar?.avatar?.url} alt="" />
                      <p className='class-video-section-contant-user-name'> {courseDetails?.teacher_name}</p>

                      {/* <div className='dot'></div>

                      <p className='class-video-section-contant-user-rank'>Developer</p>   */}

                      <div className='dot'></div>

                      <p><button>+Follow Mentor</button></p>
                    </div>

                </div>

                <div className='class-video-section-contant-a-2'>
                  <IoEyeOutline size={20}/>
                  <p>{courseDetails?.views} views</p>
                </div>

            </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
