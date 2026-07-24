import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, AlertTriangle, Fish, Droplets, Anchor, CheckCircle2, ShieldAlert, Cpu, Filter } from 'lucide-react';

import detectionsData from '../mock-data/detections.json';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Droplets': return <Droplets size={28} className="text-cyan-400" />;
    case 'AlertTriangle': return <AlertTriangle size={28} className="text-red-400" />;
    case 'Fish': return <Fish size={28} className="text-emerald-400" />;
    case 'Anchor': return <Anchor size={28} className="text-amber-400" />;
    case 'Eye': return <Eye size={28} className="text-amber-400" />;
    default: return <Camera size={28} className="text-cyan-400" />;
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Detection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [verifiedIds, setVerifiedIds] = useState([]);

  const filteredDetections = detectionsData.filter(d => {
    return activeCategory === 'All' || d.category === activeCategory;
  });

  const handleVerify = (id) => {
    if (!verifiedIds.includes(id)) {
      setVerifiedIds([...verifiedIds, id]);
    }
  };

  return (
    <div className="page-content" id="detection-page">
      <div className="page-header">
        <div className="label">Neural Vision Neural Net</div>
        <h1>AI Detection Reports</h1>
        <p>Real-time autonomous camera telemetry analysis, incident classifications, and confidence diagnostics.</p>
      </div>

      {/* Category Filter Bar */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-cyan-400" />
              FILTER DETECTION TYPE:
            </span>
            {['All', 'Plastic', 'Oil Spill', 'Coral', 'Ghost Nets', 'Species'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <Cpu size={14} className="animate-pulse" />
            MODEL: YOLO-OCEAN-v4 (98.2% ACCURACY)
          </div>
        </div>
      </div>

      {/* AI Inspection Reports Grid */}
      <motion.div
        className="grid-2 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {filteredDetections.map((d, i) => {
          const isVerified = verifiedIds.includes(d.id);
          return (
            <motion.div key={d.id} className="saas-card p-5" variants={fadeUp} custom={i}>
              {/* Report Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Camera size={13} className="text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-cyan-300">{d.camera}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-xs text-slate-400">{d.timestamp}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-display">{d.type}</h3>
                </div>

                <span className={`saas-badge saas-badge-${d.riskLevel === 'critical' ? 'critical' : d.riskLevel === 'high' || d.riskLevel === 'medium' ? 'warning' : 'success'}`}>
                  {d.riskLevel.toUpperCase()} RISK
                </span>
              </div>

              {/* Subsea Viewport Display */}
              <div className="detection-body relative mb-4">
                {getCategoryIcon(d.icon)}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/80 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  BOUNDING BOX // {d.category.toUpperCase()}
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  CONFIDENCE: {d.confidence}%
                </div>
              </div>

              {/* Location & Summary */}
              <div className="text-xs text-slate-300 space-y-2 mb-4">
                <div className="text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {d.location}
                </div>
                <p className="leading-relaxed text-slate-400">{d.summary}</p>
              </div>

              {/* Confidence Gauge Bar & Verification Action */}
              <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>NEURAL CONFIDENCE</span>
                    <span className="text-cyan-400 font-bold">{d.confidence}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${d.confidence}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleVerify(d.id)}
                  disabled={isVerified}
                  className={`saas-button-${isVerified ? 'secondary' : 'primary'} text-xs`}
                >
                  {isVerified ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      Verified Log
                    </>
                  ) : (
                    'Verify & Log'
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
