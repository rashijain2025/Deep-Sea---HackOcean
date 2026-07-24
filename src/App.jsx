import React, { useState } from 'react';
import { OceanCanvas } from './components/ocean/OceanCanvas';
import { HeaderNav } from './components/dashboard/HeaderNav';
import { DepthZoneBar } from './components/dashboard/DepthZoneBar';
import { SpeciesTrackerPanel } from './components/dashboard/SpeciesTrackerPanel';
import { WaterTelemetryPanel } from './components/dashboard/WaterTelemetryPanel';
import { RovControlPanel } from './components/dashboard/RovControlPanel';
import { ThreatAlertsPanel } from './components/dashboard/ThreatAlertsPanel';
import { NeptuneAiModal } from './components/dashboard/NeptuneAiModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, species, telemetry, rov
  const [currentZone, setCurrentZone] = useState('Sunlit Zone'); // Sunlit Zone, Twilight Zone, Abyssal Zone
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isRovMode, setIsRovMode] = useState(false);
  const [rovFilter, setRovFilter] = useState('optical'); // optical, sonar, thermal, biolum
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Active AI Threats Mock List
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      code: 'ALT-904',
      title: 'Illegal Commercial Trawling Activity',
      sector: 'Protected Marine Zone B4',
      time: '12 mins ago',
      description: 'Acoustic array hydrophones registered high-decibel engine harmonics (2.4 kHz) matching unregistered commercial trawling vessels inside marine sanctuary boundaries.'
    },
    {
      id: 'alert-2',
      code: 'ALT-712',
      title: 'Thermal Plume Anomaly',
      sector: 'Hydrothermal Vent Node 3',
      time: '34 mins ago',
      description: 'Subsea thermal sensor registered localized spike (+3.8°C) near coral barrier reef edge. Micro-sensor dispatch recommended.'
    }
  ]);

  const handleResolveAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  return (
    <main className="relative w-screen h-screen bg-ocean-abyss overflow-hidden font-sans select-none">
      {/* HUD Background Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none z-10" />
      <div className="absolute inset-0 vignette-overlay z-10" />

      {/* 3D WebGL Underwater Scene */}
      <div className="absolute inset-0 z-0">
        <OceanCanvas
          currentZone={currentZone}
          selectedCreature={selectedCreature}
          onSelectCreature={(creature) => {
            setSelectedCreature(creature);
            setActiveTab('species');
          }}
          isRovMode={isRovMode}
          rovFilter={rovFilter}
        />
      </div>

      {/* Header Navigation Bar */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        activeAlertsCount={alerts.length}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Vertical Depth Zone Navigator */}
      <DepthZoneBar
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
      />

      {/* Tab Panels */}
      {activeTab === 'species' && (
        <SpeciesTrackerPanel
          selectedCreature={selectedCreature || {
            name: 'Honu Sea Turtle (Chelonia mydas)',
            id: 'turtle-01',
            type: 'turtle',
            depth: '42m',
            temp: '22.4°C',
            health: '98% (Optimal)',
            velocity: '1.8 knots'
          }}
          onDeselectCreature={() => setSelectedCreature(null)}
        />
      )}

      {activeTab === 'telemetry' && (
        <WaterTelemetryPanel />
      )}

      {activeTab === 'rov' && (
        <RovControlPanel
          isRovMode={isRovMode}
          setIsRovMode={setIsRovMode}
          rovFilter={rovFilter}
          setRovFilter={setRovFilter}
        />
      )}

      {/* Threat Alert Ticker & Resolution Modal */}
      <ThreatAlertsPanel
        alerts={alerts}
        onResolveAlert={handleResolveAlert}
      />

      {/* Neptune AI Intelligence Modal */}
      <NeptuneAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Ambient Quick Info Pill at Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center gap-4 glass-pill px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 border-cyan-500/30">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          SYSTEM 60 FPS
        </span>
        <span className="text-slate-600">|</span>
        <span>ZONE: {currentZone.toUpperCase()}</span>
        <span className="text-slate-600">|</span>
        <span>ACOUSTICS: {isAudioOn ? 'ACTIVE' : 'MUTED'}</span>
      </div>
    </main>
  );
}
