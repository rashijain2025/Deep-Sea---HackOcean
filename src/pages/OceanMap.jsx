import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

const regions = [
  { name: 'Arabian Sea', lat: 18.7, lng: 68.2, threat: 'critical', plastic: 'High', oil: 'Detected', species: 45 },
  { name: 'Lakshadweep Reef', lat: 10.5, lng: 72.6, threat: 'medium', plastic: 'Medium', oil: 'Clear', species: 120 },
  { name: 'Gulf of Mexico', lat: 25.1, lng: -90.2, threat: 'critical', plastic: 'High', oil: 'Spill active', species: 78 },
  { name: 'North Sea', lat: 56.2, lng: 3.1, threat: 'medium', plastic: 'Medium', oil: 'Clear', species: 64 },
  { name: 'South Pacific', lat: -12.4, lng: -165.9, threat: 'safe', plastic: 'Low', oil: 'Clear', species: 210 },
  { name: 'Great Barrier Reef', lat: -18.3, lng: 147.7, threat: 'critical', plastic: 'Medium', oil: 'Clear', species: 320 },
  { name: 'Bay of Bengal', lat: 15.0, lng: 85.0, threat: 'medium', plastic: 'Medium', oil: 'Trace', species: 95 },
  { name: 'Indian Ocean', lat: -5.0, lng: 60.0, threat: 'safe', plastic: 'Low', oil: 'Clear', species: 180 },
];

const threatColors = {
  critical: { color: '#FF5252', fillOpacity: 0.35 },
  medium: { color: '#FFD600', fillOpacity: 0.3 },
  safe: { color: '#00E676', fillOpacity: 0.3 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function OceanMap() {
  return (
    <div className="page-content" id="ocean-map-page">
      <div className="page-header">
        <div className="label">Global Monitoring</div>
        <h1>Ocean Intelligence Map</h1>
        <p>Live threat markers across all monitoring stations.</p>
      </div>

      <div className="map-wrapper">
        <motion.div
          className="map-layout"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="map-container" variants={fadeUp} custom={0}>
            <MapContainer
              center={[20, 60]}
              zoom={3}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={true}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='© OpenStreetMap · DeepSea Guardian'
              />
              {regions.map((r, i) => {
                const tc = threatColors[r.threat];
                return (
                  <CircleMarker
                    key={i}
                    center={[r.lat, r.lng]}
                    radius={r.threat === 'critical' ? 14 : r.threat === 'medium' ? 11 : 9}
                    pathOptions={{
                      color: tc.color,
                      fillColor: tc.color,
                      fillOpacity: tc.fillOpacity,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div style={{ color: '#041C32', minWidth: 160 }}>
                        <strong style={{ fontSize: 14 }}>{r.name}</strong>
                        <div style={{ fontSize: 12, marginTop: 6 }}>
                          <div>Plastic: {r.plastic}</div>
                          <div>Oil: {r.oil}</div>
                          <div>Species: {r.species}</div>
                          <div style={{ marginTop: 4, fontWeight: 600, color: tc.color }}>
                            Threat: {r.threat.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </motion.div>

          <motion.div className="map-sidebar" variants={fadeUp} custom={1}>
            <div className="legend-card">
              <h3>Legend</h3>
              <div className="legend-item">
                <span className="legend-dot red" />
                <div>
                  <h4>Critical / High</h4>
                  <p>Immediate response required</p>
                </div>
              </div>
              <div className="legend-item">
                <span className="legend-dot yellow" />
                <div>
                  <h4>Medium Pollution</h4>
                  <p>Monitored closely</p>
                </div>
              </div>
              <div className="legend-item">
                <span className="legend-dot green" />
                <div>
                  <h4>Safe Zone</h4>
                  <p>Within healthy thresholds</p>
                </div>
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-label">Tip</div>
              <p>Click any marker to inspect location intelligence — plastic density, oil status, coral score and species tally.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div style={{ height: 60 }} />
    </div>
  );
}
