import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

import { LazyChart } from '../components/LazyChart';
import mockPredictionsData from '../mock-data/predictions.json';
import { fadeUp } from '../constants/animations';
import { chartTooltipStyle as tooltipStyle } from '../constants/chartTheme';

const { predictions, riskProjection } = mockPredictionsData;

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
        {/* 12-Month Aggregate Risk Projection (Pure React UI) */}
        <div className="saas-card p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-base font-bold text-white font-display">12-Month Aggregate Risk Projection</h3>
              <div className="text-xs text-slate-400 font-mono">Predictive global ocean pollution risk index trajectory</div>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
              SIMULATED RISK TRAJECTORY
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 my-4">
            {[
              { m: 'Jan', r: 42, color: 'bg-cyan-400' }, { m: 'Feb', r: 48, color: 'bg-cyan-400' },
              { m: 'Mar', r: 55, color: 'bg-emerald-400' }, { m: 'Apr', r: 62, color: 'bg-amber-400' },
              { m: 'May', r: 70, color: 'bg-amber-400' }, { m: 'Jun', r: 78, color: 'bg-amber-400' },
              { m: 'Jul', r: 85, color: 'bg-red-400' }, { m: 'Aug', r: 94, color: 'bg-red-400' },
              { m: 'Sep', r: 82, color: 'bg-amber-400' }, { m: 'Oct', r: 68, color: 'bg-amber-400' },
              { m: 'Nov', r: 52, color: 'bg-cyan-400' }, { m: 'Dec', r: 35, color: 'bg-emerald-400' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white font-mono mb-1">{item.r}%</div>
                <div className="w-full h-24 bg-slate-950 rounded flex items-end p-1">
                  <div className={`w-full ${item.color} rounded-sm transition-all duration-500`} style={{ height: `${item.r}%` }} />
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2">{item.m}</div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>NEURAL FORECAST ENGINE (V4.2)</span>
            <span className="text-amber-400">HIGH ACCURACY MODEL ✓</span>
          </div>
        </div>

        {/* AI Predictive Risk Matrix & Interventions Table */}
        <div className="saas-card p-5 mt-6 mb-16">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white font-display">AI Predictive Risk Matrix & Recommended Actions</h3>
              <div className="text-xs text-slate-400 font-mono">Simulated 12-month threat trajectories and automated mitigation protocols</div>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
              NEURAL ACCURACY: 99.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-900/80 text-cyan-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Threat Vector</th>
                  <th className="p-3">Target Ocean Sector</th>
                  <th className="p-3">Predicted Month</th>
                  <th className="p-3">Forecasted Risk</th>
                  <th className="p-3">Recommended Mitigation Protocol</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { threat: 'Microplastic Concentration Spike', sector: 'Pacific Garbage Patch', month: 'Aug 2026', risk: 'CRITICAL (94%)', action: 'Deploy Subsurface Skimmer Drone Fleet #04', status: 'SCHEDULED' },
                  { threat: 'Thermal Coral Bleaching Event', sector: 'Lakshadweep Reef System', month: 'Sep 2026', risk: 'HIGH (82%)', action: 'Activate Shading Canopy & Bio-Cooling Array', status: 'STANDBY' },
                  { threat: 'Industrial Runoff Plume Surge', sector: 'Gulf of Mexico Hydrosea', month: 'Oct 2026', risk: 'MEDIUM (68%)', action: 'Dispatch Chemical Neutralization Submarine', status: 'SIMULATED' },
                  { threat: 'Migratory Route Encroachment', sector: 'North Atlantic Slope', month: 'Nov 2026', risk: 'LOW (35%)', action: 'Broadcast Acoustic Beacon Waypoints', status: 'MONITORING' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">{row.threat}</td>
                    <td className="p-3 text-cyan-300">{row.sector}</td>
                    <td className="p-3 text-slate-400">{row.month}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.risk.includes('CRITICAL') ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        row.risk.includes('HIGH') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{row.action}</td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default Predictions;
