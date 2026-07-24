import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, MapPin, Eye, Filter, Heart, Waves } from 'lucide-react';

import speciesData from '../mock-data/species.json';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Biodiversity() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSpecies = speciesData.filter(s => {
    return filterStatus === 'all' || s.status === filterStatus;
  });

  return (
    <div className="page-content" id="biodiversity-page">
      <div className="page-header">
        <div className="label">Living Ocean Census</div>
        <h1>Biodiversity Atlas & Species Tracker</h1>
        <p>IUCN Red List compliance tracking, species population dynamics, and real-time health telemetry.</p>
      </div>

      {/* Filter Bar */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-cyan-400" />
              FILTER STATUS:
            </span>
            {[
              { id: 'all', label: 'All Species' },
              { id: 'endangered', label: 'Endangered' },
              { id: 'vulnerable', label: 'Vulnerable' },
              { id: 'threatened', label: 'Threatened' },
              { id: 'stable', label: 'Stable' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  filterStatus === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <Heart size={14} className="animate-pulse" />
            482 SPECIES MONITORED WORLDWIDE
          </div>
        </div>
      </div>

      {/* Species Profile Grid */}
      <motion.div
        className="grid-3 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {filteredSpecies.map((s, i) => (
          <motion.div key={s.id} className="saas-card p-5 flex flex-col justify-between" variants={fadeUp} custom={i}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{s.emoji}</span>
                <span className={`saas-badge saas-badge-${s.status === 'endangered' ? 'critical' : s.status === 'vulnerable' || s.status === 'threatened' ? 'warning' : 'success'}`}>
                  {s.statusLabel}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display mb-1">{s.name}</h3>
              <div className="text-xs font-mono text-cyan-400 flex items-center gap-1 mb-4">
                <MapPin size={12} />
                <span>{s.region}</span>
              </div>

              {/* Vitality Score Bar */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4">
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Species Health Index:</span>
                  <span className="font-mono text-cyan-400 font-bold">{s.health}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.health >= 85 ? 'bg-emerald-400' : s.health >= 70 ? 'bg-cyan-400' : 'bg-amber-400'}`}
                    style={{ width: `${s.health}%` }}
                  />
                </div>
              </div>

              {/* Metadata Details */}
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Estimated Population:</span>
                  <span className="font-mono font-bold text-slate-200">{s.population}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Habitat Region:</span>
                  <span className="text-slate-200">{s.habitat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sensor Acoustic Tag:</span>
                  <span className="font-mono text-cyan-300">{s.sensorTag}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Eye size={12} className="text-cyan-400" /> Observation:
              </span>
              <span className="text-slate-300">{s.recentObs}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
