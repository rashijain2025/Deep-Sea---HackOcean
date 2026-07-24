import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar, MapPin, CheckCircle, Search, FileCode } from 'lucide-react';

import mockReports from '../mock-data/reports.json';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Reports = React.memo(function Reports() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = (id, filename) => {
    setDownloadingId(id);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([`DeepSea Guardian Enterprise System Report - ${filename}\nExported on ${new Date().toLocaleDateString()}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${filename.replace(/\s+/g, '_')}_Report.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingId(null);
    }, 1200);
  };

  const filteredReports = mockReports.filter(rep => {
    const matchesFilter = filter === 'All' || rep.category === filter;
    const matchesSearch = rep.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rep.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        className="grid-2 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {filteredReports.map((rep, i) => (
          <motion.div key={rep.id} className="saas-card p-5 flex flex-col justify-between" variants={fadeUp} custom={i}>
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export default Reports;
