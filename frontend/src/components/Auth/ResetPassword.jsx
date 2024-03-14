import React, { useState , useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordAction } from '../../actions/UserActions';
import { clearErrors } from '../../actions/UserActions';
import { toast } from 'react-toastify';

import { RxEyeNone } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";



const ResetPassword = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const  {error, loading, message} = useSelector((state)=> state.forgetPassword)

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword , setConfirmNewPassword] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState("")
  const [showRegistePassword, setRegisteLoginPassword] = useState(false);


    const handleRegisterTogglePassword = () => {
        setRegisteLoginPassword(!showRegistePassword);
    };

    const handleResetPassword = (e)=>{

      e.preventDefault()

      if (newPassword.length < 8) {
        setIsPasswordValid("Password Must Be Greater Then 8 Alphabats");
        return;
      }

      if(newPassword != confirmNewPassword) {
        return setIsPasswordValid("Password did not match")
      }

      const formData = {
        newPassword: newPassword,
        id: id
      }

    
      // call apis
      dispatch(ResetPasswordAction(formData))

      setTimeout(() => {
        navigate("/login")
      }, 2000);
   
    }

  
  useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
          toast.success(message.message)
               console.log(message);
        }
   
  }, [dispatch, error, message])

  return (
    <section className="auth">
    <section className="auth-forget-password auth-reset-password">
      <div>
        <h2>Enter Your new Password:</h2>

            <form action="" onSubmit={handleResetPassword}>
              
              <div>
                  <input 
                    type={!showRegistePassword ? "text"  : "password" }
                    placeholder="New Password" 
                    value={newPassword} 
                    onChange={(e)=> setNewPassword(e.target.value) }
                  />
                  {showRegistePassword ? (
                  <RxEyeNone onClick={handleRegisterTogglePassword} />
                ) : (
                  <RxEyeClosed onClick={handleRegisterTogglePassword} />
                )}
              </div>
              

               <input 
                type="password" 
                placeholder="Confirm New Password" 
                value={confirmNewPassword} 
                onChange={(e)=> setConfirmNewPassword(e.target.value) }
              />
        
              <button >Submit</button>

             <strong>{isPasswordValid}</strong>
             
            </form>
       
        

      </div>
      
    </section>
  </section>
  )
}

export default ResetPassword
