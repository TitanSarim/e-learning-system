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

import {getMyProfile, updateMyProfile, updateMyAvatar, updateMyResume, clearErrors} from '../../actions/ProfileAction.js'
import {useSelector, useDispatch} from 'react-redux';
import ProfileAvatar from './ProfileAvatar.jsx';

const ProfileDetail = () => {


  const dispatch = useDispatch()

  const {myProfileData, error, loading} = useSelector((state)=>state.myPorfile);

  
  const [profileData, setProfileData] = useState([])
  const [editorOpen, setEditorOpen] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({
      firstName: myProfileData?.firstname,
      lastName: myProfileData?.lastname,
      address: myProfileData?.location,
      email: myProfileData?.email,
      phoneNumber: myProfileData?.phoneno,
      headline: myProfileData?.Headline
  });
  const [activeTab, setActiveTab] = useState('Me');
  const [avatar, setAvatar] = useState(myProfileData?.avatar || userImage);
  const [aboutMe, setAboutMe] = useState(myProfileData?.about)
  const [selectSkills, setSelectSkills] = useState(myProfileData?.skills)
  const [cv, setCv] = useState(myProfileData?.cv)
  const [coverLetter, setCoverLetter] = useState(myProfileData?.coverletter)
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
    Github: myProfileData?.social?.Github,
    Linkedin: myProfileData?.social?.Linkedin,
    Instagram: myProfileData?.social?.Instagram,
    Twitter: myProfileData?.social?.Twitter,
    Dribble: myProfileData?.social?.Dribble,
    Portfolio: myProfileData?.social?.Portfolio,
  });

  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {
      avatar: avatar,
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

    console.log("formData", formData)
    dispatch(updateMyProfile(formData, myProfileData?.cv)) 
  }

  const hanldeEditorModelOpen = (id) => {
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
  setProfileData(myProfileData)

  if (myProfileData?.education && myProfileData?.education.length > 0) {
    setEducationContainers(myProfileData?.education);
  } 
  if (myProfileData?.experience && myProfileData?.experience.length > 0) {
    setSkillsContainers(myProfileData?.experience);
  } 
}, [myProfileData]);

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
                    <img src={avatar} alt='Profile'/>
                    <button onClick={() => hanldeEditorModelOpen()}><MdModeEditOutline/>Edit</button>
                  </div>
                  <div className='general-profile-detail-image-user-detail'>
                    <p>@{myProfileData?.username}</p>
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
          <ProfileAvatar setEditorOpen={setEditorOpen} setAvatar={setAvatar} avatar={avatar}/>
        </Popup>

    </div>
  )
  
}

export default ProfileDetail