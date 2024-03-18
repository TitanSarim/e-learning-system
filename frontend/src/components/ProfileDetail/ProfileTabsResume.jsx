import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCloudUploadOutline } from "react-icons/io5";


const ProfileTabsResume = ({handleSubmit, cv, setCv, coverLetter, handleCoverLetterChange}) => {
  return (
    <div className='general-profile-detail-tabs-about'>

        <form onSubmit={handleSubmit}>

            <div className='general-profile-detail-tabs-about-coverletter'>
              <p>About You</p>
              <ReactQuill 
                  theme="snow"
                  value={coverLetter}
                  onChange={handleCoverLetterChange}
                  required
              />
            </div>

            <div className='general-profile-detail-tabs-about-resume'>
              <p>Your Cv or Resume:</p>
              <div>
                <label htmlFor="resume"><IoCloudUploadOutline size={24}/></label>
                <input type='file' accept='application/pdf' id='resume' required/>
              </div>
            </div>

            <input type='submit' value="Save" className='general-profile-detail-tabs-about-submit-btn'/>

        </form>

    </div>
  )
}

export default ProfileTabsResume