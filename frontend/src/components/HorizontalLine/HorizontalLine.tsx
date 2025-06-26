// HorizontalLine.tsx
// A reusable SVG motif representing the "perfectly imperfect" horizon line for The Unapologetic Sanctuary.
// Follows the Equinox Philosophy: organic, hand-drawn, and grounding.

import React from 'react';
import styles from './HorizontalLine.module.css';

interface HorizontalLineProps {
  color?: 'accent' | 'meta' | 'text'; // Use palette: accent (#C86A43), meta (#A1A19B), text (#2E3D32)
  width?: string; // e.g., '100%', '240px'
  height?: string; // e.g., '16px', '24px'
  className?: string;
  ariaHidden?: boolean;
}

const palette = {
  accent: '#C86A43',
  meta: '#A1A19B',
  text: '#2E3D32',
};

/**
 * HorizontalLine: SVG motif for grounding sections. Always aria-hidden (decorative).
 */
export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  color = 'accent',
  width = '100%',
  height = '18px',
  className = '',
  ariaHidden = true,
}) => (
  <svg
    className={`${styles.root} ${className}`.trim()}
    width={width}
    height={height}
    viewBox="0 0 240 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={ariaHidden}
    focusable="false"
    role="presentation"
    style={{ width, height, display: 'block' }}
  >
    {/* Hand-drawn, "perfectly imperfect" line (SVG path) */}
    <path
      d="M4 9 Q 40 2, 80 9 Q 120 16, 160 9 Q 200 2, 236 9"
      stroke={palette[color]}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.92"
    />
  </svg>
);

export default HorizontalLine;
