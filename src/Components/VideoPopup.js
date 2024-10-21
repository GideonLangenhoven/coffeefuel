import React from 'react';
import './VideoPopup.css';

const VideoPopup = ({ videoUrl, onClose }) => {
  return (
    <div className="video-popup-overlay">
      <div className="video-popup-content">
        <button className="video-popup-close" onClick={onClose}>&times;</button>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl.replace("watch?v=", "embed/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPopup;
