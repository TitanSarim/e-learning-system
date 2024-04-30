import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './AllPublicJobs.css'
import NavBar from '../../NavBar/NavBar'
import AllPublicJobsFilters from './AllPublicJobsFilters'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../../Utils/Loader';
import { useDispatch, useSelector } from 'react-redux'
import {GetAllPublicJobs, ApplyOnJob, ClearErrors} from '../../../actions/jobAction'
import { toast } from 'react-toastify';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';

const selectDateFilter = [
  { value: 'Last 24 Hours', label: 'Last 24 Hours' },
  { value: 'Last Week', label: 'Last Week' },
  { value: '', label: 'None' },
];

const BASE_URL = "http://localhost:3900"
// const BASE_URL = "http://20.6.81.5:3900"

const AllPublicJobs = () => {
  
  const dispatch = useDispatch()
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const{jobs, loading, error} = useSelector((state)=>state.publicJob);
  const {isAuthenticated,user} = useSelector((state) => state.user)
  const{myProfileData} = useSelector((state)=>state.myPorfile);

  const [filters, setFilters] = useState({date: ''});
  const [allJobs, setAllJobs] = useState([])
  const [pagination, setPagination] = useState([])
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const isUserApplied = selectedJob?.Applications?.id?.includes(user?.id);

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setSelectedJobId(job.id)
  };

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const handleDateFilterChange = (selectedOption) => {
    setFilters({ ...filters, date: selectedOption.value });
  };

  const handleApply = async (slug) => {

    const cv = myProfileData?.cv

    if(!cv){
      toast.error("Please Upload CV")
      return
    }
    
    const formData = {
      slug: slug,
    }

    try {
    
      const token = Cookies.get('token');

      const ConfigApplicationJson = { headers: 
          { 
          "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
          }
      }
          
      await axios.post( `${BASE_URL}/api/v1/apply-on-job`, formData, ConfigApplicationJson);
      toast.success("Successfully Applied")

  } catch (error) {
      console.log("error", error);
  }


  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 180,
      height: 50,
      backgroundColor: '#311c5c',
      border: state.isFocused ? '1px solid rgb(105, 105, 105)' : '1px solid rgb(105, 105, 105)',
      outline: "none",
      borderRadius: 4, 
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

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(ClearErrors());
    }
    if(searchQuery){
      dispatch(GetAllPublicJobs(1, filters, searchQuery))
    }else {
      dispatch(GetAllPublicJobs(1, filters, searchQuery))
    }
  }, [filters, dispatch, error, searchQuery])

  useEffect(() => {
    setAllJobs(jobs)
    setPagination(jobs?.pagination)
    if (jobs && jobs?.AllJobs?.length > 0) {
      setSelectedJob(jobs?.AllJobs[0]);
      setSelectedJobId(jobs?.AllJobs[0].id)
    }
  }, [jobs])


  const renderPaginationLinks = () => {
    if (!pagination || pagination?.totalPages === 0) return null;
  
    const links = [];
    const isFirstPage = pagination.currentPage === 1;
    const isLastPage = pagination.currentPage === pagination.totalPages;
  
    const goToPreviousPage = () => {
      if (!isFirstPage) {
        const previousPage = pagination.currentPage - 1;
        dispatch(GetAllPublicJobs(previousPage));
      }
    };
  
    const goToNextPage = () => {
      if (!isLastPage) {
        const nextPage = pagination.currentPage + 1;
        dispatch(GetAllPublicJobs(nextPage));
      }
    };
  
    const startPage = Math.max(1, pagination.currentPage - 2);
    const endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);
  
    for (let i = startPage; i <= endPage; i++) {
      const pageNumber = i;
      links.push(
        <Link key={i} to={`?page=${i}`} className={'pubic-all-courses-pagination-active'} onClick={() => dispatch(GetAllPublicJobs(pageNumber))}>
          {i}
        </Link>
      );
    }
  
    return (
      <>
        {isFirstPage ? (
          <span className='pubic-all-courses-pagination-inActive'>
            <MdOutlineKeyboardArrowLeft />
          </span>
        ) : (
          <Link to={`?page=${pagination.currentPage - 1}`} className='pubic-all-courses-pagination-active' onClick={goToPreviousPage}>
            <MdOutlineKeyboardArrowLeft />
          </Link>
        )}
        {links}
        {isLastPage ? (
          <span className='pubic-all-courses-pagination-inActive'>
            <MdOutlineKeyboardArrowRight />
          </span>
        ) : (
          <Link to={`?page=${pagination.currentPage + 1}`} className='pubic-all-courses-pagination-active' onClick={goToNextPage}>
            <MdOutlineKeyboardArrowRight />
          </Link>
        )}
      </>
    );
  };

  return (
    <div className='pubic-all-jobs'>
      
        <NavBar/>

      <div className='pubic-all-Jobs-banner'>
        <div>
          <p>All Jobs</p>
          <span><Link to='/'>Home</Link> <IoIosArrowForward/> <p>Jobs</p></span>
        </div>
      </div>

      <div className='pubic-all-Jobs-container'>
      
        {/* filters */}
        <AllPublicJobsFilters applyFilters={applyFilters} allJobs={allJobs}/>

        <div className='pubic-all-Jobs-list'>

          <div className='pubic-all-Jobs-list-style'>
            <p>Showing Total {pagination?.totalCourses} Results</p>

              <div>
                <Select
                  defaultValue={selectDateFilter.find(option => option.value === filters.date)}
                  onChange={handleDateFilterChange}
                  options={selectDateFilter}
                  placeholder="Price"
                  styles={customStyles}
                />
              </div>
          </div>

          {loading ? <div className='public-all-Jobs-jobs-list-container'><Loader/></div> : (
            <div className='public-all-Jobs-jobs-list-container'>

              <div className='public-all-Jobs-jobs-list-wrapper'>
                {allJobs?.AllJobs?.map((job) => (
                  <div className={`public-all-Jobs-jobs-list ${job.id === selectedJobId ? 'public-all-Jobs-jobs-list-active' : ''}`} key={job.id} onClick={() => handleJobClick(job)}>
                    <p>{job?.jobTitle?.length > 38 ? job?.jobTitle?.slice(0, 38): job?.jobTitle}..</p>
                    <div className='public-all-Jobs-jobs-list-company-detail'>
                      <p>{job.company}</p>
                      <span>{job.country.name}, {job.city.name}</span>
                    </div>
                    <span dangerouslySetInnerHTML={{__html: job?.jobDesc.slice(0, 170)}}>
                    </span>
                    <div className='public-all-Jobs-jobs-list-hr-details'>
                      <img src={job.userProfile.avatar.url} alt='abc'/>
                      <span>{job.userProfile.firstname} {job.userProfile.lastname}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/*  */}

              <div className='public-all-Jobs-jobs-job-detail-container'>
                <div className='public-all-Jobs-jobs-job-detail'>
                  <p>{selectedJob?.jobTitle}</p>
                  <div className='public-all-Jobs-jobs-job-detail-company'>
                    <p>{selectedJob?.company}</p>
                    <span>{selectedJob?.country.name}, {selectedJob?.city.name}</span>
                  </div>
                  <div className='public-all-Jobs-jobs-job-detail-general'>
                    <p>Education: <span>{selectedJob?.education}</span></p>
                    <p>Level: <span>{selectedJob?.skillLevel}</span></p>
                    <p>Duration:<span>{selectedJob?.duration}</span></p>
                    <p>Type: <span>{selectedJob?.type}</span></p>
                    <p>Salary: <span>{selectedJob?.salary}</span></p>
                  </div>
                  <div className='public-all-Jobs-jobs-job-detail-desc' dangerouslySetInnerHTML={{__html: selectedJob?.jobDesc}}/>
                  <div className='public-all-Jobs-jobs-job-detail-hr'>
                    <img src={selectedJob?.userProfile.avatar.url} alt='abc'/>
                    <span>{selectedJob?.userProfile.firstname} {selectedJob?.userProfile.lastname}</span>
                  </div>
                  <div className='public-all-Jobs-jobs-job-detail-button'>
                    {isAuthenticated === false ? (
                      <Link to="/login">Login</Link>
                    ) : (
                      (user?.role === 'admin' || user?.role === 'Student' || user?.role === 'Teacher' || user?.role === 'HR Manager') ? "" : (
                        isUserApplied ? (
                          <button disabled>Applied</button>
                        ) : (
                          <button onClick={() => handleApply(selectedJob?.slug)}>Apply</button>
                        )
                      )
                    )}
                  </div>
                </div>
              </div>

              

            </div>
          )}

          <div className='pubic-all-courses-pagination'>
            {renderPaginationLinks()}
          </div>

        </div>

      </div>

    </div>
  )
}

export default AllPublicJobs


