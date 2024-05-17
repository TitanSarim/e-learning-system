import React, { useState } from 'react'
import { GiTireIronCross } from "react-icons/gi";
import { MdFolderDelete } from "react-icons/md";
import {userLogOut } from "../../../actions/UserActions";
import store from "../../../Store";
import './ProfileDeleteProfile.css'
import axios from 'axios'
import ButtonLoader from '../../Utils/ButtonLoader'
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:3900" 
//const BASE_URL = "http://40.124.120.87:3900" //Azure API endpoint


const ProfileDeleteProfile = ({setIsDeletePopUpOpen}) => {
    
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClosePopUp = () => {
        setIsDeletePopUpOpen(false);
    }

    const handleDeleteProfile = async () => {
        
        const token = Cookies.get('token');

        setIsLoading(true)

        try {
            const ConfigApplicationJson = { headers: 
                { 
                "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
            
            const res = await axios.get(`${BASE_URL}/api/v1/delete-profile`, ConfigApplicationJson)

            console.log("res",res)

        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
            store.dispatch(userLogOut());
        }

    }


  return (
    <div className='ProfileDeleteProfile-container'>

        <div className='ProfileDeleteProfile-header'>
            <button onClick={() => handleClosePopUp()}><GiTireIronCross size={26}/></button>
        </div>

        <div className='ProfileDeleteProfile-body'>
            <p>Are you sure to delete your account?</p>
            <MdFolderDelete size={40}/>
        </div>
        
        <div className='ProfileDeleteProfile-footer'>
            {isLoading === true ? 
                <p><span><ButtonLoader/></span></p> 
                : 
                    (
                    <>
                        <button onClick={() => handleDeleteProfile()}>Yes, Delete</button>
                        <button onClick={() => handleClosePopUp()}>Cancel</button>
                    </>
                    )
                }
            
        </div>

    </div>
  )
}

export default ProfileDeleteProfile