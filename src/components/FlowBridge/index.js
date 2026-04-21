// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import PropTypes from 'prop-types';

/**
 * FlowBridge — two-column Input/Output flow box between methodology rooms.
 *
 * Props:
 *   from  — { label: string, color: string, items: string[] }
 *   to    — { label: string, color: string, items: string[] }
 */
export default function FlowBridge({ from, to }) {
  const box = ({ label, color, items }) => {
    const r = Number.parseInt(color.slice(1, 3), 16);
    const g = Number.parseInt(color.slice(3, 5), 16);
    const b = Number.parseInt(color.slice(5, 7), 16);
    const alpha = (o) => `rgba(${r}, ${g}, ${b}, ${o})`;

    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${alpha(0.08)} 0%, ${alpha(0.03)} 100%)`,
          border: `1px solid ${alpha(0.2)}`,
          borderRadius: '12px',
          padding: '1.25rem',
        }}
      >
        <h4 style={{ margin: '0 0 0.5rem 0', color }}>{label}</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flow-bridge-grid">
      {box(from)}
      {box(to)}
    </div>
  );
}

const boxShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
});

FlowBridge.propTypes = {
  from: boxShape.isRequired,
  to: boxShape.isRequired,
};
