import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { MdModeEditOutline } from 'react-icons/md';

const ProfileTabsMe = ({ personalDetails, setPersonalDetails, handleSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setPersonalDetails(prevDetails => ({
      ...prevDetails,
      phoneNumber: value
    }));
  };

  return (
    <form className='general-profile-detail-tabs-content' onSubmit={handleSubmit}>
      <div className='general-profile-detail-tabs-content-form'>
        <div className='general-profile-detail-tabs-content-input-type-1'>
          <div>
            <p>First Name</p>
            <input
              type='text'
              name='firstName'
              value={personalDetails?.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <button><MdModeEditOutline/>Edit</button>
        </div>
        <div className='general-profile-detail-tabs-content-input-type-1'>
          <div>
            <p>Last Name</p>
            <input
              type='text'
              name='lastName'
              value={personalDetails?.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <button><MdModeEditOutline/>Edit</button>
        </div>
        <div className='general-profile-detail-tabs-content-input-type-1'>
          <div>
            <p>Address</p>
            <input
              type='text'
              name='address'
              value={personalDetails?.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button><MdModeEditOutline/>Edit</button>
        </div>
      </div>

      <div className='general-profile-detail-tabs-content-form'>
        <div className='general-profile-detail-tabs-content-input-type-1'>
          <div>
            <p>Email</p>
            <input
              type='email'
              name='email'
              value={personalDetails?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button><MdModeEditOutline/>Edit</button>
        </div>
        <div className='general-profile-detail-tabs-content-input-type-3'>
          <div>
            <p>Phone Number</p>
            <PhoneInput
              value={personalDetails?.phoneNumber}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <button><MdModeEditOutline/>Edit</button>
        </div>
      </div>

      <div className='general-profile-detail-tabs-content-input-type-2'>
        <div>
          <p>Headline</p>
          <input
            type='text'
            name='headline'
            value={personalDetails?.headline}
            onChange={handleInputChange}
            required
          />
        </div>
        <button><MdModeEditOutline/>Edit</button>
      </div>

      <input type='submit' value="Save" className='general-profile-detail-tabs-content-save-button'/>
    </form>
  );
};

export default ProfileTabsMe;
