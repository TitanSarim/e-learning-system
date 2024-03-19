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

    const {AllAdmincourses, error, loading, message} = useSelector((state)=>state.adminCourses);

    const [allCourses, setAllCourses] = useState([])
    const [selectedStatusOption, setSelectedStatusOption] = useState('none');
    const [selectedCategoryOption, setSelectedCategoryOption] = useState('none');
    const [searchQuery, setSearchQuery] = useState('');


    console.log("allCourses", allCourses)
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

    // Filter by status
    if (selectedStatusOption !== 'none') {
      filteredCourses = filteredCourses.filter((course) => course.status === selectedStatusOption);
    }

    // Filter by category
    if (selectedCategoryOption !== 'none') {
      filteredCourses = filteredCourses.filter((course) => course.category === selectedCategoryOption);
    }

    // Filter by search query
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

  return (
    
    <div className='admin-container'>

        <div className='admin-dashboard-sidebar'>
            <SideBar/>
        </div>

        <div className='admin-wrapper-all-courses'>
            <NavBar/>

            <div className='admin-allcourses-container'>
                
                <Link to={'/admin/create-course'}>Add Course</Link>

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

                        <LazyLoadImage src={JSON.parse(item.course_thumbnail).url} alt={'Course Thumbnail'}/>
                          {/* <img src={JSON.parse(item.course_thumbnail).url} alt="Course Thumbnail" /> */}
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
                            <Link>View</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

            </div>

        </div>

    </div>
  )
}

export default AllCourses