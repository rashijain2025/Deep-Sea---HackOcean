import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, MapPin, Activity, ShieldAlert, Cpu, 
  Fish, BarChart3, Database, Globe2, Eye, Shield, AlertTriangle
} from 'lucide-react';
import CinematicIntro from '../components/CinematicIntro';
import JourneyToHealthyOcean from '../components/JourneyToHealthyOcean';

/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM ENTERPRISE HOMEPAGE
   Inspired by Apple, Stripe, Palantir. 
   Focus: Clean typography, elegant spacing, subtle glassmorphism, purposeful motion.
   ═══════════════════════════════════════════════════════════════════════════ */

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } // Premium custom cubic-bezier
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Darken background as user scrolls down to simulate descending into the ocean
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.85]);

  const handleEnterDashboard = useCallback((e) => {
    e.preventDefault();
    setShowIntro(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    navigate('/dashboard');
  }, [navigate]);

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden relative text-slate-50 selection:bg-cyan-500/30 font-sans pb-24">
      {/* ─── SCROLL-LINKED BACKGROUND OVERLAY ─── */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[-1] bg-[#020617]" 
        style={{ opacity: bgOpacity }} 
      />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Subtle Underwater Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 via-[#0f172a]/60 to-[#020617]" />
          <div className="god-rays-css opacity-40">
            <div className="ray ray-1 w-32" />
            <div className="ray ray-2 w-24" />
            <div className="ray ray-3 w-40" />
          </div>
          {/* Subtle Particles - GPU Accelerated */}
          <div className="absolute inset-0 opacity-30">
             {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-cyan-200 anim-bio-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    '--dur': `${4 + Math.random() * 4}s`,
                    '--del': `${Math.random() * 2}s`
                  }}
                />
             ))}
          </div>
        </div>

        <motion.div 
          className="relative z-10 text-center max-w-5xl px-6"
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
        >
          <motion.div variants={FADE_UP} className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-mono tracking-widest backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            DEEPSEA GUARDIAN INTELLIGENCE
          </motion.div>
          
          <motion.h1 
            variants={FADE_UP}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]"
          >
            Protecting Our Oceans<br/>
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">Artificial Intelligence</span>
          </motion.h1>

          <motion.p 
            variants={FADE_UP}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Monitor pollution, marine biodiversity, and environmental risks in real time through one intelligent, government-grade ocean platform.
          </motion.p>

          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleEnterDashboard}
              className="group relative h-12 px-8 rounded-full bg-white text-slate-950 font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              Start Monitoring
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              to="/map" 
              className="group h-12 px-8 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-medium text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              Explore Ocean Map
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── 2. LIVE STATUS PANEL (Floating Command Center Style) ─── */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 z-20 hidden md:block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="premium-glass p-6 rounded-2xl grid grid-cols-5 gap-6 divide-x divide-slate-800/50">
            <StatusMetric label="Ocean Health" value="92%" color="text-emerald-400" />
            <StatusMetric label="Active Regions" value="58" color="text-white" />
            <StatusMetric label="Plastic Alerts" value="4" color="text-amber-400" />
            <StatusMetric label="Marine Species" value="482" color="text-white" />
            <StatusMetric label="AI Confidence" value="99.7%" color="text-cyan-400" />
          </div>
        </motion.div>
      </section>

      {/* ─── 3. JOURNEY TO HEALTHY OCEAN (Embedded Experience) ─── */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <JourneyToHealthyOcean />
      </div>

      {/* ─── 4. PREMIUM FEATURE SECTIONS ─── */}
      <section className="max-w-7xl mx-auto px-6 mt-40 space-y-40">
        
        {/* Feature 1: Ocean Monitoring */}
        <FeatureBlock 
          title="Ocean Monitoring"
          badge="Global Telemetry"
          desc="Deploy autonomous sensors across abyssal trenches and coral reefs. Stream petabytes of real-time temperature, salinity, and acoustic data directly into a unified command center."
          imageContent={<div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col"><div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2"><div className="w-3 h-3 rounded-full bg-slate-700"/><div className="w-3 h-3 rounded-full bg-slate-700"/><div className="w-3 h-3 rounded-full bg-slate-700"/></div><div className="p-6 flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"><div className="h-full border border-cyan-500/20 bg-cyan-950/20 rounded-lg p-4 flex flex-col justify-end relative overflow-hidden"><motion.div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }}/><div className="font-mono text-xs text-cyan-400">SONAR ARRAY ONLINE</div></div></div></div>}
        />

        {/* Feature 2: AI Detection */}
        <FeatureBlock 
          reversed
          title="AI Detection"
          badge="Computer Vision"
          desc="Proprietary neural networks analyze satellite imagery and sub-surface drone feeds to instantly identify plastic accumulation, illegal fishing, and crude oil plumes with 99.7% accuracy."
          imageContent={
            <div className="grid grid-cols-2 gap-4 h-full p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <DetectionCard type="Plastic Waste" status="DETECTED" conf="98%" color="border-amber-500/50 text-amber-400" />
              <DetectionCard type="Oil Spill" status="CLEAR" conf="100%" color="border-emerald-500/50 text-emerald-400" />
              <DetectionCard type="Ghost Net" status="CRITICAL" conf="96%" color="border-red-500/50 text-red-400" />
              <DetectionCard type="Marine Fauna" status="TRACKED" conf="99%" color="border-cyan-500/50 text-cyan-400" />
            </div>
          }
        />

        {/* Feature 3: Marine Biodiversity */}
        <FeatureBlock 
          title="Marine Biodiversity"
          badge="Ecological Census"
          desc="Safeguard the ocean's most vulnerable inhabitants. Non-invasive acoustic tagging and visual AI models track migration patterns, population health, and breeding ground integrity."
          imageContent={<div className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900" /><Fish size={64} className="text-cyan-400/50 animate-pulse" /></div>}
        />

      </section>

      {/* ─── 5. OCEAN MAP PREVIEW ─── */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <motion.div 
          className="premium-glass rounded-3xl p-1 lg:p-1 overflow-hidden relative min-h-[500px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
        >
          <div className="absolute inset-0 bg-[#020617] rounded-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
          
          <div className="relative z-10 p-10 flex flex-col md:flex-row justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-2">Global Coverage</h3>
              <p className="text-sm text-slate-400 max-w-sm">Live telemetry streaming from 58 monitoring stations across 5 major oceans.</p>
            </div>
            <Link to="/map" className="mt-4 md:mt-0 text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              Open Full Map <ArrowRight size={14} />
            </Link>
          </div>

          {/* Abstract Map Nodes */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Just a stylized representation of nodes for the preview */}
            <MapNode top="40%" left="30%" color="bg-emerald-400" glow="shadow-[0_0_20px_#34d399]" />
            <MapNode top="35%" left="60%" color="bg-cyan-400" glow="shadow-[0_0_20px_#22d3ee]" />
            <MapNode top="65%" left="45%" color="bg-amber-400" glow="shadow-[0_0_20px_#fbbf24]" pulse />
            <MapNode top="50%" left="75%" color="bg-emerald-400" glow="shadow-[0_0_20px_#34d399]" />
            
            {/* Connecting SVG lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
               <path d="M 30% 40% Q 45% 30% 60% 35% T 75% 50%" stroke="#00f3ff" fill="none" strokeWidth="1" strokeDasharray="4 4" />
               <path d="M 30% 40% Q 35% 55% 45% 65%" stroke="#00f3ff" fill="none" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* ─── 6. MONUMENTAL STATISTICS ─── */}
      <section className="max-w-6xl mx-auto px-6 mt-40 border-t border-slate-800 pt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatBlock number="92%" label="Ocean Health Index" />
          <StatBlock number="482" label="Species Protected" />
          <StatBlock number="16" label="Threats Prevented" />
          <StatBlock number="2.4" suffix="PB" label="Data Processed Daily" />
        </div>
      </section>

      {/* ─── 7. FINAL CTA ─── */}
      <section className="max-w-4xl mx-auto px-6 mt-40 mb-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Together We Can<br/>Protect Our Oceans
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join the leading coalition of governments, researchers, and enterprises utilizing DeepSea Guardian.
          </p>
          <button 
            onClick={handleEnterDashboard}
            className="group relative h-14 px-10 rounded-full bg-cyan-500 text-slate-950 font-bold text-base hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center gap-2 mx-auto"
          >
            Launch Mission
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

    </div>
  );
}

