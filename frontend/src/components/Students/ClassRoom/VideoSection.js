import React from 'react'
import videoImage from "../../../assets/VideoPlay.png"
import userImage from "../../../assets/profile.png"
import { IoEyeOutline } from "react-icons/io5";


const VideoSection = () => {
  return (
    <section className='class-video-container'>
      <div className='class-video-section'>
        
        <div className='class-video-section-1'>
          <img src={videoImage} alt="video Play" />
        </div>

        <div className='class-video-section-2'> 
            <div className='class-video-section-contant-a'>
                <div className='class-video-section-contant-a-1'>

                  <h2>Introduction to Python Programming</h2>

                    <div className='class-video-section-contant-user'>
                      <img src={userImage} alt="" />
                      <p className='class-video-section-contant-user-name'> John smit</p>

                      <div className='dot'></div>

                      <p className='class-video-section-contant-user-rank'>Developer</p>  

                      <div className='dot'></div>

                      <p><button>+Follow Mentor</button></p>
                    </div>

                </div>

                <div className='class-video-section-contant-a-2'>
                  <IoEyeOutline size={20}/>
                  <p>830 views</p>
                </div>

            </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
