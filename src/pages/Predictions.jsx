import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

import { LazyChart } from '../components/LazyChart';
import mockPredictionsData from '../mock-data/predictions.json';

const { predictions, riskProjection } = mockPredictionsData;

const tooltipStyle = {
  backgroundColor: 'rgba(3,8,20,0.95)',
  border: '1px solid rgba(0,243,255,0.25)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Predictions = React.memo(function Predictions() {
  return (
    <div className="page-content" id="predictions-page">
      <div className="page-header">
        <div className="label">AI Predictive Intelligence</div>
        <h1>AI Environmental Predictions</h1>
        <p>Neural network predictive models trained on 12 years of ocean telemetry and satellite oceanography data.</p>
      </div>

      {/* Prediction Cards Grid */}
      <motion.div
        className="grid-2 section"
        initial="hidden"
        animate="visible"
      >
        {predictions.map((p, i) => (
          <motion.div key={i} className="saas-card p-5 flex flex-col justify-between" variants={fadeUp} custom={i}>
            <div>
              <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <Brain size={18} className="text-cyan-400" />
                    {p.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-cyan-400" />
                    {p.region}
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                  {p.confidence}% CONFIDENCE
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {p.forecast}
              </p>
            </div>

            <div className="flex flex-wrap justify-between items-center pt-3 border-t border-slate-800/80 gap-2">
              <span className={`saas-badge saas-badge-${p.severity === 'critical' ? 'critical' : p.severity === 'high' ? 'warning' : 'info'}`}>
                {p.severity.toUpperCase()} RISK RATING
              </span>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-400" /> Neural Forecast Active
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 12-Month Risk Projection Chart */}
      <motion.div
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ paddingBottom: 60 }}
      >
        <motion.div className="saas-card p-5" variants={fadeUp}>
          <h3 className="text-base font-bold text-white font-display mb-1">12-Month Aggregate Risk Projection</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Predictive global ocean pollution risk index trajectory</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={riskProjection}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                    <stop offset="50%" stopColor="#FFD600" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="risk" stroke="#FF9800" fill="url(#riskGrad)" strokeWidth={2.5} dot={{ fill: '#FF9800', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </LazyChart>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Predictions;
