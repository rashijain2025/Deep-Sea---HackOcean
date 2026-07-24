import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MapPin } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const tooltipStyle = {
  backgroundColor: 'rgba(4,28,50,0.95)',
  border: '1px solid rgba(0,229,255,0.15)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

const predictions = [
  {
    title: 'Pollution Risk — Arabian Sea',
    region: 'Arabian Sea · Sector A-14',
    confidence: 87,
    forecast: 'Pollution levels expected to rise 15% in the next 30 days due to monsoon runoff patterns.',
    severity: 'high',
  },
  {
    title: 'Coral Bleaching — Lakshadweep',
    region: 'Lakshadweep Islands · Reef Zone',
    confidence: 79,
    forecast: 'Sea surface temperature anomaly suggests bleaching risk within 45 days.',
    severity: 'medium',
  },
  {
    title: 'Species Migration — North Atlantic',
    region: 'North Atlantic · Blue Whale Corridor',
    confidence: 92,
    forecast: 'Blue whale migration patterns shifting northward. Updated patrol routes recommended.',
    severity: 'low',
  },
  {
    title: 'Oil Spill Probability — Gulf of Mexico',
    region: 'Gulf of Mexico · Shipping Lane',
    confidence: 74,
    forecast: 'Elevated spill risk detected near active drilling zones. Pre-positioning containment assets advised.',
    severity: 'critical',
  },
];

const riskProjection = [
  { month: 'Jan', risk: 35 }, { month: 'Feb', risk: 38 },
  { month: 'Mar', risk: 42 }, { month: 'Apr', risk: 48 },
  { month: 'May', risk: 55 }, { month: 'Jun', risk: 62 },
  { month: 'Jul', risk: 68 }, { month: 'Aug', risk: 72 },
  { month: 'Sep', risk: 65 }, { month: 'Oct', risk: 58 },
  { month: 'Nov', risk: 50 }, { month: 'Dec', risk: 45 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Predictions() {
  return (
    <div className="page-content" id="predictions-page">
      <div className="page-header">
        <div className="label">AI Forecasting</div>
        <h1>AI Predictions</h1>
        <p>Neural network forecasts trained on 12 years of ocean telemetry data.</p>
      </div>

      {/* Prediction Cards */}
      <motion.div
        className="grid-2 section"
        initial="hidden"
        animate="visible"
      >
        {predictions.map((p, i) => (
          <motion.div key={i} className="prediction-card" variants={fadeUp} custom={i}>
            <div className="prediction-header">
              <div>
                <h3>
                  <Brain size={16} style={{ marginRight: 8, verticalAlign: -2, color: 'var(--cyan)' }} />
                  {p.title}
                </h3>
                <p><MapPin size={12} style={{ marginRight: 4, verticalAlign: -1 }} />{p.region}</p>
              </div>
              <div className="prediction-confidence">{p.confidence}%</div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
              {p.forecast}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`badge ${p.severity}`}>
                {p.severity.charAt(0).toUpperCase() + p.severity.slice(1)} Risk
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={13} /> AI Confidence: {p.confidence}%
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Risk Projection Chart */}
      <motion.div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 60px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="chart-card" variants={fadeUp}>
          <h3>12-Month Risk Projection</h3>
          <div className="chart-subtitle">Global aggregate pollution risk score</div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={riskProjection}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#FFD600" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="risk" stroke="#FF9800" fill="url(#riskGrad)" strokeWidth={2.5} dot={{ fill: '#FF9800', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
