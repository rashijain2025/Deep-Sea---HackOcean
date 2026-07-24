import React from 'react';

export const LazyChart = React.memo(function LazyChart({ children, height = 300 }) {
  return (
    <div style={{ width: '100%', height: height, minHeight: height, minWidth: 0 }} className="w-full">
      {children}
    </div>
  );
});
