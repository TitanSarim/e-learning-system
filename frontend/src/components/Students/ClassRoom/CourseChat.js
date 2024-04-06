import React, {useState} from 'react'

import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { LuUserPlus } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CourseChat = ({selectWeek, courseDetails, setSelectVideoToPlay, videoPercentage, couseCompletion}) => {


  const handleVideoChange = (id, url, title) => {
    setSelectVideoToPlay({id: id, url: url, title: title});
  }
  
  console.log("couseCompletion", couseCompletion)

  return (

    <div className='class-course-container'>

        <div className='class-course-container-a'>
            <div className='class-course-content-heading'>

                <button><FaArrowRight size={20}/></button>
                <h2>My Course</h2>

            </div>

            <div className='class-course-container-b'>
                <div className='class-course-container-b-1'>

                  <img src={courseDetails?.course_thumbnail} alt="course_thumbnail" width={100}/>

                  <div className='class-course-container-b-2'>

                    <p>{courseDetails?.course_title?.length > 33 ? courseDetails?.course_title.slice(0, 33): courseDetails?.course_title}..</p>

                    {couseCompletion > courseDetails?.CompletionRate?.CompletionPercentage ||  courseDetails?.CompletionRate === '' ? 
                      <div className='course-line' style={{ width: `${couseCompletion}%`}}></div>
                      :
                      <div className='course-line' style={{ width: `${courseDetails?.CompletionRate?.CompletionPercentage}%`}}></div>
                    }

                    <p>{courseDetails?.course_content?.length} Weeks · {courseDetails?.hours}+ hours</p>    

                  </div>
                </div>

            </div>

            <div className='class-course-container-c'>
                <div className='class-course-content'>

                  <div className='class-course-content-1'>
                      <p>{selectWeek?.weekTitle}</p>
                  </div>

                  
                  <div className='class-course-content-videos'>

                        {selectWeek?.videos?.map((item, index)=>(    

                          <div className='class-course-content-videos-1' key={item?.id} onClick={() => handleVideoChange(item?.id, item?.videoFile, item?.videoTitle)}>

                            <div >
                             
                                {courseDetails?.ViewedVideos?.some(viewedVideo => viewedVideo.url === item?.videoFile) || (item?.id === videoPercentage?.id && videoPercentage?.isCompleted === true  ) ?
                                      <FaCheck size={12} style={{backgroundColor: "#007AFF", borderRadius: "50%", color: "white", padding: "4px" }} /> : 
                                      <FaRegCircle size={20} style={{color: "#007AFF"}}/>
                                } 
                           
                            </div>

                            <div className='class-course-content-videos-content-1'> 

                               <div className='class-course-content-videos-content'>

                                  <MdOutlineOndemandVideo />
                                  <p>{index + 1} -</p>
                                  <p>{item.videoTitle.length > 22 ? item.videoTitle.slice(0, 23): item.videoTitle}..</p>

                               </div>
                      
                  
                               <div className='class-course-content-videos-duration'>

                                 <p>(2:20)</p>

                               </div>

                             </div>
                          </div>
                         
                        ))}          
                  </div>
                  
                 
                </div>
            </div>

            <div className='class-course-container-d'>

              <div className='class-course-container-d-heading'>
                <div>
                  <div></div>
                  <p>Stream Chat</p>
                </div>
                 
                <LuUserPlus size={20} color='white'/>
              </div>

              <div className='class-course-container-d-chat'>
                    <p color='white'>OOPs!!</p>
              </div>

              <div className="class-course-container-d-input">
                  <FaRegSmile size={20} /> 
                  <input type="text" placeholder='Reply...' />
                  <button>
                     <IoIosArrowForward size={20}/>
                  </button>
              </div>
            </div>
        </div>
           
    </div>  
  )
}

export default CourseChat


