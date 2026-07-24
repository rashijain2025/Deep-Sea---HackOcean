import React from 'react';
import { Droplets, Thermometer, Waves, TestTube, Activity, Sparkles, TrendingUp } from 'lucide-react';

export function WaterTelemetryPanel() {
  const metrics = [
    { label: 'Surface Temperature', value: '14.2 °C', status: '+0.2° (Seasonal)', icon: Thermometer, color: 'text-cyan-400', stroke: '#00f3ff' },
    { label: 'Acidity (pH Level)', value: '8.12 pH', status: 'Optimal Alkaline', icon: TestTube, color: 'text-emerald-400', stroke: '#00ff9d' },
    { label: 'Salinity Density', value: '35.1 PSU', status: 'Nominal', icon: Waves, color: 'text-blue-400', stroke: '#3b82f6' },
    { label: 'Microplastics Count', value: '0.04 mg/L', status: 'Low Risk', icon: Droplets, color: 'text-amber-400', stroke: '#f59e0b' },
  ];

  return (
    <div className="absolute right-6 top-28 z-30 w-96 glass-panel p-5 space-y-4">
      {/* Panel Title */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white font-display">Ocean Hydro-Analytics</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          LIVE SENSORS
        </span>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-ocean-navy/60 p-3 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-[9px] font-mono text-slate-400">{m.status}</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">{m.label}</div>
              <div className={`text-base font-bold font-mono ${m.color} mt-0.5`}>{m.value}</div>
              
              {/* Mini Sparkline SVG */}
              <div className="w-full h-6 mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25">
                  <path
                    d={`M 0 ${15 + Math.sin(idx) * 5} Q 25 ${5 + idx * 2}, 50 ${12 - idx}, 75 ${8 + idx}, 100 ${15 - idx}`}
                    fill="none"
                    stroke={m.stroke}
                    strokeWidth="2"
                    className="opacity-80"
                  />
                  <circle cx="100" cy={15 - idx} r="2.5" fill={m.stroke} className="animate-ping" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ocean Current Physics Energy */}
      <div className="bg-ocean-abyss/80 p-4 rounded-xl border border-cyan-500/30">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Kinetic Wave Energy
          </span>
          <span className="font-mono text-cyan-300">1.84 kW/m²</span>
        </div>
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full w-[72%] animate-pulse" />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1.5">
          <span>Tidal Stream: 2.4 kts</span>
          <span>Wave Height: 1.2m</span>
        </div>
      </div>
    </div>
  );
}
