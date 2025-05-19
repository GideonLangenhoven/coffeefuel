// src/Components/AffiliationCard/AffiliationCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button'; // Adjust path if necessary
import './AffiliationCard.css';

const AffiliationCard = ({ partner, delay }) => { // Changed 'partnerData' to 'partner'. 'delay' is received but not used by default.
  const [isHovered, setIsHovered] = useState(false);

  // Defensive check for partner itself
  if (!partner) {
    console.error("AffiliationCard: partner prop is undefined. Rendering placeholder or null.");
    return (
      <div className="affiliation-card affiliation-card-error">
        <p>Error: Partner data unavailable.</p>
      </div>
    );
  }

  // Fallbacks for potentially missing properties
  const frontTitle = partner.name || "Unnamed Partner";
  const frontLogo = partner.logo || 'https://placehold.co/180x60/eee/ccc?text=No+Logo&fontsize=16';
  
  // partner.frontDescription is used here. Ensure your 'affiliationsData' in Homepage.js
  // provides this field if you want a short description on the front.
  // Currently, affiliationsData provides 'description' (for the back) but not 'frontDescription'.
  const frontShortDescription = partner.frontDescription; 

  const backTitle = partner.backTitle || frontTitle; // Default backTitle to frontTitle if not provided
  const backDetailedDescription = partner.description || "No detailed description available."; // This uses partner.description
  const buttonText = partner.buttonText || "Learn More";
  const buttonLink = partner.link || "#";
  const linkType = partner.linkType || "external"; // Default to external if not specified

  // Example of how you might use the 'delay' prop for staggered animations:
  // const cardStyle = {
  //   animationDelay: typeof delay === 'number' ? `${delay}s` : undefined,
  //   // Ensure you have a CSS animation that would use this,
  //   // for example, if the card itself has an entry animation.
  // };
  // Then apply it to the main div: <div style={cardStyle} ... >

  return (
    <div
      className={`affiliation-card ${isHovered ? 'is-flipped' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // style={cardStyle} // Uncomment and adapt if using 'delay' for animation
    >
      <div className="affiliation-flip-card-inner">
        {/* Front of the Card */}
        <div className="affiliation-flip-card-front">
          <div className="affiliation-logo-wrapper">
            <img
              src={frontLogo}
              alt={`${frontTitle} Logo`}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                e.target.src = 'https://placehold.co/180x60/eee/ccc?text=Logo+Error&fontsize=14';
              }}
            />
          </div>
          <h3>{frontTitle}</h3>
          {frontShortDescription && <p className="affiliation-front-description">{frontShortDescription}</p>}
        </div>

        {/* Back of the Card */}
        <div className="affiliation-flip-card-back">
          <div className="affiliation-back-text-content">
            <h4>{backTitle}</h4>
            <p>{backDetailedDescription}</p>
          </div>
          <div className="affiliation-button-wrapper">
            {linkType === 'internal' ? (
              <Link to={buttonLink}>
                <Button className="btn-solpower-primary">{buttonText}</Button>
              </Link>
            ) : (
              <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="button btn-solpower-primary">
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliationCard;