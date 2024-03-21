import React, { useEffect, useState } from 'react'
import imageBackGround from '../../assets/Polygon Luminarymain.png'
import userImage from '../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import { FaLocationDot } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader.jsx';
import ProfileTabsMe from './ProfileTabsMe'
import ProfileTabsAbout from './ProfileTabsAbout.jsx'
import ProfileTabsSkills from './ProfileTabsSkills.jsx'
import ProfileTabsExperience from './ProfileTabsExperience.jsx'
import ProfileTabsResume from './ProfileTabsResume.jsx'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import './ProfileDetail.css'
import ProfileEducation from './ProfileEducation.jsx';
import ProfileSocial from './ProfileSocial.jsx';

import {getMyProfile, updateMyProfile, clearErrors} from '../../actions/ProfileAction.js'
import {useSelector, useDispatch} from 'react-redux';
import ProfileAvatar from './ProfileAvatar.jsx';

const ProfileDetail = () => {


  const dispatch = useDispatch()

  const {myProfileData, error, loading} = useSelector((state)=>state.myPorfile);

  
  const [profileData, setProfileData] = useState(myProfileData)
  const [editorOpen, setEditorOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    headline: ''
  });
  const [activeTab, setActiveTab] = useState('Me');
  const [avatar, setAvatar] = useState();
  const [aboutMe, setAboutMe] = useState()
  const [selectSkills, setSelectSkills] = useState()
  const [cv, setCv] = useState()
  const [coverLetter, setCoverLetter] = useState()
  const [educationContainers, setEducationContainers] = useState([{
    id: 1,
    universityName: '',
    field: '',
    degree: '',
    fromDate: null,
    toDate: null
  }]);
  const [skillsContainers, setSkillsContainers] = useState([{
    id: 1,
    CompanyName: '',
    location: '',
    JobTitle: '',
    desc: '',
    fromDate: null,
    toDate: null
  }]);
  const [socialDetails, setSocialDetails] = useState({
    Github: '',
    Linkedin: '',
    Instagram: '',
    Twitter: '',
    Dribble: '',
    Portfolio: '',
  });

  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {
      avatar: profileData?.avatar,
      location: personalDetails?.address,
      firstname: personalDetails?.firstName,
      lastname: personalDetails?.lastName,
      phoneno: personalDetails?.phoneNumber,
      Headline: personalDetails?.headline,
      about: aboutMe,
      education: educationContainers,
      skills: selectSkills,
      experience: skillsContainers,
      social: socialDetails,
      cv: cv,
      coverletter: coverLetter,
    }
    dispatch(updateMyProfile(formData, myProfileData?.cv,)) 
    // window.location.reload()
  }

  const hanldeEditorModelOpen = () => {
    setEditorOpen(true)
}

useEffect(() => {

    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
    dispatch(getMyProfile());
}, [dispatch, error])

useEffect(() => {
  if (myProfileData && Object.keys(myProfileData).length > 0) {
    setProfileData(myProfileData);
  }
}, [myProfileData]);

useEffect(() => {
  setAvatar(profileData?.avatar || userImage)
  setAboutMe(profileData?.about)
  setSelectSkills(profileData?.skills)
  setUserName( profileData?.username)
  setCoverLetter(profileData?.coverletter)
  setCv(profileData?.cv)
  setPersonalDetails({
    firstName: profileData?.firstname,
    lastName: profileData?.lastname,
    address: profileData?.location,
    email: profileData?.email,
    phoneNumber: profileData?.phoneno,
    headline: profileData?.Headline
  });

  if (profileData?.education && profileData?.education.length > 0) {
    setEducationContainers(profileData?.education);
  } 
  if (profileData?.experience && profileData?.experience.length > 0) {
    setSkillsContainers(profileData?.experience);
  } 
  setSocialDetails(profileData?.social);

}, [profileData]);

  return (
    <div className='general-profile-detail-container'>

        {/* left bar */}
        <div className='general-profile-detail-left-bar'>

        </div>

        {/* right side */}
        <div className='general-profile-detail-wrapper'>

            {/* profile image */}
            <div className='general-profile-detail-image-location'>
              <img src={imageBackGround} alt='Plygon backdround'/>
              <div>
                  <div className='general-profile-detail-image-user'>
                    {profileData?.avatar ? (
                      <img src={avatar} alt='Profile'/>
                    ) : (
                      <img src={userImage} alt='Profile'/>
                    )}
                    <button onClick={() => hanldeEditorModelOpen()}><MdModeEditOutline/>Edit</button>
                  </div>
                  <div className='general-profile-detail-image-user-detail'>
                    <p>@{userName}</p>
                    <p>
                      Full Stack Developer
                      <span><FaLocationDot size={20}/>{personalDetails?.address}</span>
                    </p>
                  </div>
              </div>
            </div>

            <div className='general-profile-detail-tabs-container'>
              
              {/* tabs */}
              <div className='general-profile-detail-tabs'>
                <button className={activeTab === 'Me' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Me')}>
                  Me
                </button>
                <button className={activeTab === 'About' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('About')}>
                  About
                </button>
                <button className={activeTab === 'Education' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Education')}>
                  Education
                </button>
                <button className={activeTab === 'Skills' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Skills')}>
                  Skills
                </button>
                <button className={activeTab === 'Experience' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Experience')}>
                  Experience
                </button>
                <button className={activeTab === 'Social' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Social')}>
                  Social
                </button>
                <button className={activeTab === 'Resume' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Resume')}>
                  Resume
                </button>
              </div>

              {/*  tab content */}
              {loading ? <Loader/> : (
                <>
                {activeTab === 'Me' &&(
                  <ProfileTabsMe  loading={loading} setPersonalDetails={setPersonalDetails} value={personalDetails} handleSubmit={handleSubmit}/>
                )}
                {activeTab === 'About' &&(
                  <ProfileTabsAbout setAboutMe={setAboutMe} aboutMe={aboutMe} handleSubmit={handleSubmit}/>
                )}
                {activeTab === 'Education' &&(
                  <ProfileEducation   handleSubmit={handleSubmit} setEducationContainers={setEducationContainers} educationContainers={educationContainers} />
                )}
                {activeTab === 'Skills' &&(
                  <ProfileTabsSkills setSelectSkills={setSelectSkills} selectSkills={selectSkills} handleSubmit={handleSubmit}/>
                )}
                {activeTab === 'Experience' &&(
                  <ProfileTabsExperience handleSubmit={handleSubmit} setskillsContainers={setSkillsContainers} skillsContainers={skillsContainers}/>
                )}
                {activeTab === 'Social' &&(
                  <ProfileSocial handleSubmit={handleSubmit} socialDetails={socialDetails} setSocialDetails={setSocialDetails}/>
                )}
                {activeTab === 'Resume' &&(
                  <ProfileTabsResume handleSubmit={handleSubmit} cv={cv} setCv={setCv} coverLetter={coverLetter} setCoverLetter={setCoverLetter}/>
                )}
                </>
              )}

            </div>


        </div>

        <Popup
          open={editorOpen}
          closeOnDocumentClick
          onClose={() => setEditorOpen(false)}
          className='avatar-popup'
        >
          <ProfileAvatar handleSubmit={handleSubmit} setEditorOpen={setEditorOpen} avatar={avatar} setAvatar={setAvatar}/>
        </Popup>

    </div>
  )
  
}

export default ProfileDetail




