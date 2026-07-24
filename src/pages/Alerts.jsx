import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Clock, Shield } from 'lucide-react';

const alerts = [
  {
    title: 'Plastic Waste Detected',
    location: 'Arabian Sea · 18.7°N 68.2°E',
    severity: 'high',
    detected: '2 min ago',
    action: 'Deploy cleanup drone to sector A-14',
  },
  {
    title: 'Coral Bleaching Warning',
    location: 'Lakshadweep Reef · 10.5°N 72.6°E',
    severity: 'medium',
    detected: '18 min ago',
    action: 'Continuous thermal monitoring',
  },
  {
    title: 'Oil Spill Alert',
    location: 'Gulf of Mexico · 25.1°N 90.2°W',
    severity: 'critical',
    detected: '42 min ago',
    action: 'Alert coast guard, mobilize containment',
  },
  {
    title: 'Illegal Fishing Activity',
    location: 'South Pacific · 12.4°S 165.9°W',
    severity: 'high',
    detected: '1 h ago',
    action: 'Notify marine patrol',
  },
  {
    title: 'Ghost Net Detected',
    location: 'North Sea · 56.2°N 3.1°E',
    severity: 'medium',
    detected: '3 h ago',
    action: 'Schedule retrieval mission',
  },
  {
    title: 'Algal Bloom Rising',
    location: 'Baltic Sea · 58.9°N 20.1°E',
    severity: 'low',
    detected: '5 h ago',
    action: 'Increase satellite sampling',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Alerts() {
  return (
    <div className="page-content" id="alerts-page">
      <div className="page-header">
        <div className="label">Ocean Watchtower</div>
        <h1>Live Alerts</h1>
        <p>AI-triaged incidents streamed from drones, satellites and citizen-science stations.</p>
      </div>

      <motion.div
        className="grid-2 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {alerts.map((a, i) => (
          <motion.div key={i} className="alert-card" variants={fadeUp} custom={i}>
            <div className="alert-card-header">
              <div className="alert-card-title">
                <div className="alert-icon">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3>{a.title}</h3>
                  <p><MapPin size={12} /> {a.location}</p>
                </div>
              </div>
              <span className={`badge ${a.severity}`}>
                {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)}
              </span>
            </div>
            <div className="alert-card-details">
              <div className="alert-detail">
                <div className="detail-label"><Clock size={11} /> Detected</div>
                <div className="detail-value">{a.detected}</div>
              </div>
              <div className="alert-detail">
                <div className="detail-label"><Shield size={11} /> Recommended</div>
                <div className="detail-value">{a.action}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
