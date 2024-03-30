import React from 'react'
import { GiTireIronCross } from "react-icons/gi";
import ConfirmAnimation from '../../../../assets/icons8-confirm.gif'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './CoursesDialogue.css'
import { adminUpdateCourseStatus } from '../../../../actions/CoursesAction';

const DeActivate = ({slug, setDeActivateConfirmationOpen}) => {

    
    const dispatch = useDispatch()

    const handleSubmit= () => {

        const formData = {
            status: 'inactive',
        }

        dispatch(adminUpdateCourseStatus(formData, slug))
        toast.success('Course Updated')
        setDeActivateConfirmationOpen(false)
        window.location.reload()
    }


  return (
    <div className='admin-courses-dialogue-boxex-container'>
        <button className='admin-courses-dialogue-boxex-close-btn' onClick={() => setDeActivateConfirmationOpen(false)}>
            <GiTireIronCross size={22}/>
        </button>

        <p> Are you sure you want to deactivate this course?</p>

        <img src={ConfirmAnimation} alt='confirm'/>

        <div className='admin-courses-dialogue-boxex-button'>
            <button onClick={handleSubmit}>
                Confirm
            </button>
            <button onClick={() => setDeActivateConfirmationOpen(false)}>
                Cancel
            </button>
        </div>

    </div>
  )
}

export default DeActivate