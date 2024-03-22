import React, { useEffect, useState } from 'react'
import { AdminRequestUserUpdate, AdminUpdateNewUser, AdmincreateNewUser, clearErrors } from '../../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import './UserForm.css'


const UserForm = () => {
  const navigate = useNavigate()

    const {users, error} = useSelector((state)=>state.adminUsers);

    const {token , id } = useParams()

    const decodedToken = jwtDecode(token)
    const userEmail = decodedToken ? decodedToken.id : null;

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState(userEmail)
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isRegisteFormEmpty, setIsRegisteFormEmpty] = useState('')

    const dispatch = useDispatch()

    const registerSubmit = () => {
        if (!email || !username || !age || !gender || !password || !confirmPassword) {
            setIsRegisteFormEmpty('Please Fill All The Required Fields')
            return;
          }

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
            email,
            username,
            age,
            gender,
            password
          }


          console.log(FormData);
          
        dispatch(AdminRequestUserUpdate(FormData, id));
        toast.success('profile updated, please login')

        setUserName('')
        setEmail('')
        setAge('')
        setPassword('')
        setConfirmPassword('')

        navigate("/login")


    }

     useEffect(() => {
      if(error){
          toast.error(error);
          dispatch(clearErrors());
      }
  })





  return (
    <div className='admin-container'>

      

        <div className='admin-user-form'>
            
            
            <div className='admin-createuser'>

              
                

                <div className='admin-createuser-form'>
                  
                  <h2>Enter Details</h2>

                    <div className='admin-createuser-form-username-email'>
                        <div>
                            <p>Username <span>*</span></p>
                            <input type='text' placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <p>Email <span>*</span></p>
                            <input type='email' placeholder='Email' value={email} disabled/>
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
                    <button onClick={registerSubmit}>Submit</button>
                </div>
                
            </div>

        </div>
    
    </div>
  )
}

export default UserForm