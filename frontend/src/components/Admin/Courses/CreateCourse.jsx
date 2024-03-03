import React, { useRef, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { BsCloudUpload } from "react-icons/bs";


import './CreateCourse.css'


const CreateCourse = () => {


    const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('Design');
    const [tags, setTags] = useState('');
    const [weeks, setWeeks] = useState(1);
    const [selectedVid, setSelectedVid] = useState();
    const [seqByWeek, setSeqByWeek] = useState();
    const [courseDesc, setCourseDesc] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoDivsArray, setVideoDivsArray] = useState(
        Array.from({ length: weeks }, () => [{ id: 1, videoDesc: '', videoFile: null }])
      );


    const handleCourseEditorChange = (value) => {
        setCourseDesc(value);
    };


    const handleFileInputChange = (weekIndex, divId) => (e) =>{
        const video = e.target.files[0]
        console.log("weekIndex", weekIndex)
        console.log("divId", divId)
        console.log("SelectedVid", video)
    };

    const handleSeqByWeekChange = (weekIndex, e) => {
        
        setSeqByWeek(weekIndex)
        console.log("Dynamic weekIndex:", weekIndex);
    };

    const handleWeekTitleChange = (weekIndex, value) => {
        // Handle Week Title input change
    };


    const handleVideoEditorChange = (weekIndex, id, value) => {
        setVideoDivsArray((prevVideoDivsArray) =>
          prevVideoDivsArray.map((weekDivs, index) =>
            index === weekIndex
              ? weekDivs.map((div) => (div.id === id ? { ...div, videoDesc: value } : div))
              : weekDivs
          )
        );
      };
    
      const handleAddVideo = (weekIndex) => {
        setVideoDivsArray((prevVideoDivsArray) => {
            const newId = Math.max(...prevVideoDivsArray[weekIndex].map((div) => div.id), 0) + 1;
            const updatedWeeks = [...prevVideoDivsArray];
            updatedWeeks[weekIndex] = [...updatedWeeks[weekIndex], { id: newId, videoDesc: '', videoFile: null }];
            return updatedWeeks;
        });
      };
      
      const handleDeleteVideo = (weekIndex, id) => {
        setVideoDivsArray((prevVideoDivsArray) => {
          const updatedWeeks = prevVideoDivsArray.map((weekDivs, index) =>
            index === weekIndex ? weekDivs.filter((div) => div.id !== id) : weekDivs
          );
      
          if (updatedWeeks[weekIndex].length === 0) {
            return prevVideoDivsArray;
          }
      
          return updatedWeeks;
        });
      };
    
      const handleWeeksChange = (event) => {
        const selectedWeeks = parseInt(event.target.value, 10);
        setWeeks(selectedWeeks);
        setVideoDivsArray(Array.from({ length: selectedWeeks }, () => [{ id: 1, videoDesc: '', videoFile: null }]));
      };

      const handleSubmit = () => {
        
        const formData = {
            courseTitle,
            courseCategory,
            tags,
            weeks,
            courseDesc,
            thumbnailFile,
            videoDivsArray,
        }

        console.log("formData", formData)
      }

  return (
    <div className='admin-container'>

    <div className='admin-dashboard-sidebar'>
        <SideBar/>
    </div>

        <div className='admin-wrapper'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/all-courses'}>All Course</Link>

                <div className='admin-create-course-container'>

                    <p>Add new course</p>

                    <div className='admin-create-course-input-title'>
                        <p>Course Title <span>*</span></p>
                        <input type='text' placeholder='Course Title' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
                        <span>0/60</span>
                    </div>

                    <div className='admin-create-course-input-containers'>
                       
                        <div className='admin-create-course-select'>
                            <p>Course Category <span>*</span></p>
                            <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)}>
                                <option selected>Design</option>
                                <option>Website</option>
                                <option>Apps</option>
                                <option>Software</option>
                                <option>Development</option>
                                <option>Photography</option>
                                <option>Music</option>
                                <option>Marketing</option>
                            </select>
                        </div>
                        <div className='admin-create-course-input' >
                            <p>Tags <span>*</span></p>
                            <input placeholder='Select 5 tags saprated by comma ,' value={tags} onChange={(e) => setTags(e.target.value)}/>
                        </div>

                        <div className='admin-create-course-select'>
                            <p>Timeline <span>*</span></p>
                            <select onChange={handleWeeksChange} value={weeks}>
                                {[1, 2, 3, 4, 5, 7, 8, 9, 10].map((week) => (
                                    <option key={week} value={week}>
                                        {week} Week{week !== 1 && 's'}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className='admin-create-course-text-area'>
                        <p>Course Description <span>*</span></p>
                        <ReactQuill 
                            theme="snow"
                            value={courseDesc}
                            onChange={handleCourseEditorChange}
                        />
                    </div>

                    <div className='admin-create-course-file-image'>
                        <p>Cource Thumbnail <span>*</span></p>
                        <div>
                            <label for="file-input-thumbnail">
                                <BsCloudUpload size={26} />
                            </label>
                            <input type='file' id="file-input-thumbnail" accept='image/*' onChange={(e) => setThumbnailFile(e.target.files[0])}/>
                        </div>
                    </div>
                    
                    {Array?.from({ length: weeks }, (_, weekIndex) => {

                        return(   
                            <div key={weekIndex} className='admin-create-course-adding-videos-container'>
                                
                                <div className='admin-create-course-adding-videos-addition'>
                                    <div className='admin-create-course-adding-videos-input'>
                                        <p>Seq by Week <span>*</span></p>
                                        <input 
                                            type="number" 
                                            placeholder="Seq by Week"  
                                            // disabled 
                                            value={weekIndex + 1} 
                                            onChange={(e) => handleSeqByWeekChange(weekIndex, e)}
                                        />
                                    </div>

                                    <div className='admin-create-course-adding-videos-input'>
                                        <p>Week Title <span>*</span></p>
                                        <input type="text" placeholder='Title for week' onChange={(e) => handleWeekTitleChange(weekIndex, e.target.value)}/>
                                    </div>
                                </div>
            

                                <>
                                    {videoDivsArray[weekIndex]?.map((div) => {

                                        
                                        return(
                                        <div key={div.id} className='admin-create-course-adding-videos-wrapper'>
                                            <div className='admin-create-course-adding-video'>
                                                <div className='admin-create-course-adding-videos-file-video'>
                                                    <p>Upload video <span>*</span></p>
                                                    <div>
                                                        <label htmlFor={`file-input-${div.id}`}>
                                                            <BsCloudUpload size={26} />
                                                        </label>
                                                        <input
                                                            id={`file-input-${div.id}`}
                                                            type='file'
                                                            accept='.mov, .mp4'
                                                            onChange={handleFileInputChange(weekIndex, div.id)}
                                                            
                                                        />
                                                    </div>
                                                </div>
                                                <div className='admin-create-course-adding-videos-btn'>
                                                    <p>Add another video</p>
                                                    <button onClick={() => handleAddVideo(weekIndex)}>
                                                        <IoAdd size={26} />
                                                    </button>
                                                    <button onClick={() => handleDeleteVideo(weekIndex, div.id)}>
                                                        <CiCircleRemove size={26} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='admin-create-course-adding-videos-text-area'>
                                                <p>Add video description <span>*</span></p>
                                                <ReactQuill
                                                theme="snow"
                                                value={div.videoDesc}
                                                onChange={(value) => handleVideoEditorChange(weekIndex, div.id, value)}
                                                />
                                            </div>
                                        </div>
                                        )
                                    })}
                                </>

                            </div>
                        )
                    })}

                    <div>
                        <button onClick={handleSubmit}> 
                            click
                        </button>
                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default CreateCourse


