import React from 'react';
import { Target, Heart, Gauge, Thermometer, ShieldCheck, Zap, X, ChevronRight } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function SpeciesTrackerPanel({ selectedCreature, onDeselectCreature }) {
  if (!selectedCreature) return null;

  return (
    <div className="absolute right-6 top-28 z-40 w-96 glass-panel p-5 animate-float shadow-[0_0_35px_rgba(0,243,255,0.25)] border-cyan-400/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
            <Target className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">AI Species Telemetry</span>
            <h3 className="text-sm font-bold text-white font-display leading-tight">{selectedCreature.name}</h3>
          </div>
        </div>

        <button 
          onClick={() => {
            oceanAudio.playBubblePop();
            onDeselectCreature();
          }} 
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Wireframe Lock Metadata */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-ocean-navy/60 p-3 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Health Index
          </div>
          <div className="text-sm font-bold font-mono text-emerald-300">{selectedCreature.health}</div>
        </div>

        <div className="bg-ocean-navy/60 p-3 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Velocity
          </div>
          <div className="text-sm font-bold font-mono text-cyan-300">{selectedCreature.velocity}</div>
        </div>

        <div className="bg-ocean-navy/60 p-3 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-purple-400" /> Telemetry Depth
          </div>
          <div className="text-sm font-bold font-mono text-purple-300">{selectedCreature.depth}</div>
        </div>

        <div className="bg-ocean-navy/60 p-3 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Water Temp
          </div>
          <div className="text-sm font-bold font-mono text-amber-300">{selectedCreature.temp}</div>
        </div>
      </div>

      {/* AI Behavioral Diagnostic */}
      <div className="bg-cyan-950/40 p-3.5 rounded-xl border border-cyan-500/30 text-xs mb-4 space-y-1.5">
        <div className="font-semibold text-cyan-300 flex items-center justify-between">
          <span>Neural Model Prediction:</span>
          <span className="text-[10px] font-mono text-emerald-400">99.4% Match</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          Standard migratory trajectory detected. Heartbeat acoustics indicate low stress levels. No illegal sonar disturbance nearby.
        </p>
      </div>

      {/* Action CTA */}
      <button 
        onClick={() => {
          oceanAudio.playSonarPing();
          alert(`Tracking locked on ${selectedCreature.name}. Subsea acoustic tag transmitting at 433 MHz.`);
        }}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300"
      >
        <span>Lock Acoustic Radar Tracking</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
