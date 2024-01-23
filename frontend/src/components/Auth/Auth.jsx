import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

import { RxEyeNone } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";


const Auth = () => {

  
  const [registerType, setRegisterType] = useState('Student');

  const handleMainTabClick = (tab) => {
    setRegisterType(tab);
  }

  return (
    <div className='auth'>

    <div className='auth-container'>


        <div className='auth-container-wrapper'> 
            <p>Register</p>
            <span>Welcome to <p>M-Time</p></span>

            <div className='auth-name-email'>
              <div className='auth-username'>
                <p>Username <span>*</span></p>
                <input type='text' placeholder='Your Username'/>
              </div>
              <div className='auth-email'>
                <p>Email <span>*</span></p>
                <input type='email' placeholder='Your Email'/>
              </div>
            </div>
            
           <div className='auth-register-type-container'>
              <p>Join as ? <span>*</span></p>
              <div className='auth-register-type'>
                <button
                  className={registerType === 'Student' ? 'auth-register-type-active' : ''}
                  onClick={() => handleMainTabClick('Student')}   
                >Student</button>
                <button
                  className={registerType === 'Job Seeker' ? 'auth-register-type-active' : ''}
                  onClick={() => handleMainTabClick('Job Seeker')}   
                >Job Seeker</button>
                <button
                  className={registerType === 'HR Manager' ? 'auth-register-type-active' : ''}
                  onClick={() => handleMainTabClick('HR Manager')}   
                >HR Manager</button>
              </div>
           </div>

            <div className='auth-age-gender'>
              <div className='auth-email'>
                <p>Age <span>*</span></p>
                <input type='number' placeholder='Your Age'/>
              </div>
              <div className='auth-gender'>
                <p>Gender</p>
                <select>
                  <option disabled>Select Gender</option>
                  <option selected>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div className='auth-pass-confirm-pass'>
              <div className='auth-password'>
                <p>Password <span>*</span></p>
                <div>
                  <input type='password' placeholder='Your Password'/>
                  <RxEyeClosed/>
                </div>
              </div>
              <div className='auth-password'>
                <p>Confirm Password <span>*</span></p>
                <div>
                  <input type='password' placeholder='Confirm Password'/>
                  <RxEyeClosed/>
                </div>
              </div>
            </div>
            <button>Join</button>
            <Link>Forget Password</Link>
        </div>
          
        <div className='auth-login-container'>
            <p>Login</p>
            <span>Welcome to <p>M-Time</p></span>

            <div className='auth-login-email'>
              <p>Email <span>*</span></p>
              <input type='email' placeholder='Your Email'/>
            </div>

            <div className='auth-login-password'>
              <p>Password <span>*</span></p>
              <div>
                <input type='password' placeholder='Your Password'/>
                <RxEyeClosed/>
              </div>
            </div>

            <button>Login</button>
            <Link>Forget Password</Link>

        </div>
    </div>

    </div>
  )
}

export default Auth