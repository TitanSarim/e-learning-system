import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { AiOutlineDelete } from "react-icons/ai";
import { BsPen } from "react-icons/bs";

import {AdminGetUsers, clearErrors} from '../../../actions/UserActions'
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../../Utils/Loader';
import moment from 'moment'

import './AllUsers.css'

const AllUsers = () => {

    const dispatch = useDispatch()

    const {users, error, loading} = useSelector((state)=>state.adminUsers);

    const [allUsers, setAllUsers] = useState(users)

    const maskEmail = (email) => {
        const [prefix, domain] = email.split('@');
        return `${prefix.slice(0, 2)}***@${domain}`;
    };

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(AdminGetUsers());
    }, [dispatch])

  return (
    <div className='admin-container'>

    <div className='admin-dashboard-sidebar'>
      <SideBar/>
    </div>

    <div className='admin-wrapper'>
      <NavBar/>

        <div className='admin-allusers-container'>
            <Link>Add User</Link>

            <div className='admin-allusers-wrapper'>
                {loading ? <Loader/> : 
                <div className='admin-allusers-table-container'>
                    <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Updated At</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                {user.role === "admin" ? 
                                <td>
                                    {user.email}
                                </td>: 
                                <td>
                                    {maskEmail(user.email)}
                                </td>}
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>{moment(user.updatedAt).format('lll')}</td>
                                <td className='table-actions'>
                                    <Link><BsPen/></Link>
                                    <button><AiOutlineDelete/></button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </div>

    </div>
  </div>
  )
}

export default AllUsers