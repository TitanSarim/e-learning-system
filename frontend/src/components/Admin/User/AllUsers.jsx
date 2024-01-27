import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { AiOutlineDelete } from "react-icons/ai";
import { BsPen } from "react-icons/bs";
import { GiTireIronCross } from "react-icons/gi";
import ConfirmAnimation from '../../../assets/icons8-confirm.gif'
import {AdminGetUsers, adminDeleteUser, clearErrors} from '../../../actions/UserActions'
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../../Utils/Loader';
import moment from 'moment'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

import './AllUsers.css'

const AllUsers = () => {

    const dispatch = useDispatch()

    const {users, error, loading, isDeleted, message} = useSelector((state)=>state.adminUsers);

    const [allUsers, setAllUsers] = useState([])
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const maskEmail = (email) => {
        const [prefix, domain] = email.split('@');
        return `${prefix.slice(0, 2)}***@${domain}`;
    };

    const hanldeDeleteModelOpen = (id) => {
        setUserIdToDelete(id)
        setDeleteConfirmationOpen(true)
    }
    const handleDeleteUser = () => {
        dispatch(adminDeleteUser(userIdToDelete))
        setDeleteConfirmationOpen(false)

    }

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success(message);
        }
        dispatch(AdminGetUsers());
        
    }, [dispatch, isDeleted, message, error])

    useEffect(() => {
        setAllUsers(users)
    }, [users])

  return (
    <div className='admin-container'>

    <div className='admin-dashboard-sidebar'>
      <SideBar/>
    </div>

    <div className='admin-wrapper'>
      <NavBar/>

        <div className='admin-allusers-container'>
            <Link to="/admin/create-users">Add User</Link>

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
                                <td className='admin-user-table-actions'>
                                    <Link><BsPen/></Link>
                                    <button onClick={() => hanldeDeleteModelOpen(user.id)}><AiOutlineDelete/></button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>

            <Popup
                open={deleteConfirmationOpen}
                closeOnDocumentClick
                onClose={() => setDeleteConfirmationOpen(false)}
            >
                <div className="admin-user-deletemodal">
                <button className="admin-user-deletemodal-close-btn" onClick={() => setDeleteConfirmationOpen(false)}>
                    <GiTireIronCross/>
                </button>
                <p> Are you sure you want to delete this user?</p>
                <img src={ConfirmAnimation} alt='confirm'/>
                <div className="admin-user-deletemodal-buttons">
                    <button onClick={handleDeleteUser}>
                    Confirm
                    </button>
                    <button onClick={() => setDeleteConfirmationOpen(false)}>
                    Cancel
                    </button>
                </div>
                </div>
            </Popup>
        </div>

    </div>
  </div>
  )
}

export default AllUsers