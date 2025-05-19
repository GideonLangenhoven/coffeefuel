// --- File: src/Components/ProcessStepSlider.js ---
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import ProcessStepCard from './ProcessStepCard.js';
// No separate CSS import needed if styles are consolidated in HowItWorks.css

const AUTOPLAY_INTERVAL = 8000; // Autoplay interval in milliseconds

const ProcessStepSlider = ({ steps, idPrefix, defaultStepIndex = 0, onCardReadMore }) => {
const [currentIndex, setCurrentIndex] = useState(defaultStepIndex);
const [isAutoplaying, setIsAutoplaying] = useState(true);
const totalSteps = steps.length;
const sliderRef = useRef(null); // Ref for the main container
const autoplayTimerRef = useRef(null); // Ref for the interval timer

// Intersection observer to pause autoplay when slider is not visible
const { ref: sliderIntersectionRef, inView: isSliderInView } = useInView({
threshold: 0.5, // Trigger when 50% is visible
});

// Function to stop autoplay, typically on user interaction
const stopAutoplay = useCallback(() => {
setIsAutoplaying(false);
if (autoplayTimerRef.current) {
clearInterval(autoplayTimerRef.current);
autoplayTimerRef.current = null;
}
}, []); // No dependencies needed

// Function to navigate to a specific step
const goToStep = useCallback((index, manualNavigation = false) => {
if (manualNavigation) {
stopAutoplay(); // Stop autoplay if user interacts
}
setCurrentIndex(index);
}, [stopAutoplay]); // Depends on stopAutoplay

// Handler for the "Next" button
const handleNext = useCallback(() => {
if (totalSteps <= 1) return;
const nextIndex = (currentIndex + 1) % totalSteps;
goToStep(nextIndex, true); // Indicate manual navigation
}, [currentIndex, totalSteps, goToStep]);

// Handler for the "Previous" button
const handlePrev = useCallback(() => {
if (totalSteps <= 1) return;
const prevIndex = (currentIndex - 1 + totalSteps) % totalSteps;
goToStep(prevIndex, true); // Indicate manual navigation
}, [currentIndex, totalSteps, goToStep]);

// Effect for managing autoplay based on visibility and state
useEffect(() => {
// Start autoplay only if in view, autoplaying is enabled, and more than one step exists
if (isSliderInView && isAutoplaying && totalSteps > 1) {
autoplayTimerRef.current = setInterval(() => {
// Advance to the next step automatically
setCurrentIndex(prevIdx => (prevIdx + 1) % totalSteps);
}, AUTOPLAY_INTERVAL);
} else {
// Clear interval if not in view or autoplay is stopped
if (autoplayTimerRef.current) {
clearInterval(autoplayTimerRef.current);
autoplayTimerRef.current = null;
}
}
// Cleanup function to clear interval when component unmounts or dependencies change
return () => {
if (autoplayTimerRef.current) {
clearInterval(autoplayTimerRef.current);
}
};
}, [isSliderInView, isAutoplaying, totalSteps]); // Re-run effect if these change


// Determine card class names for the desktop 3D carousel effect
const getDesktopCardClassName = (index) => {
let diff = index - currentIndex;
// Handle wrap-around for calculating difference
if (totalSteps > 2) {
if (diff > totalSteps / 2) diff -= totalSteps;
if (diff < -totalSteps / 2) diff += totalSteps;
}
// Assign classes based on position relative to the current index
switch (diff) {
case 0: return 'process-slide-card--active';
case 1: return 'process-slide-card--next';
case -1: return 'process-slide-card--prev';
// Show far-prev/next only if there are enough cards (e.g., 5+)
case 2: return totalSteps >= 5 ? 'process-slide-card--far-next' : 'process-slide-card--hidden';
case -2: return totalSteps >= 5 ? 'process-slide-card--far-prev' : 'process-slide-card--hidden';
default: return 'process-slide-card--hidden'; // Hide other cards
}
};

// Combined ref for the slider container (for layout and intersection observer)
const setRefs = useCallback(
(node) => {
sliderRef.current = node;
sliderIntersectionRef(node); // Attach intersection observer ref
},
[sliderIntersectionRef] // Dependency for the intersection observer ref callback
);

// --- Determine Card Class Logic ---
// This function checks if we are likely on a mobile device based on window width.
// It's a basic check and might need refinement for edge cases or SSR.
const isMobileView = () => typeof window !== 'undefined' && window.innerWidth <= 768;

return (
<div className={`process-slider-component-wrapper slider-${idPrefix}`}>
<div
className="process-slider-container"
id={`slider-container-${idPrefix}`}
ref={setRefs}
// Add interaction handlers to potentially pause autoplay
onMouseEnter={stopAutoplay} // Example: Pause on hover
onTouchStart={stopAutoplay} // Example: Pause on touch
>
{/* Track contains the cards. On desktop, cards are absolutely positioned. */}
{/* On mobile, the container becomes scrollable, and track uses flexbox. */}
<div className="process-slider-track">
{steps.map((step, index) => {
// Determine class: Use desktop logic or simple active/inactive for mobile
const cardClassName = isMobileView()
? (index === currentIndex ? 'process-slide-card--active' : '') // Only active class matters for mobile layout
: getDesktopCardClassName(index); // Use 3D positioning classes for desktop

return (
<ProcessStepCard
key={step.id || `${idPrefix}-${index}`}
step={step} // Pass the full step object (now includes lottieSrc)
index={index}
totalSteps={totalSteps}
cardClassName={`process-slide-card ${cardClassName}`} // Base class + dynamic state class
onClick={() => goToStep(index, true)} // Click selects the card
onOpenDetailModal={onCardReadMore} // Propagate modal open request
idPrefix={idPrefix}
/>
);
})}
</div>
</div>
{/* Navigation buttons - Render only if more than one step */}
{totalSteps > 1 && (
// On mobile, these buttons are typically hidden by CSS (.process-slider-nav { display: none; })
// because scrolling handles navigation.
<div className="process-slider-nav">
<button
type="button" className="slider-nav-button prev"
onClick={handlePrev} aria-label="Previous Step"
disabled={totalSteps <= 1} // Disable if only one step
>
{/* Material Icon */}
<span className="material-icons-outlined">arrow_back_ios</span>
</button>
<button
type="button" className="slider-nav-button next"
onClick={handleNext} aria-label="Next Step"
disabled={totalSteps <= 1} // Disable if only one step
>
{/* Material Icon */}
<span className="material-icons-outlined">arrow_forward_ios</span>
</button>
</div>
)}
</div>
);
};

ProcessStepSlider.propTypes = {
// --- MODIFIED: Updated steps propType to expect lottieSrc ---
steps: PropTypes.arrayOf(PropTypes.shape({
id: PropTypes.string.isRequired,
title: PropTypes.string.isRequired,
text: PropTypes.string.isRequired,
detailedText: PropTypes.string,
lottieSrc: PropTypes.string, // Added: Expect an optional Lottie source URL string
})).isRequired,
// --- End MODIFIED ---
idPrefix: PropTypes.string.isRequired, // Unique prefix for IDs/classes
defaultStepIndex: PropTypes.number, // Initial step index
onCardReadMore: PropTypes.func.isRequired, // Callback function for "Read More"
};

export default ProcessStepSlider;