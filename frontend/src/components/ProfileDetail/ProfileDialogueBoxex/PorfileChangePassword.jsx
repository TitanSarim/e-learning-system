import React, { useState } from "react";
import axios from "axios";
import {
  ConfigApplicationFormData,
  ConfigApplicationJson,
} from "../../../actions/Config";
import "./ProfileChangePassword.css";

const BASE_URL = "http://localhost:3900";

const PorfileChangePassword = () => {
  const id = 3;
  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      return setMessage("Password Did not match");
    }

    if (newPassword === oldpassword) {
      return setMessage("Your already Used This Password");
    }

    // handle Loading
    setLoading(true);
    // TURE
    try {
      const formData = {
        id,
        oldpassword,
        newPassword,
      };

      const res = await axios.post(
        `${BASE_URL}/api/v1/change-password`,
        formData,
        ConfigApplicationJson
      );

      console.log(res);

      if (res.status == 200) {
        return setMessage("Password Update SuccessFully");
      } else {
        return setMessage("Old Password did not match");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // FASLE
      setLoading(false);
    }
  };

  return (
    <section className="profile-change-password">
      <section className="auth-forget-password">
        <div className="profile-change-password-dev">
          <form action="" onSubmit={handleChangePassword}>
            <div className="profile-change-password-dev-a">
              <label>Enter Your Old Password</label>
              <input
                type="password"
                value={oldpassword}
                placeholder="Enter Your old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="profile-change-password-dev-a">
                <label>Enter New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="profile-change-password-dev-a">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button>{loading ? "Loading..." : "Submit"}</button>
            <strong>{message}</strong>
          </form>
        </div>
      </section>
    </section>
  );
};

export default PorfileChangePassword;
