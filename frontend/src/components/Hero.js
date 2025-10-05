// src/components/Hero.js
import React, { useState, useRef } from 'react';
import '../styles/components.css';

const Hero = ({ onNavigate }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="hero">
      <div className="video-container">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="background-video"
          onLoadedData={handleVideoLoad}
          onLoadStart={handleVideoLoad}
        >
          <source src="/space.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        
        {/* Loading Spinner */}
        {!videoLoaded && (
          <div className="video-loading">
            <div className="spinner"></div>
            <p>Loading cosmic experience...</p>
          </div>
        )}
      </div>
      
      <div className={`hero-content ${videoLoaded ? 'fade-in-up' : ''}`}>
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

      {videoLoaded && (
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      )}
    </section>
  );
};

export default Hero;