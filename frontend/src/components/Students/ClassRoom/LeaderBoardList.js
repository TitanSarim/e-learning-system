import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Photo from "../../../assets/Photo.png"




const data = [
    {
        name: "Iman",
        points: "2015",
        grade: 1
    },
     {
        name: "Vatri",
        points: "2065",
        grade: 1
    },
    {
        name: "Paul",
        points: "15",
        grade: 0
    },
    {
        name: "Azee",
        points: "1015",
        grade: 1
    }, 
    {
        name: "Robert",
        points: "200",
        grade: 0
    },
]

const LeaderBoardList = () => {
  return (
    <div className='class-description-LeaderBoard'>
      {data.map((item, index)=>{
        return (
        <>
             <table className='class-description-leader-members'>
                 <tbody>
                    <tr className='class-description-leader-members-a'>
                        <tr style={{width: "1rem"}}>
                          <td>{item.grade ? <IoIosArrowUp color='#00821D'/>: <IoIosArrowDown color='#820000'/>}</td>
                           <td> <p>{index}</p></td>  
                        </tr>
                        <td  style={{width: "3rem"}}>  <img src={Photo} alt='Phote'/></td>
                        <td  style={{width: "2rem"}}>{item.name}</td>
                        <td  style={{width: "3rem"}}>{item.points} pts</td>
                    </tr>
                   
                </tbody>
                   
             
            </table>
        </>
       
            
            // <div key={index} className='class-description-leader-members'>


            //     <div className='class-description-leader-members-a'>

            //         <p>{item.grade ? <IoIosArrowUp color='#00821D'/>: <IoIosArrowDown color='#820000'/>}</p>

            //        <p>{index}</p>
            //     </div>

            //     <div className='class-description-leader-members-b'>
            //         <img src={Photo} alt='Phote'/>
            //         <p>{item.name}</p>
            //         <p>{item.points}</p>
            //     </div>
            // </div>
        )
      })}
      
      <div className='class-description-LeaderBoard-btn'>
        <button className=''>
          view all <IoIosArrowForward />
        </button>
      </div>
      
    </div>
  )
}

export default LeaderBoardList
