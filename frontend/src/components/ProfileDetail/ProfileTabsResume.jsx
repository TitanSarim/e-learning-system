import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCloudUploadOutline } from "react-icons/io5";


const ProfileTabsResume = ({handleSubmit, cv, setCv, coverLetter, setCoverLetter}) => {


  const handleCoverLetterChange = (value) => {
    setCoverLetter(value);
  }


  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setCv(file);
  };

  return (
    <div className='general-profile-detail-tabs-about-resume-container'>

        <form onSubmit={handleSubmit}>

            <div className='general-profile-detail-tabs-about-coverletter'>
              <p>Cover Letter</p>
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
                <input type='file' accept='application/pdf' id='resume' onChange={handleFileChange}/>
              </div>
            </div>

            <input type='submit' value="Save" className='general-profile-detail-tabs-about-submit-btn'/>

        </form>

    </div>
  )
}

export default ProfileTabsResume