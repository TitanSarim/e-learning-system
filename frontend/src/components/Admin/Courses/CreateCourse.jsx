import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {adminCreateCourse, clearErrors} from '../../../actions/CoursesAction' 
import ProgressLoader from '../../Utils/ProgressLoader';
import { MdErrorOutline } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";

import './CreateCourse.css'


const CreateCourse = () => {

    const dispatch = useDispatch()

    const {error, loading, isSuccess} = useSelector((state)=>state.adminCourses);

    const [uploadProgress, setUploadProgress] = useState(0); // set upload progress

    const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('Design');
    const [tags, setTags] = useState('');
    const [weeks, setWeeks] = useState(1);
    const [seqByWeek, setSeqByWeek] = useState();
    const [courseDesc, setCourseDesc] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const createEmptyWeek = () => ({
        weekTitle: '',
        videos: [{ id: 1, videoDesc: '', videoFile: null }],
      });
    
    const [videoDivsArray, setVideoDivsArray] = useState(
        Array.from({ length: weeks }, (_, weekIndex) => createEmptyWeek())
    );

    const [courseTitleAuthError, setCourseTitleAuthError] = useState({ value: '', error: false });
    const [tagsAuthError, setTagsAuthError] = useState({ value: '', error: false });
    const [courseDescAuthError, setCourseDescAuthError] = useState({ value: '', error: false });
    const [thumbnailFileAuthError, setThumbnailFileAuthError] = useState({ value: null, error: false });
    const [videoDivsArrayError, setVideoDivsArrayError] = useState(false);
    const [videoDivsArrayAuthError, setVideoDivsArrayAuthError] = useState([]);


    const handleCourseTitle = (e) => {
        const title = e.target.value
        setCourseTitle(title)

        if(courseTitle){
            setCourseTitleAuthError({ value: "", error: false});
        }
    }

    const handleCourseTags = (e) => {
        const tags = e.target.value
        setTags(tags)

        if(tags){
            setTagsAuthError({ value: "", error: false});
        }
    }

    const handleWeeksChange = (event) => {
        const selectedWeeks = parseInt(event.target.value, 10);
        setWeeks(selectedWeeks);
        setVideoDivsArray(Array.from({ length: selectedWeeks }, (_, weekIndex) => createEmptyWeek()));
    };

    const handleCourseEditorChange = (value) => {
        setCourseDesc(value);

        if(courseDesc){
            setCourseDescAuthError({ value: "", error: false});
        }
    };

    const handleSeqByWeekChange = (weekIndex, e) => {
        
        setSeqByWeek(weekIndex)
        console.log("Dynamic weekIndex:", weekIndex);
    };

    const handleThumbnailChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const image = new Image();

            image.onload = () => {
                const { naturalWidth, naturalHeight } = image;

                console.log("naturalWidth", naturalWidth, 'h', naturalHeight)

                // Check if dimensions are within the specified ranges
                if (
                    (naturalWidth >= 640 && naturalWidth <= 700) &&
                    (naturalHeight >= 280 && naturalHeight <= 330)
                ) {
                    setThumbnailFile(selectedFile);
                    toast.success('Image selected')
                } else {
                    toast.error('Image dimensions must be between 280-330px width and 640-700px height');
                    setThumbnailFile(null)
                }
            };

            image.src = URL.createObjectURL(selectedFile);
        }

        if(selectedFile){
            setThumbnailFileAuthError ({ value: null, error: false});
        }
    };

    const handleWeekTitleChange = (weekIndex, e) => {

        const title = e.target.value;
        setVideoDivsArray((prevVideoDivsArray) =>
          prevVideoDivsArray.map((week, index) =>
            index === weekIndex ? { ...week, weekTitle: title } : week
          )
        );

        setVideoDivsArrayAuthError((prevErrors) => ({
            ...prevErrors,
            error: false,
        }));
    };

    const handleFileInputChange = (weekIndex, divId, event) => {
        const vidFile = event.target.files[0]

        setVideoDivsArray((prevVideoDivsArray) =>
            prevVideoDivsArray.map((week, wIndex) =>
                wIndex === weekIndex
                    ? {
                        ...week,
                        videos: week.videos.map((video) =>
                            video.id === divId ? { ...video, videoFile: vidFile } : video
                        ),
                    }
                    : week
            )
        );

        setVideoDivsArrayAuthError((prevErrors) => ({
            ...prevErrors,
            error: false,
        }));
      
    };

    const handleVideoEditorChange = (weekIndex, divId, value) => {
        setVideoDivsArray((prevVideoDivsArray) =>
            prevVideoDivsArray.map((week, wIndex) =>
                wIndex === weekIndex
                    ? {
                        ...week,
                        videos: week.videos.map((video) =>
                            video.id === divId ? { ...video, videoDesc: value } : video
                        ),
                    }
                    : week
            )
        );

        setVideoDivsArrayAuthError((prevErrors) => ({
            ...prevErrors,
            error: false,
        }));
    };
    
    const handleAddVideo = (weekIndex) => {
        setVideoDivsArray((prevVideoDivsArray) => {
            const newId =
              Math.max(
                ...prevVideoDivsArray[weekIndex].videos.map((video) => video.id),
                0
              ) + 1;
      
            return prevVideoDivsArray.map((week, wIndex) =>
              wIndex === weekIndex
                ? {
                    ...week,
                    videos: [...week.videos, { id: newId, videoDesc: '', videoFile: null }],
                  }
                : week
            );
          });
    };
      
    const handleDeleteVideo = (weekIndex, divId) => {
        setVideoDivsArray((prevVideoDivsArray) =>
            prevVideoDivsArray.map((week, wIndex) =>
                wIndex === weekIndex
                ? { ...week, videos: week.videos.filter((video) => video.id !== divId) }
                : week
            )
        );
    };
    
    const getExtension = (fileName) => {
        return fileName?.split('.').pop().toUpperCase();
    };

    const handleSubmit = () => {

        if (!courseTitle) {
            setCourseTitleAuthError({ value: "Tile is required", error: true });
            return
        }else if (!tags) {
            setTagsAuthError({ value: "Tags is required", error: true });
            return
        }else if (!courseDesc) {
            setCourseDescAuthError({ value: "Course description is required", error: true });
            return
        }else if (!thumbnailFile) {
            setThumbnailFileAuthError({ value: "Thumbnail is required", error: true });
            return
        }
        

        const hasEmptyFields = videoDivsArray.some((week, weekIndex) =>
            week.videos.some((video, videoIndex) => {
                const errors = [];
                if (!week.weekTitle) {
                    errors.push({ weekIndex, videoIndex, error: 'Title is required' });
                }
                if (!video.videoFile) {
                    errors.push({ weekIndex, videoIndex, error: 'Video file is required' });
                }
                if (!video.videoDesc) {
                    errors.push({ weekIndex, videoIndex, error: 'Video description is required' });
                }

                if (errors.length > 0) {
                    setVideoDivsArrayAuthError((prevErrors) => {
                        return Array.isArray(prevErrors) ? [...prevErrors, ...errors] : [...errors];
                    });
                    setVideoDivsArrayError(true);
                    return true; 
                }

                return false; 
            })
        );

        if (hasEmptyFields) {
            return;
        }
        
        setUploadProgress(0)
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

        const onVideoUploadProgress = (progress) => {
            setUploadProgress(progress);
        };
      
        
        dispatch(adminCreateCourse(formData, onVideoUploadProgress, ))

        if(isSuccess === true){
           
        }
    }

    useEffect(() => {
        if(isSuccess){
            toast.success("Course Created")
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    })

  return (
    <div className='admin-container'>

    <div className='admin-dashboard-sidebar'>
        <SideBar/>
    </div>

        <div className='admin-wrapper'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/all-courses'}>All Course</Link>
                
                {loading  ? (
                    <div className='admin-allcourses-container-progress-loader'>
                        <ProgressLoader/>
                        <p className='admin-allcourses-container-progress-loader-progressbar'>
                            {uploadProgress?.videoProgress>0 ? (
                                <span style={{ width: `${uploadProgress?.videoProgress}%` }}>{uploadProgress?.videoProgress?.toFixed(0)} %</span>
                            ) : ""}
                        </p>
                        <span>Videos to  upload... {uploadProgress?.totalVideos}</span>
                    </div>
                ) : (
                    <div className='admin-create-course-container'>

                        <p>Add new course</p>

                        <div className='admin-create-course-input-title'>
                            <p>Course Title <span>*</span></p>
                            <input type='text' placeholder='Course Title' value={courseTitle} onChange={(e) => handleCourseTitle(e)}/>
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
                                <input placeholder='Select 5 tags saprated by comma ,' value={tags} onChange={(e) => handleCourseTags(e)}/>
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
                                <span>
                                    <label for="file-input-thumbnail">
                                        <BsCloudUpload size={26} />
                                    </label>
                                    <input type='file' id="file-input-thumbnail" accept='image/*'  onChange={handleThumbnailChange}/>
                                </span>
                                {!thumbnailFile ? 
                                    <p>No File <span>Image height greater then 280px and smaller then 330px, image width greater then 640px and smaller then 700px</span> </p> 
                                    : 
                                    <img src={URL.createObjectURL(thumbnailFile)} alt='Thumbnail'/>
                                }
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
                                            <input type="text" placeholder='Title for week' onChange={(e) => handleWeekTitleChange(weekIndex, e)}/>
                                        </div>
                                    </div>
                

                                    <>
                                        {videoDivsArray[weekIndex]?.videos.map((video) => {

                                            
                                            return(
                                            <div key={video.id} className='admin-create-course-adding-videos-wrapper'>
                                                <div className='admin-create-course-adding-video'>
                                                    <div className='admin-create-course-adding-videos-file-video'>
                                                        <p>Upload video <span>*</span></p>
                                                        <div>
                                                            <input
                                                                type='file'
                                                                accept='.mov, .mp4'
                                                                onChange={(event) => handleFileInputChange(weekIndex, video.id, event)}                                               
                                                            />
                                                            {!video.videoFile ? 
                                                            
                                                            <p>No File</p> 
                                                            :
                                                            <p><span>{video.videoFile?.name.substring(0, 3)}...</span> <span>{getExtension(video.videoFile?.name)}</span></p>
                                                            }
                                                            
                                                        </div>
                                                    
                                                    </div>
                                                    <div className='admin-create-course-adding-videos-btn'>
                                                        <p>Add another video</p>
                                                        <button onClick={() => handleAddVideo(weekIndex)}>
                                                            <IoAdd size={26} />
                                                        </button>
                                                        <button onClick={() => handleDeleteVideo(weekIndex, video.id)}>
                                                            <CiCircleRemove size={26} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='admin-create-course-adding-videos-text-area'>
                                                    <p>Add video description <span>*</span></p>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={video.videoDesc}
                                                        onChange={(value) => handleVideoEditorChange(weekIndex, video.id, value)}
                                                    />
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </>

                                </div>
                            )
                        })}

                        { courseTitleAuthError.error === true || tagsAuthError.error === true || courseDescAuthError.error === true || thumbnailFileAuthError.error === true ? 
                            (
                               <div className='admin-create-course-errors'>
                                    {courseTitleAuthError.error === true ?  (<p><MdErrorOutline size={24}/> {courseTitleAuthError?.value}</p>) : ""}
                                    {tagsAuthError.error === true ? (<p><MdErrorOutline size={24}/> {tagsAuthError?.value}</p>) : ""}
                                    {courseDescAuthError.error === true ? (<p><MdErrorOutline size={24}/> {courseDescAuthError?.value}</p>) : ""}
                                    {thumbnailFileAuthError.error === true ? (<p><MdErrorOutline size={24}/> {thumbnailFileAuthError?.value}</p>):""}
                               </div> 
                            ) : ""}

                        {videoDivsArrayError === true ? 
                            <>
                                {videoDivsArrayError && Array.isArray(videoDivsArrayAuthError) && videoDivsArrayAuthError.length > 0 && (
                                    <div className='admin-create-course-adding-videos-errors-container'>
                                        {videoDivsArrayAuthError.map((errorData, index) => (
                                            <div key={index} className='admin-create-course-adding-videos-errors'>
                                                <MdErrorOutline size={24}/>
                                                <p>Error at week {errorData.weekIndex+1} <RiArrowRightSLine size={25}/></p>
                                                <p>video {errorData.videoIndex+1} <RiArrowRightSLine size={25}/> </p>
                                                <p>error: {errorData.error}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                            : ""
                        }

                        <div className='admin-create-course-submit-btn'>
                            <button onClick={handleSubmit}> 
                                Create Course
                            </button>
                        </div>

                    </div>
                )}

            </div>

        </div>

    </div>
  )
}

export default CreateCourse


