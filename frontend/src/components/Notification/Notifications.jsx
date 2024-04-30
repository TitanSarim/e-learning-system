import React from 'react'
import { GiTireIronCross } from "react-icons/gi";
import moment from 'moment'
import './Notifications.css'

const Notifications = ({notificationsData, setIsPopUpOpen}) => {
  
    const handlePopUpClose = () => {
        setIsPopUpOpen(false)
    }

  
  return (
    <div className='Notifications-popup-container'>

        <div className='Notifications-popup-header'>
            <p>Notifications</p>
            <button onClick={() => handlePopUpClose()}><GiTireIronCross size={24}/></button>
        </div>

        <div className='Notifications-popup-wrapper'>

            {notificationsData?.map((noti) => (
                <div key={noti.id} className='Notifications-popup-data'>
                    <p> 
                        {noti.title} 
                        <span>From: {noti.data}</span>
                    </p>
                    
                    <span>{moment(noti.createdAt).calendar()}</span>
                </div>
            ))} 

        </div>

    </div>
  )
}

export default Notifications