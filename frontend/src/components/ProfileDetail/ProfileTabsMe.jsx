import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ProfileTabsMe = ({setPhoneNo, value, handleSubmit}) => {
  return (
    <form className='general-profile-detail-tabs-content' onSubmit={handleSubmit}>
        <div className='general-profile-detail-tabs-content-form'>
            <div className='general-profile-detail-tabs-content-input-type-1'>
                <div>
                    <p>First Name</p>
                    <input type='text' required/>
                </div>
                <button><MdModeEditOutline/>Edit</button>
            </div>
            <div className='general-profile-detail-tabs-content-input-type-1'>
                <div>
                    <p>Last Name</p>
                    <input type='text' required/>
                </div>
                <button><MdModeEditOutline/>Edit</button>
            </div>
        </div>

        <div className='general-profile-detail-tabs-content-form'>
            <div className='general-profile-detail-tabs-content-input-type-1'>
            <div>
                <p>Email</p>
                <input type='email' required/>
            </div>
            <button><MdModeEditOutline/>Edit</button>
            </div>
            <div className='general-profile-detail-tabs-content-input-type-3'>
            <div>
                <p>Phone Number</p>
                <PhoneInput
                value={value}
                onChange={setPhoneNo} required/>
            </div>
            <button><MdModeEditOutline/>Edit</button>
            </div>
        </div>

        <div className='general-profile-detail-tabs-content-input-type-2'>
            <div>
            <p>Headline</p>
            <input type='text' required/>
            </div>
            <button><MdModeEditOutline/>Edit</button>
        </div>

       <input type='submit' value="Save" className='general-profile-detail-tabs-content-save-button'/>

    </form>
  )
}

export default ProfileTabsMe