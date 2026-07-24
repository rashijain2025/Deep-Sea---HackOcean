import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldAlert, Cpu, BarChart3, Filter, Calendar, Layers, Activity, AlertTriangle, CheckCircle2, Waves, Compass, Radio } from 'lucide-react';
import { fadeUp } from '../constants/animations';

export const Analytics = React.memo(function Analytics() {
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
        {/* Pollution Trends Spectrum */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Pollution Trends Spectrum</h3>
                <div className="text-xs text-slate-400 font-mono">12-month rolling telemetry window (tons detected)</div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                460 TONS DETECTED
              </span>
            </div>

            <div className="space-y-3.5 my-4">
              {[
                { name: 'Plastic Accumulation', val: '460 Tons', pct: 75, color: 'bg-cyan-400' },
                { name: 'Crude Oil Signature', val: '60 Tons', pct: 25, color: 'bg-red-400' },
                { name: 'Chemical Runoff Plumes', val: '98 Tons', pct: 40, color: 'bg-emerald-400' },
                { name: 'Microplastic Particles', val: '310 Tons', pct: 60, color: 'bg-indigo-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className="text-white font-bold">{item.val}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>SATELLITE & SONAR SYNCHRONIZED</span>
            <span className="text-cyan-400">UPDATED TODAY ✓</span>
          </div>
        </div>

        {/* Ocean Health Index Meter */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Ocean Health Index Dynamics</h3>
                <div className="text-xs text-slate-400 font-mono">Monthly composite health score trajectory</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                SCORE: 92/100
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 my-4">
              {[
                { month: 'Jan', score: 85 }, { month: 'Mar', score: 87 },
                { month: 'May', score: 87 }, { month: 'Jul', score: 90 },
                { month: 'Sep', score: 91 }, { month: 'Dec', score: 92 },
              ].map((m, idx) => (
                <div key={idx} className="flex flex-col items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-sm font-bold text-cyan-300 font-display mb-1">{m.score}</div>
                  <div className="w-full h-16 bg-slate-950 rounded flex items-end p-1">
                    <div className="w-full bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-sm" style={{ height: `${m.score}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-2">{m.month}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>GLOBAL WATER COMPOSITE</span>
            <span className="text-emerald-400">INDEX: EXCELLENT</span>
          </div>
        </div>
      </div>

      {/* Row 2: Species Population & Regional Threat Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-6">
        {/* Species Tagging Dynamics */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Species Population Dynamics</h3>
                <div className="text-xs text-slate-400 font-mono">Acoustic & visual telemetry census</div>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/30">
                19,900 TAGS ACTIVE
              </span>
            </div>

            <div className="space-y-3.5 my-4">
              {[
                { species: 'Sea Turtles (Tag #TUR-900)', count: '12,400 tracked', pct: 85, color: 'bg-emerald-400' },
                { species: 'Blue Whales (Tag #WHL-400)', count: '2,100 tracked', pct: 65, color: 'bg-amber-400' },
                { species: 'Great White Sharks (Tag #SHK-120)', count: '5,400 tracked', pct: 78, color: 'bg-cyan-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300 font-medium">{item.species}</span>
                    <span className="text-white font-bold">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>ACOUSTIC BEACON ARRAY</span>
            <span className="text-indigo-400">IUCN VERIFIED ✓</span>
          </div>
        </div>

        {/* Regional Threat Risk Matrix */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Regional Risk Matrix</h3>
                <div className="text-xs text-slate-400 font-mono">Subsea regional vulnerability breakdown</div>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                5 SECTORS AUDITED
              </span>
            </div>

            <div className="space-y-3 my-3">
              {[
                { region: 'Gulf of Mexico', pollution: 90, status: 'CRITICAL', color: 'border-red-500/40 bg-red-950/20 text-red-400' },
                { region: 'Arabian Sea', pollution: 85, status: 'HIGH RISK', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400' },
                { region: 'North Sea', pollution: 55, status: 'MODERATE', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400' },
                { region: 'Indian Ocean Deep', pollution: 40, status: 'STABLE', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
                { region: 'Pacific Trench', pollution: 30, status: 'OPTIMAL', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
              ].map((r, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg border ${r.color} flex justify-between items-center text-xs font-mono`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="font-bold text-white font-sans">{r.region}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">Risk Index: {r.pollution}%</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-900/90 text-[10px]">{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>SUBSEA VULNERABILITY MODEL</span>
            <span className="text-cyan-400">NEURAL EVALUATION ON</span>
          </div>
        </div>
      </div>

      {/* Row 3: Plastic Breakdown & Coral Vitality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section mb-12">
        {/* Plastic Debris Composition */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Plastic Debris Classification</h3>
                <div className="text-xs text-slate-400 font-mono">Percentage composition by waste category</div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                100% CATEGORIZED
              </span>
            </div>

            <div className="space-y-3.5 my-4">
              {[
                { name: 'Microplastics (<5mm)', pct: 45, color: 'bg-cyan-400' },
                { name: 'Macroplastics (Bottles/Containers)', pct: 25, color: 'bg-sky-400' },
                { name: 'Abandoned Ghost Nets', pct: 15, color: 'bg-amber-400' },
                { name: 'Industrial Chemical Packaging', pct: 10, color: 'bg-red-400' },
                { name: 'Other Subsea Waste', pct: 5, color: 'bg-purple-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className="text-white font-bold">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>SPECTRAL AI ANALYSIS</span>
            <span className="text-cyan-400 font-bold">CLASSIFIED ✓</span>
          </div>
        </div>

        {/* Coral Reef Barrier Vitality Scorecard */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Coral Reef Barrier Vitality</h3>
                <div className="text-xs text-slate-400 font-mono">Health score index rating by reef system</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                6 REEFS MONITORED
              </span>
            </div>

            <div className="space-y-3 my-3">
              {[
                { reef: 'Red Sea Barrier Reef', score: 82, status: 'THRIVING', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
                { reef: 'Caribbean Coral Reef', score: 78, status: 'STABLE', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
                { reef: 'Hawaii Reef System', score: 74, status: 'MODERATE', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400' },
                { reef: 'Great Barrier Reef', score: 71, status: 'MODERATE', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400' },
                { reef: 'Maldives Barrier Reef', score: 68, status: 'BLEACHING RISK', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400' },
                { reef: 'Lakshadweep Reef', score: 65, status: 'BLEACHING RISK', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400' },
              ].map((c, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg border ${c.color} flex justify-between items-center text-xs font-mono`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="font-bold text-white font-sans">{c.reef}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">Score: {c.score}/100</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-900/90 text-[10px]">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/60">
            <span>THERMAL SENSING RIG</span>
            <span className="text-emerald-400 font-bold">REEF-GUARD ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Analytics;
