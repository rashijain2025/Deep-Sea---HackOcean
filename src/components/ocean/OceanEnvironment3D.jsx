import React, { useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   OceanEnvironment3D — Full-screen 3D Cinematic Ocean Environment
   Optimized for 60 FPS using Hardware-Accelerated CSS Animations
   ═══════════════════════════════════════════════════════════════════════════ */

export const OceanEnvironment3D = React.memo(function OceanEnvironment3D({ currentZone = 'Sunlit Zone', isRovMode = false, rovFilter = 'optical' }) {
  // Lightweight bioluminescent particles
  const particles = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: (i * 18) + 10,
      y: (i * 15) + 20,
      size: (i % 3) * 2 + 3,
      duration: `${10 + i * 2}s`,
      delay: `${i * 0.5}s`,
      color: i % 2 === 0 ? '#00ff9d' : '#00f3ff'
    }));
  }, []);

  // Generate fish school elements
  const schoolFishUpper = useMemo(() => Array.from({ length: 4 }), []);
  const schoolFishLower = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-ocean-depth select-none perspective-container pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      {/* ─── LAYER 1: Deep Ocean Background & Depth Gradient ─── */}
      <div 
        className="absolute inset-0 transition-colors duration-1000 ease-in-out"
        style={{
          background: currentZone === 'Abyssal Zone'
            ? 'radial-gradient(ellipse at 50% 10%, #031326 0%, #010610 60%, #000308 100%)'
            : currentZone === 'Twilight Zone'
            ? 'radial-gradient(ellipse at 50% 0%, #002b4d 0%, #021226 50%, #010814 100%)'
            : 'radial-gradient(ellipse at 50% -10%, #004e7c 0%, #002347 45%, #020b18 100%)'
        }}
      />

      {/* ─── FEATURE 7: Water Caustic Lighting Effects ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
        <div className="caustics-layer-1" />
        <div className="caustics-layer-2" />
        <div className="god-rays-css">
          <div className="ray ray-1" />
          <div className="ray ray-2" />
          <div className="ray ray-3" />
        </div>
      </div>

      {/* ─── FEATURE 6: Ocean Current Flow Effects ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="current-stream stream-1" />
        <div className="current-stream stream-2" />
      </div>

      {/* ─── FEATURE 12: AI Scanning Grid Overlay ─── */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <div className="ai-grid-pattern" />
        <div className="hud-sweep-line anim-hud-sweep" />
        
        {/* Subtle AI HUD Corner Targets */}
        <div className="absolute top-16 left-12 font-mono text-[10px] text-cyan-400/60 tracking-wider">
          SYS.SCAN // 3D_OCEAN_ENV [ACTIVE]
        </div>
        <div className="absolute bottom-16 right-12 font-mono text-[10px] text-cyan-400/60 tracking-wider text-right">
          LAT 19°24'N | LON 155°15'W
        </div>
      </div>

      {/* ─── FEATURE 1: Swimming Whales in Far Background (Deep Z-Layer) ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 layer-far-background">
        <div className="absolute top-[20%] anim-whale">
          {/* Blue Whale SVG Silhouette (Flipped scale-x-[-1]) */}
          <div className="relative transform -rotate-3 scale-110 blur-[1px]">
            <div className="transform scale-x-[-1]">
              <svg width="280" height="90" viewBox="0 0 300 100" fill="none">
                <path 
                  d="M10,45 C40,25 90,15 150,22 C210,29 250,40 280,50 C290,53 298,58 295,62 C290,68 275,65 260,60 C240,55 210,65 170,72 C130,79 70,82 40,68 C25,60 10,52 10,45 Z" 
                  fill="url(#whaleGrad)"
                />
                {/* Whale Fluke Tail */}
                <g className="anim-whale-tail">
                  <path 
                    d="M275,52 C285,38 298,30 300,34 C295,45 285,53 275,54 C285,58 296,65 298,72 C292,72 282,62 275,52 Z"
                    fill="url(#whaleGrad)"
                  />
                </g>
                <defs>
                  <linearGradient id="whaleGrad" x1="0" y1="0" x2="300" y2="0">
                    <stop offset="0%" stopColor="#005580" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#003355" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#001a33" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute top-2 right-10 text-[9px] font-mono text-cyan-300/40 tracking-widest">
              Balaenoptera musculus // DEPTH: 140M
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE 2: Schools of Fish Crossing Occasionally ─── */}
      <div className="absolute inset-0 pointer-events-none z-1 layer-mid-background">
        {/* Upper School Swimming Left-to-Right */}
        <div className="absolute top-[32%] anim-school-1">
          <div className="relative flex gap-3 items-center transform scale-x-[-1]">
            {schoolFishUpper.map((_, i) => (
              <div
                key={`f1-${i}`}
                className="opacity-60 anim-fish"
                style={{
                  transform: `translate(${Math.sin(i) * 18}px, ${Math.cos(i) * 12}px) scale(${0.5 + (i % 3) * 0.15})`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <svg width="24" height="10" viewBox="0 0 30 12" fill="#00e5ff">
                  <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Lower School Swimming Right-to-Left */}
        <div className="absolute top-[58%] anim-school-2">
          <div className="relative flex gap-2.5 items-center">
            {schoolFishLower.map((_, i) => (
              <div
                key={`f2-${i}`}
                className="opacity-50 anim-fish"
                style={{
                  transform: `translate(${Math.cos(i) * 15}px, ${Math.sin(i) * 10}px) scale(${0.4 + (i % 3) * 0.15})`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                <svg width="20" height="8" viewBox="0 0 30 12" fill="#00ff9d">
                  <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FEATURE 3: Floating Sea Turtles ─── */}
      <div className="absolute inset-0 pointer-events-none z-2 layer-mid-ground">
        <div className="absolute top-[40%] anim-turtle">
          <div className="relative opacity-80 filter drop-shadow-[0_0_10px_rgba(0,255,157,0.2)]">
            <svg width="70" height="50" viewBox="0 0 100 70" fill="none">
              <ellipse cx="50" cy="35" rx="28" ry="18" fill="#0b4f3b" stroke="#00ff9d" strokeWidth="1" />
              <ellipse cx="82" cy="35" rx="9" ry="6" fill="#147355" />
              <g className="anim-flipper">
                <path d="M62,22 C75,5 82,2 78,14 C72,22 62,24 62,22 Z" fill="#147355" />
              </g>
              <path d="M28,26 C20,16 15,16 20,24 Z" fill="#147355" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── FEATURE 4: Soft Glowing Translucent Jellyfish ─── */}
      <div className="absolute inset-0 pointer-events-none z-3 layer-foreground">
        {/* Jelly 1 - Left Cyan */}
        <div className="absolute top-[25%] left-[18%] anim-jelly-1">
          <div className="relative filter drop-shadow-[0_0_12px_rgba(0,243,255,0.4)]">
            <svg width="65" height="95" viewBox="0 0 80 110" fill="none">
              <path 
                className="anim-jelly-body"
                d="M10,40 C10,15 30,5 40,5 C50,5 70,15 70,40 C60,45 50,42 40,45 C30,42 20,45 10,40 Z" 
                fill="rgba(0,243,255,0.18)"
                stroke="rgba(0,243,255,0.6)"
                strokeWidth="1.5"
              />
              <circle cx="40" cy="25" r="8" fill="#00ff9d" opacity="0.7" className="blur-[2px]" />
              {/* Static wavy tentacles to avoid heavy morphing SVG in CSS */}
              <path d="M20,42 Q22,70 18,100" stroke="#00f3ff" strokeWidth="1.2" opacity="0.6" fill="none" />
              <path d="M33,45 Q30,75 36,105" stroke="#00ff9d" strokeWidth="1.2" opacity="0.7" fill="none" />
              <path d="M47,45 Q50,75 44,105" stroke="#00f3ff" strokeWidth="1.2" opacity="0.7" fill="none" />
              <path d="M60,42 Q58,70 62,100" stroke="#00f3ff" strokeWidth="1.2" opacity="0.6" fill="none" />
            </svg>
          </div>
        </div>

        {/* Jelly 2 - Right Violet/Cyan */}
        <div className="absolute top-[48%] right-[22%] anim-jelly-2">
          <div className="relative filter drop-shadow-[0_0_12px_rgba(112,0,255,0.4)]">
            <svg width="75" height="110" viewBox="0 0 80 110" fill="none">
              <path 
                className="anim-jelly-body"
                d="M10,40 C10,15 30,5 40,5 C50,5 70,15 70,40 C60,45 50,42 40,45 C30,42 20,45 10,40 Z" 
                fill="rgba(112,0,255,0.2)"
                stroke="rgba(0,243,255,0.7)"
                strokeWidth="1.5"
              />
              <circle cx="40" cy="25" r="10" fill="#00f3ff" opacity="0.8" className="blur-[2px]" />
              <path d="M25,42 Q28,75 22,105" stroke="#7000ff" strokeWidth="1.5" opacity="0.7" fill="none" />
              <path d="M40,45 Q35,80 43,108" stroke="#00f3ff" strokeWidth="1.5" opacity="0.8" fill="none" />
              <path d="M55,42 Q52,75 58,105" stroke="#7000ff" strokeWidth="1.5" opacity="0.7" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── FEATURE 9: Floating Plastic Waste Animation in Polluted Zones ─── */}
      <div className="absolute inset-0 pointer-events-none z-3 layer-pollution-zone">
        <div className="absolute top-[35%] right-[12%] w-[260px] h-[180px] rounded-full border border-red-500/10 bg-red-950/10 backdrop-blur-[1px] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-red-400/80">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              POLLUTION HOTSPOT #04
            </span>
          </div>

          <div className="relative w-full h-full">
            <div className="absolute top-4 left-6 anim-trash-1">
              <svg width="22" height="38" viewBox="0 0 20 35" fill="none" className="opacity-60">
                <rect x="5" y="2" width="10" height="4" rx="1" fill="#e2e8f0" />
                <path d="M4,7 L16,7 L18,32 C18,34 16,35 14,35 L6,35 C4,35 2,34 2,32 Z" fill="rgba(255,255,255,0.2)" stroke="#00f3ff" strokeWidth="1" />
                <line x1="2" y1="18" x2="18" y2="18" stroke="rgba(0,243,255,0.4)" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-12 right-8 anim-trash-2">
              <svg width="34" height="40" viewBox="0 0 35 40" fill="none" className="opacity-50">
                <path d="M5,15 C5,10 10,5 12,5 C14,5 14,10 14,15 M21,15 C21,10 21,5 23,5 C25,5 30,10 30,15 L33,35 C33,38 30,40 26,40 L9,40 C5,40 2,38 2,35 Z" fill="rgba(255,255,255,0.15)" stroke="#ef4444" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-14 anim-trash-3">
              <svg width="45" height="30" viewBox="0 0 50 35" fill="none" className="opacity-40">
                <path d="M0,0 L50,35 M10,0 L50,25 M20,0 L50,15 M0,10 L35,35 M0,20 L25,35 M0,30 L10,35" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE 10: Animated Drone Submarines Scanning the Ocean ─── */}
      <div className="absolute inset-0 pointer-events-none z-4 layer-drone">
        <div className="absolute top-[22%] left-[42%] anim-drone">
          <div className="relative filter drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            <svg width="90" height="45" viewBox="0 0 100 50" fill="none">
              <rect x="25" y="15" width="50" height="20" rx="8" fill="#0f172a" stroke="#00f3ff" strokeWidth="1.5" />
              <circle cx="75" cy="25" r="6" fill="#00f3ff" className="animate-pulse" />
              <g className="anim-prop">
                <line x1="15" y1="18" x2="15" y2="32" stroke="#00ff9d" strokeWidth="2" />
              </g>
              <line x1="50" y1="15" x2="50" y2="5" stroke="#00f3ff" strokeWidth="1.5" />
              <circle cx="50" cy="4" r="2" fill="#00ff9d" />
            </svg>
            <div className="absolute top-[18px] left-[70px] w-[220px] h-[140px] pointer-events-none anim-drone-scan">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/5 to-transparent clip-cone" />
            </div>
            <div className="absolute -bottom-5 left-4 font-mono text-[9px] text-cyan-400 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ROV-NEPTUNE-X1
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE 11: Sonar Pulse Waves ─── */}
      <div className="absolute bottom-[20%] left-[25%] pointer-events-none z-3 layer-sonar">
        <div className="relative flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f3ff] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
          <div className="absolute sonar-ring ring-1" />
          <div className="absolute sonar-ring ring-2" />
        </div>
      </div>

      {/* ─── FEATURE 8: Bioluminescent Glowing Particle Field ─── */}
      <div className="absolute inset-0 pointer-events-none z-2 layer-biolum-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full anim-bio-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              '--dur': p.duration,
              '--del': p.delay
            }}
          />
        ))}
      </div>

      {/* ─── FEATURE 5: Animated Coral Reefs & Seabed ─── */}
      <div className="absolute bottom-0 inset-x-0 h-[160px] pointer-events-none z-3 layer-coral-seabed">
        <svg className="w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none">
          <path d="M0,160 L0,110 Q200,80 450,115 Q700,140 950,105 Q1200,75 1440,120 L1440,160 Z" fill="#031427" opacity="0.9" />
          <path d="M0,160 L0,130 Q300,105 650,135 Q1000,110 1440,138 L1440,160 Z" fill="#010a17" />
          
          <g className="anim-kelp-1">
            <path d="M120,140 Q110,90 125,40 Q130,85 120,140 Z" fill="#00ff9d" opacity="0.4" />
            <path d="M135,140 Q145,80 130,30 Q120,80 135,140 Z" fill="#00f3ff" opacity="0.3" />
          </g>

          <path d="M680,130 C670,100 650,85 645,60 C660,75 675,90 685,130 Z" fill="#7000ff" opacity="0.6" />
          <path d="M700,130 C715,95 735,80 740,55 C725,75 710,90 700,130 Z" fill="#00ff9d" opacity="0.5" />

          <g className="anim-kelp-2">
            <path d="M1280,140 Q1295,85 1275,35 Q1265,80 1280,140 Z" fill="#00f3ff" opacity="0.4" />
            <path d="M1300,140 Q1280,90 1295,45 Q1310,85 1300,140 Z" fill="#00ff9d" opacity="0.35" />
          </g>

          <circle cx="645" cy="60" r="4" fill="#00ff9d" className="animate-ping" />
          <circle cx="740" cy="55" r="4" fill="#00f3ff" className="animate-ping" />
        </svg>
      </div>

      {/* ─── ROV MODE VISION OVERLAY ─── */}
      {isRovMode && (
        <div className={`absolute inset-0 pointer-events-none z-20 transition-all duration-500 ${
          rovFilter === 'thermal' ? 'bg-gradient-to-tr from-purple-900/40 via-red-600/20 to-yellow-400/20 mix-blend-color-dodge' :
          rovFilter === 'sonar' ? 'bg-emerald-950/40 mix-blend-hard-light border-4 border-emerald-500/30' :
          rovFilter === 'biolum' ? 'bg-cyan-950/40 mix-blend-screen' : ''
        }`}>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-400/30 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          </div>
        </div>
      )}
    </div>
  );
});
