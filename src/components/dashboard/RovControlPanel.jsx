import React from 'react';
import { Camera, Radio, Eye, Flame, Compass, Crosshair, Sparkles } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function RovControlPanel({ isRovMode, setIsRovMode, rovFilter, setRovFilter }) {
  const filters = [
    { id: 'optical', label: 'Optical HD', icon: Eye, desc: 'Natural Water Optics' },
    { id: 'sonar', label: 'Sonar Radar', icon: Radio, desc: 'Acoustic Mapping' },
    { id: 'thermal', label: 'Thermal IR', icon: Flame, desc: 'Hydrothermal Heat' },
    { id: 'biolum', label: 'Biolum Night', icon: Sparkles, desc: 'Phosphor Detection' },
  ];

  return (
    <div className="absolute right-6 top-28 z-30 w-96 glass-panel p-5 space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
        <div className="flex items-center gap-2.5">
          <Camera className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Subsea Telemetry</span>
            <h3 className="text-sm font-bold text-white font-display">ROV Nereus-9 Live Stream</h3>
          </div>
        </div>

        <button
          onClick={() => {
            oceanAudio.playSonarPing();
            setIsRovMode(!isRovMode);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-300 border ${
            isRovMode
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.5)]'
              : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:border-cyan-400'
          }`}
        >
          {isRovMode ? 'DISENGAGE ROV' : 'ENGAGE ROV FEED'}
        </button>
      </div>

      {/* ROV Vision Mode Selectors */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Optical Lens Spectrum:</span>
          <span className="text-cyan-300 uppercase font-bold">{rovFilter}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = rovFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  oceanAudio.playBubblePop();
                  setRovFilter(f.id);
                  if (!isRovMode) setIsRovMode(true);
                }}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                    : 'bg-ocean-navy/60 border-slate-800 text-slate-400 hover:border-cyan-500/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-semibold">{f.label}</div>
                  <div className="text-[9px] text-slate-400">{f.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ROV Status Metrics */}
      <div className="bg-ocean-navy/80 p-3.5 rounded-xl border border-cyan-500/20 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div>
          <div className="text-[10px] text-slate-400">DEPTH</div>
          <div className="text-cyan-300 font-bold mt-0.5">342.8m</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">BATTERY</div>
          <div className="text-emerald-400 font-bold mt-0.5">92%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">PITCH/ROLL</div>
          <div className="text-purple-300 font-bold mt-0.5">+1.2° / -0.4°</div>
        </div>
      </div>
    </div>
  );
}
