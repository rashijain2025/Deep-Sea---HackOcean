import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, ShieldAlert, Activity, Navigation, Radio, Filter, Search, CheckCircle, Crosshair } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const regions = [
  { id: 'reg-1', name: 'Arabian Sea (Sector A-14)', lat: 18.7, lng: 68.2, threat: 'critical', plastic: 'High (420 kg/km²)', oil: 'Active Plume Detected', coralScore: '45/100 (Severe Bleaching)', species: 45, depth: '140m', riskScore: 89 },
  { id: 'reg-2', name: 'Lakshadweep Barrier Reef', lat: 10.5, lng: 72.6, threat: 'medium', plastic: 'Moderate (180 kg/km²)', oil: 'Clear', coralScore: '65/100 (Thermal Stress)', species: 120, depth: '28m', riskScore: 58 },
  { id: 'reg-3', name: 'Gulf of Mexico Hydro-Vent', lat: 25.1, lng: -90.2, threat: 'critical', plastic: 'Extreme (580 kg/km²)', oil: 'Crude Oil Slick Spill', coralScore: '40/100 (Degraded)', species: 78, depth: '420m', riskScore: 94 },
  { id: 'reg-4', name: 'North Sea Marine Sanctuary', lat: 56.2, lng: 3.1, threat: 'medium', plastic: 'Moderate (210 kg/km²)', oil: 'Trace Harmonics', coralScore: '70/100 (Stable)', species: 64, depth: '85m', riskScore: 48 },
  { id: 'reg-5', name: 'South Pacific Marine Sanctuary', lat: -12.4, lng: -165.9, threat: 'safe', plastic: 'Low (12 kg/km²)', oil: 'Clear', coralScore: '92/100 (Thriving)', species: 210, depth: '1,200m', riskScore: 12 },
  { id: 'reg-6', name: 'Great Barrier Outer Slope', lat: -18.3, lng: 147.7, threat: 'critical', plastic: 'High (340 kg/km²)', oil: 'Clear', coralScore: '52/100 (Active Bleaching)', species: 320, depth: '45m', riskScore: 84 },
  { id: 'reg-7', name: 'Bay of Bengal Deep Trench', lat: 15.0, lng: 85.0, threat: 'medium', plastic: 'Moderate (290 kg/km²)', oil: 'Trace Hydrocarbons', coralScore: '68/100 (Moderate)', species: 95, depth: '680m', riskScore: 62 },
  { id: 'reg-8', name: 'Southern Indian Ocean Abyssal', lat: -5.0, lng: 60.0, threat: 'safe', plastic: 'Low (18 kg/km²)', oil: 'Clear', coralScore: '88/100 (Optimal)', species: 180, depth: '2,400m', riskScore: 15 },
];

