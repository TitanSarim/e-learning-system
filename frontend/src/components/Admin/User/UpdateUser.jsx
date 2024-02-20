import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Link, useParams  } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'
import { toast } from 'react-toastify'
import { clearErrors, AdminUpdateNewUser } from '../../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'

const UpdateUser = () => {

  const { id } = useParams();

  const {users, error} = useSelector((state)=>state.adminUsers);

  const userToUpdate = users?.find((user) => user.id === parseInt(id));

  const [username, setUserName] = useState(userToUpdate?.username)
  const [email, setEmail] = useState(userToUpdate?.email)
  const [age, setAge] = useState(userToUpdate?.age)
  const [gender, setGender] = useState(userToUpdate?.gender)
  const [role, setRole] = useState(userToUpdate?.role)
  const [status, setStatus] = useState(userToUpdate?.status)
  // const [password, setPassword] = useState()
  // const [confirmPassword, setConfirmPassword] = useState()

  const [isRegisteFormEmpty, setIsRegisteFormEmpty] = useState('')

  const dispatch = useDispatch()

  const updateSubmit = () => {
      if (!email || !username || !age || !gender) {
          setIsRegisteFormEmpty('Please Fill All The Required Fields')
          return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setIsRegisteFormEmpty('Email Is Not Valid')
          toast.error(isRegisteFormEmpty)
          return;
        }
    
        // if (password.length < 8) {
        //   setIsRegisteFormEmpty('Password Must Be Greater Then 8 Alphabats')
        //   toast.error(isRegisteFormEmpty)
        //   return;
        // }
    
        // if (password !== confirmPassword) {
        //   setIsRegisteFormEmpty('Password Did Not Matched')
        //   toast.error(isRegisteFormEmpty)
        //   return;
        // }
      
        const FormData = {
          email: email,
          username: username,
          role: role,
          age: age,
          gender: gender,
          password: userToUpdate?.password,
          status: status
        }
        
        dispatch(AdminUpdateNewUser(FormData, id));
        toast.success('User Updated')
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
                  <p>Update User</p>

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

                  {/* <div className='admin-createuser-form-passwords'>
                      <div>
                          <p>Password <span>*</span></p>
                          <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <div>
                          <p>Confirm Password <span>*</span></p>
                          <input  type='text' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                      </div>
                  </div> */}
                  <strong>{isRegisteFormEmpty}</strong>
                  <button onClick={updateSubmit}>Update</button>
              </div>
              
          </div>

      </div>

    </div>
  )
}

export default UpdateUser