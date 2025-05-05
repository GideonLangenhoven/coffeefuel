import React, { useState, useEffect, useRef } from 'react';

// *** Import the video file ***
import headerVideo from '../assets/video/HomeSolarPanel(1).mp4'; // Make sure this path is correct

// *** Import the updated CSS file ***
import './HeaderContent.css'; // Make sure this CSS file contains the styles below

import VideoPopup from '../Components/VideoPopup'; // Assuming this component exists and path is correct

const Header = () => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  // !!! IMPORTANT: Replace this placeholder with your ACTUAL YouTube video URL !!!
  const videoUrl = "https://www.youtube.com/embed/$4"; // <-- FIX: Use a valid URL

  // Refs
  const rollerContainerRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRefs = useRef(new Map());
  const contentRef = useRef(null);

  const rollerTexts = [
    "Reliable Power", "Lower Costs", "Sustainable Energy",
    "Expert Installation", "Peace of Mind", "Solar Systems", "Backup Batteries",
  ]; // 7 items
  const headingText = "Take Control of Your Energy";
  const headingWords = headingText.split(" ");

  // Function to clear timeouts for a specific index
  const clearElementTimeoutsByIndex = (index) => {
    if (timeoutRefs.current.has(index)) {
      const timeouts = timeoutRefs.current.get(index);
      clearTimeout(timeouts.timeoutYellow);
      clearTimeout(timeouts.timeoutWhite);
      timeoutRefs.current.delete(index);
    }
  };

  // Effect to set up Intersection Observer for roller items
  useEffect(() => {
    const container = rollerContainerRef.current;
    const itemsToObserve = container ? container.querySelectorAll('.roller-item') : [];

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const targetElement = entry.target;
        const index = targetElement.dataset.index;
        if (index === undefined) return;
        const numericIndex = parseInt(index, 10);

        if (entry.isIntersecting) {
          targetElement.classList.remove('is-yellow', 'animate-roller');
          void targetElement.offsetWidth; // Force reflow
          targetElement.classList.add('animate-roller');

          clearElementTimeoutsByIndex(numericIndex);

          const timeoutYellowId = setTimeout(() => {
            targetElement.classList.add('is-yellow');
          }, 1000); // Time until yellow highlight

          const timeoutWhiteId = setTimeout(() => {
            targetElement.classList.remove('is-yellow');
            // Clean up map entry when animation cycle for this item ends
            timeoutRefs.current.delete(numericIndex);
          }, 3500); // Duration of yellow highlight + buffer

          timeoutRefs.current.set(numericIndex, {
            timeoutYellow: timeoutYellowId,
            timeoutWhite: timeoutWhiteId
          });
        } else {
          // Optionally reset state when out of view
          targetElement.classList.remove('is-yellow', 'animate-roller');
          // Clean up timeouts if element scrolls out of view mid-animation
          clearElementTimeoutsByIndex(numericIndex);
        }
      });
    };

    if (container && itemsToObserve.length > 0) {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: container, // Observing within the roller container itself
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
      });

      itemsToObserve.forEach(element => {
        observerRef.current.observe(element);
      });
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      // Clear all pending timeouts on component unmount or dependency change
      timeoutRefs.current.forEach((timeouts) => {
        clearTimeout(timeouts.timeoutYellow);
        clearTimeout(timeouts.timeoutWhite);
      });
      timeoutRefs.current.clear();
    };
  }, [rollerTexts.length]); // Rerun if the number of texts changes

  // Effect to handle header content fade-in animation
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleContentIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'visible' class - CSS transition handles the fade/move
          entry.target.classList.add('visible');
          // Optionally unobserve after first intersection if animation only runs once
          // contentObserver.unobserve(entry.target);
        } else {
          // Remove 'visible' class if you want animation to replay on scroll out/in
          entry.target.classList.remove('visible');
        }
      });
    };

    const contentObserver = new IntersectionObserver(handleContentIntersection, {
      threshold: 0.1, // Trigger when 10% is visible
      rootMargin: '0px'
    });

    contentObserver.observe(contentElement);

    return () => {
      if (contentElement) {
        contentObserver.unobserve(contentElement);
      }
      contentObserver.disconnect();
    };
  }, []); // Empty dependency array, runs once on mount

  // --- Event Handlers ---
  const handleWatchVideo = (e) => {
    e.preventDefault(); // Prevent any default button behavior
    setShowVideoPopup(true);
  };

  const handleCloseVideo = () => {
    setShowVideoPopup(false);
  };

  return (
    <header className="header-hero-section">
      {/* Background Video Element */}
      <video
        src={headerVideo}
        autoPlay
        loop
        muted // Autoplay often requires muted
        playsInline // Important for iOS inline playback
        className="header-background-video"
        // Optional: Add a poster image for faster initial load
        // poster="path/to/poster-image.jpg"
      >
        Your browser does not support the video tag. {/* Fallback text */}
      </video>

      {/* Content Overlay */}
      <div className="header-content-overlay" ref={contentRef}>
        <div className="text-content">
          <div className="main">
            <h1>
              {headingWords.map((word, index) => (
                <span key={index} className="gradient-word"> {/* Ensure CSS targets this */}
                  {word}{' '}
                </span>
              ))}
            </h1>
            {/* Roller Container */}
            <div className="roller-container" ref={rollerContainerRef}>
              <div className="roller">
                {/* Map exactly the 7 items */}
                {rollerTexts.map((text, index) => (
                  <div
                    key={index}
                    className="roller-item"
                    data-index={index} // Index for observer logic
                  >
                    {text}
                  </div>
                ))}
                {/* No duplication needed if animation loops correctly */}
              </div>
            </div>
          </div>
          {/* Call to Action */}
          <div className="cta-container">
            <button className="cta-button" onClick={handleWatchVideo}>
              Why Go Solar?
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally Render Video Popup */}
      {showVideoPopup && (
        <VideoPopup
          videoUrl={videoUrl}
          onClose={handleCloseVideo}
          // Optional: Pass a specific title for the video
          // videoTitle="SolPower - Why Go Solar?"
        />
      )}
    </header>
  );
};

export default Header;