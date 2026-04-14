// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

/**
 * QualityGate — interactive checklist with progress counter.
 *
 * Props:
 *   items   — string[]   checklist items
 *   color   — string     room accent color (hex), e.g. '#386FB3'
 *   title   — string     section heading (optional, default 'Quality Gate')
 */
export default function QualityGate({ items = [], color = '#386FB3', title = 'Quality Gate' }) {
  const [checked, setChecked] = useState(() => new Array(items.length).fill(false));

  const toggle = (index) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const count = checked.filter(Boolean).length;
  const total = items.length;
  const allDone = count === total && total > 0;
  const progress = total > 0 ? (count / total) * 100 : 0;

  return (
    <div
      style={{
        border: `1px solid ${allDone ? 'rgba(34, 197, 94, 0.5)' : 'var(--ifm-color-emphasis-200)'}`,
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '1rem',
        background: allDone
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(34, 197, 94, 0.02) 100%)'
          : 'var(--ifm-background-surface-color)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{allDone ? '✅' : '📋'}</span>
          <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color }}>
            {title}
          </strong>
        </div>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: allDone ? '#22c55e' : 'var(--ifm-font-color-secondary)',
            background: allDone ? 'rgba(34, 197, 94, 0.1)' : 'var(--ifm-color-emphasis-100)',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            transition: 'all 0.3s ease',
          }}
        >
          {count} von {total} erledigt
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '4px',
          borderRadius: '2px',
          background: 'var(--ifm-color-emphasis-200)',
          marginBottom: '1.25rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: '2px',
            background: allDone ? '#22c55e' : color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Checklist items */}
      {items.map((item, i) => (
        <label
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: i < items.length - 1 ? '0.75rem' : 0,
            cursor: 'pointer',
            opacity: checked[i] ? 0.6 : 1,
            transition: 'opacity 0.2s ease',
          }}
          onClick={() => toggle(i)}
        >
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            style={{ marginTop: '0.25rem', width: '16px', height: '16px', cursor: 'pointer', accentColor: color }}
          />
          <span style={{ textDecoration: checked[i] ? 'line-through' : 'none', transition: 'text-decoration 0.2s ease' }}>
            {item}
          </span>
        </label>
      ))}

      {/* Success message */}
      {allDone && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            color: '#16a34a',
            fontWeight: '500',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🎉</span>
          <span>Alle Kriterien erfüllt — bereit für den nächsten Raum!</span>
        </div>
      )}
    </div>
  );
}
