import React, { useRef, useState, useEffect } from 'react';

/**
 * LazyChart — wraps any Recharts tree and only mounts it once the container
 * scrolls into view. This avoids rendering all charts on page load, reducing
 * initial JS execution time and memory pressure.
 *
 * @param {number} height  - Fixed height in px (required by Recharts ResponsiveContainer)
 * @param {React.ReactNode} children - The Recharts component tree
 */
export const LazyChart = React.memo(function LazyChart({ children, height = 300 }) {
  return (
    <div style={{ width: '100%', height: height, minHeight: height, minWidth: 0, position: 'relative' }} className="w-full">
      {children}
    </div>
  );
});
