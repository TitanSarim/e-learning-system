import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProfileTabsAbout = ({handleAboutChange, aboutMe, handleSubmit}) => {

  return (

    <form className='general-profile-detail-tabs-about' onSubmit={handleSubmit}>
        <div className='general-profile-detail-tabs-about-editor'>
            <p>About You</p>
            <ReactQuill 
                theme="snow"
                value={aboutMe}
                onChange={handleAboutChange}
            />
        </div>

        <input className='general-profile-detail-tabs-about-button' type='Submit' value="Save"/>

    </form>

  )
}

export default ProfileTabsAbout