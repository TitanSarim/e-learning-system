import React, { useEffect, useRef, useState } from 'react'
import videoImage from "../../../assets/VideoPlay.png"
import userImage from "../../../assets/profile.png"
import { IoEyeOutline } from "react-icons/io5";
import { Player, ControlBar, LoadingSpinner, BigPlayButton} from 'video-react';
import 'video-react/dist/video-react.css';

const VideoSection = ({selectVideToPlay, courseDetails, setVideoPercentage, videoPercentage}) => {

  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef(null);

  const handleProgress= () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getState();
      const { currentTime, duration, paused } = playerState.player;
      const progressPercentage = (currentTime / duration) * 100;
  
      setVideoPercentage({
        isCompleted: isCompleted,
      });
  
      if (progressPercentage >= 90 && !isCompleted) {
        setIsCompleted(true);
      }
      if(paused === true){
        setIsPaused(true)
      }
    }
  }

  console.log("videoPercentage", videoPercentage)

  useEffect(() => {
    const progressInterval = setInterval(handleProgress, 1000);
  
    if (isCompleted === true || isPaused === true) {
      clearInterval(progressInterval);
      setVideoPercentage({
        isCompleted: true,
        id: selectVideToPlay?.id
      });
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
