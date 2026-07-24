import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Fish, Waves, Compass, ArrowRight, HeartPulse, ShieldAlert, Thermometer, Anchor } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   JourneyToHealthyOcean — Inspired by Blue Marine / @MustafaMehraab Concept
   
   Features:
   - Interactive Node Map with 3 Key Pillars:
     1. Rainforests of the Sea (Corals & Flora)
     2. The Ocean's Web of Life (Biodiversity & Species)
     3. Protecting the Underwater World (Patrols & Pollution Control)
   - Flowing light streaks on pillar selection (Simulating ocean currents)
   - Real-time telemetry cards and visual storytelling metrics
   ═══════════════════════════════════════════════════════════════════════════ */

const PILLARS = [
  {
    id: 'rainforests',
    title: "RAINFORESTS OF THE SEA",
    subtitle: "Coral Reef Preservation & Thermal Bleaching Defense",
    icon: <Sparkles size={20} className="text-cyan-400" />,
    color: '#00f3ff',
    badge: '3,400 sq km Coral Protected',
    desc: "Coral reefs support over 25% of all marine species. DeepSea Guardian deploys subsea spectral sensors and automated cooling telemetry to shield ancient reef systems from marine heatwaves.",
    stats: [
      { label: "Live Coral Reef Health Index", value: "88.4%", change: "+3.2% vs last quarter" },
      { label: "Thermal Bleaching Risk", value: "LOW (0.12°C delta)", change: "Monitored 24/7" },
      { label: "Acoustic Larval Seeding", value: "14 Stations Active", change: "99.4% Uptime" }
    ],
    highlights: [
      "Sub-surface UV shading arrays deployed in Great Barrier Sector 4",
      "Bioluminescent kelp forest restoration at 40m depth",
      "Automated pH anomaly detection avoiding acidification spikes"
    ]
  },
  {
    id: 'web-of-life',
    title: "THE OCEAN'S WEB OF LIFE",
    subtitle: "Biodiversity Tracking & Megafauna Migration Routes",
    icon: <Fish size={20} className="text-emerald-400" />,
    color: '#00ff9d',
    badge: '482 Protected Species Tracked',
    desc: "From blue whales to pygmy seahorses, maintaining trophic balance is critical. Our acoustic neural array decodes bio-acoustic signatures to safeguard global migration corridors from commercial shipping traffic.",
    stats: [
      { label: "Tracked Megafauna Individuals", value: "1,248", change: "100% Non-invasive RFID" },
      { label: "Bio-acoustic AI Accuracy", value: "99.7%", change: "ResNet-50 Sonar Net" },
      { label: "Shipping Route Diversions", value: "42 this month", change: "0 Vessel Strikes" }
    ],
    highlights: [
      "Whale migration corridor auto-rerouting active in North Atlantic",
      "Deep sea octopus breeding ground sanctuary declared (Abyssal Zone)",
      "Hydrophone acoustic network listening across 12 ocean basins"
    ]
  },
  {
    id: 'protection',
    title: "PROTECTING THE UNDERWATER WORLD",
    subtitle: "Ghost Net Removal, Microplastic Telemetry & Sanctuary Patrols",
    icon: <Shield size={20} className="text-amber-400" />,
    color: '#ffb703',
    badge: '124 Active Cleanups Enforced',
    desc: "Pollution and illegal fishing threaten fragile marine reserves. DeepSea Guardian integrates satellite optical telemetry with autonomous drone interceptors to eliminate ocean plastic and ghost nets.",
    stats: [
      { label: "Plastic Recovered (YTD)", value: "142.8 Tons", change: "Autonomous Skimmers" },
      { label: "Ghost Nets Intercepted", value: "318 Nets", change: "Zero Entanglements" },
      { label: "Sanctuary Intrusion Prevention", value: "99.9%", change: "AI Radar Surveillance" }
    ],
    highlights: [
      "Autonomous ocean skimmers operating in Pacific Trash Gyre",
      "Real-time satellite AI detection of illegal fishing vessels",
      "Microplastic density mapping updated every 15 minutes"
    ]
  }
];

export default function JourneyToHealthyOcean() {
  const [activeId, setActiveId] = useState('rainforests');
  const [isFlowing, setIsFlowing] = useState(false);

  const activePillar = PILLARS.find(p => p.id === activeId) || PILLARS[0];

  const handleSelectPillar = (id) => {
    if (id === activeId) return;
    setIsFlowing(true);
    setActiveId(id);
    setTimeout(() => setIsFlowing(false), 800);
  };

  return (
    <section className="relative my-12 py-10 px-6 rounded-2xl border border-cyan-500/20 bg-ocean-abyss/60 backdrop-blur-md overflow-hidden">
      {/* ─── Flowing Light Streaks Animation overlay on selection ─── */}
      <AnimatePresence>
        {isFlowing && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] rounded-full"
                style={{
                  top: `${5 + i * 6}%`,
                  width: `${25 + (i % 4) * 15}%`,
                  background: `linear-gradient(90deg, transparent, ${activePillar.color}, transparent)`,
                  boxShadow: `0 0 12px ${activePillar.color}`,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.03,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Compass size={14} className="animate-spin" style={{ animationDuration: '10s' }} />
          INTERACTIVE EXPLORER MODULE
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display tracking-wide">
          JOURNEY TO A <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300">HEALTHY OCEAN</span>
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mt-2">
          Explore the three core pillars powering the DeepSea Guardian marine intelligence initiative.
        </p>
      </div>

      {/* ─── Interactive Node Map Nav Bar ─── */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mb-8 relative z-10">
        {PILLARS.map((pillar) => {
          const isActive = pillar.id === activeId;
          return (
            <motion.button
              key={pillar.id}
              onClick={() => handleSelectPillar(pillar.id)}
              className={`flex-1 flex items-center gap-3 p-4 rounded-xl text-left border transition-all duration-300 relative ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.25)]'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active Pulsing Indicator Dot */}
              {isActive && (
                <motion.span
                  layoutId="activePillarNode"
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f3ff]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                {pillar.icon}
              </div>

              <div>
                <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-300">
                  {pillar.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                  {pillar.badge}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ─── Selected Pillar Detail Showcase ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
        >
          {/* Main Narrative Card */}
          <div className="lg:col-span-2 saas-card p-6 flex flex-col justify-between border-cyan-500/30">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activePillar.color, boxShadow: `0 0 8px ${activePillar.color}` }} />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  {activePillar.subtitle}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3">
                {activePillar.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {activePillar.desc}
              </p>

              {/* Pillar Action Highlights */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">Key Active Deployments</div>
                {activePillar.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">TELEMETRY STREAM: ENCRYPTED // LIVE</span>
              <a href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                Explore in Telemetry Dashboard <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Stats Grid Column */}
          <div className="space-y-3">
            {activePillar.stats.map((s, idx) => (
              <div key={idx} className="saas-card p-4">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {s.label}
                </div>
                <div className="text-xl font-bold text-white font-display" style={{ color: activePillar.color }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {s.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
