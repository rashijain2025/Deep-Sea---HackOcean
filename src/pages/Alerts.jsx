import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Clock, ShieldAlert, CheckCircle, Radio, Filter, AlertCircle } from 'lucide-react';
import { fadeUp } from '../constants/animations';

import alertsData from '../mock-data/alerts.json';

const Alerts = React.memo(function Alerts() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [acknowledgedIds, setAcknowledgedIds] = useState([]);

  const filteredAlerts = useMemo(
    () => severityFilter === 'all' ? alertsData : alertsData.filter(a => a.severity === severityFilter),
    [severityFilter]
  );

  // Compute all severity counts in one pass instead of three separate filters.
  const { criticalCount, highCount, mediumCount } = useMemo(() => {
    return alertsData.reduce(
      (acc, a) => {
        if (a.severity === 'critical') acc.criticalCount++;
        else if (a.severity === 'high') acc.highCount++;
        else if (a.severity === 'medium') acc.mediumCount++;
        return acc;
      },
      { criticalCount: 0, highCount: 0, mediumCount: 0 }
    );
  }, []); // alertsData is static — no deps needed.

  const handleAcknowledge = useCallback((id) => {
    setAcknowledgedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  return (
    <div className="page-content" id="alerts-page">
      <div className="page-header">
        <div className="label">Live Incident Watchtower</div>
        <h1>Live Incident Alerts</h1>
        <p>Prioritized threat stream triaged from subsea hydrophones, drone fleets, and satellite telemetry.</p>
      </div>

      {/* Severity Summary Bar */}
      <div className="grid-3 section mb-6">
        <div className="saas-card p-4 flex items-center justify-between border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">CRITICAL INCIDENTS</div>
              <div className="text-xl font-bold font-display text-red-400">{criticalCount} Active</div>
            </div>
          </div>
        </div>

        <div className="saas-card p-4 flex items-center justify-between border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">HIGH SEVERITY ALERTS</div>
              <div className="text-xl font-bold font-display text-amber-400">{highCount} Active</div>
            </div>
          </div>
        </div>

        <div className="saas-card p-4 flex items-center justify-between border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
              <AlertCircle size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">MEDIUM MONITORING</div>
              <div className="text-xl font-bold font-display text-yellow-400">{mediumCount} Tracked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter size={14} className="text-cyan-400" />
            FILTER SEVERITY:
          </span>
          {[
            { id: 'all', label: 'All Incidents' },
            { id: 'critical', label: 'Critical Only' },
            { id: 'high', label: 'High Priority' },
            { id: 'medium', label: 'Medium Risk' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSeverityFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                severityFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid */}
      <motion.div
        className="grid-2 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {filteredAlerts.map((a) => {
          const isAck = acknowledgedIds.includes(a.id);
          return (
            <div 
              key={a.id} 
              className={`saas-card p-5 border-l-4 transition-all duration-200 hover:border-cyan-500/40 ${
                a.severity === 'critical' ? 'border-l-red-500' : a.severity === 'high' ? 'border-l-amber-500' : 'border-l-yellow-500'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${a.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">{a.title}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-mono">
                      <MapPin size={11} className="text-cyan-400" />
                      <span>{a.location}</span>
                    </div>
                  </div>
                </div>

                <span className={`saas-badge saas-badge-${a.severity === 'critical' ? 'critical' : a.severity === 'high' ? 'warning' : 'info'}`}>
                  {a.severity.toUpperCase()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 space-y-1 text-xs">
                <div className="text-slate-400 font-semibold flex items-center justify-between">
                  <span>RECOMMENDED ACTION DISPATCH:</span>
                  <span className="font-mono text-cyan-400 font-bold">{a.sector}</span>
                </div>
                <div className="text-slate-200">{a.action}</div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="font-mono flex items-center gap-1">
                  <Clock size={12} className="text-slate-500" /> Detected: {a.detected}
                </span>

                <button
                  onClick={() => handleAcknowledge(a.id)}
                  disabled={isAck}
                  className={`saas-button-${isAck ? 'secondary' : 'primary'} text-xs`}
                >
                  {isAck ? (
                    <>
                      <CheckCircle size={13} className="text-emerald-400" />
                      Acknowledged
                    </>
                  ) : (
                    <>
                      <Radio size={13} />
                      Acknowledge & Mobilize
                    </>
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

export default Alerts;
