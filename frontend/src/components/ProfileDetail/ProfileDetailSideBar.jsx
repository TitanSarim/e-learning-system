import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import store from "../../Store";
import {userLogOut } from "../../actions/UserActions";
import Popup from 'reactjs-popup';

import './ProfileDetailSideBar.css'
import Notifications from '../Notification/Notifications';
import PorfileChangePassword from './ProfileDialogueBoxex/PorfileChangePassword';
import ProfileDeleteProfile from './ProfileDialogueBoxex/ProfileDeleteProfile';

const ProfileDetailSideBar = ({profileData, user}) => {

    const [completionRate, setCompletionRate] = useState(0);
    const [notificationsData, setNotificationsData] = useState(profileData?.notifications)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
    const [changePassPopUp, setChangePassPopUp] = useState(false)

    const handleLogOut = () => {
      store.dispatch(userLogOut());
    }

    useEffect(() => {
      const calculateCompletionRate = () => {
        const fields = [
          'username',
          'email',
          'location',
          'firstname',
          'lastname',
          'phoneno',
          'Headline',
          'about',
          'education',
          'skills',
          'experience',
          'social',
          'cv',
          'coverletter'
        ];
  
        const fieldWeights = {
          username: 5,
          email: 5,
          location: 10,
          firstname: 5,
          lastname: 5,
          phoneno: 5,
          Headline: 10,
          about: 15,
          education: 10,
          skills: 5,
          experience: 10,
          social: 5,
          cv: 5,
          coverletter: 5
        };
  
        let score = 0;
        fields.forEach(field => {
          if (field === 'education' || field === 'experience') {
            if (profileData[field].length > 0) {
              score += fieldWeights[field];
            }
          } else {
            if (profileData[field]) {
              score += fieldWeights[field];
            }
          }
        });
  
        return score;
      };
  
      const rate = calculateCompletionRate();
      setCompletionRate(rate);

      localStorage.setItem('completionRate', rate);
    }, [profileData]);

    const handleNotificationPopUp = () => {
      setIsPopUpOpen(true);
    }
    const handleChangePassPopUp = () => {
      setChangePassPopUp(true);
    }
    const handleDeletePopUp = () => {
      setIsDeletePopUpOpen(true)
    }
      
  return (
    <div className='profile-detail-side-bar'>

        <div className='profile-detail-side-bar-container'>

          {user?.role === "HR Manager" ? "" : (
            <div className='profile-detail-side-bar-profile-completion'>
                <p>Profile Completion:</p>
                <div className='progress-bar'>
                    <div className='progress' style={{ width: `${completionRate}%` }}>
                        <p>{completionRate}%</p>
                    </div>
                </div>
            </div>
          )}

            <div className='profile-detail-side-bar-profile-settings'>
                <div>
                    <Link onClick={() => handleNotificationPopUp(true)}>Notifications</Link>
                </div>

                <div>
                    <Link onClick={() => handleChangePassPopUp(true)}>Change Password</Link>
                </div>
                
            </div>

           <div className='profile-detail-side-bar-links'>
                <div>
                    <button onClick={handleLogOut}>Logout</button>
                </div>

                <div>
                    <button onClick={() => handleDeletePopUp()}>Delete My Account</button>
                </div>
           </div>

        </div>

        <Popup open={isPopUpOpen} closeOnDocumentClick onClose={() => setIsPopUpOpen(false)} className='notifications-popup'>
          <Notifications notificationsData={notificationsData} setIsPopUpOpen={setIsPopUpOpen}/>
        </Popup>
        <Popup open={isDeletePopUpOpen} closeOnDocumentClick onClose={() => setIsDeletePopUpOpen(false)} className='change-delete-popup'>
          <ProfileDeleteProfile setIsDeletePopUpOpen={setIsDeletePopUpOpen}/>
        </Popup>

        <Popup open={changePassPopUp} closeOnDocumentClick onClose={() => setChangePassPopUp(false)} className='change-pass-popup'>
          <PorfileChangePassword setChangePassPopUp={setChangePassPopUp}/>
        </Popup>

    </div>
  )
}

export default ProfileDetailSideBar