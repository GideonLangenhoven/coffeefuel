import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../GuidePointCard.css'; // Changed to use GuidePointCard.css

const ProblemPointCard = ({ icon: Icon, title, frontText, backTitle, backText, isFlipped, delay }) => {
  const { ref, inView: cardInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      // Use the same base class as GuidePointCard and common flip/animation classes
      className={`guide-point ${cardInView ? 'fade-in-up visible' : 'fade-in-up'} ${isFlipped ? 'is-flipped' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {/* Ensure Icon handling is consistent or style appropriately if different */}
          {Icon && <Icon />} {/* This could be a Lottie player or an SVG/image component */}
          <div className="card-text-content">
            <h3>{title}</h3>
            <p>{frontText}</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card-text-content">
            <h4>{backTitle}</h4>
            <p>{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPointCard;