import React from 'react';
import './InfoCard.css';

const InfoCard = ({ title, description, icon }) => {
  return (
    <div className="info-card">
      <div className="info-card-icon">{icon}</div>
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-description">{description}</p>
    </div>
  );
};

export default InfoCard;
