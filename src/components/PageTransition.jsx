import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════════════
   PageTransition — Immersive Contextual Transitions
   
   Selects a random immersive transition style between pages:
   1. submarine: Travel through deep water with speed lines
   2. sonar: Expanding sonar ring wipe
   3. hologram: Digital sci-fi glitch grid
   4. current: Ocean current bubbles sweeping across
   ═══════════════════════════════════════════════════════════════════════════ */

const TRANSITION_TYPES = ['submarine', 'sonar', 'hologram', 'current'];

export default function PageTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayKey, setDisplayKey] = useState(location.key);
  const [transitionType, setTransitionType] = useState('submarine');
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      setDisplayChildren(children);
      return;
    }

    prevPath.current = location.pathname;
    
    // Pick a random transition type
    const randomType = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
    setTransitionType(randomType);
    
    setIsTransitioning(true);

    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
      setDisplayKey(location.key);
    }, 400); // Swap content mid-transition

    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // 1s total transition time

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname, children]);

  return (
    <div className="relative flex-1 flex flex-col">
      {/* ─── Page Content ─── */}
      <motion.div
        key={displayKey}
        className="flex-1"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          filter: isTransitioning ? 'blur(4px)' : 'blur(0px)',
          scale: isTransitioning ? 0.98 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {displayChildren}
      </motion.div>

      {/* ─── Immersive Overlays ─── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* TYPE 1: SUBMARINE NAVIGATION */}
            {transitionType === 'submarine' && (
              <>
                <motion.div className="absolute inset-0 bg-ocean-abyss/80" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 0.8 }} />
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-[1px] rounded-full bg-cyan-400/40"
                      style={{ top: `${Math.random() * 100}%`, width: `${20 + Math.random() * 30}%` }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 0.4, delay: i * 0.03, ease: 'linear' }}
                    />
                  ))}
                </div>
                <motion.div initial={{ x: -100 }} animate={{ x: 100 }} transition={{ duration: 0.6 }} className="relative z-10 filter drop-shadow-[0_0_15px_#00f3ff]">
                  <svg width="80" height="40" viewBox="0 0 100 50" fill="none">
                    <rect x="25" y="15" width="50" height="20" rx="8" fill="#0f172a" stroke="#00f3ff" strokeWidth="1.5" />
                    <circle cx="75" cy="25" r="5" fill="#00f3ff" />
                    <line x1="50" y1="15" x2="50" y2="5" stroke="#00f3ff" strokeWidth="1" />
                    <circle cx="50" cy="4" r="2" fill="#00ff9d" />
                  </svg>
                </motion.div>
                <div className="absolute bottom-10 font-mono text-[10px] text-cyan-400 tracking-[4px]">NAVIGATING SUBMARINE...</div>
              </>
            )}

            {/* TYPE 2: SONAR SCAN WIPE */}
            {transitionType === 'sonar' && (
              <>
                <motion.div className="absolute inset-0 bg-emerald-950/80 mix-blend-color-dodge" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8 }} />
                <motion.div 
                  className="absolute rounded-full border-4 border-emerald-400/60 shadow-[0_0_40px_#00ff9d]"
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: '150vw', height: '150vw', opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <div className="absolute bottom-10 font-mono text-[10px] text-emerald-400 tracking-[4px]">SONAR SCAN ACTIVE</div>
              </>
            )}

            {/* TYPE 3: HOLOGRAPHIC GLITCH */}
            {transitionType === 'hologram' && (
              <>
                <motion.div className="absolute inset-0 bg-cyan-950/90 mix-blend-screen" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8 }} />
                <div className="absolute inset-0 eco-hologram-grid opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-between">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="h-2 bg-cyan-400/40 w-full"
                      initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1 }}
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 0.3, delay: Math.random() * 0.4 }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-10 font-mono text-[10px] text-cyan-300 tracking-[4px]">RECALIBRATING HOLOGRAMS</div>
              </>
            )}

            {/* TYPE 4: OCEAN CURRENT */}
            {transitionType === 'current' && (
              <>
                <motion.div className="absolute inset-0 bg-blue-950/80" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 0.8 }} />
                <div className="absolute inset-0">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-cyan-200/50"
                      style={{ 
                        top: `${Math.random() * 100}%`, 
                        width: `${Math.random() * 10 + 4}px`, 
                        height: `${Math.random() * 10 + 4}px`,
                        filter: 'blur(1px)'
                      }}
                      initial={{ x: '-10vw' }}
                      animate={{ x: '110vw', y: `+=${Math.random() * 100 - 50}px` }}
                      transition={{ duration: 0.5 + Math.random() * 0.3, ease: 'linear' }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-10 font-mono text-[10px] text-cyan-100 tracking-[4px]">RIDING CURRENT...</div>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
