// src/Components/InfoCard.js
import React from 'react';
import './InfoCard.css'; // Import CSS

// Card component for displaying key features/benefits
const InfoCard = ({ title, description, icon }) => {
  return (
    <div className="info-card">
      {/* Render icon if provided */}
      {icon && <div className="info-card-icon">{icon}</div>}
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-description">{description}</p>
    </div>
  );
};

export default InfoCard;