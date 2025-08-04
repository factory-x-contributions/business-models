// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

/**
 * OutlineButton - Moderner Button mit klarem Outline-Style
 *
 * @param {string} href - Ziel-URL
 * @param {string} text - Button-Text
 * @param {string} color - Hauptfarbe (z.B. '#3b82f6')
 * @param {boolean} external - Öffnet in neuem Tab
 */
export const OutlineButton = ({
  href,
  text,
  color = '#6b7280',
  external = false
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 20px',
        background: isHovered ? `${color}18` : `${color}08`,
        color: color,
        textDecoration: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '15px',
        transition: 'all 0.2s ease',
        border: `2px solid ${color}`,
        cursor: 'pointer',
        gap: '10px',
        boxShadow: isHovered ? `0 4px 12px ${color}25` : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: color,
        flexShrink: 0
      }} />
      <span>{text}</span>
    </a>
  );
};

export default OutlineButton;
