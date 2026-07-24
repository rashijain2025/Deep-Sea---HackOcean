import React from 'react';
import { Shield, Volume2, VolumeX, Eye, Activity, Cpu, Sparkles, AlertTriangle, Anchor } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function HeaderNav({ 
  activeTab, 
  setActiveTab, 
  isAudioOn, 
  setIsAudioOn, 
  activeAlertsCount,
  onOpenAiModal 
}) {
  const handleAudioToggle = () => {
    const isNowOn = oceanAudio.toggleSound();
    setIsAudioOn(isNowOn);
    if (isNowOn) oceanAudio.playBubblePop();
  };

  const navItems = [
    { id: 'overview', label: 'Ecosystem Monitor', icon: Eye },
    { id: 'species', label: 'AI Species Tracker', icon: Activity },
    { id: 'telemetry', label: 'Water Analytics', icon: Cpu },
    { id: 'rov', label: 'Subsea ROV Telemetry', icon: Anchor },
  ];

  return (
    <header className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between glass-panel px-6 py-3.5">
      {/* Brand & Platform Title */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-ocean-teal border border-cyan-400/40 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
          <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-ocean-abyss" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-wider text-white uppercase font-display">
              DeepSea <span className="text-cyan-400 text-glow-cyan">Guardian</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-md uppercase">
              AI v4.8
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Autonomous Oceanic Telemetry & Marine Life Protection Network
          </p>
        </div>
      </div>

      {/* Center Nav Tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-ocean-abyss/60 p-1.5 rounded-xl border border-cyan-500/20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                oceanAudio.playBubblePop();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-cyan-950/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Neptune AI Trigger Button */}
        <button
          onClick={() => {
            oceanAudio.playBubblePop();
            onOpenAiModal();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-cyan-500/20 border border-purple-400/40 text-purple-200 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(121,40,202,0.3)] text-xs font-semibold"
        >
          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Neptune AI Assistant</span>
        </button>

        {/* Threat Alert Counter */}
        {activeAlertsCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>{activeAlertsCount} ALERTS</span>
          </div>
        )}

        {/* Hydrophone Audio Toggle Button */}
        <button
          onClick={handleAudioToggle}
          title={isAudioOn ? "Mute Underwater Hydrophone" : "Enable Underwater Acoustics"}
          className={`p-2.5 rounded-xl border transition-all duration-300 ${
            isAudioOn 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
