import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {AdminGetSingleCourses, adminUpdateCourse, clearErrors} from '../../../actions/CoursesAction' 
import ProgressLoader from '../../Utils/ProgressLoader';
import { MdErrorOutline } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { TfiSave } from "react-icons/tfi";
import Select from 'react-select';
import {commonSpokenLanguages} from '../../../Jsons/Language'
import {CourseHoursLength} from '../../../Jsons/HoursLength'
import {SkillsLevel} from '../../../Jsons/SkillLevel'
import './CreateCourse.css'


const EditCourse = () => {

    const { slug } = useParams();
    const courseSlug = slug.substring(slug.lastIndexOf('/') + 1);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error, loading, updateLoading, AdminSinglecourse, isSuccess} = useSelector((state)=>state.adminCourses);


    const [courseData, setCourseData] = useState(AdminSinglecourse)

    const [uploadProgress, setUploadProgress] = useState(0); 

    const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('Design');
    const [tags, setTags] = useState('');
    const [price, setPrice] = useState('');
    const [weeks, setWeeks] = useState(1);
    const [seqByWeek, setSeqByWeek] = useState();
    const [courseDesc, setCourseDesc] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('')
    const [hours, setHours] = useState('');

    const createEmptyWeek = () => ({
        weekTitle: '',
        videos: [{ id: 1, videoDesc: '', videoTitle: "", videoFile: null, videoFileName: null, isFeatured: false, oldUrl: null}],
      });
    
    const [videoDivsArray, setVideoDivsArray] = useState(
        Array.from({ length: weeks }, (_, weekIndex) => createEmptyWeek())
    );

    const [errorTitleMessage, setTitleErrorMessage] = useState('');
    const [titleHasSpecialChar, setTitleHasSpecialChar] = useState('');
    const [courseTitleAuthError, setCourseTitleAuthError] = useState({ value: '', error: false });
    const [tagsAuthError, setTagsAuthError] = useState({ value: '', error: false });
    const [priceAuthError, setPriceAuthError] = useState({ value: '', error: false });
    const [courseDescAuthError, setCourseDescAuthError] = useState({ value: '', error: false });
    const [thumbnailFileAuthError, setThumbnailFileAuthError] = useState({ value: null, error: false });
    const [videoDivsArrayError, setVideoDivsArrayError] = useState(false);
    const [videoDivsArrayAuthError, setVideoDivsArrayAuthError] = useState([]);
    const [skillError, setSkillError] = useState({ value: null, error: false });
    const [lengthError, setLengthError] = useState({ value: null, error: false });
    const [languageError, setLanguageError] = useState({ value: null, error: false });
    const [isChecked, setIsChecked] = useState(false);


    const handleCourseTitle = (e) => {
        const title = e.target.value.slice(0, 75);         
        setCourseTitle(title)


        if (title.length > 75) {
            setTitleErrorMessage('Title cannot exceed 75 characters');
            return;
        }

        if (title) {
            setTitleErrorMessage('');
            setCourseTitleAuthError({ value: "", error: false});
        }


        const titleLength = title?.length;

        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const hasSpecialChars = specialCharsRegex.test(title);

        if(hasSpecialChars){
            setTitleHasSpecialChar("Special characters are not allowed")
        }else if(!hasSpecialChars){
            setTitleHasSpecialChar("")
        }       
        
        if (titleLength < 40) {
            setTitleErrorMessage('Short Title');
        } else if (titleLength > 60) {
            setTitleErrorMessage('Long Title');
        } else {
            setTitleErrorMessage('Excellent');
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

    const handlePriceChange = (e) => {
        const price = e.target.value
        setPrice(price)

        if(price){
            setPriceAuthError({ value: "", error: false});
        }
    }

    const handleCourseEditorChange = (value) => {
        setCourseDesc(value);

        if(courseDesc){
            setCourseDescAuthError({ value: "", error: false});
        }
    };

    const handleSeqByWeekChange = (weekIndex, e) => {
        
        setSeqByWeek(weekIndex)
    };

    const handleThumbnailChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const image = new Image();

            image.onload = () => {
                const { naturalWidth, naturalHeight } = image;


                // Check if dimensions are within the specified ranges
                if (
                    (naturalWidth >= 700 && naturalWidth <= 5000) &&
                    (naturalHeight >= 450 && naturalHeight <= 3200)
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
                            video.id === divId ? { ...video, videoFile: vidFile, videoFileName:vidFile?.name } : video
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

    const handleVideoTitleChange = (weekIndex, divId, e) => {

        const videoTitle = e.target.value;

        if (videoTitle.length > 75) {
            // setTitleErrorMessage('Title cannot exceed 75 characters');
            return;
        }

        setVideoDivsArray((prevVideoDivsArray) =>
            prevVideoDivsArray.map((week, wIndex) =>
                wIndex === weekIndex
                    ? {
                        ...week,
                        videos: week.videos.map((video) =>
                            video.id === divId ? { ...video, videoTitle: videoTitle } : video
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

    const handleVideoFeaturedChange = (weekIndex, divId, e) => {

        const featured = e.target.checked;

        setVideoDivsArray((prevVideoDivsArray) =>
            prevVideoDivsArray.map((week, wIndex) =>
                wIndex === weekIndex
                    ? {
                        ...week,
                        videos: week.videos.map((video) =>
                            video.id === divId ? { ...video, isFeatured: featured } : video
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
                    videos: [...week.videos, { id: newId, videoDesc: '', videoTitle: '', videoFile: null }],
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


    const handleSubmit = (action) => {

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
        }else if(titleHasSpecialChar){
            setCourseTitleAuthError({ value: "Special Characters are not allowed", error: true });
            return
        }else if(!price){
            setPriceAuthError({ value: "Price is required", error: true });
            return
        }else if(!level){
            setSkillError({ value: "Skills is required", error: true });
            return
        }else if (!language){
            setLanguageError({ value: "Language is required", error: true });
            return
        }
        else if (!hours){
            setLengthError({ value: "Duration is required", error: true });
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
                }if(!video.videoTitle){
                    errors.push({ weekIndex, videoIndex, error: 'Video title is required' });
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
            courseDesc,
            price,
            tags,
            weeks,
            language,
            level,
            hours,
            thumbnailFile,
            videoDivsArray,
            status: 'active'
        }
    

        const onVideoUploadProgress = (progress) => {
            setUploadProgress(progress);
        };
      
        
        dispatch(adminUpdateCourse(formData, onVideoUploadProgress, courseSlug, courseData?.course_thumbnail))

        if(isSuccess === true){
            // window.location.reload()
            // navigate("/admin/all-courses")
            toast.success("Course Updated")
        }
    }

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [])

    useEffect(() => {
        dispatch(AdminGetSingleCourses(courseSlug));
    }, [courseSlug, dispatch])

    useEffect(() => {
        if (AdminSinglecourse && Object.keys(AdminSinglecourse).length > 0) {
            setCourseData(AdminSinglecourse);
        }
    }, [AdminSinglecourse]);

    useEffect(() => {
        setCourseTitle(courseData?.course_title)
        setCourseCategory(courseData?.category)
        setTags(courseData?.tags)
        setPrice(courseData?.price)
        setWeeks(courseData?.timeline)
        setLanguage(courseData?.language)
        setLevel(courseData?.level)
        setHours(courseData?.hours)
        setCourseDesc(courseData?.course_desc)
        setThumbnailFile(courseData?.course_thumbnail)
    
        if (courseData?.course_content && courseData?.course_content.length > 0) {
            const mappedData = courseData?.course_content?.map(week => ({
                weekTitle: week.weekTitle,
                videos: week.videos.map(video => ({
                    id: video.id,
                    videoDesc: video.videoDesc,
                    videoTitle: video.videoTitle,
                    videoFile: video.videoFile,
                    videoFileName: video.videoFileName,
                    isFeatured: video.isFeatured,
                    oldUrl: video.videoFile,
                }))
            }));
    
            setVideoDivsArray(mappedData);
        }
    
    }, [courseData]);

    useEffect(() => {
        if (updateLoading) {
            window.scrollTo(0, 0);
        }
    }, [updateLoading]);


    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          width: 320,
          height: 48,
          backgroundColor: 'transparent',
          border: state.isFocused ? '1px solid rgb(14, 18, 37)' : '1px solid rgb(14, 18, 37)',
          outline: "none",
          borderRadius: 4, 
          cursour: "pointer"
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'black', 
          }),  
          placeholder: (provided) => ({
            ...provided,
            color: 'rgb(163, 163, 163)', 
          }),
      };

  return (
    <div className='admin-container'>

    <div className='admin-dashboard-sidebar'>
        <SideBar/>
    </div>

        <div className='admin-wrapper-create-course'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/all-courses'}>All Course</Link>
                
                {updateLoading  ? (
                    <div className='admin-allcourses-container-progress-loader'>
                        <ProgressLoader/>
                        <p className='admin-allcourses-container-progress-loader-progressbar'>
                        {uploadProgress?.videoProgress>0 ? (
                            <span style={{ width: `${uploadProgress?.videoProgress}%` }}>{uploadProgress?.videoProgress?.toFixed(0)}%</span>
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
                            <div>
                                {titleHasSpecialChar ? (<span>{titleHasSpecialChar}</span>) : ""}
                                {errorTitleMessage === "Short Title" || errorTitleMessage === "Long Title" ? <p className='admin-create-course-input-title-short'>{errorTitleMessage}</p> : <p className='admin-create-course-input-title-excellent'>{errorTitleMessage}</p>}
                                <p>{errorTitleMessage === "Short Title" || errorTitleMessage === "Long Title" ? <span className='admin-create-course-input-title-short-ln'>{courseTitle?.length}</span> : <span className='admin-create-course-input-title-good-ln'>{courseTitle?.length}</span>}/75</p>
                            </div>
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

                            <div className='admin-create-course-input' >
                                <p>Price <span>*</span></p>
                                <input type='number' placeholder='Course Price in US Doller' value={price} onChange={(e) => handlePriceChange(e)}/>
                            </div>

                        </div>

                        <div className='admin-create-course-input-containers'>
                            <div className='admin-create-course-input'> 
                                <p>Language <span>*</span></p>
                                <Select
                                    defaultValue={commonSpokenLanguages.find(option => option.value === language)}
                                    onChange={(selectedOption) => {
                                        setLanguage(selectedOption.value)
                                        setLanguageError({value: null, error: false})
                                    }}
                                    options={commonSpokenLanguages}
                                    styles={customStyles}
                                    // placeholder="English"
                                />
                            </div>

                            <div className='admin-create-course-input'> 
                                <p>Duration <span>*</span></p>
                                <Select
                                    defaultValue={CourseHoursLength.find(option => option.value === hours)}
                                    onChange={(selectedOption) => {
                                        setHours(selectedOption.value);
                                        setLengthError({value: null, error: false})
                                    }}
                                    options={CourseHoursLength}
                                    styles={customStyles}
                                    // placeholder="Total Duration"
                                />
                            </div>

                            <div className='admin-create-course-input'> 
                                <p>Level <span>*</span></p>
                                <Select
                                    defaultValue={level}
                                    onChange={(selectedOption) => {
                                        setLevel(selectedOption.value);
                                        setSkillError({ value: null, error: false });
                                    }}
                                    options={SkillsLevel}
                                    styles={customStyles}
                                    // placeholder="Intermediate"
                                />
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
                                {thumbnailFile?.name ? 
                                    <img src={URL.createObjectURL(thumbnailFile)} alt='Thumbnail'/>
                                    : 
                                    <img src={thumbnailFile} alt='Thumbnail'/>
                                }
                            </div>
                        </div>
                        
                        {videoDivsArray.map((week, weekIndex) => (

                           
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
                                            <input type="text" value={week.weekTitle} placeholder='Title for week' onChange={(e) => handleWeekTitleChange(weekIndex, e)}/>
                                        </div>
                                    </div>
                

                                    <>
                                        {week.videos.map((video, videoIndex) => (
 
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
                                                            {!video?.videoFile ? 
                                                            
                                                            <p>No File</p> 
                                                            :
                                                            <p><span>{video?.videoFileName.substring(0, 3)}...</span> <span>{getExtension(video?.videoFileName)}</span></p>
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
                                                <div className='admin-create-course-adding-videos-title'>
                                                    <p>Video title <span>*</span></p>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            value={video.videoTitle}
                                                            onChange={(e) => handleVideoTitleChange(weekIndex, video.id, e)}                                               
                                                        />
                                                        <p>{video.videoTitle.length}/75</p>
                                                    </div>
                                                </div>
                                                <div className='admin-create-course-adding-videos-featured'>
                                                    <p>Feature your video to show user before purchase</p>
                                                    <input type='checkbox' checked={video.isFeatured === true} value={video.isFeatured} onChange={(e) => handleVideoFeaturedChange(weekIndex, video.id, e)}/>
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
                                            
                                        ))}
                                    </>

                                </div>
                            
                        ))}

                        { courseTitleAuthError.error === true || tagsAuthError.error === true || courseDescAuthError.error === true || thumbnailFileAuthError.error === true  || priceAuthError.error === true  || languageError.error === true || skillError.error === true || lengthError.error === true? 
                            (
                               <div className='admin-create-course-errors'>
                                    {courseTitleAuthError.error === true ?  (<p><MdErrorOutline size={24}/> {courseTitleAuthError?.value}</p>) : ""}
                                    {tagsAuthError.error === true ? (<p><MdErrorOutline size={24}/> {tagsAuthError?.value}</p>) : ""}
                                    {courseDescAuthError.error === true ? (<p><MdErrorOutline size={24}/> {courseDescAuthError?.value}</p>) : ""}
                                    {thumbnailFileAuthError.error === true ? (<p><MdErrorOutline size={24}/> {thumbnailFileAuthError?.value}</p>): ""}
                                    {priceAuthError.error === true ? (<p><MdErrorOutline size={24}/> {priceAuthError?.value}</p>): ""}
                               </div> 
                            ) : ""
                        }

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
                        
                        {/* <div className='admin-create-course-checkbox'>
                            <input type='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                            <p>Check this box if you just want to save the course, you can make it active later.</p>
                        </div> */}
                        <div className='admin-create-course-submit-btn'>
                            {isChecked ? (
                                <button onClick={() => handleSubmit('save')} className='admin-create-course-submit-btn-save'>
                                    <TfiSave size={27}/>
                                    Save
                                </button>
                            ) : (
                                <button onClick={() => handleSubmit('create')} className='admin-create-course-submit-btn-create'>  
                                    Create Course
                                </button>
                            )}
                        </div>

                    </div>
                )}

            </div>

        </div>

    </div>
  )
}

export default EditCourse