// ─── HELPER COMPONENTS ───

function StatusMetric({ label, value, color }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">{label}</span>
      <span className={`text-2xl font-bold tracking-tight ${color}`}>{value}</span>
    </div>
  );
}

function FeatureBlock({ title, badge, desc, imageContent, reversed = false }) {
  return (
    <motion.div 
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={FADE_UP}
    >
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-mono tracking-widest">
          {badge}
        </div>
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        <p className="text-slate-400 text-lg leading-relaxed">{desc}</p>
        <button className="text-sm font-semibold text-white hover:text-cyan-400 flex items-center gap-2 transition-colors pt-2">
          Learn more <ArrowRight size={14} />
        </button>
      </div>
      <div className="flex-1 w-full aspect-[4/3] rounded-2xl p-1 bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl">
        {imageContent}
      </div>
    </motion.div>
  );
}

function DetectionCard({ type, status, conf, color }) {
  return (
    <div className={`border ${color} bg-slate-950/50 rounded-lg p-4 flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono text-slate-400 uppercase">{type}</span>
        <Activity size={14} className="opacity-50" />
      </div>
      <div>
        <div className="text-lg font-bold mb-1">{status}</div>
        <div className="text-[10px] font-mono opacity-70">CONFIDENCE: {conf}</div>
      </div>
    </div>
  );
}

function MapNode({ top, left, color, glow, pulse = false }) {
  return (
    <div className="absolute" style={{ top, left }}>
      <div className={`relative w-4 h-4 rounded-full ${color} ${glow}`}>
        {pulse && <div className={`absolute inset-0 rounded-full ${color} animate-ping opacity-75`} />}
      </div>
    </div>
  );
}

function StatBlock({ number, suffix = '', label }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={FADE_UP}
      className="flex flex-col items-center"
    >
      <div className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-3">
        {number}<span className="text-3xl md:text-4xl text-cyan-400">{suffix}</span>
      </div>
      <div className="text-sm font-mono text-slate-400 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}
