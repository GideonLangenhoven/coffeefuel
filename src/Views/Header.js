// src/Views/Header.js

import React, { useState, useEffect, useRef } from 'react'; // Simplified imports

// *** Import the video file ***
import headerVideo from '../assets/video/HomeSolarPanel(1).mp4'; // Make sure this path is correct

// *** Import the updated CSS file ***
import './HeaderContent.css'; // Make sure this CSS file contains the styles below

import VideoPopup from '../Components/VideoPopup'; // Assuming this component exists and path is correct

const Header = () => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=21Kcah1vSdI"; // Example URL

  // Refs
  const rollerContainerRef = useRef(null); // Ref for the scrolling container
  const observerRef = useRef(null);
  const timeoutRefs = useRef(new Map());
  const contentRef = useRef(null);

  const rollerTexts = [
    "Reliable Power", "Lower Costs", "Sustainable Energy",
    "Expert Installation", "Peace of Mind", "Solar Systems", "Backup Batteries",
  ]; // Now 7 items
  const headingText = "Take Control of Your Energy";
  const headingWords = headingText.split(" ");

  // Function to clear timeouts for a specific index
  const clearElementTimeoutsByIndex = (index) => {
    // Check if the index exists in the map before attempting to access/clear
    if (timeoutRefs.current.has(index)) {
      const timeouts = timeoutRefs.current.get(index);
      clearTimeout(timeouts.timeoutYellow);
      clearTimeout(timeouts.timeoutWhite);
      timeoutRefs.current.delete(index); // Remove index entry from map
    }
  };

  // Effect to set up Intersection Observer for roller items
  useEffect(() => {
    const container = rollerContainerRef.current;
    const itemsToObserve = container ? container.querySelectorAll('.roller-item') : [];

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const targetElement = entry.target;
        // Ensure dataset.index exists before parsing
        const index = targetElement.dataset.index;
        if (index === undefined || index === null) return;
        const numericIndex = parseInt(index, 10);

        // Reset animation state when element comes into view
        if (entry.isIntersecting) {
          targetElement.classList.remove('is-yellow', 'animate-roller');
          // Force reflow to restart animation
          void targetElement.offsetWidth;
          targetElement.classList.add('animate-roller');

          // Clear any existing timeouts for this specific index before setting new ones
          clearElementTimeoutsByIndex(numericIndex);

          const timeoutYellowId = setTimeout(() => {
            targetElement.classList.add('is-yellow');
          }, 1000); // Time before turning yellow

          const timeoutWhiteId = setTimeout(() => {
            targetElement.classList.remove('is-yellow');
            // Clean up the map entry *after* the timeout completes
            // No need to delete here if cleanup handles it, but ensures no stale entries if component unmounts early
            if (timeoutRefs.current.has(numericIndex)) {
               timeoutRefs.current.delete(numericIndex);
            }
          }, 3500); // Total time yellow + time before turning yellow

          // Store the new timeouts in the map
          timeoutRefs.current.set(numericIndex, {
            timeoutYellow: timeoutYellowId,
            timeoutWhite: timeoutWhiteId
          });
        } else {
          // When not intersecting, remove classes and clear associated timeouts
          targetElement.classList.remove('is-yellow', 'animate-roller');
          clearElementTimeoutsByIndex(numericIndex); // Clear timeouts when element scrolls out of view
        }
      });
    };

    let currentObserver = null; // Variable to hold the observer instance

    if (container && itemsToObserve.length > 0) {
      if (observerRef.current) {
        observerRef.current.disconnect(); // Disconnect previous observer if exists
      }

      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: container, // Observe intersections within the roller container itself
        rootMargin: '0px',
        threshold: [0.5] // Trigger when 50% of the item is visible
      });

      itemsToObserve.forEach(element => {
        observerRef.current.observe(element);
      });

      currentObserver = observerRef.current; // Assign to the local variable
    }

    // --- FIX for exhaustive-deps ---
    // Capture the current ref value inside the effect
    const capturedTimeoutRefs = timeoutRefs.current;

    // Cleanup function
    return () => {
      if (currentObserver) {
        currentObserver.disconnect(); // Use the local variable for cleanup
        observerRef.current = null; // Also clear the ref if needed
      }
      // Use the captured ref value in the cleanup
      capturedTimeoutRefs.forEach((timeouts) => {
        clearTimeout(timeouts.timeoutYellow);
        clearTimeout(timeouts.timeoutWhite);
      });
      capturedTimeoutRefs.clear(); // Clear the map on unmount
    };
    // Keep dependencies minimal - rollerTexts.length ensures effect reruns if the number of items changes
  }, [rollerTexts.length]);

  // Effect to handle header content animations (fade-in-up)
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleContentIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check if already visible to prevent re-triggering animation unnecessarily
          if (!entry.target.classList.contains('visible')) {
            entry.target.classList.remove('fade-in-up'); // Remove class to reset animation state if needed
            // Force reflow might be needed if styles change rapidly, but often not required here
            // void entry.target.offsetWidth;
            entry.target.classList.add('fade-in-up', 'visible'); // Add classes to trigger animation and mark as visible
          }
        } else {
          // Optional: Remove classes when scrolling out of view to re-animate on scroll back
          // entry.target.classList.remove('fade-in-up', 'visible');
        }
      });
    };

    // Observe the main content overlay div
    const contentObserver = new IntersectionObserver(handleContentIntersection, {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px' // Relative to the viewport
    });

    contentObserver.observe(contentElement);

    // Cleanup function for the content observer
    return () => {
      if (contentElement) { // Check if element still exists before unobserving
         contentObserver.unobserve(contentElement);
      }
      contentObserver.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Handler to show the video popup
  const handleWatchVideo = (e) => {
    e.preventDefault(); // Prevent default button behavior if it's inside a form
    setShowVideoPopup(true);
  };

  // Handler to close the video popup
  const handleCloseVideo = () => setShowVideoPopup(false);

  return (
    <header className="header-hero-section">
      {/* Background Video */}
      <video
        src={headerVideo}
        autoPlay
        loop
        muted // Muted is important for autoplay policies in browsers
        playsInline // Important for playback on iOS
        className="header-background-video"
      >
        Your browser does not support the video tag. {/* Fallback message */}
      </video>

      {/* Content Overlay */}
      <div className="header-content-overlay" ref={contentRef}>
        <div className="text-content">
          <div className="main">
            {/* Main Heading */}
            <h1>
              {headingWords.map((word, index) => (
                <span key={index} className="gradient-word">
                  {word}{' '} {/* Add space between words */}
                </span>
              ))}
            </h1>
            {/* Scrolling Text Roller */}
            <div className="roller-container" ref={rollerContainerRef}>
              <div className="roller">
                {/* Map roller texts */}
                {rollerTexts.map((text, index) => (
                  <div
                    key={index}
                    className="roller-item"
                    data-index={index} // Add data-index for observer logic
                  >
                    {text}
                  </div>
                ))}
                {/* No duplication needed if CSS handles infinite loop */}
              </div>
            </div>
          </div>
          {/* Call to Action Button */}
          <div className="cta-container">
            <button className="cta-button" onClick={handleWatchVideo}>
              Why Go Solar?
            </button>
          </div>
        </div>
      </div>

      {/* Video Popup Component */}
      {showVideoPopup && <VideoPopup videoUrl={videoUrl} onClose={handleCloseVideo} />}
    </header>
  );
};

export default Header;
