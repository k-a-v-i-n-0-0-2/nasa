// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Video Background */}
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="background-video"
        >
          <source src="/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">
            <span className="nasa-text">NASA</span>
            <span className="exoplanet-text">Exoplanet Explorer</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/ai-analysis" className="nav-link">AI Analysis</Link>
            <Link to="/discoveries" className="nav-link">Discoveries</Link>
            <Link to="/missions" className="nav-link">Missions</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 NASA Official</span>
          </div>
          <h1 className="hero-title">
            Discover The
            <span className="highlight"> Universe</span>
          </h1>
          <p className="hero-subtitle">
            Exploring distant worlds, uncovering cosmic secrets, and searching for life beyond Earth 
            through NASA's cutting-edge space telescopes and AI-powered analysis.
          </p>
          <div className="hero-buttons">
            <Link to="/ai-analysis" className="cta-button primary">
              <span>Start AI Analysis</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/discoveries" className="cta-button secondary">
              View Discoveries
            </Link>
          </div>
        </div>

        {/* Floating Planets */}
        <div className="floating-elements">
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5,284+</div>
            <div className="stat-label">Confirmed Exoplanets</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4,001+</div>
            <div className="stat-label">Planetary Systems</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">189+</div>
            <div className="stat-label">Potentially Habitable</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">96.3%</div>
            <div className="stat-label">AI Accuracy</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">NASA's Exoplanet Discovery Tools</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔭</div>
              <h3>Space Telescopes</h3>
              <p>Hubble, Kepler, TESS, and James Webb Space Telescope working together to find new worlds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>Advanced machine learning algorithms analyze planetary data for habitable conditions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Habitable Zones</h3>
              <p>Identifying planets in the Goldilocks zone where liquid water could exist.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Data</h3>
              <p>Live data streams from NASA's deep space network and observatories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discoveries */}
      <section className="discoveries-section">
        <div className="container">
          <h2 className="section-title">Recent Discoveries</h2>
          <div className="discoveries-grid">
            <div className="discovery-card">
              <div className="discovery-image" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}></div>
              <div className="discovery-content">
                <h3>Kepler-186f</h3>
                <p>Earth-sized planet in habitable zone, 582 light years away</p>
                <span className="discovery-tag">Potentially Habitable</span>
              </div>
            </div>
            <div className="discovery-card">
              <div className="discovery-image" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}></div>
              <div className="discovery-content">
                <h3>TRAPPIST-1e</h3>
                <p>Rocky exoplanet in TRAPPIST-1 system, 39 light years away</p>
                <span className="discovery-tag">Earth-like</span>
              </div>
            </div>
            <div className="discovery-card">
              <div className="discovery-image" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}></div>
              <div className="discovery-content">
                <h3>Proxima Centauri b</h3>
                <p>Closest exoplanet to Earth, located 4.24 light years away</p>
                <span className="discovery-tag">Nearby Planet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="nasa-text">NASA</span>
                <span className="exoplanet-text">Exoplanet Explorer</span>
              </div>
              <p>Exploring the universe one planet at a time.</p>
            </div>
            <div className="footer-section">
              <h4>Explore</h4>
              <Link to="/">Home</Link>
              <Link to="/ai-analysis">AI Analysis</Link>
              <Link to="/discoveries">Discoveries</Link>
              <Link to="/missions">Missions</Link>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <a href="https://www.nasa.gov">NASA.gov</a>
              <a href="https://exoplanets.nasa.gov">Exoplanet Archive</a>
              <a href="https://jwst.nasa.gov">James Webb Telescope</a>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <a href="https://twitter.com/NASA">Twitter</a>
              <a href="https://facebook.com/NASA">Facebook</a>
              <a href="https://instagram.com/NASA">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NASA Exoplanet Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;