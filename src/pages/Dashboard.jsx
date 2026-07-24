import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Shield, Activity, Cpu, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { LazyChart } from '../components/LazyChart';

import mockDashboardData from '../mock-data/dashboard.json';

const { stats, pollutionData, healthData, recentAlertsData } = mockDashboardData;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const chartTooltipStyle = {
  backgroundColor: 'rgba(3,8,20,0.95)',
  border: '1px solid rgba(0,243,255,0.25)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

const Dashboard = React.memo(function Dashboard() {
  const [dispatchedAlerts, setDispatchedAlerts] = useState([]);

  const handleDispatch = (id) => {
    if (!dispatchedAlerts.includes(id)) {
      setDispatchedAlerts([...dispatchedAlerts, id]);
    }
  };

  return (
    <div className="page-content" id="dashboard-page">
      <div className="page-header">
        <div className="label">Command & Control Center</div>
        <h1>Ocean Intelligence Command Center</h1>
        <p>Real-time telemetry synthesis from 58 monitoring stations, autonomous ROVs, and satellite oceanography.</p>
      </div>

      {/* KPI Stats Grid */}
      <motion.div
        className="grid-6 section"
        initial="hidden"
        animate="visible"
      >
        {stats.map((s, i) => (
          <motion.div key={s.label} className="saas-card p-4" variants={fadeUp} custom={i}>
            <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {s.label}
            </div>
            <div className="text-2xl font-bold font-display text-white my-1">
              {s.value}<span className="text-xs font-mono font-normal text-slate-400">{s.unit}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className={s.dir === 'up' ? 'text-emerald-400' : s.dir === 'down' ? 'text-red-400' : 'text-cyan-400'}>
                {s.trend}
              </span>
              <span className="text-slate-500">{s.desc}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dual Analytics Row */}
      <motion.div
        className="grid-2-1 section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="saas-card p-5" variants={fadeUp} custom={0}>
          <h3 className="text-base font-bold text-white font-display mb-1">Pollution Trend Spectrum</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">12-month rolling telemetry window (tons detected)</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={pollutionData}>
                <defs>
                  <linearGradient id="plasticGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="oilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="chemGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E676" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#fff' }} />
                <Area type="monotone" dataKey="Plastic" stroke="#00E5FF" fill="url(#plasticGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="Oil" stroke="#FF5252" fill="url(#oilGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="Chemical" stroke="#00E676" fill="url(#chemGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </LazyChart>
        </motion.div>

        <motion.div className="saas-card p-5" variants={fadeUp} custom={1}>
          <h3 className="text-base font-bold text-white font-display mb-1">Ocean Health Score</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Global health index · past 7 days</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={2.5} dot={{ fill: '#00E5FF', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </LazyChart>
        </motion.div>
      </motion.div>

      {/* Incident Ticker & Command Dispatch Panel */}
      <motion.div
        className="section max-w-[1280px] mx-auto pb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="saas-card p-5" variants={fadeUp}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">Recent AI-Triaged Alerts</h3>
              <div className="text-xs text-slate-400 font-mono">Real-time incident dispatch queue</div>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
              5 ACTIVE DISPATCHES
            </span>
          </div>

          <div className="space-y-3">
            {recentAlertsData.map((a) => {
              const isDone = dispatchedAlerts.includes(a.id);
              return (
                <div
                  key={a.id}
                  className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${a.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{a.title}</div>
                      <div className="text-xs text-slate-400 font-mono">{a.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono">{a.time}</span>
                    <span className={`saas-badge saas-badge-${a.severity === 'critical' ? 'critical' : a.severity === 'high' ? 'warning' : 'info'}`}>
                      {a.severity.toUpperCase()}
                    </span>

                    <button
                      onClick={() => handleDispatch(a.id)}
                      disabled={isDone}
                      className={`saas-button-${isDone ? 'secondary' : 'primary'} text-xs py-1 px-3`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle size={12} className="text-emerald-400" />
                          Dispatched
                        </>
                      ) : (
                        <>
                          <Radio size={12} />
                          Dispatch Submarine
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Dashboard;
