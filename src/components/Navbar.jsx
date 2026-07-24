import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Waves, Menu, X, ShieldCheck } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/map', label: 'Ocean Map' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/biodiversity', label: 'Biodiversity' },
  { path: '/detection', label: 'AI Detection' },
  { path: '/predictions', label: 'Predictions' },
  { path: '/reports', label: 'Reports' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="navbar" id="main-nav">
      <Link to="/" className="navbar-logo" onClick={() => setIsMobileOpen(false)}>
        <div className="navbar-logo-icon">
          <Waves size={20} color="#030712" strokeWidth={2.5} />
        </div>
        <div className="navbar-logo-text">
          <div className="flex items-center gap-1.5">
            <h1>DeepSea Guardian</h1>
            <span className="hidden sm:inline-flex px-1.5 py-0.2 text-[9px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded">
              ENTERPRISE
            </span>
          </div>
          <span>AI · OCEAN INTELLIGENCE PLATFORM</span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="navbar-links hidden xl:flex">
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

      {/* Right Telemetry Badge & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <div className="live-badge hidden sm:flex">
          <span className="live-dot" />
          <span>SYSTEM ONLINE</span>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-2xl flex flex-col gap-2 xl:hidden z-50">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
