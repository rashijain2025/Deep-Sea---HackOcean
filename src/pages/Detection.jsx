import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, AlertTriangle, Fish, Droplets, Anchor, CheckCircle2, ShieldAlert, Cpu, Filter } from 'lucide-react';
import { fadeUp } from '../constants/animations';

import detectionsData from '../mock-data/detections.json';

// Icon map lives outside the component — no re-creation on every render.
const ICON_MAP = {
  Droplets: <Droplets size={28} className="text-cyan-400" />,
  AlertTriangle: <AlertTriangle size={28} className="text-red-400" />,
  Fish: <Fish size={28} className="text-emerald-400" />,
  Anchor: <Anchor size={28} className="text-amber-400" />,
  Eye: <Eye size={28} className="text-amber-400" />,
};

const getCategoryIcon = (iconName) => ICON_MAP[iconName] ?? <Camera size={28} className="text-cyan-400" />;

const Detection = React.memo(function Detection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [verifiedIds, setVerifiedIds] = useState([]);

  const filteredDetections = useMemo(
    () => activeCategory === 'All' ? detectionsData : detectionsData.filter(d => d.category === activeCategory),
    [activeCategory]
  );

  const handleVerify = useCallback((id) => {
    setVerifiedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

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
        {filteredDetections.map((d) => {
          const isVerified = verifiedIds.includes(d.id);
          return (
            <div key={d.id} className="saas-card p-5 transition-all duration-200 hover:border-cyan-500/40">
              {/* Report Header */}
              <div className="flex flex-wrap justify-between items-start border-b border-slate-800 pb-3 mb-4 gap-3">
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

              {/* AI Detection Viewport with Real Image + Bounding Box */}
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-4 bg-slate-950/60 border border-slate-800/60">
                <img
                  src={d.imageUrl}
                  alt={d.type}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Bounding Box Overlay */}
                {d.bbox && (
                  <div
                    className="absolute border-2 border-cyan-400/70 rounded-sm pointer-events-none"
                    style={{
                      top: d.bbox.top,
                      left: d.bbox.left,
                      width: d.bbox.width,
                      height: d.bbox.height,
                      boxShadow: '0 0 8px rgba(0,243,255,0.3), inset 0 0 8px rgba(0,243,255,0.1)',
                    }}
                  >
                    {/* Corner Marks */}
                    <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                  </div>
                )}

                {/* HUD Top-Left: Category Tag */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/90 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm">
                  {d.bbox ? d.bbox.label : `DETECTION // ${d.category.toUpperCase()}`}
                </div>

                {/* HUD Top-Right: Camera ID */}
                <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-600/40 backdrop-blur-sm">
                  🔴 REC · {d.camera}
                </div>

                {/* HUD Bottom-Right: Confidence */}
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm">
                  CONFIDENCE: {d.confidence}%
                </div>

                {/* HUD Bottom-Left: Timestamp */}
                <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700/40 backdrop-blur-sm">
                  ⏱ {d.timestamp}
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
              <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex-1 min-w-[140px]">
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
            </div>
          );
        })}
      </motion.div>
    </div>
  );
});

export default Detection;

