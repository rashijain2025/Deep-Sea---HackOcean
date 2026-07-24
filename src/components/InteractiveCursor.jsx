import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveCursor = React.memo(function InteractiveCursor() {
  const [bubbles, setBubbles] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Jellyfish swims smoothly with a slight delay
  const springConfig = { damping: 20, stiffness: 80, mass: 1.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let lastBubbleTime = 0;
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = Date.now();
      if (now - lastBubbleTime > 120) {
        const newBubble = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
        };
        setBubbles((prev) => [...prev.slice(-12), newBubble]);
        lastBubbleTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      
      {/* ─── Global Background Aquatic Animals & Objects ─── */}
      
      {/* 1. Sea Turtle swimming diagonally */}
      <motion.div
        className="absolute top-[10%] opacity-40 filter drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]"
        initial={{ x: '-20vw', y: '80vh' }}
        animate={{ x: '120vw', y: '-20vh', rotate: [20, 25, 18, 20] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear', delay: 2 }}
      >
        <svg width="80" height="56" viewBox="0 0 100 70" fill="none">
          <ellipse cx="50" cy="35" rx="28" ry="18" fill="#0b4f3b" stroke="#00ff9d" strokeWidth="1" />
          <ellipse cx="82" cy="35" rx="9" ry="6" fill="#147355" />
          {/* Flippers */}
          <motion.g animate={{ rotate: [0, -25, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '62px 22px' }}>
            <path d="M62,22 C75,5 82,2 78,14 C72,22 62,24 62,22 Z" fill="#147355" />
          </motion.g>
          <motion.g animate={{ rotate: [0, 25, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.25 }} style={{ transformOrigin: '62px 48px' }}>
            <path d="M62,48 C75,65 82,68 78,56 C72,48 62,46 62,48 Z" fill="#147355" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 2. School of glowing fish */}
      <motion.div
        className="absolute top-[60%]"
        initial={{ x: '120vw' }}
        animate={{ x: '-20vw', y: [0, 30, -20, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        <div className="flex gap-3 opacity-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i} width="24" height="10" viewBox="0 0 30 12" fill="#00e5ff"
              style={{ transform: `translate(${Math.sin(i) * 15}px, ${Math.cos(i) * 12}px)` }}
              animate={{ y: [0, -6, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <path d="M0,6 C6,1 18,1 24,6 C18,11 6,11 0,6 Z M24,6 L30,1 L28,6 L30,11 Z" />
            </motion.svg>
          ))}
        </div>
      </motion.div>

      {/* 3. Floating Subsea Drone (Object) */}
      <motion.div
        className="absolute bottom-[20%] left-[10%] opacity-30 filter drop-shadow-[0_0_12px_rgba(0,243,255,0.4)]"
        animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="40" width="60" height="20" rx="10" fill="#0f172a" stroke="#00f3ff" strokeWidth="2" />
          <circle cx="80" cy="50" r="4" fill="#00f3ff" className="animate-pulse" />
          <circle cx="20" cy="50" r="6" fill="#0f172a" stroke="#00f3ff" strokeWidth="2" />
          <motion.line x1="50" y1="40" x2="50" y2="20" stroke="#00ff9d" strokeWidth="2" animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <circle cx="50" cy="18" r="3" fill="#00ff9d" className="animate-ping" />
        </svg>
      </motion.div>

      {/* 4. Small drifting plastic bottle (pollution object warning) */}
      <motion.div
        className="absolute top-[30%]"
        initial={{ x: '-10vw' }}
        animate={{ x: '110vw', y: [0, -15, 10, 0], rotate: [0, 45, 90, 135] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="15" height="25" viewBox="0 0 20 35" fill="none" className="opacity-20">
          <rect x="5" y="2" width="10" height="4" rx="1" fill="#94a3b8" />
          <path d="M4,7 L16,7 L18,32 C18,34 16,35 14,35 L6,35 C4,35 2,34 2,32 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" />
        </svg>
      </motion.div>


      {/* ─── Glowing Bioluminescent Jellyfish Follower (Cursor) ─── */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: smoothX, y: smoothY }}
      >
        <div className="relative -ml-[25px] -mt-[35px] w-[50px] h-[70px]">
          <svg width="50" height="70" viewBox="0 0 80 120" fill="none" className="filter drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
            <motion.path
              d="M10,50 C10,15 30,5 40,5 C50,5 70,15 70,50 C60,55 50,52 40,55 C30,52 20,55 10,50 Z"
              fill="rgba(0,243,255,0.25)" stroke="rgba(0,243,255,0.9)" strokeWidth="2"
              animate={{ scaleY: [1, 0.85, 1], scaleX: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="40" cy="30" r="10" fill="#00ff9d" opacity="0.8" className="blur-[3px] animate-pulse" />
            <circle cx="40" cy="30" r="4" fill="#ffffff" opacity="0.9" className="blur-[1px]" />
            <motion.path d="M25,52 Q28,85 22,120" stroke="#00f3ff" strokeWidth="1.5" opacity="0.7" fill="none" animate={{ d: ["M25,52 Q35,85 22,120", "M25,52 Q15,85 28,120", "M25,52 Q35,85 22,120"] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M40,55 Q35,90 43,120" stroke="#00ff9d" strokeWidth="2" opacity="0.8" fill="none" animate={{ d: ["M40,55 Q45,90 35,120", "M40,55 Q35,90 45,120", "M40,55 Q45,90 35,120"] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M55,52 Q52,85 58,120" stroke="#00f3ff" strokeWidth="1.5" opacity="0.7" fill="none" animate={{ d: ["M55,52 Q45,85 62,120", "M55,52 Q65,85 50,120", "M55,52 Q45,85 62,120"] }} transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }} />
          </svg>
        </div>
      </motion.div>

      {/* Floating Bubbles Trail (From the Jellyfish) */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border border-cyan-300/40"
          style={{
            left: b.x - b.size / 2,
            top: b.y - b.size / 2,
            width: b.size,
            height: b.size,
            background: 'rgba(0,255,157,0.15)'
          }}
          initial={{ opacity: 0.9, scale: 0.5, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 1.8,
            y: -180,
            x: (Math.random() - 0.5) * 60
          }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
});

export default InteractiveCursor;
