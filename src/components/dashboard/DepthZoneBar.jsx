import React, { useState } from 'react';
import { Sun, Moon, Skull, ArrowDown, ChevronDown, Layers } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function DepthZoneBar({ currentZone, setCurrentZone }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const activeZoneObj = zones.find(z => z.id === currentZone) || zones[0];

  const handleZoneSelect = (zoneId) => {
    oceanAudio.playDepthTransitionSFX();
    setCurrentZone(zoneId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-20 left-6 z-40">
      {/* Collapsible Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-xs font-mono font-semibold"
      >
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline text-slate-400">DEPTH:</span>
        <span className="text-white font-bold">{activeZoneObj.title.split(' ')[0]}</span>
        <span className="text-[10px] text-cyan-400/80">({activeZoneObj.range})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <>
          {/* Backdrop click dismiss */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute left-0 top-full mt-2 z-20 flex flex-col gap-3 glass-panel p-4 w-64 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
                <ArrowDown className="w-3.5 h-3.5" /> Select Depth Column
              </span>
              <span className="text-[10px] font-mono text-slate-400">SONAR RIG A</span>
            </div>

            <div className="flex flex-col gap-2">
              {zones.map((zone) => {
                const Icon = zone.icon;
                const isActive = currentZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleZoneSelect(zone.id)}
                    className={`group relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 border text-left ${
                      isActive
                        ? `bg-gradient-to-r ${zone.color} bg-opacity-30 ${zone.borderColor} shadow-[0_0_15px_rgba(0,243,255,0.25)]`
                        : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30 hover:bg-cyan-950/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-ocean-abyss/80' : 'bg-slate-900/80'}`}>
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
        </>
      )}
    </div>
  );
}
