import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sparkles, Volume2, VolumeX, Sparkle, Loader2 } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { OceanEnvironment3D } from './components/ocean/OceanEnvironment3D';
import { DepthZoneBar } from './components/dashboard/DepthZoneBar';
import { NeptuneAiModal } from './components/dashboard/NeptuneAiModal';
import { oceanAudio } from './utils/oceanAudio';

// Pages
import Home from './pages/Home';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OceanMap = lazy(() => import('./pages/OceanMap'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Biodiversity = lazy(() => import('./pages/Biodiversity'));
const Detection = lazy(() => import('./pages/Detection'));
const Predictions = lazy(() => import('./pages/Predictions'));
const Reports = lazy(() => import('./pages/Reports'));

// Premium Loading Indicator
const PageLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-cyan-400">
    <Loader2 className="w-8 h-8 animate-spin mb-3 text-cyan-300" />
    <span className="text-xs font-mono tracking-widest text-slate-400">SYNCHRONIZING TELEMETRY NODE...</span>
  </div>
);

export default function App() {
  const [currentZone, setCurrentZone] = useState('Sunlit Zone'); // Sunlit Zone, Twilight Zone, Abyssal Zone
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleAudioToggle = () => {
    const isNowOn = oceanAudio.toggleSound();
    setIsAudioOn(isNowOn);
    if (isNowOn) oceanAudio.playBubblePop();
  };

  return (
    <main className="relative w-screen h-screen bg-ocean-abyss overflow-hidden font-sans select-none flex flex-col">
      {/* ─── Persistent Background 3D Environment ─── */}
      <div className="absolute inset-0 z-0">
        <OceanEnvironment3D currentZone={currentZone} />
      </div>

      {/* ─── Ambient HUD Grid & Vignette Overlays ─── */}
      <div className="absolute inset-0 hud-grid opacity-35 pointer-events-none z-1" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none z-1" />

      {/* ─── Global Top Navigation Bar ─── */}
      <Navbar />

      {/* ─── Global Floating Action Controls (Top Right) ─── */}
      <div className="fixed top-4 right-20 z-50 flex items-center gap-3">
        {/* Neptune AI Trigger Button */}
        <button
          onClick={() => {
            oceanAudio.playBubblePop();
            setIsAiModalOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/30 via-purple-600/35 to-cyan-500/20 border border-purple-400/40 text-purple-200 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(121,40,202,0.35)] text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Neptune AI</span>
        </button>

        {/* Hydrophone Audio Toggle Button */}
        <button
          onClick={handleAudioToggle}
          title={isAudioOn ? "Mute Underwater Acoustics" : "Enable Underwater Acoustics"}
          className={`p-2 rounded-xl border transition-all duration-300 ${
            isAudioOn 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ─── Vertical Depth Zone Navigator (Left Side) ─── */}
      <DepthZoneBar
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
      />

      {/* ─── Page Content Route Router Container ─── */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth" style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<OceanMap />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/biodiversity" element={<Biodiversity />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Suspense>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* ─── Global Neptune AI Assistant Modal ─── */}
      <NeptuneAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* ─── Persistent Bottom Right Telemetry Pill ─── */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-4 glass-pill px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 border-cyan-500/30">
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
