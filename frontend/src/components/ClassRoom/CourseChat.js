import React from 'react'

import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { LuUserPlus } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";





import courseImage from "../../../src/assets/courseImage.png"


const course = [
  {
     No : "01",
     title: " Welcome!",
     duration: "2:20"
  },
  {
     No : "02",
     title: " What is Python design?",
     duration: "2:20"
  },
  {
     No : "03",
     title: "Python Developer role developer",
     duration: "2:20"
  },
  {
     No : "04",
     title: "A little bit of a background of topic",
     duration: "2:20"
  },
  {
     No : "05",
     title: "A  bit of a background of Coding",
     duration: "2:20"
  }
]


const CourseChat = () => {

  return (

    <div className='class-course-container'>

        <div className='class-course-container-a'>
            <div className='class-course-content-heading'>

                <button><FaArrowRight size={20}/></button>
                <h2>My Course</h2>

            </div>

            <div className='class-course-container-b'>
                <div className='class-course-container-b-1'>

                  <img src={courseImage} alt="course image" className=''/>

                  <div className='class-course-container-b-2'>

                    <p>Design Challenges Workbook</p>

                    <div className='course-line'></div>

                    <p>40+ lessons · 4+ hours</p>    

                  </div>
                </div>

            </div>

            <div className='class-course-container-c'>
                <div className='class-course-content'>

                  <div className='class-course-content-1'>
                      <p>Course Content</p>
                  </div>

                  
                  <div className='class-course-content-videos'>

                        {course.map((item)=>(    

                          <div className='class-course-content-videos-1'>

                            <div >
                             {false ? <FaCheck size={12} style={{backgroundColor: "#007AFF", borderRadius: "50%", color: "white", padding: "4px" }} />: <FaRegCircle size={20} style={{color: "#007AFF"}}/> } 
                            </div>

                            <div className='class-course-content-videos-content-1'> 

                               <div className='class-course-content-videos-content'>

                                  <MdOutlineOndemandVideo />
                                  <p>{item.No} -</p>
                                  <p>{item.title.length > 22 ? item.title.slice(0, 23): item.title}..</p>

                               </div>
                      
                  
                               <div className='class-course-content-videos-duration'>

                                 <p>({item.duration})</p>

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
