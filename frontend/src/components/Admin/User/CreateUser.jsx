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
    const [status, setStatus] = useState('Activate')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isRegisteFormEmpty, setIsRegisteFormEmpty] = useState('')

    const dispatch = useDispatch()

    const registerSubmit = () => {
        if (!email || !username || !age || !gender || !password || !confirmPassword) {
            setIsRegisteFormEmpty('Please Fill All The Required Fields')
            return;
          }
      
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setIsRegisteFormEmpty('Email Is Not Valid')
            toast.error(isRegisteFormEmpty)
            return;
          }
      
          if (password.length < 8) {
            setIsRegisteFormEmpty('Password Must Be Greater Then 8 Alphabats')
            toast.error(isRegisteFormEmpty)
            return;
          }
      
          if (password !== confirmPassword) {
            setIsRegisteFormEmpty('Password Did Not Matched')
            toast.error(isRegisteFormEmpty)
            return;
          }
        
          const FormData = {
            email: email,
            username: username,
            role: role,
            age: parseInt(age),
            gender: gender,
            password: password,
            status: status
          }
          
          dispatch(AdmincreateNewUser(FormData));
          toast.success('User Created')

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
                            <p>Username <span>*</span></p>
                            <input type='text' placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <p>Email <span>*</span></p>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className='admin-createuser-form-gender-age'>
                        <div>
                            <p>Age <span>*</span></p>
                            <input type='number' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/>
                        </div>
                        <div>
                            <p>Gender <span>*</span></p>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option disabled>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
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
                                <option>Admin</option>
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

                    <div className='admin-createuser-form-passwords'>
                        <div>
                            <p>Password <span>*</span></p>
                            <input value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <p>Confirm Password <span>*</span></p>
                            <input value={confirmPassword} type='text' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
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