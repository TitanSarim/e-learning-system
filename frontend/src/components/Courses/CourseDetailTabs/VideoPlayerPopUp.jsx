import React, { useState } from 'react';
import 'video-react/dist/video-react.css';
import { Player, ControlBar, LoadingSpinner, BigPlayButton} from 'video-react';
import { GiTireIronCross } from "react-icons/gi";

const VideoPlayerPopUp = ({ setVideoPlayerOpen, videoUrl, videoTitle }) => {
  

    const handleClose = () => {
        setVideoPlayerOpen(false);
    }
  return (
    <div className='course-preview-video-popup-container'>
    <p>{videoTitle} <button onClick={handleClose}><GiTireIronCross size={21}/></button></p>
      <div className='course-preview-video-popup-video-player'>
        <Player src={videoUrl}>
          <LoadingSpinner />
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} className="my-class" />
        </Player>
        
      </div>
    </div>
  );
}

export default VideoPlayerPopUp;
