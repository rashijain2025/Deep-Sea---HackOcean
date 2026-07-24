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
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately visible on small pages; otherwise defer to IntersectionObserver.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to trigger once.
        }
      },
      { rootMargin: '120px' } // Start loading slightly before the chart enters view.
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: `${height}px`, minHeight: `${height}px`, width: '100%' }}
      className="relative w-full"
    >
      {isVisible ? children : null}
    </div>
  );
});
