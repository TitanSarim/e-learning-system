import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ProfileTabsMe = ({setPhoneNo, value}) => {
  return (
    <div className='general-profile-detail-tabs-content'>
        <div className='general-profile-detail-tabs-content-form'>
            <div className='general-profile-detail-tabs-content-input-type-1'>
                <div>
                    <p>First Name</p>
                    <input type='text'/>
                </div>
                <button><MdModeEditOutline/>Edit</button>
            </div>
            <div className='general-profile-detail-tabs-content-input-type-1'>
                <div>
                    <p>Last Name</p>
                    <input type='text' />
                </div>
                <button><MdModeEditOutline/>Edit</button>
            </div>
        </div>

        <div className='general-profile-detail-tabs-content-form'>
            <div className='general-profile-detail-tabs-content-input-type-1'>
            <div>
                <p>Email</p>
                <input type='email' />
            </div>
            <button><MdModeEditOutline/>Edit</button>
            </div>
            <div className='general-profile-detail-tabs-content-input-type-3'>
            <div>
                <p>Phone Number</p>
                <PhoneInput
                value={value}
                onChange={setPhoneNo}/>
            </div>
            <button><MdModeEditOutline/>Edit</button>
            </div>
        </div>

        <div className='general-profile-detail-tabs-content-input-type-2'>
            <div>
            <p>Headline</p>
            <input type='text'/>
            </div>
            <button><MdModeEditOutline/>Edit</button>
        </div>

        <Link className='general-profile-detail-tabs-content-save-button'>
            Save
        </Link>

    </div>
  )
}

export default ProfileTabsMe