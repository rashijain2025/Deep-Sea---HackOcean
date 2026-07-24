import React from 'react';

export function LazyChart({ children, height = 300 }) {
  return (
    <div 
      style={{ height: `${height}px`, width: '100%', minHeight: `${height}px` }} 
      className="relative w-full"
    >
      {children}
    </div>
  );
}
