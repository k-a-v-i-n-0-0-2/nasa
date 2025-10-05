// src/components/ExoplanetCard.js
import React from 'react';
import '../styles/components.css';

const ExoplanetCard = ({ exoplanet }) => {
  return (
    <div className="exoplanet-card fade-in-up">
      <h3 className="exoplanet-name">{exoplanet.name}</h3>
      <div className="exoplanet-info">
        <div className="info-item">
          <span className="info-label">Distance:</span>
          <span className="info-value">{exoplanet.distance} light years</span>
        </div>
        <div className="info-item">
          <span className="info-label">Mass:</span>
          <span className="info-value">{exoplanet.mass} Earths</span>
        </div>
        <div className="info-item">
          <span className="info-label">Radius:</span>
          <span className="info-value">{exoplanet.radius} Earths</span>
        </div>
        <div className="info-item">
          <span className="info-label">Orbital Period:</span>
          <span className="info-value">{exoplanet.orbitalPeriod} days</span>
        </div>
        <div className="info-item">
          <span className="info-label">Temperature:</span>
          <span className="info-value">{exoplanet.temperature} K</span>
        </div>
        <div className="info-item">
          <span className="info-label">Habitable:</span>
          <span className={exoplanet.habitable ? 'habitable' : 'not-habitable'}>
            {exoplanet.habitable ? 'Potentially Habitable' : 'Not Habitable'}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Discovery Year:</span>
          <span className="info-value">{exoplanet.discoveryYear}</span>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetCard;