import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, Radar, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Ocean Health', value: '92%' },
  { label: 'Plastic Hotspots', value: '124' },
  { label: 'Active Alerts', value: '16' },
  { label: 'Marine Species', value: '482' },
  { label: 'Monitoring Regions', value: '58' },
];

const features = [
  {
    icon: <Zap size={22} />,
    title: 'Real-time Sonar AI',
    desc: 'Millisecond detection of plastic, oil, and ghost nets across 58 monitoring zones.',
  },
  {
    icon: <Radar size={22} />,
    title: 'Biodiversity Tracking',
    desc: '482 species identified and cataloged with population health scoring.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Predictive Guardianship',
    desc: 'Neural forecasts warn regional agencies 30 days before pollution peaks.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  return (
    <div className="page-content" id="home-page">
      {/* Hero */}
      <motion.section
        className="hero"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.div className="hero-badge" variants={fadeUp} custom={0}>
          <Activity size={14} />
          Powered by AI · Trusted by 58 marine agencies
        </motion.div>

        <motion.h1 variants={fadeUp} custom={1}>
          Protecting Our <span className="highlight">Oceans</span><br />
          with AI
        </motion.h1>

        <motion.p variants={fadeUp} custom={2}>
          Real-time deep ocean pollution & marine biodiversity monitoring — for the people defending 71% of our planet.
        </motion.p>

        <motion.div className="hero-buttons" variants={fadeUp} custom={3}>
          <Link to="/dashboard" className="btn-primary">
            Explore Dashboard <ArrowRight size={18} />
          </Link>
          <Link to="/map" className="btn-secondary">
            <MapPin size={18} /> View Ocean Map
          </Link>
        </motion.div>

        <motion.div
          className="hero-pulse-icon"
          variants={fadeUp}
          custom={4}
        >
          <Activity size={40} color="#00E5FF" />
        </motion.div>
      </motion.section>

      {/* Metrics Strip */}
      <motion.div
        className="metrics-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="metric-item"
            variants={fadeUp}
            custom={i}
          >
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className="metric-live">
              <span className="metric-live-dot" /> Live
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className="section-title" variants={fadeUp} custom={0}>
          Ocean Intelligence System
        </motion.div>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
