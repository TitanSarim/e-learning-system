import React, { useState } from 'react';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { GiTireIronCross } from "react-icons/gi";
import Loader from '../../Utils/Loader';
const VideoPlayerPopUp = ({ setVideoPlayerOpen, videoUrl, videoTitle }) => {
  
  const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        setVideoPlayerOpen(false);
    }

    const handleLoadedData = () => {
      setIsLoading(false); // When video is loaded, set loading state to false
    }

  return (
    <div className='course-preview-video-popup-container'>
    <p>{videoTitle} <button onClick={handleClose}><GiTireIronCross size={21}/></button></p>
      <div className='course-preview-video-popup-video-player'>
        {isLoading && <div className='course-preview-video-popup-loader'><Loader/></div>}
          <MediaPlayer
            title={videoTitle}
            src={videoUrl}
            onLoadedData={handleLoadedData}
          >
            <MediaProvider />
            <PlyrLayout
              icons={plyrLayoutIcons}
              controls={['play', 'fast-forward', 'restart', 'duration', 'progress','current-time', 'mute+volume', 'fullscreen', 'settings']}
            />
          </MediaPlayer>
        
      </div>
    </div>
  );
}

export default VideoPlayerPopUp;
