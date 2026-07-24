import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Shield, Activity, Cpu, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { LazyChart } from '../components/LazyChart';
import { fadeUp } from '../constants/animations';
import { chartTooltipStyle } from '../constants/chartTheme';

import mockDashboardData from '../mock-data/dashboard.json';

const { stats, pollutionData, healthData, recentAlertsData } = mockDashboardData;

const Dashboard = React.memo(function Dashboard() {
  const [dispatchedAlerts, setDispatchedAlerts] = useState([]);

  const handleDispatch = useCallback((id) => {
    setDispatchedAlerts(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

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
        {stats.map((s) => (
          <div key={s.label} className="saas-card p-4 transition-all duration-200 hover:border-cyan-500/40">
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
          </div>
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
          <div style={{ width: '100%', height: 280, position: 'relative', minWidth: 0, overflowX: 'auto' }}>
              <AreaChart data={pollutionData} width={800} height={280}>
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
                <Area type="monotone" dataKey="Plastic" stroke="#00E5FF" fill="url(#plasticGrad)" strokeWidth={2} isAnimationActive={false} />
                <Area type="monotone" dataKey="Oil" stroke="#FF5252" fill="url(#oilGrad)" strokeWidth={2} isAnimationActive={false} />
                <Area type="monotone" dataKey="Chemical" stroke="#00E676" fill="url(#chemGrad)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
          </div>
        </motion.div>

        <motion.div className="saas-card p-5" variants={fadeUp} custom={1}>
          <h3 className="text-base font-bold text-white font-display mb-1">Ocean Health Score</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Global health index · past 7 days</div>
          <div style={{ width: '100%', height: 280, position: 'relative', minWidth: 0, overflowX: 'auto' }}>
              <LineChart data={healthData} width={400} height={280}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={2.5} dot={{ fill: '#00E5FF', r: 4 }} activeDot={{ r: 6 }} isAnimationActive={false} />
              </LineChart>
          </div>
        </motion.div>
      </motion.div>
      {/* Subsea Telemetry & Fleet Matrix Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-8">
        {/* Real-Time Subsea Sensor Array Panel */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Subsea Sensor Telemetry Array</h3>
                <div className="text-xs text-slate-400 font-mono">Live environmental readings from 58 active hydro-nodes</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                NODES ONLINE
              </span>
            </div>

            <div className="space-y-3.5 my-4">
              {[
                { label: 'Dissolved Oxygen Level', value: '7.8 mg/L', percent: 88, status: 'OPTIMAL', color: 'bg-emerald-400' },
                { label: 'Surface Water Temperature', value: '18.4°C (+0.2°C anomaly)', percent: 64, status: 'STABLE', color: 'bg-cyan-400' },
                { label: 'Ocean Salinity Concentration', value: '35.2 PSU', percent: 92, status: 'NOMINAL', color: 'bg-indigo-400' },
                { label: 'Microplastic Particle Density', value: '142 particles/m³', percent: 45, status: 'WARNING', color: 'bg-amber-400' },
                { label: 'Acoustic Noise Index', value: '42 dB (Low Traffic)', percent: 30, status: 'QUIET', color: 'bg-purple-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{item.value}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">{item.status}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>REFRESH: REAL-TIME (0.5s)</span>
            <span className="text-cyan-400">HYDRO-GRID VERIFIED ✓</span>
          </div>
        </div>

        {/* Autonomous Drone Fleet Command Center */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Autonomous Subsea Drone Fleet</h3>
                <div className="text-xs text-slate-400 font-mono">Real-time deployment status & mission queue</div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                4 DRONES DISPATCHED
              </span>
            </div>

            <div className="space-y-3.5 my-4">
              {[
                { name: 'Skimmer Unit Alpha (#01)', mission: 'Plastic Debris Collection', zone: 'North Pacific Gyre', battery: '94%', depth: '15m', status: 'ACTIVE', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
                { name: 'Hydro-Sub Beta (#02)', mission: 'Oil Spill Containment Boom', zone: 'Gulf of Mexico', battery: '78%', depth: '140m', status: 'DISPATCHED', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400' },
                { name: 'Eco-Sentinel Gamma (#03)', mission: 'Whale Pod Acoustic Escort', zone: 'Indian Ocean Deep', battery: '89%', depth: '450m', status: 'PATROLLING', color: 'border-purple-500/40 bg-purple-950/20 text-purple-400' },
                { name: 'Reef Guard Delta (#04)', mission: 'Coral Bleaching Thermal Mapping', zone: 'Great Barrier Reef', battery: '62%', depth: '35m', status: 'SCANNING', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400' },
              ].map((drone, idx) => (
                <div key={idx} className={`p-3 rounded-lg border backdrop-blur-md ${drone.color} flex justify-between items-center`}>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-white text-xs font-display">{drone.name}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700">{drone.status}</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-sans">{drone.mission}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-1">ZONE: {drone.zone} · DEPTH: {drone.depth}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-white">{drone.battery}</div>
                    <div className="text-[9px] text-slate-400">BATTERY</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>SATELLITE LINK: LOCKED (100%)</span>
            <span className="text-emerald-400">AUTONOMOUS MODE: ON</span>
          </div>
        </div>
      </div>

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
