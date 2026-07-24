import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Send, Globe, Share2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="navbar-logo" style={{ marginBottom: 0 }}>
            <div className="navbar-logo-icon">
              <Waves size={22} color="#041C32" strokeWidth={2.5} />
            </div>
            <div className="navbar-logo-text">
              <h1>DeepSea Guardian</h1>
            </div>
          </div>
          <p>
            AI-powered ocean intelligence for governments, researchers and NGOs
            — monitoring pollution, biodiversity and reef health in real time
            across every ocean on Earth.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Telegram"><Send size={16} /></a>
            <a href="#" aria-label="Website"><Globe size={16} /></a>
            <a href="#" aria-label="Share"><Share2 size={16} /></a>
            <a href="#" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/map">Ocean Map</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/predictions">AI Predictions</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Ocean Mission</h3>
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Research Partners</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 DeepSea Guardian · Protecting oceans with AI</p>
        <div className="footer-status">
          <span className="status-dot" />
          All monitoring stations operational
        </div>
      </div>
    </footer>
  );
}
