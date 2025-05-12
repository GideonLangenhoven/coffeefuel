// --- File: src/Components/ProcessStepSlider.js ---
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import ProcessStepCard from './ProcessStepCard.js';

const AUTOPLAY_INTERVAL = 8000;

const ProcessStepSlider = ({ steps, idPrefix, defaultStepIndex = 0, onCardReadMore }) => {
  const [currentIndex, setCurrentIndex] = useState(defaultStepIndex);
  const [isAutoplaying, setIsAutoplaying] = useState(true);
  const totalSteps = steps.length;
  const sliderRef = useRef(null); // Ref for the main container
  // trackRef is no longer needed for direct transform if cards are absolutely positioned inside sliderRef

  const { ref: sliderIntersectionRef, inView: isSliderInView } = useInView({
    threshold: 0.5,
  });

  const stopAutoplay = useCallback(() => {
    setIsAutoplaying(false);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);
  const autoplayTimerRef = useRef(null); // Define it here

  const goToStep = useCallback((index, manualNavigation = false) => {
    if (manualNavigation) {
      stopAutoplay();
    }
    setCurrentIndex(index);
  }, [stopAutoplay]);

  const handleNext = useCallback(() => {
    if (totalSteps <= 1) return;
    const nextIndex = (currentIndex + 1) % totalSteps;
    goToStep(nextIndex, true);
  }, [currentIndex, totalSteps, goToStep]);

  const handlePrev = useCallback(() => {
    if (totalSteps <= 1) return;
    const prevIndex = (currentIndex - 1 + totalSteps) % totalSteps;
    goToStep(prevIndex, true);
  }, [currentIndex, totalSteps, goToStep]);

  useEffect(() => {
    if (isSliderInView && isAutoplaying && totalSteps > 1) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex(prevIdx => (prevIdx + 1) % totalSteps);
      }, AUTOPLAY_INTERVAL);
    } else {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isSliderInView, isAutoplaying, totalSteps]);


  // Determine card class for desktop 3D carousel effect
  const getDesktopCardClassName = (index) => {
    let diff = index - currentIndex;
    if (totalSteps > 2) {
        if (diff > totalSteps / 2) diff -= totalSteps;
        if (diff < -totalSteps / 2) diff += totalSteps;
    }
    switch (diff) {
      case 0: return 'process-slide-card--active';
      case 1: return 'process-slide-card--next';
      case -1: return 'process-slide-card--prev';
      case 2: return totalSteps >= 5 ? 'process-slide-card--far-next' : 'process-slide-card--hidden';
      case -2: return totalSteps >= 5 ? 'process-slide-card--far-prev' : 'process-slide-card--hidden';
      default: return 'process-slide-card--hidden';
    }
  };
  
  // For mobile, we will rely on CSS to show only the active card
  // and JS to switch which card has the '--active' class.
  // The CSS for mobile now uses absolute positioning for cards.

  const setRefs = useCallback(
    (node) => {
      sliderRef.current = node;
      sliderIntersectionRef(node);
    },
    [sliderIntersectionRef]
  );

  return (
    <div className={`process-slider-component-wrapper slider-${idPrefix}`}>
      <div className="process-slider-container" id={`slider-container-${idPrefix}`} ref={setRefs}>
        {/* For mobile, cards are absolutely positioned within this container.
            The "track" div is less about scrolling and more about grouping if needed,
            or can be removed if cards are direct children of container.
            Keeping track for semantic grouping.
        */}
        <div className="process-slider-track">
          {steps.map((step, index) => (
            <ProcessStepCard
              key={step.id || `${idPrefix}-${index}`}
              step={step}
              index={index}
              totalSteps={totalSteps}
              // On mobile, all cards will get 'process-slide-card'.
              // The '--active' class will control visibility and centering.
              // On desktop, the getDesktopCardClassName provides the 3D effect classes.
              cardClassName={
                (typeof window !== 'undefined' && window.innerWidth <= 767)
                  ? (index === currentIndex ? 'process-slide-card--active' : '')
                  : getDesktopCardClassName(index)
              }
              onClick={() => goToStep(index, true)}
              onOpenDetailModal={onCardReadMore}
              idPrefix={idPrefix}
            />
          ))}
        </div>
      </div>
      {totalSteps > 1 && (
        <div className="process-slider-nav">
          <button
            type="button" className="slider-nav-button prev"
            onClick={handlePrev} aria-label="Previous Step"
            disabled={totalSteps <= 1}
          >
            <span className="material-icons-outlined">arrow_back_ios</span>
          </button>
          <button
            type="button" className="slider-nav-button next"
            onClick={handleNext} aria-label="Next Step"
            disabled={totalSteps <= 1}
          >
            <span className="material-icons-outlined">arrow_forward_ios</span>
          </button>
        </div>
      )}
    </div>
  );
};

ProcessStepSlider.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    detailedText: PropTypes.string,
  })).isRequired,
  idPrefix: PropTypes.string.isRequired,
  defaultStepIndex: PropTypes.number,
  onCardReadMore: PropTypes.func.isRequired,
};

export default ProcessStepSlider;