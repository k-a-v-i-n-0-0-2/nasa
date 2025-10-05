// src/components/Hero.js
import React from 'react';
import spaceVideo from '../pages/space.mp4'; // Import the video
import '../styles/components.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero">
      <div className="video-container">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="background-video"
        >
          <source src={spaceVideo} type="video/mp4" /> {/* Use imported video */}
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content fade-in-up">
        <h1 className="hero-title">
          Discover New Worlds
          <br />
          Beyond Our Solar System
        </h1>
        <p className="hero-subtitle">
          Explore thousands of exoplanets discovered by NASA's space telescopes. 
          Using advanced AI analysis, we're uncovering the secrets of distant worlds 
          and searching for signs of life in the cosmos.
        </p>
        <button onClick={() => onNavigate('ai-analysis')} className="cta-button">
          Start AI Analysis
        </button>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;