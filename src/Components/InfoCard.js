// src/components/InfoCard.js
import React from 'react';
import './InfoCard.css';

// Simple presentational component for displaying an info card
const InfoCard = ({ title, description, icon }) => {
  return (
    <div className="info-card">
      {icon && <div className="info-card-icon">{icon}</div>} {/* Conditionally render icon */}
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-description">{description}</p>
    </div>
  );
};

export default InfoCard;