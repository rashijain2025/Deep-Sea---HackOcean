import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sparkles, Volume2, VolumeX, Sparkle, Loader2 } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnderwaterScene from './components/UnderwaterScene';
import PageTransition from './components/PageTransition';
import { DepthZoneBar } from './components/dashboard/DepthZoneBar';
import { NeptuneAiModal } from './components/dashboard/NeptuneAiModal';
import InteractiveCursor from './components/InteractiveCursor';
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
  const location = useLocation();

  const handleAudioToggle = () => {
    const isNowOn = oceanAudio.toggleSound();
    setIsAudioOn(isNowOn);
    if (isNowOn) oceanAudio.playBubblePop();
  };

  return (
    <main className="relative w-full h-screen bg-ocean-abyss overflow-hidden font-sans select-none flex flex-col">
      {/* ─── Persistent Background: Route-Aware Underwater Ecosystem ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <UnderwaterScene currentPath={location.pathname} />
        <InteractiveCursor />
      </div>

      {/* ─── Ambient HUD Grid & Vignette Overlays ─── */}
      <div className="absolute inset-0 hud-grid opacity-35 pointer-events-none z-1" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none z-1" />

      {/* ─── Global Top Navigation Bar with Integrated Action Controls ─── */}
      <Navbar
        onOpenAiModal={() => {
          oceanAudio.playBubblePop();
          setIsAiModalOpen(true);
        }}
        isAudioOn={isAudioOn}
        onToggleAudio={handleAudioToggle}
      />

      {/* ─── Vertical Depth Zone Navigator (Left Side) ─── */}
      <DepthZoneBar
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
      />

      {/* ─── Page Content Route Router Container with Transitions ─── */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pt-[76px] sm:pt-[84px] md:pt-[92px] lg:pt-[104px] px-2 sm:px-3 md:px-4 pb-24 lg:pb-8" style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}>
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
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
        </PageTransition>
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
