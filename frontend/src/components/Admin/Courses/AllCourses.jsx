import React,{useState, useEffect} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import {AdminGetCourses, clearErrors} from '../../../actions/CoursesAction'
import  moment from 'moment'
import './AllCourses.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../Utils/Loader';
import { TbTimeDuration10 } from "react-icons/tb";
import { CgDollar } from "react-icons/cg";
import { BsCalendar2Date } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import Select from 'react-select';
// import { FiEdit2 } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import Popup from 'reactjs-popup';
import DeleteCourse from './DialogueBoxes/DeleteCourse';
import ActivateCourse from './DialogueBoxes/ActivateCourse';
import DeActivate from './DialogueBoxes/DeActivate';

const selectStatus = [
  { value: 'none', label: 'None' },
  { value: 'active', label: 'Activate' },
  { value: 'inactive', label: 'Deactivate' },
];
const selectCategory = [
  { value: 'none', label: 'None' },
  { value: 'Apps', label: 'Apps' },
  { value: 'Website', label: 'Website' },
];


const AllCourses = () => {

  const dispatch = useDispatch()

    const {user} =  useSelector((state)=>state.user);
    const {AllAdmincourses, error, loading, message} = useSelector((state)=>state.adminCourses);

    const [allCourses, setAllCourses] = useState([])
    const [filteredCourse, setFilteredCourse] = useState([])
    const [selectedStatusOption, setSelectedStatusOption] = useState('none');
    const [selectedCategoryOption, setSelectedCategoryOption] = useState('none');
    const [searchQuery, setSearchQuery] = useState('');

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [activateConfirmationOpen, setActivateConfirmationOpen] = useState(false);
    const [deActivateConfirmationOpen, setDeActivateConfirmationOpen] = useState(false);
    const [courseSlug, setCourseSlug] = useState(null);

  useEffect(() => {

      if(error){
          toast.error(error);
          dispatch(clearErrors());
      }
      dispatch(AdminGetCourses());
      
  }, [dispatch, message, error])

  useEffect(() => {
      setAllCourses(AllAdmincourses)
  }, [AllAdmincourses])

  const filterCourses = () => {
    let filteredCourses = allCourses;

    if (selectedStatusOption !== 'none') {
      filteredCourses = filteredCourses.filter((course) => course.status === selectedStatusOption);
    }

    if (selectedCategoryOption !== 'none') {
      filteredCourses = filteredCourses.filter((course) => course.category === selectedCategoryOption);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.course_title.toLowerCase().includes(query) ||
          course.timeline.toLowerCase().includes(query) ||
          course.price.toLowerCase().includes(query)
      );
    }

    return filteredCourses;
  };
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 150,
      backgroundColor: '#144272',
      border: state.isFocused ? 'none' : 'none',
      outline: "none",
      borderRadius: 50, 
      cursour: "pointer"
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white', 
      }),  
      placeholder: (provided) => ({
        ...provided,
        color: 'rgb(163, 163, 163)', 
      }),
  };

    const hanldeDeleteModelOpen = (slug) => {
      const filteredSlug = allCourses.filter(course => course.slug === slug);
      setFilteredCourse(filteredSlug)
      setCourseSlug(slug)
      setDeleteConfirmationOpen(true)
    }

    const hanldeActivateModelOpen = (slug) => {
      setCourseSlug(slug)
      setActivateConfirmationOpen(true)
    }

    const hanldeDeActivateModelOpen = (slug) => {
      setCourseSlug(slug)
      setDeActivateConfirmationOpen(true)
    }

  return (
    
    <div className='admin-container'>

        <div className='admin-dashboard-sidebar'>
            <SideBar/>
        </div>

        <div className='admin-wrapper-all-courses'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                {user?.role === 'Teacher' ? <Link to={'/admin/create-course'}>Add Course</Link> : ''}

                <div className='admin-allcourses-filter'>
                  
                  <div className='admin-allcourses-filter-search'>
                    <BsSearch size={25}/>
                    <input type='text' placeholder='Search by title' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                  </div>

                  <div className='admin-allcourses-filter-container'>
                    <CiFilter size={27}/>
                      <Select
                        defaultValue={selectedStatusOption}
                        onChange={(selectedOption) => setSelectedStatusOption(selectedOption.value)}
                        options={selectStatus}
                        styles={customStyles}
                        placeholder="Status"
                      />
                      <Select
                        defaultValue={selectedCategoryOption}
                        onChange={(selectedOption) => setSelectedCategoryOption(selectedOption.value)}
                        options={selectCategory}
                        styles={customStyles}
                        placeholder="Category"
                      />
                  </div>
                </div>

                <div className='admin-allcourses-wrapper'>
                  {loading ? <Loader/> : (
                    <div className='admin-allcourses-cards'>
                      {filterCourses()?.map((item) => (
                        <div key={item.id} className='admin-allcourses-card-container'>

                        <LazyLoadImage src={item.course_thumbnail} alt={'Course Thumbnail'}/>

                          <div className='admin-allcourses-card-header'>
                            {item.status === 'active' ? <span className='admin-allcourses-card-header-status-acitve'>{item.status}</span> : <span className='admin-allcourses-card-header-status-inacitve'>{item.status}</span>}
                            <p>{item.category}</p>
                          </div>
                          <p className='admin-allcourses-card-title'>{item.course_title}</p>
                          <div className='admin-allcourses-card-length-price'>
                            <p> 
                                <TbTimeDuration10 size={25}/>
                                <span>{item.timeline}</span> 
                                Weeks
                            </p>
                            <p> {item.price}<CgDollar/></p>
                          </div>
                          <div className='admin-allcourses-card-footer'>
                            <p><BsCalendar2Date size={25}/> {moment(item.updatedAt).format("MMM Do YY")}</p>
                            <div className='admin-allcourses-card-footer-more-options'>
                              <IoMdMore size={24}/>
                              {user?.role === "Teacher" ? (
                                <div className='admin-allcourses-card-footer-more-options-show'>
                                  {item?.status === 'active' ? <button onClick={() => hanldeDeActivateModelOpen(item.slug)}>DeActivate</button> : <button onClick={() => hanldeActivateModelOpen(item.slug)}>Activate</button>}
                                  <Link to={`/admin/edit-course/${item.slug}`}>Update</Link>
                                  <button onClick={() => hanldeDeleteModelOpen(item.slug)}>Delete</button>
                                </div>
                              ) : (
                                <div className='admin-allcourses-card-footer-more-options-show'>
                                  {item?.status === 'active' ? <button onClick={() => hanldeDeActivateModelOpen(item.slug)}>DeActivate</button> : <button onClick={() => hanldeActivateModelOpen(item.slug)}>Activate</button>}
                                  {/* <Link to={`/admin/edit-course/${item.slug}`}>Update</Link> */}
                                  <button onClick={() => hanldeDeleteModelOpen(item.slug)}>Delete</button>
                                </div>
                              )}
                              
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

            </div>

        </div>

        <Popup
            open={deleteConfirmationOpen}
            closeOnDocumentClick
            onClose={() => setDeleteConfirmationOpen(false)}
            className='admin-courses-dialogue-boxex'
        >
          <DeleteCourse slug={courseSlug} setDeleteConfirmationOpen={setDeleteConfirmationOpen} filteredCourse={filteredCourse}/>
        </Popup>
        
        <Popup
            open={activateConfirmationOpen}
            closeOnDocumentClick
            onClose={() => setActivateConfirmationOpen(false)}
            className='admin-courses-dialogue-boxex'
        >
          <ActivateCourse slug={courseSlug} setActivateConfirmationOpen={setActivateConfirmationOpen}/>
        </Popup>

        <Popup
            open={deActivateConfirmationOpen}
            closeOnDocumentClick
            onClose={() => setDeActivateConfirmationOpen(false)}
            className='admin-courses-dialogue-boxex'
        >
          <DeActivate slug={courseSlug} setDeActivateConfirmationOpen={setDeActivateConfirmationOpen}/>
        </Popup>

    </div>
  )
}

export default AllCourses