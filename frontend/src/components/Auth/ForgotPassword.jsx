import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { ForgetPassword } from "../../actions/UserActions";
import { toast } from 'react-toastify';
import { clearErrors } from "../../actions/UserActions";



const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { error , loading, message } = useSelector((state)=> state.forgetPassword)
  

  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState("")

  const handleForgetEmail = (e)=>{
    e.preventDefault()


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setIsEmailValid("Email Is Not Valid");
        return;
      }

       const myForm = new FormData();

       myForm.set("email", email)

       dispatch(ForgetPassword(myForm))


    
      setIsEmailValid("")
  }

  useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
          toast.success(message.message)
     
        }
   
  }, [dispatch, error, message])



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
