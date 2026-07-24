import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function ThreatAlertsPanel({ alerts, onResolveAlert }) {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <>
      {/* Bottom Alert Ticker / Drawer */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between glass-panel px-6 py-3 border-red-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-400 tracking-wider uppercase">
                AI Threat Matrix
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono text-red-300 bg-red-950/90 rounded border border-red-500/40">
                {alerts.length} Active Anomalies
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
              {alerts.length > 0 ? alerts[0].title : 'All subsea sectors nominal.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {alerts.map((alert) => (
            <button
              key={alert.id}
              onClick={() => {
                oceanAudio.playBubblePop();
                setSelectedAlert(alert);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 hover:text-white hover:bg-red-900/80 transition-all text-xs font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span>{alert.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alert Resolution Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-abyss/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg glass-card-alert p-6 rounded-2xl border border-red-500/50 shadow-[0_0_50px_rgba(255,0,85,0.3)] animate-float">
            <button
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-900/80 border border-red-500/60 text-red-300">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-red-400 tracking-wider uppercase font-bold">
                  {selectedAlert.code} • SEVERITY HIGH
                </span>
                <h3 className="text-lg font-bold text-white font-display">{selectedAlert.title}</h3>
              </div>
            </div>

            <div className="bg-ocean-abyss/80 p-4 rounded-xl border border-red-500/30 text-xs text-slate-300 space-y-2 mb-5">
              <div className="flex justify-between font-mono text-slate-400 border-b border-red-500/20 pb-1.5">
                <span>SECTOR: {selectedAlert.sector}</span>
                <span>TIMESTAMP: {selectedAlert.time}</span>
              </div>
              <p className="leading-relaxed text-slate-200">{selectedAlert.description}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80"
              >
                Dismiss Warning
              </button>

              <button
                onClick={() => {
                  oceanAudio.playSonarPing();
                  onResolveAlert(selectedAlert.id);
                  setSelectedAlert(null);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold font-mono shadow-[0_0_20px_rgba(255,0,85,0.4)]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Deploy Autonomous Countermeasure</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
