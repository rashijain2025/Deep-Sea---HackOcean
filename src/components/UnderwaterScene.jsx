import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   UnderwaterScene — Route-Aware Per-Page Ecosystem Backgrounds
   
   Each page gets a unique, lightweight underwater environment:
   - Dashboard: Open ocean, whales, fish schools
   - Ocean Map: Deep trench, sonar, rock formations
   - AI Detection: Research sub, scanning lasers
   - Biodiversity: Vibrant coral reef, turtles, dolphins, jellyfish
   - Alerts: Polluted dark waters, plastic waste, ghost nets
   - Analytics: Command center, holographic charts
   - Predictions: Deep lab, prediction sphere
   - Reports: Research station, monitors
   
   Only the active page's ecosystem renders. Pure CSS/SVG/FM (60 FPS).
   ═══════════════════════════════════════════════════════════════════════════ */

// Map routes to ecosystem configs
const ECOSYSTEMS = {
  '/': {
    gradient: 'radial-gradient(ellipse at 50% -10%, #004e7c 0%, #002347 45%, #020b18 100%)',
    theme: 'surface',
  },
  '/dashboard': {
    gradient: 'radial-gradient(ellipse at 50% -10%, #004e7c 0%, #002347 45%, #020b18 100%)',
    theme: 'openOcean',
  },
  '/map': {
    gradient: 'radial-gradient(ellipse at 50% 20%, #001a33 0%, #010a17 50%, #000308 100%)',
    theme: 'deepTrench',
  },
  '/detection': {
    gradient: 'radial-gradient(ellipse at 40% 10%, #002b4d 0%, #011226 50%, #020810 100%)',
    theme: 'researchZone',
  },
  '/biodiversity': {
    gradient: 'radial-gradient(ellipse at 50% 0%, #005577 0%, #003355 40%, #011a2e 100%)',
    theme: 'coralReef',
  },
  '/alerts': {
    gradient: 'radial-gradient(ellipse at 50% 30%, #1a0a0a 0%, #0d0505 50%, #050202 100%)',
    theme: 'polluted',
  },
  '/analytics': {
    gradient: 'radial-gradient(ellipse at 50% 10%, #020c1a 0%, #030814 50%, #010610 100%)',
    theme: 'commandCenter',
  },
  '/predictions': {
    gradient: 'radial-gradient(ellipse at 50% 10%, #0a0520 0%, #060318 50%, #030210 100%)',
    theme: 'deepLab',
  },
  '/reports': {
    gradient: 'radial-gradient(ellipse at 50% 15%, #071520 0%, #040e18 50%, #020810 100%)',
    theme: 'researchStation',
  },
};

// Lightweight ambient particles (shared across themes)
const AMBIENT_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: (i * 12.5) + 5,
  y: (i * 10.5) + 8,
  size: 2 + (i % 3) * 1.5,
  duration: 8 + i * 1.5,
  delay: i * 0.6,
}));

// Bubble positions
const AMBIENT_BUBBLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: 10 + (i * 15) % 80,
  size: 3 + (i % 3) * 2,
  duration: 6 + i * 1.2,
  delay: i * 1.5,
}));

export default function UnderwaterScene({ currentPath = '/' }) {
  const eco = ECOSYSTEMS[currentPath] || ECOSYSTEMS['/'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      {/* ─── Deep Ocean Background Gradient ─── */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: eco.gradient }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ background: eco.gradient }}
      />

      {/* ─── Water Caustic Lighting ─── */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen overflow-hidden">
        <div className="caustics-layer-1" />
        <div className="caustics-layer-2" />
        <div className="god-rays-css">
          <div className="ray ray-1" />
          <div className="ray ray-2" />
          <div className="ray ray-3" />
          <div className="ray ray-4" />
        </div>
      </div>

      {/* ─── Ocean Current Streams ─── */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="current-stream stream-1" />
        <div className="current-stream stream-2" />
        <div className="current-stream stream-3" />
      </div>

      {/* ─── Ambient Floating Particles ─── */}
      <div className="absolute inset-0">
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 2 === 0 ? '#00ff9d' : '#00f3ff',
              boxShadow: `0 0 8px ${p.id % 2 === 0 ? '#00ff9d' : '#00f3ff'}`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(p.id) * 20, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ─── Ambient Rising Bubbles ─── */}
      <div className="absolute inset-0">
        {AMBIENT_BUBBLES.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full border border-cyan-400/30"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              backgroundColor: 'rgba(0,243,255,0.08)',
            }}
            animate={{
              y: ['100vh', '-10vh'],
              opacity: [0, 0.5, 0.3, 0],
              x: [0, Math.sin(b.id * 2) * 15, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: 'easeOut',
              delay: b.delay,
            }}
          />
        ))}
      </div>

      {/* ─── THEME-SPECIFIC LAYERS ─── */}

      {/* OPEN OCEAN — Dashboard: Whale + Fish Schools */}
      {eco.theme === 'openOcean' && <OpenOceanLayer />}

      {/* DEEP TRENCH — Map: Sonar, Rocks, Vents */}
      {eco.theme === 'deepTrench' && <DeepTrenchLayer />}

      {/* RESEARCH ZONE — AI Detection: Sub with arms */}
      {eco.theme === 'researchZone' && <ResearchZoneLayer />}

      {/* CORAL REEF — Biodiversity: Corals, Turtles, Jellyfish */}
      {eco.theme === 'coralReef' && <CoralReefLayer />}

      {/* POLLUTED — Alerts: Dark waters, plastic */}
      {eco.theme === 'polluted' && <PollutedLayer />}

      {/* COMMAND CENTER — Analytics: Holo charts */}
      {eco.theme === 'commandCenter' && <CommandCenterLayer />}

      {/* DEEP LAB — Predictions: AI sphere */}
      {eco.theme === 'deepLab' && <DeepLabLayer />}

      {/* RESEARCH STATION — Reports */}
      {eco.theme === 'researchStation' && <ResearchStationLayer />}

      {/* ─── AI Grid Overlay (all pages) ─── */}
      <div className="absolute inset-0 opacity-15">
        <div className="ai-grid-pattern" />
        <motion.div
          className="hud-sweep-line"
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THEME LAYERS — Lightweight SVG/CSS per-page ecosystems
   ═══════════════════════════════════════════════════════════════ */

function OpenOceanLayer() {
  return (
    <>
      {/* Whale silhouette */}
      <motion.div
        className="absolute top-[18%]"
        initial={{ x: '-25vw' }}
        animate={{ x: ['- 25vw', '115vw'], y: [0, -25, 15, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
      >
        <div className="opacity-30 blur-[1px] transform scale-x-[-1]">
          <svg width="240" height="80" viewBox="0 0 300 100" fill="none">
            <path
              d="M10,45 C40,25 90,15 150,22 C210,29 250,40 280,50 C290,53 298,58 295,62 C290,68 275,65 260,60 C240,55 210,65 170,72 C130,79 70,82 40,68 C25,60 10,52 10,45 Z"
              fill="url(#wGrad)"
            />
            <motion.g
              animate={{ rotate: [-4, 6, -4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '275px 52px' }}
            >
              <path d="M275,52 C285,38 298,30 300,34 C295,45 285,53 275,54 C285,58 296,65 298,72 C292,72 282,62 275,52 Z" fill="url(#wGrad)" />
            </motion.g>
            <defs>
              <linearGradient id="wGrad" x1="0" y1="0" x2="300" y2="0">
                <stop offset="0%" stopColor="#005580" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#001a33" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Fish school */}
      <motion.div
        className="absolute top-[55%]"
        initial={{ x: '-15vw' }}
        animate={{ x: '120vw', y: [0, -20, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <div className="flex gap-2 transform scale-x-[-1]">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i}
              width="20" height="8" viewBox="0 0 30 12" fill="#00e5ff"
              className="opacity-50"
              style={{ transform: `translate(${Math.sin(i) * 12}px, ${Math.cos(i) * 8}px)` }}
              animate={{ y: [0, -5, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            >
              <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
            </motion.svg>
          ))}
        </div>
      </motion.div>

      {/* Second fish school opposite direction */}
      <motion.div
        className="absolute top-[35%]"
        initial={{ x: '120vw' }}
        animate={{ x: '-15vw', y: [0, 15, -10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      >
        <div className="flex gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.svg
              key={i}
              width="18" height="7" viewBox="0 0 30 12" fill="#00ff9d"
              className="opacity-40"
              style={{ transform: `translate(${Math.cos(i) * 10}px, ${Math.sin(i) * 8}px)` }}
              animate={{ y: [0, 4, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
            </motion.svg>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function DeepTrenchLayer() {
  return (
    <>
      {/* Rock formations and ancient ruins at bottom */}
      <div className="absolute bottom-0 inset-x-0">
        <svg width="100%" height="250" viewBox="0 0 1440 250" preserveAspectRatio="none">
          {/* Ruins in background */}
          <path d="M150,250 L150,120 L200,120 L200,250 M350,250 L350,80 L420,80 L420,250 M850,250 L850,110 L900,110 L900,250 M1250,250 L1250,140 L1300,140 L1300,250" fill="#020d1c" opacity="0.7" />
          <path d="M120,100 L220,100 L175,50 Z M330,60 L450,60 L390,20 Z M830,90 L920,90 L875,40 Z" fill="#020d1c" opacity="0.5" />
          
          <path d="M0,250 L0,170 Q100,130 200,160 L280,120 Q350,150 420,140 L500,90 Q550,130 600,150 Q700,170 800,130 L900,100 Q1000,140 1100,160 L1200,120 Q1300,150 1440,180 L1440,250 Z" fill="#0a0f1a" stroke="#00f3ff" strokeWidth="0.5" opacity="0.6" />
          <path d="M0,250 L0,200 Q200,180 400,195 Q600,185 800,200 Q1000,190 1200,205 Q1350,198 1440,210 L1440,250 Z" fill="#050a12" />
        </svg>
      </div>

      {/* Hydrothermal vents */}
      <motion.div
        className="absolute bottom-[80px] left-[35%]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="eco-vent" />
      </motion.div>
      <motion.div
        className="absolute bottom-[90px] right-[25%]"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      >
        <div className="eco-vent" />
      </motion.div>

      {/* Sonar rings */}
      <div className="absolute bottom-[30%] left-[20%]">
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f3ff]" />
          <div className="absolute sonar-ring ring-1" />
          <div className="absolute sonar-ring ring-2" />
          <div className="absolute sonar-ring ring-3" />
        </div>
      </div>
    </>
  );
}

function ResearchZoneLayer() {
  return (
    <>
      {/* Research submarine with robotic arms */}
      <motion.div
        className="absolute top-[25%] left-[50%]"
        animate={{ x: [0, 30, -20, 0], y: [0, 15, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="filter drop-shadow-[0_0_12px_rgba(0,243,255,0.6)]">
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
            <rect x="25" y="15" width="50" height="20" rx="8" fill="#0f172a" stroke="#00f3ff" strokeWidth="1.5" />
            <circle cx="75" cy="25" r="6" fill="#00f3ff" className="animate-pulse" />
            {/* Robotic arm */}
            <motion.g
              animate={{ rotate: [-15, 25, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '35px 35px' }}
            >
              <line x1="35" y1="35" x2="15" y2="50" stroke="#00ff9d" strokeWidth="1.5" />
              <circle cx="15" cy="50" r="3" stroke="#00ff9d" strokeWidth="1" fill="none" />
            </motion.g>
            <line x1="50" y1="15" x2="50" y2="5" stroke="#00f3ff" strokeWidth="1.5" />
            <circle cx="50" cy="4" r="2" fill="#00ff9d" />
          </svg>
        </div>

        {/* Scanning laser beam */}
        <motion.div
          className="absolute top-[18px] left-[70px] w-[160px] h-[100px] origin-left"
          animate={{ rotate: [-20, 30, -20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/05 to-transparent clip-cone" />
        </motion.div>
      </motion.div>

      {/* AI hologram grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="eco-hologram-grid" />
      </div>
    </>
  );
}

function CoralReefLayer() {
  return (
    <>
      {/* Rich coral reef base */}
      <div className="absolute bottom-0 inset-x-0 h-[180px]">
        <svg width="100%" height="180" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,180 L0,120 Q200,90 450,125 Q700,150 950,115 Q1200,85 1440,130 L1440,180 Z" fill="#052a20" opacity="0.8" />
          <path d="M0,180 L0,145 Q300,120 650,150 Q1000,125 1440,155 L1440,180 Z" fill="#031a15" />
          {/* Coral branches */}
          <path d="M150,140 C140,110 130,95 125,70 C140,85 150,100 155,140 Z" fill="#ff6b9d" opacity="0.5" />
          <path d="M300,130 C315,100 330,85 335,60 C320,75 305,90 300,130 Z" fill="#00ff9d" opacity="0.5" />
          <path d="M500,135 C490,105 475,85 470,65 C485,80 500,95 505,135 Z" fill="#ff9d00" opacity="0.4" />
          <path d="M700,125 C715,90 735,75 740,50 C725,70 710,85 700,125 Z" fill="#7000ff" opacity="0.5" />
          <path d="M900,130 C890,100 880,85 875,60 C890,75 900,95 905,130 Z" fill="#00f3ff" opacity="0.45" />
          <path d="M1100,135 C1115,100 1130,80 1135,55 C1120,70 1105,90 1100,135 Z" fill="#ff6b9d" opacity="0.4" />
          <path d="M1300,128 C1290,95 1275,80 1270,55 C1285,75 1300,90 1305,128 Z" fill="#00ff9d" opacity="0.5" />
          {/* Anemone tips */}
          <circle cx="125" cy="70" r="4" fill="#ff6b9d" opacity="0.8" />
          <circle cx="335" cy="60" r="4" fill="#00ff9d" opacity="0.8" />
          <circle cx="740" cy="50" r="5" fill="#00f3ff" opacity="0.9" />
          <circle cx="1135" cy="55" r="3" fill="#ff6b9d" opacity="0.7" />
        </svg>
      </div>

      {/* Sea turtle */}
      <motion.div
        className="absolute top-[35%] left-[-5vw]"
        animate={{ x: ['0vw', '110vw'], y: [0, -30, 15, -10, 0], rotate: [2, -3, 2] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="opacity-70 filter drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">
          <svg width="60" height="42" viewBox="0 0 100 70" fill="none">
            <ellipse cx="50" cy="35" rx="28" ry="18" fill="#0b4f3b" stroke="#00ff9d" strokeWidth="1" />
            <ellipse cx="82" cy="35" rx="9" ry="6" fill="#147355" />
            <motion.g
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '62px 22px' }}
            >
              <path d="M62,22 C75,5 82,2 78,14 C72,22 62,24 62,22 Z" fill="#147355" />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      {/* Jellyfish */}
      <motion.div
        className="absolute top-[22%] right-[15%]"
        animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="filter drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          <svg width="50" height="70" viewBox="0 0 80 110" fill="none">
            <motion.path
              d="M10,40 C10,15 30,5 40,5 C50,5 70,15 70,40 C60,45 50,42 40,45 C30,42 20,45 10,40 Z"
              fill="rgba(0,243,255,0.15)"
              stroke="rgba(0,243,255,0.5)"
              strokeWidth="1.5"
              animate={{ scaleY: [1, 0.85, 1], scaleX: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="40" cy="25" r="7" fill="#00ff9d" opacity="0.6" className="blur-[1px]" />
            <motion.path d="M25,42 Q28,70 22,100" stroke="#00f3ff" strokeWidth="1" opacity="0.5" fill="none" animate={{ d: ["M25,42 Q30,70 22,100", "M25,42 Q20,70 28,100", "M25,42 Q30,70 22,100"] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.path d="M40,45 Q35,78 43,105" stroke="#00ff9d" strokeWidth="1" opacity="0.6" fill="none" animate={{ d: ["M40,45 Q43,78 37,105", "M40,45 Q35,78 45,105", "M40,45 Q43,78 37,105"] }} transition={{ duration: 3.3, repeat: Infinity }} />
            <motion.path d="M55,42 Q52,70 58,100" stroke="#00f3ff" strokeWidth="1" opacity="0.5" fill="none" animate={{ d: ["M55,42 Q50,70 60,100", "M55,42 Q60,70 52,100", "M55,42 Q50,70 60,100"] }} transition={{ duration: 2.8, repeat: Infinity }} />
          </svg>
        </div>
      </motion.div>

      {/* Dolphin silhouette */}
      <motion.div
        className="absolute top-[45%]"
        initial={{ x: '110vw' }}
        animate={{ x: '-15vw', y: [0, -25, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        <svg width="70" height="30" viewBox="0 0 100 40" fill="#005580" opacity="0.5">
          <path d="M5,20 C15,8 35,3 55,8 C75,13 90,18 95,22 C90,28 75,30 55,28 C35,26 15,30 5,20 Z" />
          <path d="M88,18 C92,12 98,10 95,15 Z" />
        </svg>
      </motion.div>
    </>
  );
}

function PollutedLayer() {
  return (
    <>
      {/* Dark pollution tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-red-950/20" />

      {/* Floating plastic waste */}
      <div className="absolute inset-0">
        {/* Water bottle */}
        <motion.div
          className="absolute top-[30%] left-[20%]"
          animate={{ y: [0, -15, 8, 0], rotate: [10, -15, 18, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="35" viewBox="0 0 20 35" fill="none" className="opacity-50">
            <rect x="5" y="2" width="10" height="4" rx="1" fill="#94a3b8" />
            <path d="M4,7 L16,7 L18,32 C18,34 16,35 14,35 L6,35 C4,35 2,34 2,32 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Plastic bag */}
        <motion.div
          className="absolute top-[50%] right-[25%]"
          animate={{ y: [0, 12, -8, 0], x: [0, -10, 10, 0], rotate: [-18, 12, -22, -18] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <svg width="30" height="35" viewBox="0 0 35 40" fill="none" className="opacity-45">
            <path d="M5,15 C5,10 10,5 12,5 C14,5 14,10 14,15 M21,15 C21,10 21,5 23,5 C25,5 30,10 30,15 L33,35 C33,38 30,40 26,40 L9,40 C5,40 2,38 2,35 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Ghost net fragments */}
        <motion.div
          className="absolute top-[65%] left-[55%]"
          animate={{ y: [0, -10, 10, 0], rotate: [3, -5, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <svg width="50" height="35" viewBox="0 0 50 35" fill="none" className="opacity-35">
            <path d="M0,0 L50,35 M10,0 L50,25 M20,0 L50,15 M0,10 L35,35 M0,20 L25,35" stroke="rgba(239,68,68,0.5)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </motion.div>
      </div>

      {/* Warning atmosphere pulse */}
      <motion.div
        className="absolute inset-0 border-2 border-red-500/0 rounded-none"
        animate={{ borderColor: ['rgba(239,68,68,0)', 'rgba(239,68,68,0.08)', 'rgba(239,68,68,0)'] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </>
  );
}

function CommandCenterLayer() {
  return (
    <>
      {/* Holographic floating chart outlines */}
      <div className="absolute inset-0 opacity-10">
        <div className="eco-hologram-grid" />
      </div>

      {/* Floating data streams */}
      <motion.div
        className="absolute top-[15%] left-[10%] opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <rect x="0" y="0" width="120" height="60" rx="4" stroke="#00f3ff" strokeWidth="0.5" fill="rgba(0,243,255,0.03)" />
          <polyline points="10,50 25,30 40,40 55,15 70,25 85,10 100,20 110,5" stroke="#00f3ff" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[8%] opacity-15"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
          <rect x="0" y="0" width="100" height="50" rx="4" stroke="#00ff9d" strokeWidth="0.5" fill="rgba(0,255,157,0.03)" />
          {/* Bar chart */}
          <rect x="10" y="30" width="8" height="15" fill="rgba(0,255,157,0.2)" />
          <rect x="22" y="20" width="8" height="25" fill="rgba(0,255,157,0.3)" />
          <rect x="34" y="25" width="8" height="20" fill="rgba(0,255,157,0.2)" />
          <rect x="46" y="15" width="8" height="30" fill="rgba(0,255,157,0.35)" />
          <rect x="58" y="22" width="8" height="23" fill="rgba(0,255,157,0.25)" />
          <rect x="70" y="10" width="8" height="35" fill="rgba(0,255,157,0.4)" />
          <rect x="82" y="18" width="8" height="27" fill="rgba(0,255,157,0.3)" />
        </svg>
      </motion.div>

      {/* Cyan data streams flowing */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <div className="current-stream" style={{ top: '20%', width: '60vw', animationDuration: '7s' }} />
        <div className="current-stream" style={{ top: '45%', width: '45vw', animationDuration: '9s', animationDelay: '2s' }} />
        <div className="current-stream" style={{ top: '70%', width: '55vw', animationDuration: '8s', animationDelay: '4s' }} />
      </div>
    </>
  );
}

function DeepLabLayer() {
  return (
    <>
      {/* AI prediction sphere */}
      <motion.div
        className="absolute top-[30%] left-[50%] transform -translate-x-1/2"
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full border border-purple-500/30 bg-purple-950/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-cyan-400/30 bg-cyan-950/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-cyan-400/20 shadow-[0_0_20px_rgba(0,243,255,0.4)] animate-pulse" />
            </div>
          </div>
          {/* Orbiting ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-dashed border-purple-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </>
  );
}

function ResearchStationLayer() {
  return (
    <>
      {/* Monitoring screens floating */}
      <motion.div
        className="absolute top-[20%] right-[12%] opacity-15"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
          <rect x="0" y="0" width="80" height="50" rx="3" stroke="#00f3ff" strokeWidth="0.5" fill="rgba(0,243,255,0.02)" />
          <line x1="5" y1="12" x2="75" y2="12" stroke="#00f3ff" strokeWidth="0.3" opacity="0.5" />
          <line x1="5" y1="22" x2="55" y2="22" stroke="#00f3ff" strokeWidth="0.3" opacity="0.3" />
          <line x1="5" y1="32" x2="65" y2="32" stroke="#00f3ff" strokeWidth="0.3" opacity="0.4" />
          <line x1="5" y1="42" x2="45" y2="42" stroke="#00f3ff" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[8%] opacity-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
      >
        <svg width="90" height="55" viewBox="0 0 90 55" fill="none">
          <rect x="0" y="0" width="90" height="55" rx="3" stroke="#00ff9d" strokeWidth="0.5" fill="rgba(0,255,157,0.02)" />
          <circle cx="45" cy="28" r="15" stroke="#00ff9d" strokeWidth="0.5" fill="none" />
          <circle cx="45" cy="28" r="8" stroke="#00ff9d" strokeWidth="0.3" fill="rgba(0,255,157,0.05)" />
        </svg>
      </motion.div>
    </>
  );
}
