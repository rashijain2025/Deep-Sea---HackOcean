import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar, MapPin, CheckCircle, Search, FileCode } from 'lucide-react';
import { fadeUp } from '../constants/animations';

import mockReports from '../mock-data/reports.json';

const Reports = React.memo(function Reports() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = useCallback((id, filename) => {
    setDownloadingId(id);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob(
        [`DeepSea Guardian Enterprise System Report - ${filename}\nExported on ${new Date().toLocaleDateString()}`],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${filename.replace(/\s+/g, '_')}_Report.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingId(null);
    }, 1200);
  }, []);

  const filteredReports = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return mockReports.filter(rep => {
      const matchesFilter = filter === 'All' || rep.category === filter;
      const matchesSearch = !q || rep.title.toLowerCase().includes(q) || rep.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  return (
    <div className="page-content" id="reports-page">
      <div className="page-header">
        <div className="label">Enterprise Data Vault</div>
        <h1>Environmental Reports Vault</h1>
        <p>Exportable intelligence catalogs, subsea telemetry logs, and monthly environmental health statements.</p>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-cyan-400" />
              CATEGORY:
            </span>
            {['All', 'Summary', 'Pollution', 'Biodiversity', 'Alerts', 'Monitoring'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex items-center w-full sm:w-auto">
            <Search size={14} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-950/60 border border-cyan-500/20 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <motion.div
        className="grid-2 section mb-8"
        initial="hidden"
        animate="visible"
      >
        {filteredReports.map((rep) => (
          <div key={rep.id} className="saas-card p-5 flex flex-col justify-between transition-all duration-200 hover:border-cyan-500/40">
            <div>
              <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                <span className="saas-badge saas-badge-info">
                  {rep.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar size={11} className="text-cyan-400" /> {rep.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-display mb-2">{rep.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{rep.description}</p>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 space-x-2">
                <span>FORMAT: <strong className="text-cyan-300">{rep.format}</strong></span>
                <span>•</span>
                <span>SIZE: {rep.size}</span>
              </div>

              <button
                onClick={() => handleDownload(rep.id, rep.title)}
                disabled={downloadingId !== null}
                className="saas-button-primary text-xs"
              >
                {downloadingId === rep.id ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={13} />
                    Download File
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Enterprise Audit Log & PDF Statements Table */}
      <div className="section pb-16">
        <div className="saas-card p-5">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white font-display">Executive Audit Log & Compliance Certifications</h3>
              <div className="text-xs text-slate-400 font-mono">Government & NGO data validation statements</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
              UN-SDG 14 CERTIFIED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-900/80 text-cyan-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Audit ID</th>
                  <th className="p-3">Statement Name</th>
                  <th className="p-3">Target Ocean Region</th>
                  <th className="p-3">Compliance Status</th>
                  <th className="p-3">Issued Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { id: 'AUD-2026-091', name: 'Q2 Global Microplastic Density Audit', region: 'North Atlantic Gyre', status: 'VERIFIED', date: '2026-07-20' },
                  { id: 'AUD-2026-088', name: 'Reef Health Telemetry Statement', region: 'Great Barrier Reef', status: 'COMPLIANT', date: '2026-07-15' },
                  { id: 'AUD-2026-084', name: 'Crude Oil Containment Certification', region: 'Gulf of Mexico', status: 'CERTIFIED', date: '2026-07-10' },
                  { id: 'AUD-2026-079', name: 'IUCN Endangered Species Census', region: 'Pacific Ocean Trench', status: 'VERIFIED', date: '2026-07-02' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300">{row.id}</td>
                    <td className="p-3 text-white font-sans">{row.name}</td>
                    <td className="p-3 text-slate-400">{row.region}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{row.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDownload(row.id, row.name)}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Reports;
