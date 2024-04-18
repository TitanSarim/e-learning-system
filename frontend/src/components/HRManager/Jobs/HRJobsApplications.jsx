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
import { PiFilePdfDuotone } from "react-icons/pi";
import { SlEye } from "react-icons/sl";
import { TbMessage2Bolt } from "react-icons/tb";
import { sendMessage } from '../../../actions/chatAction';


const HRJobsApplications = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams();
  const jobSlug = slug.substring(slug.lastIndexOf('/') + 1);

  const{job, loading, error} = useSelector((state)=>state.hrJob);
  const {user} = useSelector((state)=>state.user)
  const{myProfileData} = useSelector((state)=>state.myPorfile);

  const [jobDetails, setJobDetails] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [sendMessageModelOpen, setSendMessageModelOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [jobId, setJobId] = useState('');
  const [message, setMessage] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

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

  const handleSendMessageDialogie = (username, userId, avatar) => {
    setSendMessageModelOpen(true)
    setUserName(username)
    setUserId(userId)
    setJobId(jobDetails?.id)
    setUserAvatar(avatar)
  }

  const handleSendMessage = () => {

    if(!message){
      toast.error("Please enter a message")
      return
    }

    const formData = {
      id: Math.random(),
      FromuserId: user?.id,
      ToUserId: userId,
      FromUserName: user?.username,
      ToUserName: userName,
      FromUserAvatar: myProfileData.avatar,
      toUserAvatar: userAvatar, 
      jobId: jobId,
      message: message,
      createdAt: new Date().toISOString()
    }

    dispatch(sendMessage(formData))
    setMessage('')
    toast.success("Message sent successfully")
    setSendMessageModelOpen(false)
  }

  const handleDelete = () => {
    dispatch(DeleteJob(jobSlug))
    navigate('/hr/HrProfile')
    toast.success('Job Deleted')
  }

  const handleDownloadPdf = (url, firstname, lastname) => {


      const fullName = `${firstname}_${lastname}`;
      const newFileName = `${fullName}_resume.pdf`;

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.download = newFileName;

      document.body.appendChild(anchor);
      anchor.click();

      document.body.removeChild(anchor);
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(ClearErrors());
    }
    dispatch(GetSingleHrJob(jobSlug))
  }, [jobSlug, dispatch, error])

  useEffect(() => {
    setJobDetails(job?.jobs)
    setJobApplications(job?.jobsApplications)
  }, [job])

  return (
    <div className='HRJobsApplications'>

      <NavBar/>

      <div className='HRJobsApplications-wrapper'> 

          <div className='HRJobsApplications-backlink'>
            <Link to='/hr/HrProfile'><IoMdArrowBack size={24}/>Back</Link>
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
              
            {jobApplications === null ? <p className='HRJobsApplications-no-applicants'>Currently No Applicants</p> : (
              <div className='HRJobsApplications-lists'>
                {jobApplications?.map((application) => (
                  <div className='HRJobsApplications-lists-container' key={application.id}>
                      <div className='HRJobsApplications-list-applicant-img'>
                        <img src={application?.avatar.url} alt='avatar'/>
                        <p>{application.firstname}</p>
                        <p>{application.lastname}</p>
                      </div>
                      <div className='HRJobsApplications-list-applicant-location'>
                        <p>{application.location}</p>
                        <span>{application.phoneno}</span>
                      </div>
                      <div className='HRJobsApplications-list-applicant-cv'>
                        <button onClick={() => handleDownloadPdf(application.cv.url, application.firstname, application.lastname)}><PiFilePdfDuotone size={25}/>CV</button>
                        <button onClick={() => handleSendMessageDialogie(application.username, application.userId, application.avatar)}><TbMessage2Bolt size={25} /> Text</button>
                        <button><SlEye size={25}/> Profile</button>
                      </div>
                  </div>
                ))}
              </div>
            )}
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

      <Popup
        open={sendMessageModelOpen}
        closeOnDocumentClick
        onClose={() => setSendMessageModelOpen(false)}
      >
          <div className="admin-user-deletemodal">
            <button className="admin-user-deletemodal-close-btn" onClick={() => setSendMessageModelOpen(false)}>
                <GiTireIronCross/>
            </button>
            <div className='send-message-dialog-box'>
              <p>Send Message to {userName}</p>
              <textarea placeholder='Type your message' value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div className="admin-user-deletemodal-buttons">
                <button onClick={handleSendMessage}>
                Send
                </button>
                <button onClick={() => setSendMessageModelOpen(false)}>
                Cancel
                </button>
            </div>
          </div>
      </Popup>

    </div>
  )
}

export default HRJobsApplications