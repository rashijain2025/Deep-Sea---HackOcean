import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   OceanBackground — Immersive deep-sea underwater atmosphere
   Canvas-rendered caustic light + CSS particle layers
   ═══════════════════════════════════════════════════════════ */

export default function OceanBackground() {
  const causticRef = useRef(null);

  useEffect(() => {
    const canvas = causticRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Caustic light network — simulates underwater light refraction */
    const drawCaustics = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      /* Layer 1: large soft caustic blobs */
      for (let i = 0; i < 6; i++) {
        const x = W * (0.15 + 0.14 * i) + Math.sin(t * 0.3 + i * 1.8) * 60;
        const y = H * 0.2 + Math.cos(t * 0.25 + i * 2.1) * 80;
        const r = 180 + Math.sin(t * 0.2 + i) * 40;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(0,229,255,0.045)');
        grad.addColorStop(0.5, 'rgba(0,180,220,0.02)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      /* Layer 2: caustic light network lines */
      ctx.save();
      ctx.globalAlpha = 0.035;
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1;
      const cols = 12;
      const rows = 8;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = (W / cols) * i + Math.sin(t * 0.4 + i * 0.7 + j * 0.5) * 30;
          const by = (H / rows) * j + Math.cos(t * 0.35 + j * 0.8 + i * 0.3) * 25;
          // connect to neighbor
          const nx = (W / cols) * (i + 1) + Math.sin(t * 0.4 + (i + 1) * 0.7 + j * 0.5) * 30;
          const ny = (H / rows) * j + Math.cos(t * 0.35 + j * 0.8 + (i + 1) * 0.3) * 25;
          const ny2 = (H / rows) * (j + 1) + Math.cos(t * 0.35 + (j + 1) * 0.8 + i * 0.3) * 25;
          const bx2 = (W / cols) * i + Math.sin(t * 0.4 + i * 0.7 + (j + 1) * 0.5) * 30;

          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.quadraticCurveTo((bx + nx) / 2 + Math.sin(t * 0.5 + i + j) * 15, (by + ny) / 2, nx, ny);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.quadraticCurveTo((bx + bx2) / 2, (by + ny2) / 2 + Math.cos(t * 0.45 + i + j) * 12, bx2, ny2);
          ctx.stroke();
        }
      }
      ctx.restore();

      /* Layer 3: bright god ray streaks from surface */
      ctx.save();
      for (let i = 0; i < 5; i++) {
        const rayX = W * (0.1 + 0.2 * i) + Math.sin(t * 0.15 + i * 2) * 40;
        const rayW = 40 + Math.sin(t * 0.3 + i) * 15;
        const alpha = 0.03 + Math.sin(t * 0.2 + i * 1.5) * 0.015;
        const grad = ctx.createLinearGradient(rayX, 0, rayX, H * 0.8);
        grad.addColorStop(0, `rgba(0,229,255,${alpha * 2.5})`);
        grad.addColorStop(0.3, `rgba(0,200,240,${alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(rayX - rayW / 2, 0);
        ctx.lineTo(rayX + rayW / 2, 0);
        ctx.lineTo(rayX + rayW * 1.5 + Math.sin(t * 0.2) * 20, H * 0.8);
        ctx.lineTo(rayX - rayW * 0.5 + Math.sin(t * 0.2) * 20, H * 0.8);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      t += 0.008;
      animId = requestAnimationFrame(drawCaustics);
    };

    drawCaustics();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="ocean-bg" aria-hidden="true">
      {/* Deep ocean gradient base */}
      <div className="ocean-depth-gradient" />

      {/* Canvas caustic light network */}
      <canvas ref={causticRef} className="caustic-canvas" />

      {/* Animated water surface at top */}
      <div className="water-surface">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="surfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,229,255,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path className="wave-path-1" d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,0 L0,0 Z" fill="url(#surfGrad)" />
          <path className="wave-path-2" d="M0,40 C240,20 480,60 720,40 C960,20 1200,60 1440,40 L1440,0 L0,0 Z" fill="rgba(0,200,240,0.05)" />
        </svg>
      </div>

      {/* God rays from surface */}
      <div className="god-rays">
        <div className="god-ray" style={{ '--i': 0 }} />
        <div className="god-ray" style={{ '--i': 1 }} />
        <div className="god-ray" style={{ '--i': 2 }} />
        <div className="god-ray" style={{ '--i': 3 }} />
        <div className="god-ray" style={{ '--i': 4 }} />
        <div className="god-ray" style={{ '--i': 5 }} />
        <div className="god-ray" style={{ '--i': 6 }} />
      </div>

      {/* Dense bubble field — multiple sizes */}
      <div className="bubble-field">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`b-${i}`} className={`ub ub-${i}`} />
        ))}
      </div>

      {/* Plankton / particle field — dense floating matter */}
      <div className="plankton-field">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={`p-${i}`} className={`plk plk-${i}`} />
        ))}
      </div>

      {/* Bioluminescent glow spots */}
      <div className="glow-spots">
        <div className="glow-spot gs-1" />
        <div className="glow-spot gs-2" />
        <div className="glow-spot gs-3" />
        <div className="glow-spot gs-4" />
      </div>

      {/* Fish silhouettes */}
      <div className="fish-layer">
        <svg className="fish-sil fish-1" viewBox="0 0 60 24" fill="none">
          <path d="M45 12C45 12 52 6 60 12C52 18 45 12 45 12ZM0 12C0 5 9 0 20 0C31 0 42 5 42 12C42 19 31 24 20 24C9 24 0 19 0 12ZM12 8C13.3 8 14.5 9 14.5 10.5C14.5 12 13.3 13 12 13C10.7 13 9.5 12 9.5 10.5C9.5 9 10.7 8 12 8Z" fill="currentColor"/>
        </svg>
        <svg className="fish-sil fish-2" viewBox="0 0 60 24" fill="none">
          <path d="M45 12C45 12 52 6 60 12C52 18 45 12 45 12ZM0 12C0 5 9 0 20 0C31 0 42 5 42 12C42 19 31 24 20 24C9 24 0 19 0 12ZM12 8C13.3 8 14.5 9 14.5 10.5C14.5 12 13.3 13 12 13C10.7 13 9.5 12 9.5 10.5C9.5 9 10.7 8 12 8Z" fill="currentColor"/>
        </svg>
        <svg className="fish-sil fish-3" viewBox="0 0 60 24" fill="none">
          <path d="M45 12C45 12 52 6 60 12C52 18 45 12 45 12ZM0 12C0 5 9 0 20 0C31 0 42 5 42 12C42 19 31 24 20 24C9 24 0 19 0 12ZM12 8C13.3 8 14.5 9 14.5 10.5C14.5 12 13.3 13 12 13C10.7 13 9.5 12 9.5 10.5C9.5 9 10.7 8 12 8Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Jellyfish */}
      <div className="jelly-layer">
        <svg className="jelly jelly-1" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="18" rx="22" ry="17" fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.12)" strokeWidth="0.8"/>
          <ellipse cx="25" cy="22" rx="16" ry="8" fill="rgba(0,200,240,0.03)"/>
          <path d="M8 28 Q11 50 7 70" stroke="rgba(0,229,255,0.08)" strokeWidth="0.7" fill="none"/>
          <path d="M16 30 Q18 52 14 72" stroke="rgba(0,229,255,0.06)" strokeWidth="0.7" fill="none"/>
          <path d="M25 32 Q25 55 25 75" stroke="rgba(0,229,255,0.07)" strokeWidth="0.7" fill="none"/>
          <path d="M34 30 Q32 52 36 72" stroke="rgba(0,229,255,0.06)" strokeWidth="0.7" fill="none"/>
          <path d="M42 28 Q39 50 43 70" stroke="rgba(0,229,255,0.08)" strokeWidth="0.7" fill="none"/>
        </svg>
        <svg className="jelly jelly-2" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="18" rx="22" ry="17" fill="rgba(100,200,255,0.05)" stroke="rgba(100,220,255,0.1)" strokeWidth="0.8"/>
          <ellipse cx="25" cy="22" rx="16" ry="8" fill="rgba(100,200,255,0.02)"/>
          <path d="M8 28 Q11 50 7 70" stroke="rgba(100,220,255,0.07)" strokeWidth="0.7" fill="none"/>
          <path d="M16 30 Q18 52 14 72" stroke="rgba(100,220,255,0.05)" strokeWidth="0.7" fill="none"/>
          <path d="M25 32 Q25 55 25 75" stroke="rgba(100,220,255,0.06)" strokeWidth="0.7" fill="none"/>
          <path d="M34 30 Q32 52 36 72" stroke="rgba(100,220,255,0.05)" strokeWidth="0.7" fill="none"/>
          <path d="M42 28 Q39 50 43 70" stroke="rgba(100,220,255,0.07)" strokeWidth="0.7" fill="none"/>
        </svg>
      </div>

      {/* Seaweed clusters at bottom */}
      <div className="seaweed-layer">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`sw-${i}`} className={`sw sw-${i}`} />
        ))}
      </div>

      {/* Coral reef silhouettes at bottom */}
      <div className="coral-layer">
        <svg className="coral-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          {/* Large coral/rock formations */}
          <path d="M0,120 L0,90 Q30,60 60,85 Q80,50 110,75 Q130,45 160,70 Q180,80 200,90 L200,120 Z" fill="rgba(0,180,200,0.06)"/>
          <path d="M180,120 L180,95 Q210,70 240,80 Q260,55 290,75 Q310,65 330,85 Q350,90 370,95 L370,120 Z" fill="rgba(0,160,180,0.05)"/>
          <path d="M500,120 L500,80 Q530,50 560,70 Q580,35 610,60 Q640,40 670,65 Q700,75 720,85 L720,120 Z" fill="rgba(0,200,220,0.06)"/>
          <path d="M850,120 L850,85 Q880,55 910,70 Q930,40 960,65 Q990,50 1020,75 Q1040,85 1060,90 L1060,120 Z" fill="rgba(0,180,200,0.05)"/>
          <path d="M1100,120 L1100,90 Q1130,65 1160,80 Q1190,50 1220,70 Q1240,45 1270,68 Q1300,75 1320,85 L1320,120 Z" fill="rgba(0,160,190,0.06)"/>
          {/* Branch corals */}
          <path d="M100,90 Q105,60 95,30 Q90,50 85,75" stroke="rgba(0,229,255,0.06)" strokeWidth="2" fill="none"/>
          <path d="M105,70 Q115,55 125,40" stroke="rgba(0,229,255,0.05)" strokeWidth="1.5" fill="none"/>
          <path d="M600,75 Q605,45 595,15 Q590,40 585,65" stroke="rgba(0,229,255,0.06)" strokeWidth="2" fill="none"/>
          <path d="M950,70 Q955,40 945,10 Q940,35 935,60" stroke="rgba(0,229,255,0.05)" strokeWidth="2" fill="none"/>
          <path d="M1200,85 Q1205,55 1195,25" stroke="rgba(0,229,255,0.05)" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Bottom depth fade */}
      <div className="bottom-vignette" />
    </div>
  );
}
