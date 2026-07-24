import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/map', label: 'Ocean Map' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/biodiversity', label: 'Biodiversity' },
  { path: '/detection', label: 'AI Detection' },
  { path: '/predictions', label: 'Predictions' },
];

export default function Navbar() {
  return (
    <nav className="navbar" id="main-nav">
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">
          <Waves size={22} color="#041C32" strokeWidth={2.5} />
        </div>
        <div className="navbar-logo-text">
          <h1>DeepSea Guardian</h1>
          <span>AI · Ocean Intelligence</span>
        </div>
      </Link>

      <ul className="navbar-links">
        {navItems.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="live-badge">
        <span className="live-dot" />
        LIVE
      </div>
    </nav>
  );
}
