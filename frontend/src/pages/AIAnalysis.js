// src/pages/AIAnalysis.js
import React, { useState, useEffect } from 'react';
import AnalysisPanel from '../components/AnalysisPanel';
import ExoplanetCard from '../components/ExoplanetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { exoplanets } from '../data/exoplanets';
import '../styles/components.css';

const AIAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Simulate AI analysis loading
    const timer = setTimeout(() => {
      setLoading(false);
      setAnalysisData({
        confidence: 94.7,
        habitableProbability: 67.3,
        similarPlanets: 12,
        analysisTime: '2.4 seconds'
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          AI Exoplanet Analysis
        </h1>
        <p style={{ 
          color: '#b0b0b0', 
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Advanced machine learning algorithms analyze planetary data to identify 
          habitable zones, atmospheric compositions, and potential biosignatures 
          in distant worlds.
        </p>
      </div>

      <AnalysisPanel />

      <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2rem',
          color: '#667eea'
        }}>
          Analyzed Exoplanets
        </h2>
        <div className="exoplanet-grid">
          {exoplanets.slice(0, 4).map((exoplanet, index) => (
            <ExoplanetCard key={index} exoplanet={exoplanet} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIAnalysis;