import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { RxEyeNone } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";

import { register, login, clearErrors } from "../../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Auth = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();


  const { error, isAuthenticated, user } = useSelector((state) => state.user);


  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [registerType, setRegisterType] = useState("Student");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegistePassword, setRegisteLoginPassword] = useState(false);
  const [showRegisteConfirmPassword, setShowRegisteConfirmPassword] =
    useState(false);

  const [isRegisteFormEmpty, setIsRegisteFormEmpty] = useState("");
  const [isLoginFormEmpty, setIsLoginFormEmpty] = useState("");

  const handleLoginTogglePassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const handleRegisterTogglePassword = () => {
    setRegisteLoginPassword(!showRegistePassword);
  };
  const handleRegisterConfirmTogglePassword = () => {
    setShowRegisteConfirmPassword(!showRegisteConfirmPassword);
  };

  const handleMainTabClick = (tab) => {
    setRegisterType(tab);
  };

  const handleLoginSubmit = () => {
    if (!loginEmail || !loginPassword) {
      setIsLoginFormEmpty("Please fill out all fields.");
      return;
    }
    const FormData = {
      email: loginEmail,
      password: loginPassword,
    };

    dispatch(login(FormData));
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLoginSubmit();
    }
  };

  const handleRegisterSubmit = () => {
    if (
      !email ||
      !username ||
      !age ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      setIsRegisteFormEmpty("Please Fill All The Required Fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsRegisteFormEmpty("Email Is Not Valid");
      return;
    }

    if (password.length < 8) {
      setIsRegisteFormEmpty("Password Must Be Greater Then 8 Alphabats");
      return;
    }

    if (password !== confirmPassword) {
      setIsRegisteFormEmpty("Password Did Not Matched");
      return;
    }

    const FormData = {
      email: email,
      username: username,
      role: registerType,
      age: age,
      gender: gender,
      password: password,
      status: "active",
    };

    dispatch(register(FormData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated === true && user?.role === "Student") {
      naviagte("/Student/Profile");
      toast.success("Welcome to M-Time");
    } else if (isAuthenticated === true && user.role === "admin") {
      naviagte("/admin/dashboard");
      toast.success("Welcome Admin");
    }
  });

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container-wrapper">
          <p>Register</p>
          <span>
            Welcome to <p>M-Time</p>
          </span>

          <div className="auth-name-email">
            <div className="auth-username">
              <p>
                Username <span>*</span>
              </p>
              <input
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="auth-email">
              <p>
                Email <span>*</span>
              </p>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-register-type-container">
            <p>
              Join as ? <span>*</span>
            </p>
            <div className="auth-register-type">
              <button
                className={
                  registerType === "Student" ? "auth-register-type-active" : ""
                }
                onClick={() => handleMainTabClick("Student")}
              >
                Student
              </button>
              <button
                className={
                  registerType === "Job Seeker"
                    ? "auth-register-type-active"
                    : ""
                }
                onClick={() => handleMainTabClick("Job Seeker")}
              >
                Job Seeker
              </button>
              <button
                className={
                  registerType === "HR Manager"
                    ? "auth-register-type-active"
                    : ""
                }
                onClick={() => handleMainTabClick("HR Manager")}
              >
                HR Manager
              </button>
            </div>
          </div>

          <div className="auth-age-gender">
            <div className="auth-email">
              <p>
                Age <span>*</span>
              </p>
              <input
                type="number"
                placeholder="Your Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="auth-gender">
              <p>Gender</p>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Select Gender</option>
                <option selected>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="auth-pass-confirm-pass">
            <div className="auth-password">
              <p>
                Password <span>*</span>
              </p>
              <div>
                <input
                  type={showRegistePassword ? "text" : "password"}
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showRegistePassword ? (
                  <RxEyeNone onClick={handleRegisterTogglePassword} />
                ) : (
                  <RxEyeClosed onClick={handleRegisterTogglePassword} />
                )}
              </div>
            </div>
            <div className="auth-password">
              <p>
                Confirm Password <span>*</span>
              </p>
              <div>
                <input
                  type={showRegisteConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showRegisteConfirmPassword ? (
                  <RxEyeNone onClick={handleRegisterConfirmTogglePassword} />
                ) : (
                  <RxEyeClosed onClick={handleRegisterConfirmTogglePassword} />
                )}
              </div>
            </div>
          </div>
          <strong>{isRegisteFormEmpty}</strong>
          <button onClick={handleRegisterSubmit}>Join</button>
          <Link>Forget Password</Link>
        </div>

        <div className="auth-login-container">
          <p>Login</p>
          <span>
            Welcome to <p>M-Time</p>
          </span>

          <div className="auth-login-email">
            <p>
              Email <span>*</span>
            </p>
            <input
              type="email"
              placeholder="Your Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          <div className="auth-login-password">
            <p>
              Password <span>*</span>
            </p>
            <div>
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Your Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {showLoginPassword ? (
                <RxEyeNone onClick={handleLoginTogglePassword} />
              ) : (
                <RxEyeClosed onClick={handleLoginTogglePassword} />
              )}
            </div>
          </div>
          <strong>{isLoginFormEmpty}</strong>
          <button onClick={handleLoginSubmit}>Login</button>
          <Link to={"/forget/password"}>Forget Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
