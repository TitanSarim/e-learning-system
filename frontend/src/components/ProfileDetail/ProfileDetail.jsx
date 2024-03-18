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


const ProfileDetail = () => {


  const [activeTab, setActiveTab] = useState('Me');
  const [phoneNo, setPhoneNo] = useState()
  const [aboutMe, setAboutMe] = useState()

  const [educationContainers, setEducationContainers] = useState([{
    id: 1,
    universityName: '',
    field: 'none',
    degree: 'none',
    fromDate: null,
    toDate: null
  }]);

  console.log('educationContainers',educationContainers)

  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAboutChange = (value) => {
    setAboutMe(value);
  
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
                <button className={activeTab === 'Resume' ? 'general-profile-detail-tab-avtive' : ''}
                                onClick={() => handleMainTabClick('Resume')}>
                  Resume
                </button>
              </div>

              {/*  tab content */}
              {activeTab === 'Me' &&(
                <ProfileTabsMe setPhoneNo={setPhoneNo} value={phoneNo}/>
              )}
              {activeTab === 'About' &&(
                <ProfileTabsAbout setValue={handleAboutChange} value={aboutMe}/>
              )}
              {activeTab === 'Education' &&(
                <ProfileEducation   
                    setEducationContainers={setEducationContainers}
                    educationContainers={educationContainers}
                    />
              )}
              {activeTab === 'Skills' &&(
                <ProfileTabsSkills setPhoneNo={setPhoneNo} value={phoneNo}/>
              )}
              {activeTab === 'Experience' &&(
                <ProfileTabsExperience setPhoneNo={setPhoneNo} value={phoneNo}/>
              )}
              {activeTab === 'Resume' &&(
                <ProfileTabsResume setPhoneNo={setPhoneNo} value={phoneNo}/>
              )}

            </div>


        </div>

    </div>
  )
  
}

export default ProfileDetail