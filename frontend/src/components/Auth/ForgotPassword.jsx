import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ForgetPassword } from "../../actions/UserActions";

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState("")

  const handleForgetEmail = (e)=>{
    e.preventDefault()


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setIsEmailValid("Email Is Not Valid");
        return;
      }

      dispatch(ForgetPassword(email))

    console.log(email);
    setIsEmailValid("")
  }


  return <section className="auth">
    <section className="auth-forget-password">
      <div>
        <h2>Enter Your Email:</h2>

            <form action="" onSubmit={handleForgetEmail}>

              <input 
                type="email" 
                placeholder="Your Email" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value) }
              />
        
              <button >Submit</button>


            </form>
       
        <strong>{isEmailValid}</strong>

      </div>
      
    </section>
  </section>;
};

export default ForgotPassword;
