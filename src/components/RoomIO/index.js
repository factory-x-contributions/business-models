// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import PropTypes from 'prop-types';

const hexAlpha = (hex) => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return (o) => `rgba(${r}, ${g}, ${b}, ${o})`;
};

export default function RoomIO({ from, to, outputs }) {
  const aFrom = hexAlpha(from.color);
  const aTo = hexAlpha(to.color);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 32px 1fr',
        gap: 0,
        marginTop: '1.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* FROM column */}
      <div style={{ paddingRight: '1rem' }}>
        <div
          style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: from.color,
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <span style={{ opacity: 0.7 }}>←</span>
          {from.label.replace(/^←\s*/, '')}
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {from.items.map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.4rem',
                fontSize: '0.82rem',
                color: 'var(--ifm-font-color-secondary)',
              }}
            >
              <span style={{ color: aFrom(0.6), flexShrink: 0, fontWeight: '700', lineHeight: '1.5' }}>›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(0,0,0,0.2)',
          fontSize: '1rem',
          paddingTop: '1.4rem',
        }}
      >
        →
      </div>

      {/* TO column */}
      <div style={{ paddingLeft: '1rem' }}>
        <div
          style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: to.color,
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          {to.label.replace(/\s*→$/, '')}
          <span style={{ opacity: 0.7 }}>→</span>
        </div>
        {outputs.length > 0 && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {outputs.map((o) => (
              <li
                key={o.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  padding: '0.28rem 0.6rem',
                  borderRadius: '6px',
                  background: aTo(0.1),
                  color: 'var(--ifm-font-color-secondary)',
                }}
              >
                <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{o.icon}</span>
                <span>{o.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const roomShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
});

RoomIO.propTypes = {
  from: roomShape.isRequired,
  to: roomShape.isRequired,
  outputs: PropTypes.arrayOf(
    PropTypes.shape({ icon: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
  ),
};
RoomIO.defaultProps = { outputs: [] };
