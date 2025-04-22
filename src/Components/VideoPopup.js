// src/components/VideoPopup.js
import React, { useEffect } from 'react';
import './VideoPopup.css'; // Ensure CSS path is correct

const VideoPopup = ({ videoUrl, onClose }) => {
  // Effect to handle Escape key press for closing the popup
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]); // Re-run effect if onClose changes

  // Function to convert standard YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let videoId = urlObj.searchParams.get("v");
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.substring(1);
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url; // Add autoplay=1
    } catch (error) {
      console.error("Invalid video URL:", url);
      return url; // Return original URL if parsing fails
    }
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    // Overlay handles click outside to close
    <div className="video-popup-overlay" onClick={onClose}>
      {/* Content stops click propagation to prevent closing when clicking inside video */}
      <div className="video-popup-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-popup-close"
          onClick={onClose}
          aria-label="Close video popup"
        >
          &times; {/* HTML entity for close 'X' */}
        </button>
        <iframe
          className="video-popup-iframe"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPopup;