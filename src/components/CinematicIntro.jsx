import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   CinematicIntro — Immersive AAA-style Underwater Dive Sequence
   
   Phase 0: Surface dive, god rays fade
   Phase 1: Deep ocean, ruins, coral, fish
   Phase 2: Submarine approaches
   Phase 3: Inside the Cockpit with AI Commander
   Phase 4: Doors open to Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

const BUBBLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 4.2) % 90}%`,
  size: 3 + (i % 4) * 2,
  delay: i * 0.1,
  duration: 1.5 + (i % 3) * 0.5,
}));

const FISH_SCHOOL = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  y: 35 + (i % 5) * 8,
  scale: 0.5 + (i % 3) * 0.2,
  delay: 0.5 + i * 0.05,
}));

const DEPTH_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${8 + (i * 7.5) % 85}%`,
  y: `${15 + (i * 6.8) % 70}%`,
  size: 2 + (i % 3),
  delay: i * 0.1,
}));

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cinematic Sequence Timeline
    const t1 = setTimeout(() => setPhase(1), 1500); // Dive deep, show ruins
    const t2 = setTimeout(() => setPhase(2), 2500); // Submarine appears
    const t3 = setTimeout(() => setPhase(3), 3500); // Inside Cockpit
    const t4 = setTimeout(() => setPhase(4), 5000); // Doors open
    const t5 = setTimeout(() => onComplete(), 5500); // Done

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          className="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Skip Button */}
          <button className="cinematic-skip-btn" onClick={() => { setPhase(5); onComplete(); }}>
            SKIP INTRO →
          </button>

          {/* Depth Indicator */}
          <div className="cinematic-depth-counter">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {phase === 0 && 'SURFACE — 0m'}
              {phase === 1 && 'ABYSSAL RUINS — 2400m'}
              {phase === 2 && 'INTERCEPTING NEPTUNE — 3100m'}
              {phase === 3 && 'COMMAND COCKPIT — 3150m'}
              {phase === 4 && 'DOCKING COMPLETE'}
            </motion.span>
          </div>

          {/* LAYER 1: Background Gradient */}
          <div
            className="cinematic-bg"
            style={{
              background: phase === 0
                ? 'linear-gradient(180deg, #0a4a7a 0%, #003355 40%, #001a33 100%)'
                : phase === 1
                ? 'linear-gradient(180deg, #002347 0%, #011226 50%, #030814 100%)'
                : 'linear-gradient(180deg, #010a17 0%, #030814 50%, #000 100%)',
              transition: 'background 1.5s ease-in-out',
            }}
          />

          {/* LAYER 1.5: Swirling Water Vortex (Phase 0) */}
          {phase === 0 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{ scale: [0.8, 1.5, 2.5], opacity: [0, 0.8, 0], rotate: 360 }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
            >
              <div className="w-[800px] h-[800px] rounded-full border-4 border-cyan-400/40 shadow-[0_0_80px_#00f3ff] border-dashed animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-emerald-400/40 shadow-[0_0_50px_#00ff9d] border-dotted animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            </motion.div>
          )}

          {/* LAYER 2: God Rays (only surface) */}
          <motion.div
            className="cinematic-god-rays"
            animate={{ opacity: phase === 0 ? 0.6 : 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="cinematic-ray cinematic-ray-1" />
            <div className="cinematic-ray cinematic-ray-2" />
            <div className="cinematic-ray cinematic-ray-3" />
            <div className="cinematic-ray cinematic-ray-4" />
            <div className="cinematic-ray cinematic-ray-5" />
          </motion.div>

          {/* LAYER 3: Ruins & Deep Marine Life (Phases 1-2) */}
          {phase >= 1 && phase < 3 && (
            <motion.div
              className="cinematic-ruins"
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <svg width="100%" height="250" viewBox="0 0 1440 250" preserveAspectRatio="none">
                {/* Ancient Ruins silhouette */}
                <path d="M100,250 L100,100 L150,100 L150,250 M300,250 L300,50 L380,50 L380,250 M800,250 L800,80 L860,80 L860,250 M1200,250 L1200,120 L1240,120 L1240,250" fill="#010a17" opacity="0.8" />
                <path d="M80,80 L170,80 L125,40 Z M280,30 L400,30 L340,0 Z M780,60 L880,60 L830,20 Z" fill="#010a17" opacity="0.6" />
                {/* Seabed */}
                <path d="M0,250 L0,180 Q300,140 600,190 T1440,160 L1440,250 Z" fill="#000" opacity="0.9" />
                {/* Glowing Plants */}
                <path d="M450,200 Q430,140 460,90 Q480,150 450,200 Z" fill="#00ff9d" opacity="0.4" />
                <path d="M950,180 Q970,120 940,60 Q920,130 950,180 Z" fill="#00f3ff" opacity="0.4" />
              </svg>
            </motion.div>
          )}

          {/* LAYER 4: Fish, Particles & Bubbles (Phases 0-2) */}
          {phase < 3 && (
            <>
              <div className="cinematic-bubbles">
                {BUBBLES.map((b) => (
                  <motion.div
                    key={b.id}
                    className="cinematic-bubble"
                    style={{ left: b.left, width: b.size, height: b.size }}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{ y: '-20vh', opacity: [0, 0.7, 0] }}
                    transition={{ duration: b.duration, delay: b.delay, ease: 'easeOut' }}
                  />
                ))}
              </div>
              <div className="cinematic-particles">
                {DEPTH_PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    className="cinematic-particle"
                    style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0], y: [0, -30, 0], x: [0, 15, -10] }}
                    transition={{ duration: 4, delay: p.delay, repeat: Infinity }}
                  />
                ))}
              </div>
              {phase >= 1 && (
                <div className="cinematic-fish-layer">
                  {FISH_SCHOOL.map((f) => (
                    <motion.div
                      key={f.id}
                      className="cinematic-fish"
                      style={{ top: `${f.y}%`, transform: `scale(${f.scale})` }}
                      initial={{ x: '-10vw', opacity: 0 }}
                      animate={{ x: '110vw', opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2.2, delay: f.delay, ease: 'easeInOut' }}
                    >
                      <svg width="28" height="12" viewBox="0 0 30 12" fill="#00f3ff" opacity="0.8">
                        <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* LAYER 5: Submarine Approaching (Phase 2) */}
          {phase === 2 && (
            <motion.div
              className="cinematic-submarine"
              initial={{ scale: 0.1, opacity: 0, x: '-50%', y: '20%' }}
              animate={{ scale: 4, opacity: 1, x: '0%', y: '0%' }}
              transition={{ duration: 1.2, ease: 'easeIn' }}
            >
              <svg width="180" height="80" viewBox="0 0 200 90" fill="none" className="cinematic-sub-glow">
                <ellipse cx="100" cy="45" rx="75" ry="28" fill="#0a1628" stroke="#00f3ff" strokeWidth="1.5" />
                <rect x="80" y="12" width="40" height="18" rx="6" fill="#0f1e36" stroke="#00f3ff" strokeWidth="1" />
                <circle cx="135" cy="45" r="8" fill="rgba(0,243,255,0.4)" stroke="#00f3ff" strokeWidth="2" />
                <path d="M70,73 L100,73 L85,85 Z" fill="#0a1628" stroke="#00f3ff" strokeWidth="1" />
              </svg>
            </motion.div>
          )}

          {/* LAYER 6: Inside Cockpit with AI Commander (Phase 3 & 4) */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="cinematic-cockpit-view"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Generated AI Commander Cockpit Image */}
                <div 
                  className="cinematic-cockpit-img" 
                  style={{ backgroundImage: "url('/ai_commander_cockpit.png')" }} 
                />
                
                {/* Moving Ocean Overlay outside window */}
                <motion.div 
                  className="cinematic-window-ocean"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />

                {/* Holographic Controls & HUD overlays */}
                <div className="cinematic-holo-grid glitch-overlay" />
                
                <motion.div
                  className="cinematic-center-text cockpit-hud"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="cinematic-status-line">
                    <span className="cinematic-status-dot" />
                    AI COMMANDER // NEPTUNE PRIME
                  </div>
                  <h2>Approaching DeepSea Command</h2>
                  <motion.div
                    className="cinematic-progress-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, delay: 0.8, ease: 'easeInOut' }}
                  />
                </motion.div>
                
                {/* HUD scanline */}
                <motion.div
                  className="cinematic-hud-sweep"
                  animate={{ y: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 7: Automatic Doors Opening (Phase 4) */}
          {phase === 4 && (
            <div className="cinematic-doors">
              <motion.div 
                className="cinematic-door door-left"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.div 
                className="cinematic-door door-right"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
