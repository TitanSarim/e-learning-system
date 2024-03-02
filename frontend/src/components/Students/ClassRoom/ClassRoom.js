import React from 'react'
import NavBar from '../../NavBar/NavBar'
import "./classRoom.css"
import LeaderBoardList from './LeaderBoardList'
import VideoSection from './VideoSection'
import CourseChat from './CourseChat'

const ClassRoom = () => {
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
                           <h2>Other Courses</h2>
                        </div>

                        <div className='class-description-course-info'>
                            <div className='class-description-section-content'>
                                <h2>Python Function Polymorphism Challenges</h2>

                                <p>13 videos</p>

                                <button>View Details</button>
                            </div>

                            <div className='class-description-section-content'> 
                                <h2>Python Function Polymorphism Challenges</h2>

                                <p>12 videos</p>

                                <button>View Details</button>
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
                <VideoSection />
            </div>

            <div className='class-course-container-1'>
               <CourseChat />
            </div>

        </div> 
        </div>
       
    </div>
  )
}

export default ClassRoom
