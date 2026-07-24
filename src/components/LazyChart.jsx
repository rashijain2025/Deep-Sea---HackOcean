import React from 'react';

export const LazyChart = React.memo(function LazyChart({ children, height = 300 }) {
  return (
    <div 
      style={{ height: height, width: '100%', minWidth: 0, minHeight: height, position: 'relative' }} 
      className="w-full"
    >
      {children}
    </div>
  );
});
