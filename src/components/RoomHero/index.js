// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import PropTypes from 'prop-types';

/**
 * RoomHero — colored hero box for each methodology room.
 *
 * Props:
 *   icon      — string   emoji icon, e.g. '🔵'
 *   label     — string   uppercase badge text, e.g. 'Blauer Raum'
 *   color     — string   room accent color hex, e.g. '#386FB3'
 *   heading   — string   main heading
 *   intro     — string   introductory paragraph (HTML allowed)
 *   bullets   — string[] bullet points (optional)
 *   goalText  — string   text inside the "Ziel" box (HTML allowed)
 */
export default function RoomHero({ icon, label, color = '#386FB3', heading, intro, bullets = [], goalText }) {
  const alpha = (opacity) => {
    const r = Number.parseInt(color.slice(1, 3), 16);
    const g = Number.parseInt(color.slice(3, 5), 16);
    const b = Number.parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${alpha(0.08)} 0%, ${alpha(0.02)} 100%)`,
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <span
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color,
            fontWeight: '600',
          }}
        >
          {label}
        </span>
      </div>

      <h2
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1.75rem',
          fontWeight: '600',
          color: 'var(--ifm-heading-color)',
        }}
      >
        {heading}
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: '1.05rem',
          color: 'var(--ifm-font-color-secondary)',
          lineHeight: '1.7',
        }}
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {bullets.length > 0 && (
        <ul
          style={{
            margin: '0.75rem 0 0 0',
            paddingLeft: '1.25rem',
            fontSize: '1.05rem',
            color: 'var(--ifm-font-color-secondary)',
            lineHeight: '1.7',
          }}
        >
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {goalText && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            background: `linear-gradient(135deg, ${alpha(0.12)} 0%, ${alpha(0.04)} 100%)`,
            borderRadius: '8px',
            border: `1px solid ${alpha(0.2)}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <strong
              style={{
                color,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Ziel
            </strong>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--ifm-font-color-secondary)',
              lineHeight: '1.6',
            }}
            dangerouslySetInnerHTML={{ __html: goalText }}
          />
        </div>
      )}
    </div>
  );
}

RoomHero.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  heading: PropTypes.string,
  intro: PropTypes.string,
  bullets: PropTypes.arrayOf(PropTypes.string),
  goalText: PropTypes.string,
};
