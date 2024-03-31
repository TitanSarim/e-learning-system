import React from 'react';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { GiTireIronCross } from "react-icons/gi";

const VideoPlayerPopUp = ({ setVideoPlayerOpen, videoUrl, videoTitle }) => {
  
    const handleClose = () => {
        setVideoPlayerOpen(false);
    }

  return (
    <div className='course-preview-video-popup-container'>
    <p>{videoTitle} <button onClick={handleClose}><GiTireIronCross size={21}/></button></p>
      <div className='course-preview-video-popup-video-player'>
        <MediaPlayer
          title="Sprite Fight"
          src={videoUrl}>
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
