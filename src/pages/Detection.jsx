import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, AlertTriangle, Fish, Droplets, Anchor } from 'lucide-react';

const detections = [
  {
    camera: 'UW-CAM-001',
    type: 'Plastic debris cluster',
    icon: <Droplets size={36} />,
    confidence: 94,
    status: 'Flagged',
    statusColor: '#FF9800',
    location: 'Arabian Sea · Depth 45m',
  },
  {
    camera: 'UW-CAM-002',
    type: 'Oil spill signature',
    icon: <AlertTriangle size={36} />,
    confidence: 97,
    status: 'Critical',
    statusColor: '#FF5252',
    location: 'Gulf of Mexico · Surface',
  },
  {
    camera: 'UW-CAM-003',
    type: 'Sea turtle detected',
    icon: <Fish size={36} />,
    confidence: 91,
    status: 'Logged',
    statusColor: '#00E676',
    location: 'Indo-Pacific · Depth 12m',
  },
  {
    camera: 'UW-CAM-004',
    type: 'Ghost net entanglement',
    icon: <Anchor size={36} />,
    confidence: 88,
    status: 'Flagged',
    statusColor: '#FF9800',
    location: 'North Sea · Depth 30m',
  },
  {
    camera: 'UW-CAM-005',
    type: 'Coral bleaching pattern',
    icon: <Eye size={36} />,
    confidence: 92,
    status: 'Monitoring',
    statusColor: '#FFD600',
    location: 'Great Barrier · Depth 8m',
  },
  {
    camera: 'UW-CAM-006',
    type: 'Dolphin pod identified',
    icon: <Fish size={36} />,
    confidence: 96,
    status: 'Logged',
    statusColor: '#00E676',
    location: 'Coastal Waters · Depth 15m',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Detection() {
  return (
    <div className="page-content" id="detection-page">
      <div className="page-header">
        <div className="label">Neural Vision</div>
        <h1>AI Detection Feed</h1>
        <p>Real-time camera analysis from underwater autonomous stations.</p>
      </div>

      <motion.div
        className="grid-3 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {detections.map((d, i) => (
          <motion.div key={d.camera} className="detection-card" variants={fadeUp} custom={i}>
            <div className="detection-header">
              <span className="detection-camera">
                <Camera size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
                {d.camera}
              </span>
              <span className="detection-status" style={{ color: d.statusColor }}>{d.status}</span>
            </div>

            <div className="detection-body">
              <span className="detection-icon" style={{ color: 'var(--cyan)' }}>{d.icon}</span>
            </div>

            <div className="detection-info">
              <h4>{d.type}</h4>
              <p>{d.location}</p>
            </div>

            <div className="detection-confidence">
              <span className="confidence-label">Confidence</span>
              <div className="confidence-bar">
                <div className="confidence-fill" style={{ width: `${d.confidence}%` }} />
              </div>
              <span className="confidence-value">{d.confidence}%</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
