import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, Radar, Shield, Activity, Radio, Cpu, BarChart3, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Ocean Health Score', value: '92/100', status: '+2.1% this week' },
  { label: 'Plastic Hotspots', value: '124', status: 'Monitored 24/7' },
  { label: 'Active Alerts', value: '16', status: '4 Critical' },
  { label: 'Marine Species Tracked', value: '482', status: 'IUCN Verified' },
  { label: 'Monitoring Stations', value: '58', status: '100% Operational' },
];

const features = [
  {
    icon: <Zap size={22} className="text-cyan-400" />,
    title: 'Autonomous Sonar & Optics AI',
    desc: 'Sub-second classification of microplastics, crude oil plumes, and ghost nets across 58 subsea monitoring stations.',
  },
  {
    icon: <Radar size={22} className="text-emerald-400" />,
    title: 'IUCN Biodiversity Census',
    desc: '482 endangered and protected species tracked using non-invasive acoustic tags and subsea vision neural nets.',
  },
  {
    icon: <Shield size={22} className="text-amber-400" />,
    title: 'Predictive Risk Forecasting',
    desc: 'Neural forecasting models warn environmental agencies 30 days prior to predicted runoff and thermal bleaching peaks.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Home = React.memo(function Home() {
  return (
    <div className="page-content" id="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.div className="hero-badge" variants={fadeUp} custom={0}>
          <Activity size={14} className="text-cyan-400 animate-pulse" />
          <span>ENTERPRISE OCEAN INTELLIGENCE PLATFORM · V4.8</span>
        </motion.div>

        <motion.h1 variants={fadeUp} custom={1}>
          Safeguarding Earth's <span className="highlight">Oceans</span><br />
          with Predictive AI
        </motion.h1>

        <motion.p variants={fadeUp} custom={2}>
          Autonomous deep sea telemetry, plastic accumulation mapping, and marine biodiversity protection — engineered for Governments, Researchers, and Environmental Protection Agencies.
        </motion.p>

        <motion.div className="hero-buttons" variants={fadeUp} custom={3}>
          <Link to="/dashboard" className="saas-button-primary text-sm px-6 py-3">
            Open Command Dashboard <ArrowRight size={16} />
          </Link>
          <Link to="/map" className="saas-button-secondary text-sm px-6 py-3">
            <MapPin size={16} /> Launch Ocean Map
          </Link>
        </motion.div>
      </motion.section>

      {/* Real-time Telemetry Metrics Strip */}
      <motion.div
        className="metrics-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="saas-card p-4 text-center"
            variants={fadeUp}
            custom={i}
          >
            <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className="text-2xl font-bold font-display text-white mb-1">
              {m.value}
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {m.status}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enterprise Platform Capability Features */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className="text-center mb-8" variants={fadeUp} custom={0}>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl font-bold text-white font-display">
            Autonomous Deep Sea Intelligence Framework
          </h2>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="saas-card p-6"
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="feature-icon mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white font-display mb-2">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
});

export default Home;
