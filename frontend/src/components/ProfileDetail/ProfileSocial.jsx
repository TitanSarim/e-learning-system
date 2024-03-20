import React from 'react'
import {Link} from 'react-router-dom'
import { FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa6";
import { TbWorldCode } from "react-icons/tb";
import { BsCopy } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";

const ProfileSocial = ({handleSubmit, socialDetails, setSocialDetails}) => {

  const handleInputChange = (e, platform) => {
    const { value } = e.target;
    setSocialDetails(prevState => ({
      ...prevState,
      [platform]: value
    }));
  };

  return (
    <div className='general-profile-detail-container-social'>

        <form onSubmit={handleSubmit}>
          <p>Add Your Social Accounts</p>
          
        <div  className='general-profile-detail-container-social-wrapper'> 
          <div className='general-profile-detail-container-social-tabs'>
              <div>
                <FaGithub size={32}  className='general-profile-detail-container-social-git'/>
                <div>
                  <p>My GitHub</p>
                  <span>
                    <input type='text' placeholder='Add here' value={socialDetails.Github} onChange={(e) => handleInputChange(e, 'Github')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
              </div>
              <Link><GoArrowUpRight size={27}/></Link>
          </div>

          <div className='general-profile-detail-container-social-tabs'>
              <div>
                <FaLinkedinIn size={32}  className='general-profile-detail-container-social-LinkedIn'/>
                <div>
                  <p>My LinkedIn</p>
                  <span>
                    <input type='text' placeholder='Add here' value={socialDetails.Linkedin} onChange={(e) => handleInputChange(e, 'Linkedin')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
              </div>
              <Link><GoArrowUpRight size={27}/></Link>
          </div>

          <div className='general-profile-detail-container-social-tabs'>
             <div>
              <FaTwitter  size={32}  className='general-profile-detail-container-social-twitter'/>
                <div>
                  <p>My Twitter</p>
                  <span>
                    <input type='text' placeholder='Add here'  value={socialDetails.Instagram} onChange={(e) => handleInputChange(e, 'Instagram')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
             </div>
             <Link><GoArrowUpRight size={27}/></Link>
          </div>

          <div className='general-profile-detail-container-social-tabs'>
              <div>
                <FaInstagram  size={32}  className='general-profile-detail-container-social-instagram'/>
                <div>
                  <p>My Instagram</p>
                  <span>
                    <input type='text' placeholder='Add here'  value={socialDetails.Twitter} onChange={(e) => handleInputChange(e, 'Twitter')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
              </div>
              <Link><GoArrowUpRight size={27}/></Link>
          </div>

          <div className='general-profile-detail-container-social-tabs'>
             <div>
              <FaDribbble size={32} className='general-profile-detail-container-social-dribbble'/>
                <div>
                  <p>My Dribbble</p>
                  <span>
                    <input type='text' placeholder='Add here'  value={socialDetails.Dribble} onChange={(e) => handleInputChange(e, 'Dribble')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
             </div>
             <Link><GoArrowUpRight size={27}/></Link>
          </div>

          <div className='general-profile-detail-container-social-tabs'>
              <div>
                <TbWorldCode size={32} className='general-profile-detail-container-social-site'/>
                <div>
                  <p>My Portfolio</p>
                  <span>
                    <input type='text' placeholder='Add here'  value={socialDetails.Portfolio} onChange={(e) => handleInputChange(e, 'Portfolio')}/>
                    <BsCopy size={20}/>
                  </span>
                </div>
              </div>
              <Link><GoArrowUpRight size={27}/></Link>
          </div>
        
        </div>

        <input type='submit' value='Save' className='general-profile-detail-container-social-submit'/>

        </form>

    </div>
  )
}

export default ProfileSocial