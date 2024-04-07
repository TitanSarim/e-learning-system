import React, { useEffect, useState } from 'react'
import userImage from '../../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import {getMyProfile, updateMyProfile, clearErrors} from '../../../actions/ProfileAction.js'
import {useSelector, useDispatch} from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import ProfileAvatar from '../../ProfileDetail/ProfileAvatar.jsx';
import DeleteAvatar from '../../ProfileDetail/DeleteAvatar.jsx';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AdminProfile.css'
import { MdModeEditOutline } from 'react-icons/md'
import { CiCircleRemove } from 'react-icons/ci'
import { FaLocationDot } from 'react-icons/fa6'
import Loader from '../../Utils/Loader.jsx'

const AdminProfile = () => {

  const dispatch = useDispatch()

  const {myProfileData, error, loading} = useSelector((state)=>state.myPorfile);

  const [profileData, setProfileData] = useState(myProfileData)
  const [editorOpen, setEditorOpen] = useState(false);
  const [avatarDeleteConfirm, setAvatarDeleteConfirm] = useState(false);

  const [userName, setUserName] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    headline: ''
  });
  const [avatar, setAvatar] = useState();
  const [aboutMe, setAboutMe] = useState()


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {
      avatar: profileData?.avatar,
      location: personalDetails?.address,
      firstname: personalDetails?.firstName,
      lastname: personalDetails?.lastName,
      phoneno: personalDetails?.phoneNumber,
      Headline: personalDetails?.headline,
      about: aboutMe,
    }
    dispatch(updateMyProfile(formData, myProfileData?.cv,)) 
  }

  const hanldeEditorModelOpen = () => {
    setEditorOpen(true)
  }
  
  const hanldeAavatarDeleteModelOpen = () => {
    setAvatarDeleteConfirm(true)
  }

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

  const handleAboutChange = (value) => {
    setAboutMe(value);
  }


  useEffect(() => {

    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
    dispatch(getMyProfile());
  }, [dispatch, error])

  useEffect(() => {
    if (myProfileData && Object.keys(myProfileData).length > 0) {
      setProfileData(myProfileData);
    }
  }, [myProfileData]);

  useEffect(() => {
    setAvatar(profileData?.avatar || userImage)
    setAboutMe(profileData?.about)
    setUserName( profileData?.username)
    setPersonalDetails({
      firstName: profileData?.firstname,
      lastName: profileData?.lastname,
      address: profileData?.location,
      email: profileData?.email,
      phoneNumber: profileData?.phoneno,
      headline: profileData?.Headline
    });

  }, [profileData]);

  return (
    <div className='admin-container'>

      <div className='admin-dashboard-sidebar'>
          <SideBar/>
      </div>

      <div className='admin-wrapper-admin-profile'>
          <NavBar/>

        {loading ? <Loader/> : (
          <div className='admin-profile-container'>
            
            <div className='admin-profile-avatar-location'>
              <div className='admin-profile-avatar'>
                  {profileData?.avatar ? (
                    <img src={avatar} alt='Profile'/>
                  ) : (
                    <img src={userImage} alt='Profile'/>
                  )}
                <div>
                  <button onClick={() => hanldeEditorModelOpen()}><MdModeEditOutline/>Edit</button>
                  {profileData?.avatar ? (
                    <button onClick={() => hanldeAavatarDeleteModelOpen()}><CiCircleRemove size={23}/></button>
                  ): ""}
                </div>
              </div>
              <div className='admin-profile-location'>
                <p>@{userName}</p>
                {/* {personalDetails?.address ? (
                  <p>
                    Full Stack Developer
                    <span><FaLocationDot size={20}/>{personalDetails?.address}</span>
                  </p>
                ) :""} */}
              </div>
            </div>

            <form className='admin-profile-avatar-about' onSubmit={handleSubmit}>
                
                <div className='admin-profile-avatar-aboutinput-sections'>
                  <div className='admin-profile-avatar-aboutinput-type1'>
                    <p>First Name</p>
                    <input type='text' name='firstName' value={personalDetails?.firstName} onChange={handleInputChange} required/>
                  </div>
                  <div className='admin-profile-avatar-aboutinput-type1'>
                    <p>Last Name</p>
                    <input type='text' name='lastName' value={personalDetails?.lastName} onChange={handleInputChange} required/>
                  </div>
                  <div className='admin-profile-avatar-aboutinput-type2'>
                    <p>Email</p>
                    <input type='email' name='email' value={personalDetails?.email} onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className='admin-profile-avatar-aboutinput-sections'>
                  <div className='admin-profile-avatar-aboutinput-type1'>
                    <p>Phone No</p>
                    <PhoneInput
                      value={personalDetails?.phoneNumber}
                      onChange={handlePhoneChange}
                      required
                    />                
                  </div>
                  <div className='admin-profile-avatar-aboutinput-type3'>
                    <p>Address</p>
                    <input type='text' name='address' value={personalDetails?.address} onChange={handleInputChange} required/>
                  </div>
                </div>


                <div className='admin-profile-avatar-aboutinput-sections'>
                  <div className='admin-profile-avatar-aboutinput-type4'>
                    <p>Headline</p>
                    <input type='text' name='headline' value={personalDetails?.headline} onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className='admin-profile-avatar-aboutinput-sections'>
                  <div className='admin-profile-avatar-aboutinput-editor'>
                    <p>About You</p>
                      <ReactQuill 
                          theme="snow"
                          value={aboutMe}
                          onChange={handleAboutChange}
                      />
                  </div>
                </div>
                
                <div className='admin-profile-avatar-aboutinput-bottom'>
                  <input type='submit' value="Save"/>
                </div>

            </form>

          </div>
        )}

      </div>

      <Popup
          open={editorOpen}
          closeOnDocumentClick
          onClose={() => setEditorOpen(false)}
          className='avatar-popup'
        >
          <ProfileAvatar handleSubmit={handleSubmit} setEditorOpen={setEditorOpen} avatar={avatar} setAvatar={setAvatar}/>
        </Popup>

        <Popup
          open={avatarDeleteConfirm}
          closeOnDocumentClick
          onClose={() => setAvatarDeleteConfirm(false)}
          className='delete-avatar-popup'
        >
          <DeleteAvatar setAvatarDeleteConfirm={setAvatarDeleteConfirm} setAvatar={setAvatar}/>
        </Popup>

    </div>
  )
}

export default AdminProfile