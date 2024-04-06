import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ButtonLoader from '../Utils/ButtonLoader'
import userImage from '../../assets/alex-suprun-ZHvM3XIOHoE-unsplash.jpg'



const DeleteAvatar =  ({setAvatarDeleteConfirm, setAvatar}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteSubmit  = async () => {

        setIsLoading(true)
        try {
            const response = await axios.delete('/api/v1/delete-avatar')

            if(response?.data.success === true) {
                toast.success("Image Deleted")
                setAvatar(userImage)
            }else if(response?.data.success === false){
                toast.error("Error, Please try again later")
            }

        } catch (error) {
            console.error('Error Deleting file:', error);
        }finally{
            setIsLoading(false)
            setAvatarDeleteConfirm(false)
        }
    }


  return (
    <div  className='delete-avatar-popup-container'>
        
        <p>Please confirm that you want to delete you Photo</p>

        <div className='delete-avatar-popup-button'>
            {isLoading ? (
                <p><span><ButtonLoader/></span></p>
            ) : (
                <button onClick={handleDeleteSubmit}>Yes</button>
            )}
            <button onClick={() => setAvatarDeleteConfirm(false)}>No</button>
        </div>

    </div>
  )
}

export default DeleteAvatar