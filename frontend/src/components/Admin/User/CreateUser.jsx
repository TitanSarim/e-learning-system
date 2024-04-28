import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";

import './UserForm.css'
import { AdmincreateNewUser, clearErrors } from '../../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateUser = () => {

    const {error} = useSelector((state)=>state.adminUsers);


    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male')
    const [role, setRole] = useState('Student')
    const [status, setStatus] = useState('active')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isRegisteFormEmpty, setIsRegisteFormEmpty] = useState('')

    const dispatch = useDispatch()

    const registerSubmit = () => {
        

         if (!email) {
            setIsRegisteFormEmpty('Please Fill All The Required Fields')
            return;
          }
      
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setIsRegisteFormEmpty('Email Is Not Valid')
            toast.error(isRegisteFormEmpty)
            return;
          }
      
        
        
          const FormData = {
            email: email,
            role: role,
            status: status
          }
          
          dispatch(AdmincreateNewUser(FormData));
          toast.success('Please, check Your Email')

            setUserName('')
            setEmail('')
            setAge('')
            setPassword('')
            setConfirmPassword('')
    }

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    })

  return (
    <div className='admin-container'>

        <div className='admin-dashboard-sidebar'>
            <SideBar/>
        </div>

        <div className='admin-wrapper'>
            <NavBar/>
            
            <div className='admin-createuser'>
                <Link to='/admin/all-users'><GoArrowLeft/></Link>

                <div className='admin-createuser-form'>
                    <p>Add New User</p>

                    <div className='admin-createuser-form-username-email'>
                      
                        <div>
                            <p>Email <span>*</span></p>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                   

                    <div className='admin-createuser-form-role-status'>
                        <div>
                            <p>Role <span>*</span></p>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option disabled>Select</option>
                                <option>Student</option>
                                <option>Job Seeker</option>
                                <option>HR</option>
                                <option>Teacher</option>
                                <option>admin</option>
                            </select>
                        </div>
                        <div>
                            <p>Status <span>*</span></p>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option disabled>Select</option>
                                <option>Activate</option>
                                <option>Blocked</option>
                            </select>
                        </div> 
                    </div>

                  
                    <strong>{isRegisteFormEmpty}</strong>
                    <button onClick={registerSubmit}>Create</button>
                </div>
                
            </div>

        </div>
    
    </div>
  )
}

export default CreateUser