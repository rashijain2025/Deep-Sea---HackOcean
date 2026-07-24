import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

export function LazyChart({ children, height = 300 }) {
  const ref = useRef(null);
  // Trigger rendering when component is within 200px of viewport
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} style={{ height, width: '100%' }} className="relative">
      {isInView ? (
        children
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono text-[10px] tracking-widest">
          [ LOADING TELEMETRY STREAM... ]
        </div>
      )}
    </div>
  );
}
