/**
 * Shared Recharts theme constants.
 * Centralised to avoid copy-pasting the same tooltip style across Dashboard,
 * Analytics, and Predictions pages.
 */

/** Tooltip content style applied to all Recharts charts in the app. */
export const chartTooltipStyle = {
  backgroundColor: 'rgba(3,8,20,0.95)',
  border: '1px solid rgba(0,243,255,0.25)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

/** Common axis stroke colour used across all charts. */
export const AXIS_STROKE = 'rgba(255,255,255,0.3)';

/** Common grid stroke used across all charts. */
export const GRID_STROKE = 'rgba(255,255,255,0.05)';
