import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import NavBar from '../../NavBar/NavBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleHrJob, UpdateJobStatus, DeleteJob, ClearErrors } from '../../../actions/jobAction';
import './HRJobsApplications.css'
import { toast } from 'react-toastify';
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";
import { LuPen } from "react-icons/lu";
import Loader from '../../Utils/Loader';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { GiTireIronCross } from 'react-icons/gi';
import ConfirmAnimation from '../../../assets/icons8-confirm.gif'

const HRJobsApplications = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams();
  const jobSlug = slug.substring(slug.lastIndexOf('/') + 1);

  const{job, loading, error} = useSelector((state)=>state.hrJob);

  const [jobDetails, setJobDetails] = useState([])
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleJobStatusChnage = (data) => {
    const formData = {
      status: data
    } 
    dispatch(UpdateJobStatus(formData, jobSlug));
    window.location.reload()
  }

  const hanldeDeleteModelOpen = () => {
    setDeleteConfirmationOpen(true)
  }

  const handleDelete = () => {
    dispatch(DeleteJob(jobSlug))
    navigate('/hr/HrProfile')
    toast.success('Job Deleted')
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(ClearErrors());
    }
    dispatch(GetSingleHrJob(jobSlug))
  }, [jobSlug, dispatch, error])

  useEffect(() => {
    setJobDetails(job)
  }, [job])

  return (
    <div className='HRJobsApplications'>

      <NavBar/>

      <div className='HRJobsApplications-wrapper'> 

          <div className='HRJobsApplications-backlink'>
            <Link><IoMdArrowBack size={24}/>Back</Link>
          </div>

          {loading? <div className='HRJobsApplications-content'><Loader/></div> : (
          <div className='HRJobsApplications-content'>

            <div className='HRJobsApplications-job-detail'>
              <p>{jobDetails?.jobTitle}</p>
              <span>{moment(jobDetails?.updatedAt).format('LL')}</span>
              <div className='HRJobsApplications-job-detail-button'>
                {jobDetails?.status === 'active' ? 
                  <button onClick={() => handleJobStatusChnage('inactive')}>Deactivate</button>
                  :
                  <button onClick={() => handleJobStatusChnage('active')}>Activate</button>
                }
                <Link to={`/hr/update-job/${jobDetails?.slug}`}><LuPen size={23}/></Link>
                <button onClick={hanldeDeleteModelOpen}><AiOutlineDelete size={23}/></button>
              </div>
            </div>

            <div>
              asd
            </div>

          </div>
          )}

      </div>

      <Popup
        open={deleteConfirmationOpen}
        closeOnDocumentClick
        onClose={() => setDeleteConfirmationOpen(false)}
      >
          <div className="admin-user-deletemodal">
          <button className="admin-user-deletemodal-close-btn" onClick={() => setDeleteConfirmationOpen(false)}>
              <GiTireIronCross/>
          </button>
          <p> Are you sure you want to delete this job?</p>
          <img src={ConfirmAnimation} alt='confirm'/>
          <div className="admin-user-deletemodal-buttons">
              <button onClick={handleDelete}>
              Confirm
              </button>
              <button onClick={() => setDeleteConfirmationOpen(false)}>
              Cancel
              </button>
          </div>
          </div>
      </Popup>

    </div>
  )
}

export default HRJobsApplications