// src/Components/VideoPopup.js
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './VideoPopup.css'; // Make sure this CSS file exists and is imported

/**
 * Extracts YouTube video ID from specific URL formats.
 * Focuses on the googleusercontent format provided and standard formats.
 * @param {string} url - The video URL.
 * @returns {string|null} The video ID or null if not found/invalid.
 */
const getYouTubeId = (url) => {
  if (!url) return null;
  let videoId = null;
  try {
    // Handle the specific googleusercontent.com/youtube.com/ format
    const googleContentMatch = url.match(/googleusercontent\.com\/youtube\.com\/(\d+)/);
    if (googleContentMatch && googleContentMatch[1]) {
      videoId = googleContentMatch[1]; // Extract the numeric ID
      // Basic validation for the extracted ID (can be adjusted if needed)
      return /^[a-zA-Z0-9_-]+$/.test(videoId) ? videoId : null;
    }

    // Fallback for standard YouTube URLs (watch?v=... and youtu.be/...)
    const fullUrl = url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`; // Assume https if no protocol

    const urlObj = new URL(fullUrl);
    const hostname = urlObj.hostname;

    if (hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v');
    } else if (hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.substring(1);
    }

    // Standard YouTube ID validation
    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return videoId;
    } else {
      // Reset videoId if standard validation fails after checking those formats
      videoId = null;
    }

  } catch (e) {
    console.error(`VideoPopup: Error parsing video URL "${url}":`, e);
    return null; // Return null on parsing error
  }

  if (!videoId) {
    console.warn(`VideoPopup: Could not extract a valid video ID from "${url}".`);
  }
  return videoId;
};

/**
 * A popup component to display a YouTube video iframe.
 */
const VideoPopup = ({ videoUrl, onClose, videoTitle = "Video Player" }) => {
  // Handle Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Memoize the video ID extraction and embed URL construction
  const embedUrl = useMemo(() => {
    const videoId = getYouTubeId(videoUrl);
    if (videoId) {
      // Use standard YouTube embed URL
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    }
    console.warn(`VideoPopup: Not rendering iframe because video ID could not be extracted from "${videoUrl}".`);
    return null; // Return null if videoId is invalid
  }, [videoUrl]);

  // Don't render the popup if the embed URL couldn't be created
  if (!embedUrl) {
    return null;
  }

  // Render the popup
  return (
    <div
      className="video-popup-overlay"
      onClick={onClose} // Close when clicking overlay
      role="dialog"
      aria-modal="true"
      aria-label="Video Popup"
    >
      <div
        className="video-popup-content"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <button
          className="video-popup-close"
          onClick={onClose}
          aria-label="Close video popup"
        >
          &times; {/* Use × for close icon */}
        </button>
        <div className="video-iframe-container">
          <iframe
            className="video-popup-iframe"
            src={embedUrl}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder="0" // Use frameBorder (camelCase) for React
          ></iframe>
        </div>
      </div>
    </div>
  );
};

VideoPopup.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  videoTitle: PropTypes.string,
};

export default VideoPopup;