import React from 'react';
import { Sun, Moon, Skull, ArrowDown } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function DepthZoneBar({ currentZone, setCurrentZone }) {
  const zones = [
    {
      id: 'Sunlit Zone',
      range: '0m - 200m',
      title: 'Epipelagic (Sunlit)',
      icon: Sun,
      color: 'from-cyan-400 to-blue-500',
      textColor: 'text-cyan-300',
      borderColor: 'border-cyan-400/50'
    },
    {
      id: 'Twilight Zone',
      range: '200m - 1,000m',
      title: 'Mesopelagic (Twilight)',
      icon: Moon,
      color: 'from-blue-600 to-indigo-800',
      textColor: 'text-indigo-300',
      borderColor: 'border-indigo-400/50'
    },
    {
      id: 'Abyssal Zone',
      range: '1,000m - 4,000m+',
      title: 'Bathypelagic (Abyss)',
      icon: Skull,
      color: 'from-purple-900 to-slate-950',
      textColor: 'text-purple-300',
      borderColor: 'border-purple-500/50'
    }
  ];

  const handleZoneSelect = (zoneId) => {
    oceanAudio.playDepthTransitionSFX();
    setCurrentZone(zoneId);
  };

  return (
    <div className="absolute left-6 top-28 z-30 flex flex-col gap-3 glass-panel p-4 w-60">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" /> Depth Column
        </span>
        <span className="text-[10px] font-mono text-slate-400">SONAR RIG A</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {zones.map((zone) => {
          const Icon = zone.icon;
          const isActive = currentZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => handleZoneSelect(zone.id)}
              className={`group relative flex items-center justify-between p-3 rounded-xl transition-all duration-300 border text-left ${
                isActive
                  ? `bg-gradient-to-r ${zone.color} bg-opacity-25 ${zone.borderColor} shadow-[0_0_20px_rgba(0,243,255,0.25)] scale-[1.02]`
                  : 'bg-ocean-navy/40 border-slate-800 hover:border-cyan-500/30 hover:bg-cyan-950/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-ocean-abyss/60' : 'bg-slate-900/60'}`}>
                  <Icon className={`w-4 h-4 ${isActive ? zone.textColor : 'text-slate-500 group-hover:text-slate-300'}`} />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {zone.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">{zone.range}</div>
                </div>
              </div>

              {isActive && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Depth Meter HUD */}
      <div className="mt-1 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Subsea Pressure:</span>
        <span className="text-cyan-300 font-bold">
          {currentZone === 'Sunlit Zone' ? '4.2 ATM' : currentZone === 'Twilight Zone' ? '38.5 ATM' : '245.0 ATM'}
        </span>
      </div>
    </div>
  );
}
