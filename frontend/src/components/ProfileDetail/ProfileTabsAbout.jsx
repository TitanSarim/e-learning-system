import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Link} from 'react-router-dom'

const ProfileTabsAbout = ({handleAboutChange, aboutMe}) => {

  return (

    <div className='general-profile-detail-tabs-about'>
        <div className='general-profile-detail-tabs-about-editor'>
            <p>About You</p>
            <ReactQuill 
                theme="snow"
                value={aboutMe}
                onChange={handleAboutChange}
            />
        </div>

        <Link className='general-profile-detail-tabs-about-button'>
          Save
        </Link>

    </div>

  )
}

export default ProfileTabsAbout