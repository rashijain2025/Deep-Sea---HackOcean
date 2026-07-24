import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

const stats = [
  { label: 'Ocean Health Score', value: '92', unit: '/100', trend: '+2.1%', dir: 'up', desc: 'Global index' },
  { label: 'Plastic Waste Detected', value: '3,214', unit: ' tons', trend: '+8.4%', dir: 'up', desc: 'Last 30 days' },
  { label: 'Oil Spill Alerts', value: '7', unit: '', trend: '-12%', dir: 'down', desc: 'Active incidents' },
  { label: 'Coral Health', value: '78', unit: '%', trend: '-1.2%', dir: 'down', desc: 'Reef vitality index' },
  { label: 'Species Tracked', value: '482', unit: '', trend: '+16', dir: 'up', desc: 'Across 12 zones' },
  { label: 'Risk Level', value: 'Moderate', unit: '', trend: 'Stable', dir: 'stable', desc: 'AI risk model' },
];

const pollutionData = [
  { month: 'Jan', Plastic: 220, Oil: 30, Chemical: 60 },
  { month: 'Feb', Plastic: 240, Oil: 35, Chemical: 55 },
  { month: 'Mar', Plastic: 280, Oil: 25, Chemical: 65 },
  { month: 'Apr', Plastic: 310, Oil: 40, Chemical: 70 },
  { month: 'May', Plastic: 340, Oil: 45, Chemical: 75 },
  { month: 'Jun', Plastic: 360, Oil: 50, Chemical: 80 },
  { month: 'Jul', Plastic: 380, Oil: 55, Chemical: 85 },
  { month: 'Aug', Plastic: 400, Oil: 48, Chemical: 90 },
  { month: 'Sep', Plastic: 420, Oil: 52, Chemical: 88 },
  { month: 'Oct', Plastic: 430, Oil: 55, Chemical: 92 },
  { month: 'Nov', Plastic: 450, Oil: 58, Chemical: 95 },
  { month: 'Dec', Plastic: 460, Oil: 60, Chemical: 98 },
];

const healthData = [
  { day: 'Mon', score: 88 },
  { day: 'Tue', score: 89 },
  { day: 'Wed', score: 90 },
  { day: 'Thu', score: 91 },
  { day: 'Fri', score: 90 },
  { day: 'Sat', score: 93 },
  { day: 'Sun', score: 95 },
];

const recentAlerts = [
  { title: 'Plastic accumulation detected', location: 'Arabian Sea · Sector A-14', time: '2 min ago', severity: 'high' },
  { title: 'Coral bleaching warning', location: 'Lakshadweep Reef', time: '18 min ago', severity: 'medium' },
  { title: 'Oil spill signature', location: 'Gulf of Mexico', time: '42 min ago', severity: 'critical' },
  { title: 'Illegal fishing activity', location: 'South Pacific', time: '1 h ago', severity: 'high' },
  { title: 'Ghost net detected', location: 'North Sea', time: '3 h ago', severity: 'medium' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const TrendIcon = ({ dir }) => {
  if (dir === 'up') return <TrendingUp size={14} />;
  if (dir === 'down') return <TrendingDown size={14} />;
  return <Minus size={14} />;
};

const chartTooltipStyle = {
  backgroundColor: 'rgba(4,28,50,0.95)',
  border: '1px solid rgba(0,229,255,0.15)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

export default function Dashboard() {
  return (
    <div className="page-content" id="dashboard-page">
      <div className="page-header">
        <div className="label">Command Center</div>
        <h1>Ocean Intelligence Dashboard</h1>
        <p>Real-time synthesis of 58 monitoring regions, drone fleets and satellite feeds.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid-6 section"
        initial="hidden"
        animate="visible"
      >
        {stats.map((s, i) => (
          <motion.div key={s.label} className="stat-card" variants={fadeUp} custom={i}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">
              {s.value}<span className="stat-unit">{s.unit}</span>
            </div>
            <div className="stat-footer">
              <span className={`stat-trend ${s.dir}`}>
                <TrendIcon dir={s.dir} /> {s.trend}
              </span>
              <span className="stat-desc">{s.desc}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div
        className="grid-2-1 section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="chart-card" variants={fadeUp} custom={0}>
          <h3>Pollution Trend</h3>
          <div className="chart-subtitle">12-month rolling window · tons detected</div>
          <ResponsiveContainer width="100%" height={300}>
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
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="Plastic" stroke="#00E5FF" fill="url(#plasticGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="Oil" stroke="#FF5252" fill="url(#oilGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="Chemical" stroke="#00E676" fill="url(#chemGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-card" variants={fadeUp} custom={1}>
          <h3>Ocean Health</h3>
          <div className="chart-subtitle">Global health score · past 7 days</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis domain={[80, 100]} stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Recent Alerts */}
      <motion.div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 60px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="chart-card" variants={fadeUp}>
          <h3>Recent Alerts</h3>
          <div className="chart-subtitle">Latest AI-detected incidents</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {recentAlerts.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.location}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.time}</span>
                  <span className={`badge ${a.severity}`}>{a.severity.charAt(0).toUpperCase() + a.severity.slice(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
