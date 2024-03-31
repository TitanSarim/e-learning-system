import React, { useState } from 'react'
import './CourseDetailTabs.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";


const CourseDetailCurriculum = ({curriculum}) => {

  const [activeWeek, setActiveWeek] = useState(null);

  const toggleWeek = (index) => {
    setActiveWeek(activeWeek === index ? null : index);
  };

  return (
    <div className="course-curriculum-container">
      <p>Course Curriculum</p>
      <div className="course-curriculum-content">
        {curriculum?.map((course, index) => (
          <div key={index} className="course-curriculum-week">
            <button
              className={`course-curriculum-content-week ${
                activeWeek === index ? 'active' : ''
              }`}
              onClick={() => toggleWeek(index)}
            >
              {activeWeek === index ? <MdOutlineKeyboardArrowDown size={23} /> : <MdKeyboardArrowRight size={23} />}
              {course?.weekTitle}
            </button>
            <div className='course-curriculum-week-video-titles'>
              {activeWeek === index &&
                course?.videos.map((videoTitle, i) => (
                  <p key={i} className="course-curriculum-week-video-title">
                  <RxDotFilled size={20}/> {videoTitle?.videoTitle}
                  </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}

export default CourseDetailCurriculum