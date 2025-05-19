// --- File: src/Components/ProcessStepCard.js ---
import React from 'react';
import PropTypes from 'prop-types';
// No separate CSS import here - styles are in HowItWorks.css

const ProcessStepCard = ({
step,
index,
totalSteps,
cardClassName, // Includes base + state (e.g., 'process-slide-card process-slide-card--active')
onClick, // For selecting the card in the slider (desktop primarily)
onOpenDetailModal, // Function to trigger the details modal
idPrefix, // Used for generating unique IDs if needed (currently used in title id)
}) => {
// Extract step number and title text from the title string (e.g., "1. Title Text")
const titleMatch = step.title.match(/^(\d+)\.\s*(.*)/);
const stepNumber = titleMatch ? titleMatch[1] : `${index + 1}`; // Fallback to index if format differs
const stepTitle = titleMatch ? titleMatch[2].trim() : step.title.trim(); // The actual title text

// Check if this card is the currently active one in the slider
const isActive = cardClassName.includes('--active');

// Calculate progress percentage for the bottom bar
const progressPercentage = totalSteps > 0 ? ((index + 1) / totalSteps) * 100 : 0;

// Handler for the "Read Full Details" button click
const handleReadMoreClick = (e) => {
e.stopPropagation(); // Prevent the card's onClick handler from firing
if (onOpenDetailModal) {
onOpenDetailModal(step); // Pass the full step object to the modal handler
}
};

return (
<div
className={cardClassName} // Apply combined class names from props
onClick={onClick} // Attach click handler for card selection
role="button" // Semantically a button (on desktop)
aria-label={`Step ${index + 1}: ${stepTitle}. ${isActive ? 'Currently selected.' : 'Click to select.'}`}
// Make non-active cards focusable, but disable active card focus via keyboard (handled by nav)
tabIndex={isActive ? -1 : 0}
// Consider adding onKeyDown handler for keyboard navigation (e.g., Enter key)
>
{/* Main content area, allows vertical scrolling if content overflows */}
<div className="card-main-content">
<div className="card-header">
{/* Circular step number indicator */}
<span className="card-step-indicator">{stepNumber}</span>
{/* Card Title - ID used for aria-describedby on button */}
<h3 className="card-title" id={`step-title-${step.id || idPrefix + index}`}>{stepTitle}</h3>
</div>

{/* --- ADDED: Lottie Animation --- */}
{/* Conditionally render Lottie player if lottieSrc is provided */}
{step.lottieSrc && (
<div className="card-lottie-animation">
<dotlottie-player
src={step.lottieSrc}
background="transparent"
speed="1"
/* Styles (width/height) are controlled via CSS */
loop
autoplay
aria-label={`${stepTitle} process illustration`} // Descriptive label
></dotlottie-player>
</div>
)}
{/* --- End ADDED Lottie --- */}


{/* Short descriptive text for the step */}
<p className="card-text">{step.text}</p>

{/* Button to open the detailed modal */}
<button
type="button"
className="card-read-more-button"
onClick={handleReadMoreClick}
aria-label={`Read more details about ${stepTitle}`}
// Link button description to the card title for screen readers
aria-describedby={`step-title-${step.id || idPrefix + index}`}
// Make button focusable only when the card is active (prevents tabbing through all buttons)
tabIndex={isActive ? 0 : -1}
>
Read Full Details
</button>
</div>

{/* Progress bar at the bottom of the card */}
<div className="card-progress-bar-wrapper">
{/* The filled portion of the progress bar */}
<div
className="card-progress-bar-fill"
style={{ width: `${progressPercentage}%` }}
role="progressbar" // Semantic role
aria-valuenow={index + 1}
aria-valuemin="1"
aria-valuemax={totalSteps}
aria-label={`Step ${index + 1} of ${totalSteps}`} // Accessible label
></div>
{/* Text overlay on the progress bar */}
<span className="card-progress-text">Step {index + 1} of {totalSteps}</span>
</div>
</div>
);
};

ProcessStepCard.propTypes = {
// --- MODIFIED: Added lottieSrc to step shape ---
step: PropTypes.shape({
id: PropTypes.string.isRequired,
title: PropTypes.string.isRequired,
text: PropTypes.string.isRequired,
detailedText: PropTypes.string,
lottieSrc: PropTypes.string, // Optional Lottie source URL
}).isRequired,
// --- End MODIFIED ---
index: PropTypes.number.isRequired, // Position in the steps array
totalSteps: PropTypes.number.isRequired, // Total number of steps
cardClassName: PropTypes.string.isRequired, // CSS class names for styling/state
onClick: PropTypes.func.isRequired, // Click handler for the card itself
onOpenDetailModal: PropTypes.func.isRequired, // Callback for "Read More" button
idPrefix: PropTypes.string.isRequired, // Prefix for generating unique IDs
};

export default ProcessStepCard;