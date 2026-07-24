import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldAlert, Cpu, BarChart3, Filter, Calendar, Layers, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { LazyChart } from '../components/LazyChart';
import { fadeUp } from '../constants/animations';
import { chartTooltipStyle as tooltipStyle } from '../constants/chartTheme';

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

const oceanHealthData = [
  { month: 'Jan', score: 85 }, { month: 'Feb', score: 86 },
  { month: 'Mar', score: 87 }, { month: 'Apr', score: 88 },
  { month: 'May', score: 87 }, { month: 'Jun', score: 89 },
  { month: 'Jul', score: 90 }, { month: 'Aug', score: 89 },
  { month: 'Sep', score: 91 }, { month: 'Oct', score: 90 },
  { month: 'Nov', score: 92 }, { month: 'Dec', score: 92 },
];

const speciesData = [
  { month: 'Jan', turtles: 11200, whales: 1900, sharks: 4800 },
  { month: 'Mar', turtles: 11500, whales: 1950, sharks: 4900 },
  { month: 'May', turtles: 11800, whales: 2000, sharks: 5000 },
  { month: 'Jul', turtles: 12000, whales: 2050, sharks: 5100 },
  { month: 'Sep', turtles: 12200, whales: 2080, sharks: 5200 },
  { month: 'Nov', turtles: 12400, whales: 2100, sharks: 5400 },
];

const riskData = [
  { region: 'Arabian Sea', pollution: 85, biodiversity: 60, coral: 45 },
  { region: 'North Sea', pollution: 55, biodiversity: 75, coral: 70 },
  { region: 'Pacific', pollution: 30, biodiversity: 90, coral: 85 },
  { region: 'Gulf of Mexico', pollution: 90, biodiversity: 50, coral: 40 },
  { region: 'Indian Ocean', pollution: 40, biodiversity: 85, coral: 80 },
];

const plasticDist = [
  { name: 'Microplastic', value: 45, color: '#00E5FF' },
  { name: 'Macroplastic', value: 25, color: '#40C4FF' },
  { name: 'Ghost Nets', value: 15, color: '#FF9800' },
  { name: 'Industrial', value: 10, color: '#FF5252' },
  { name: 'Other', value: 5, color: '#CE93D8' },
];

const coralHealth = [
  { reef: 'Great Barrier', health: 71 },
  { reef: 'Lakshadweep', health: 65 },
  { reef: 'Caribbean', health: 78 },
  { reef: 'Red Sea', health: 82 },
  { reef: 'Maldives', health: 68 },
  { reef: 'Hawaii', health: 74 },
];

const Analytics = React.memo(function Analytics() {
  const [timeRange, setTimeRange] = useState('12M');
  const [activeRegion, setActiveRegion] = useState('Global');

  return (
    <div className="page-content" id="analytics-page">
      <div className="page-header">
        <div className="label">Deep Telemetry Analytics</div>
        <h1>Enterprise Ocean Analytics</h1>
        <p>Comprehensive environmental synthesis across all monitoring stations, satellite feeds, and subsea nodes.</p>
      </div>

      {/* Control Toolbar & Filters */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Calendar size={14} className="text-cyan-400" />
              TIMEFRAME:
            </span>
            {['30D', '90D', '12M', 'YTD', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-cyan-400" />
              REGION:
            </span>
            {['Global', 'Pacific', 'Atlantic', 'Indian', 'Arctic'].map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeRegion === reg
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(0,255,157,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 section mb-6">
        {[
          { label: 'Debris Volume Tracked', val: '4,180 Tons', change: '+4.2% YOY', icon: TrendingUp, color: 'text-cyan-400 border-cyan-500/30' },
          { label: 'Ocean Health Composite', val: '92 / 100', change: '+2.1 pts', icon: Activity, color: 'text-emerald-400 border-emerald-500/30' },
          { label: 'Species Census Total', val: '19,900 Tags', change: '+890 new', icon: CheckCircle2, color: 'text-indigo-400 border-indigo-500/30' },
          { label: 'High Threat Hotspots', val: '3 Sectors', change: '-1 from Q2', icon: AlertTriangle, color: 'text-amber-400 border-amber-500/30' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className={`saas-card p-4 flex flex-col justify-between border ${kpi.color}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-400 font-semibold">{kpi.label}</span>
                <Icon size={16} className={kpi.color.split(' ')[0]} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-display">{kpi.val}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">{kpi.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable Executive Insights Bar */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex items-center justify-between flex-wrap gap-4 border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles size={20} className="animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">AI ANALYTICS INSIGHT</div>
              <div className="text-sm text-slate-200">
                Plastic accumulation in Arabian Sea & Gulf of Mexico peaks in Q3. Subsea drone deployment mitigated 18% of coastal spill spread.
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            CONFIDENCE: 98.4%
          </div>
        </div>
      </div>

      {/* Row 1: Pollution Trends & Ocean Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-6">
        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Pollution Trends Spectrum</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">12-month rolling window (Tons of Debris Detected)</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={pollutionData}>
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="Plastic" stroke="#00E5FF" fill="url(#pg)" strokeWidth={2} />
                <Area type="monotone" dataKey="Oil" stroke="#FF5252" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="Chemical" stroke="#00E676" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>

        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Ocean Health Composite Score</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Global composite index over 12 months</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={oceanHealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis domain={[80, 95]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={2.5} dot={{ fill: '#00E5FF', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>
      </div>

      {/* Row 2: Species Population & Threat Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-6">
        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Species Population Dynamics</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Acoustic & visual tagging count</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={speciesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="turtles" fill="#00E676" radius={[4,4,0,0]} name="Sea Turtles" />
                <Bar dataKey="sharks" fill="#00E5FF" radius={[4,4,0,0]} name="Sharks" />
                <Bar dataKey="whales" fill="#FF9800" radius={[4,4,0,0]} name="Blue Whales" />
              </BarChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>

        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Regional Risk Matrix</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Radar subsea vulnerability rating</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={riskData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="region" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.15)" fontSize={10} />
                <Tooltip contentStyle={tooltipStyle} />
                <Radar name="Pollution" dataKey="pollution" stroke="#FF5252" fill="#FF5252" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Biodiversity" dataKey="biodiversity" stroke="#00E676" fill="#00E676" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Coral" dataKey="coral" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.1} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>
      </div>

      {/* Row 3: Plastic Breakdown & Coral Vitality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-12">
        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Plastic Debris Classification</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Percentage breakdown by debris type</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={plasticDist} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {plasticDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>

        <div className="saas-card p-5">
          <h3 className="text-base font-bold text-white font-display mb-1">Coral Barrier Vitality Ratings</h3>
          <div className="text-xs text-slate-400 mb-4 font-mono">Health score rating by barrier reef</div>
          <LazyChart height={280}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={coralHealth} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis type="category" dataKey="reef" stroke="rgba(255,255,255,0.3)" fontSize={11} width={100} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="health" radius={[0,4,4,0]} fill="#00E5FF">
                  {coralHealth.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.health >= 75 ? '#00E676' : entry.health >= 65 ? '#FFD600' : '#FF5252'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </LazyChart>
        </div>
      </div>
    </div>
  );
});

export default Analytics;
