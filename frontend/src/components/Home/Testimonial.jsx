import React from 'react';
import profile from "../../assets/profile.png"
import { IoStarSharp } from "react-icons/io5";


const Testimonial = () => {


  return (


        <div className='home-testimonial-card' style={{width: "90%"}}>
         
            <div className='home-testimonial-card-section-a'>
                <div className='home-testimonial-card-section-a-content'>

                   <img src={profile} alt="image" />

                   <div className='home-testimonial-card-section-a-content-a'>
                        <p>Adam Smith</p>
                        <p>Phyton Developer</p>
                    </div>
                </div>

                 
 
                <div className='home-testimonial-card-section-a-stars'>
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                </div>
            </div>

            <div className='home-testimonial-card-rule'/>

            <div className='home-testimonial-card-section-b'>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique atque commodi accusantium dicta in beatae. Sed, nam fugit sapiente laudantium dolore possimus, et hic ipsa nisi ipsam vitae, ex porro!</p>
            </div>
           

           <div>
               <button></button>
           </div>
        </div> 


  );
};

export default Testimonial;
    