import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import VideoPlayerPopUp from './VideoPlayerPopUp';

const CourseDetailPreview = ({videos}) => {

  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoTitle, setVideoTitle] = useState(null)

  const hanldeActivateModelOpen = (url, title) => {
    setVideoUrl(url)
    setVideoTitle(title)
    setVideoPlayerOpen(true)
  }

  return (
    <div className="course-preview-container">
      <p>Course Preview</p>
      
      <div className='course-preview-videos'>
        {videos?.map((url, index) => (
          <button key={index} className='course-preview-video'>
            <div>
              <p>Video {index + 1} :</p>
              <span>{url?.videoTitle}</span>
            </div>
            <button onClick={() => hanldeActivateModelOpen(url?.videoFile, url?.videoTitle)}>View</button>
          </button>
        ))}
      </div>

      <Popup open={videoPlayerOpen} closeOnDocumentClick onClose={() => setVideoPlayerOpen(false)} className='course-preview-video-popup'>
        <VideoPlayerPopUp setVideoPlayerOpen={setVideoPlayerOpen} videoUrl={videoUrl} videoTitle={videoTitle}/>
      </Popup>

    </div>
  )

}

export default CourseDetailPreview