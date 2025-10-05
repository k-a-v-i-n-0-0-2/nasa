// src/components/AnalysisPanel.js
import React from 'react';
import '../styles/components.css';

const AnalysisPanel = () => {
  const stats = [
    { value: '5,284', label: 'Confirmed Exoplanets' },
    { value: '4,001', label: 'Planetary Systems' },
    { value: '189', label: 'Potentially Habitable' },
    { value: '96.3%', label: 'AI Accuracy Rate' }
  ];

  const features = [
    'Machine Learning Classification',
    'Atmospheric Composition Analysis',
    'Habitable Zone Detection',
    'Biosignature Identification',
    'Orbital Stability Prediction'
  ];

  return (
    <div className="analysis-panel fade-in-up">
      <h2 className="panel-title">AI Analysis Dashboard</h2>
      
      <div className="analysis-grid">
        {stats.map((stat, index) => (
          <div key={index} className="analysis-card">
            <div className="analysis-value">{stat.value}</div>
            <div className="analysis-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="analysis-features">
        <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>Analysis Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center'
            }}>
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="cta-button" style={{ marginRight: '1rem' }}>
          Run New Analysis
        </button>
        <button className="cta-button" style={{ 
          background: 'transparent', 
          border: '2px solid #667eea' 
        }}>
          Download Report
        </button>
      </div>
    </div>
  );
};

export default AnalysisPanel;