const threatColors = {
  critical: { color: '#ef4444', fillOpacity: 0.4, border: '#f87171' },
  medium: { color: '#f59e0b', fillOpacity: 0.35, border: '#fbbf24' },
  safe: { color: '#10b981', fillOpacity: 0.35, border: '#34d399' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function OceanMap() {
  const [filterThreat, setFilterThreat] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dispatchedId, setDispatchedId] = useState(null);

  const filteredRegions = regions.filter(r => {
    const matchesThreat = filterThreat === 'all' || r.threat === filterThreat;
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesThreat && matchesSearch;
  });

  const handleDispatchDrone = (id) => {
    setDispatchedId(id);
    setTimeout(() => {
      setDispatchedId(null);
      alert(`Autonomous Remediation Submarine dispatched to station: ${selectedRegion.name}`);
    }, 1500);
  };

  return (
    <div className="page-content" id="ocean-map-page">
      <div className="page-header">
        <div className="label">Global Monitoring Network</div>
        <h1>Ocean Intelligence Map</h1>
        <p>Interactive satellite & subsea telemetry plotting pollution hotspots, bleaching risks, and protected sanctuaries.</p>
      </div>

      {/* Map Control Filter Bar */}
      <div className="section mb-6">
        <div className="saas-card p-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-cyan-400" />
              FILTER THREAT:
            </span>
            {[
              { id: 'all', label: 'All Stations' },
              { id: 'critical', label: 'Critical Spills' },
              { id: 'medium', label: 'Medium Risk' },
              { id: 'safe', label: 'Safe Sanctuaries' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterThreat(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  filterThreat === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search station or sea..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-950/60 border border-cyan-500/20 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-60"
            />
          </div>
        </div>
      </div>

      {/* Primary Map & Subsea Inspector Grid */}
      <div className="map-wrapper">
        <motion.div
          className="map-layout"
          initial="hidden"
          animate="visible"
        >
          {/* Map Viewport Container */}
          <motion.div className="map-container relative shadow-2xl" variants={fadeUp} custom={0}>
            <MapContainer
              center={[20, 40]}
              zoom={3}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={true}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='© OpenStreetMap · DeepSea Guardian'
              />
              {filteredRegions.map((r) => {
                const tc = threatColors[r.threat];
                const isSelected = selectedRegion && selectedRegion.id === r.id;
                return (
                  <CircleMarker
                    key={r.id}
                    center={[r.lat, r.lng]}
                    radius={isSelected ? 16 : r.threat === 'critical' ? 13 : r.threat === 'medium' ? 10 : 8}
                    eventHandlers={{
                      click: () => setSelectedRegion(r)
                    }}
                    pathOptions={{
                      color: isSelected ? '#00f3ff' : tc.border,
                      fillColor: tc.color,
                      fillOpacity: isSelected ? 0.7 : tc.fillOpacity,
                      weight: isSelected ? 3 : 2,
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-slate-900 min-w-[170px]">
                        <strong className="text-sm block font-bold">{r.name}</strong>
                        <div className="text-xs mt-1 space-y-0.5">
                          <div>Threat: <span className="font-bold uppercase" style={{ color: tc.color }}>{r.threat}</span></div>
                          <div>Plastic: {r.plastic}</div>
                          <div>Risk Score: {r.riskScore}/100</div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </motion.div>

          {/* Subsea Telemetry Inspector Side Panel */}
          <motion.div className="map-sidebar" variants={fadeUp} custom={1}>
            {selectedRegion ? (
              <div className="saas-card p-5 flex flex-col justify-between h-full border-cyan-500/30">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Crosshair size={16} className="text-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">
                        SUBSEA INSPECTOR
                      </span>
                    </div>
                    <span className={`saas-badge saas-badge-${selectedRegion.threat === 'critical' ? 'critical' : selectedRegion.threat === 'medium' ? 'warning' : 'success'}`}>
                      {selectedRegion.threat.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 font-display">
                    {selectedRegion.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-5 flex items-center gap-2">
                    <MapPin size={12} className="text-cyan-400" />
                    <span>LAT: {selectedRegion.lat}°N | LON: {selectedRegion.lng}°E</span>
                  </div>

                  {/* Telemetry Parameter Grid */}
                  <div className="space-y-3 text-xs mb-6">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Risk Score Index:</span>
                      <span className="font-mono font-bold text-red-400">{selectedRegion.riskScore}/100</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Plastic Accumulation:</span>
                      <span className="font-mono font-bold text-amber-300">{selectedRegion.plastic}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Oil Spill Signature:</span>
                      <span className={`font-mono font-bold ${selectedRegion.oil.includes('Active') || selectedRegion.oil.includes('Slick') ? 'text-red-400' : 'text-emerald-400'}`}>
                        {selectedRegion.oil}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Coral Reef Vitality:</span>
                      <span className="font-mono font-bold text-cyan-300">{selectedRegion.coralScore}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Species Census Count:</span>
                      <span className="font-mono font-bold text-emerald-400">{selectedRegion.species} cataloged</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleDispatchDrone(selectedRegion.id)}
                    disabled={dispatchedId !== null}
                    className="w-full saas-button-primary justify-center py-2.5"
                  >
                    {dispatchedId === selectedRegion.id ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Dispatching Submarine...
                      </>
                    ) : (
                      <>
                        <Radio size={14} />
                        Dispatch Remediation Submarine
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="saas-card p-5 text-center flex flex-col items-center justify-center h-full text-slate-400">
                <MapPin size={32} className="text-cyan-400/40 mb-2" />
                <p className="text-xs">Click any station marker on the map to inspect live subsea telemetry.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}
