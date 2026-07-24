import React from 'react';
import { motion } from 'framer-motion';

const species = [
  { name: 'Sea Turtle', region: 'Indo-Pacific', status: 'vulnerable', health: 78, population: '12,400', emoji: '🐢' },
  { name: 'Blue Whale', region: 'North Atlantic', status: 'endangered', health: 62, population: '2,100', emoji: '🐋' },
  { name: 'Coral Reef', region: 'Great Barrier', status: 'threatened', health: 71, population: '8,600 ha', emoji: '🪸' },
  { name: 'Shark', region: 'Global Pelagic', status: 'stable', health: 84, population: '5,400', emoji: '🦈' },
  { name: 'Dolphin', region: 'Coastal Waters', status: 'stable', health: 88, population: '9,800', emoji: '🐬' },
  { name: 'Sea Otter', region: 'North Pacific', status: 'vulnerable', health: 74, population: '3,200', emoji: '🦦' },
];

const getBarColor = (health) => {
  if (health >= 80) return 'green';
  if (health >= 70) return 'blue';
  return 'orange';
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Biodiversity() {
  return (
    <div className="page-content" id="biodiversity-page">
      <div className="page-header">
        <div className="label">Marine Census</div>
        <h1>Biodiversity Atlas</h1>
        <p>A living census of the species we protect — with health signals updated in near real time.</p>
      </div>

      <motion.div
        className="grid-3 section"
        initial="hidden"
        animate="visible"
        style={{ paddingBottom: 60 }}
      >
        {species.map((s, i) => (
          <motion.div key={s.name} className="species-card" variants={fadeUp} custom={i}>
            <div className="species-card-header">
              <span className="species-emoji">{s.emoji}</span>
              <span className={`badge ${s.status}`}>
                {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
              </span>
            </div>
            <h3>{s.name}</h3>
            <div className="species-region">{s.region}</div>

            <div className="health-bar-wrapper">
              <span>Health score</span>
              <span>{s.health}/100</span>
            </div>
            <div className="health-bar">
              <div
                className={`health-bar-fill ${getBarColor(s.health)}`}
                style={{ width: `${s.health}%` }}
              />
            </div>

            <div className="species-stats">
              <div className="species-stat">
                <div className="stat-label">Population</div>
                <div className="stat-value">{s.population}</div>
              </div>
              <div className="species-stat">
                <div className="stat-label">Region</div>
                <div className="stat-value">{s.region}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
