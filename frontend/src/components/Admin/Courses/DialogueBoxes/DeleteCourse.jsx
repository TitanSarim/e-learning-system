import React from 'react'
import { GiTireIronCross } from "react-icons/gi";
import ConfirmAnimation from '../../../../assets/icons8-confirm.gif'


const DeleteCourse = ({slug, setDeleteConfirmationOpen}) => {


    const handleSubmit= () => {
        
    }

  return (
    <div className='admin-courses-dialogue-boxex-container'>
        <button className='admin-courses-dialogue-boxex-close-btn' onClick={() => setDeleteConfirmationOpen(false)}>
            <GiTireIronCross size={22}/>
        </button>

        <p> Are you sure you want to delete this course?</p>

        <img src={ConfirmAnimation} alt='confirm'/>

        <div className='admin-courses-dialogue-boxex-button'>
            <button onClick={handleSubmit}>
                Confirm
            </button>
            <button onClick={() => setDeleteConfirmationOpen(false)}>
                Cancel
            </button>
        </div>

    </div>
  )
}

export default DeleteCourse