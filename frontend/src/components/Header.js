// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">NASA Exoplanet Explorer</div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/ai-analysis" 
              className={location.pathname === '/ai-analysis' ? 'active' : ''}
            >
              AI Analysis
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;