import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import './PorfileChangePassword.css'
import { GiTireIronCross } from "react-icons/gi";


const BASE_URL = "http://localhost:3900"
// const BASE_URL = "http://20.6.81.5:3900"

const PorfileChangePassword = ({setChangePassPopUp}) => {
  const id = 3;
  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token');


    if (newPassword !== confirmPassword) {
      return setMessage("Password Did not match");
    }else {
      setMessage("")
    }

    if (newPassword === oldpassword) {
      return setMessage("Your already Used This Password");
    }else{
      setMessage("")
    }

    setLoading(true);

    try {
      const formData = {
        id,
        oldpassword,
        newPassword,
      };

      const ConfigApplicationJson = { headers: 
        { 
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
      }

      const res = await axios.post(`${BASE_URL}/api/v1/change-password`,formData, ConfigApplicationJson);


      if (res.status === 200) {
        return setMessage("Password Update SuccessFully");
      } else {
        return setMessage("Old Password did not match");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassPopUp = () => {
    setChangePassPopUp(false);
  }
    

  return (
    <div className="profile-change-password-container">
      <div className="profile-change-password-header">
        <p>Change Password</p>
        <button onClick={() => handleChangePassPopUp()}><GiTireIronCross size={24}/></button>
      </div>
      <div className="profile-change-password-dev">
        <form action="" onSubmit={handleChangePassword}>
          <div className="profile-change-password-dev-a">
            <label>Enter Your Old Password</label>
            <input
              type="text"
              value={oldpassword}
              placeholder="Enter Your old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="profile-change-password-dev-b-container">
            <div className="profile-change-password-dev-a">
              <label>Enter New Password</label>
              <input
                type="text"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="profile-change-password-dev-a">
              <label>Confirm New Password</label>
              <input
                type="text"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button>{loading ? "Loading..." : "Update"}</button>
          <strong>{message}</strong>
        </form>
      </div>
    </div>
  );
};

export default PorfileChangePassword;