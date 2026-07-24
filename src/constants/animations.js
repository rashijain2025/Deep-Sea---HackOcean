/**
 * Shared Framer Motion animation variants used across all pages.
 * Centralised here to avoid duplication and ensure consistent motion design.
 */

/** Standard fade-up used on every dashboard-style page. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/** Premium fade-up used on the Home / landing page (larger y offset, longer duration). */
export const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/** Stagger container for the Home hero section. */
export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
