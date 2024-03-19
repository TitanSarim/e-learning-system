import React, { useState } from 'react'
import imageBackGround from '../../assets/Polygon Luminarymain.png'
import userImage from '../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import { FaLocationDot } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";

import ProfileTabsMe from './ProfileTabsMe'
import ProfileTabsAbout from './ProfileTabsAbout.jsx'
import ProfileTabsSkills from './ProfileTabsSkills.jsx'
import ProfileTabsExperience from './ProfileTabsExperience.jsx'
import ProfileTabsResume from './ProfileTabsResume.jsx'

import './ProfileDetail.css'
import ProfileEducation from './ProfileEducation.jsx';
import ProfileSocial from './ProfileSocial.jsx';


const ProfileDetail = () => {

  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    headline: ''
  });
  const [activeTab, setActiveTab] = useState('Me');
  const [aboutMe, setAboutMe] = useState()
  const [selectSkills, setSelectSkills] = useState()
  const [cv, setCv] = useState()
  const [coverLetter, setCoverLetter] = useState()
  const [educationContainers, setEducationContainers] = useState([{
    id: 1,
    universityName: '',
    field: 'none',
    degree: 'none',
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
    Instagram: '',
    Twitter: '',
    Dribble: '',
    Portfolio: '',
  });



  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAboutChange = (value) => {
    setAboutMe(value);
  }

  const handleCoverLetterChange = (value) => {
    setCoverLetter(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

  }

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
                    <img src={userImage} alt='Profile'/>
                    <button><MdModeEditOutline/>Edit</button>
                  </div>
                  <div className='general-profile-detail-image-user-detail'>
                    <p>Michal Jhon</p>
                    <p>
                      Full Stack Developer
                      <span><FaLocationDot size={20}/>NewYork, USA</span>
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
              {activeTab === 'Me' &&(
                <ProfileTabsMe setPersonalDetails={setPersonalDetails} value={personalDetails} handleSubmit={handleSubmit}/>
              )}
              {activeTab === 'About' &&(
                <ProfileTabsAbout setValue={handleAboutChange} value={aboutMe} handleSubmit={handleSubmit}/>
              )}
              {activeTab === 'Education' &&(
                <ProfileEducation   handleSubmit={handleSubmit} setEducationContainers={setEducationContainers} educationContainers={educationContainers} />
              )}
              {activeTab === 'Skills' &&(
                <ProfileTabsSkills setSelectSkills={setSelectSkills} value={selectSkills} handleSubmit={handleSubmit}/>
              )}
              {activeTab === 'Experience' &&(
                <ProfileTabsExperience handleSubmit={handleSubmit} setskillsContainers={setSkillsContainers} skillsContainers={skillsContainers}/>
              )}
              {activeTab === 'Social' &&(
                <ProfileSocial handleSubmit={handleSubmit} socialDetails={socialDetails} setSocialDetails={setSocialDetails}/>
              )}
              {activeTab === 'Resume' &&(
                <ProfileTabsResume handleSubmit={handleSubmit} cv={cv} setCv={setCv} coverLetter={coverLetter} handleCoverLetterChange={handleCoverLetterChange}/>
              )}

            </div>


        </div>

    </div>
  )
  
}

export default ProfileDetail