// --- File: src/Components/ProcessStepCard.js ---
import React from 'react';
import PropTypes from 'prop-types';
// No CSS import here - styles are expected in parent's CSS (e.g., HowItWorks.css)

const ProcessStepCard = ({
  step,
  index,
  totalSteps,
  cardClassName,
  onClick, // For selecting the card in the slider
  onOpenDetailModal, // New prop to trigger modal
  idPrefix,
}) => {
  const titleMatch = step.title.match(/^(\d+)\.\s*(.*)/);
  const stepNumber = titleMatch ? titleMatch[1] : `${index + 1}`;
  const stepTitle = titleMatch ? titleMatch[2].trim() : step.title.trim();
  const isActive = cardClassName.includes('--active');
  const progressPercentage = totalSteps > 0 ? ((index + 1) / totalSteps) * 100 : 0;

  const handleReadMoreClick = (e) => {
    e.stopPropagation(); // Prevent card click if button is clicked
    if (onOpenDetailModal) {
      onOpenDetailModal(step); // Pass the whole step object to the modal handler
    }
  };

  return (
    <div
      className={`process-slide-card ${cardClassName}`}
      onClick={onClick}
      role="button"
      aria-label={`Step ${index + 1}: ${stepTitle}. ${isActive ? 'Currently selected.' : 'Click to select.'}`}
      tabIndex={isActive ? -1 : 0}
    >
      <div className="card-main-content"> {/* This container has overflow-y: auto */}
        <div className="card-header">
          <span className="card-step-indicator">{stepNumber}</span>
          {/* The .card-title class styling in HowItWorks.css handles text wrapping */}
          <h3 className="card-title" id={`step-title-${step.id}`}>{stepTitle}</h3>
        </div>
        <p className="card-text">{step.text}</p>
        <button
          type="button"
          className="card-read-more-button"
          onClick={handleReadMoreClick}
          aria-label={`Read more details about ${stepTitle}`}
          aria-describedby={`step-title-${step.id}`}
          tabIndex={isActive ? 0 : -1}
        >
          Read Full Details
        </button>
      </div>
      <div className="card-progress-bar-wrapper">
        <div
          className="card-progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin="1"
          aria-valuemax={totalSteps}
          aria-label={`Step ${index + 1} of ${totalSteps}`}
        ></div>
        <span className="card-progress-text">Step {index + 1} of {totalSteps}</span>
      </div>
    </div>
  );
};

ProcessStepCard.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    detailedText: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  cardClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpenDetailModal: PropTypes.func.isRequired,
  idPrefix: PropTypes.string.isRequired,
};

export default ProcessStepCard;