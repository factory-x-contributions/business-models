// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DayContext = createContext({ openId: null, setOpenId: () => {}, color: '#386FB3' });

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '56, 111, 179';
}

export function DayProvider({ color, defaultOpenId, children }) {
  const [openId, setOpenId] = useState(defaultOpenId ?? null);
  return (
    <DayContext.Provider value={{ openId, setOpenId, color }}>
      {children}
    </DayContext.Provider>
  );
}

DayProvider.propTypes = {
  color: PropTypes.string.isRequired,
  defaultOpenId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function DayBreak({ time, title }) {
  const { color } = useContext(DayContext);
  const rgb = hexToRgb(color);
  return (
    <div className="day-break-tile">
      <span
        style={{
          fontSize: '0.72rem',
          fontFamily: 'var(--ifm-font-family-monospace)',
          background: `rgba(${rgb}, 0.07)`,
          color: `rgba(${rgb}, 0.7)`,
          padding: '0.15rem 0.45rem',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
        }}
      >
        {time}
      </span>
      <span className="day-break-tile__title">{title}</span>
    </div>
  );
}

DayBreak.propTypes = {
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export function DaySection({ id, time, title, children }) {
  const { openId, setOpenId, color } = useContext(DayContext);
  const open = openId === id;
  const rgb = hexToRgb(color);

  return (
    <div
      id={`section-${id}`}
      className="day-section-tile"
      style={{
        background: 'var(--ifm-card-background-color)',
        border: `1px solid ${open ? `rgba(${rgb}, 0.4)` : 'var(--ifm-color-emphasis-200)'}`,
        borderLeft: `3px solid ${open ? color : 'var(--ifm-color-emphasis-200)'}`,
        boxShadow: open ? `0 2px 12px rgba(${rgb}, 0.08)` : 'none',
      }}
    >
      <button
        onClick={() => setOpenId(open ? null : id)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          padding: '0.85rem 1.15rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--ifm-font-family-monospace)',
            background: `rgba(${rgb}, 0.1)`,
            color: color,
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {time}
        </span>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', flex: 1 }}>{title}</span>
        <span
          style={{
            fontSize: '0.65rem',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            color: 'var(--ifm-font-color-secondary)',
            flexShrink: 0,
          }}
        >
          &#9654;
        </span>
      </button>

      <div className={`day-section-body${open ? ' day-section-body--open' : ''}`}>
        <div className="day-section-body__inner">
          <div
            style={{
              borderTop: `1px solid rgba(${rgb}, 0.15)`,
              padding: '1rem 1.25rem 1.5rem',
              background: `rgba(${rgb}, 0.02)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

DaySection.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const AI_COLOR = '#6B7280';
const AI_RGB = '107, 114, 128';

export function AiSection({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="day-section-tile"
      style={{
        background: 'var(--ifm-card-background-color)',
        border: open ? `1px solid rgba(${AI_RGB}, 0.4)` : '1px solid var(--ifm-color-emphasis-200)',
        borderLeft: `3px solid ${open ? AI_COLOR : 'var(--ifm-color-emphasis-200)'}`,
        boxShadow: open ? `0 2px 12px rgba(${AI_RGB}, 0.08)` : 'none',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          padding: '0.85rem 1.15rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--ifm-font-family-monospace)',
            background: `rgba(${AI_RGB}, 0.1)`,
            color: AI_COLOR,
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          🤖 AI
        </span>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', flex: 1 }}>
          AI-Unterstützung (Hybrides Format)
        </span>
        <span
          style={{
            fontSize: '0.65rem',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            color: 'var(--ifm-font-color-secondary)',
            flexShrink: 0,
          }}
        >
          &#9654;
        </span>
      </button>

      <div className={`day-section-body${open ? ' day-section-body--open' : ''}`}>
        <div className="day-section-body__inner">
          <div
            style={{
              borderTop: `1px solid rgba(${AI_RGB}, 0.15)`,
              padding: '1rem 1.25rem 1.5rem',
              background: `rgba(${AI_RGB}, 0.02)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

AiSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export function DayTemplate({ title, children }) {
  const [open, setOpen] = useState(false);
  const { color } = useContext(DayContext);
  const rgb = hexToRgb(color);

  return (
    <div
      className="day-section-tile"
      style={{
        background: 'var(--ifm-card-background-color)',
        border: open ? `1px solid rgba(${rgb}, 0.3)` : '1px solid var(--ifm-color-emphasis-200)',
        borderLeft: `2px solid ${open ? color : 'var(--ifm-color-emphasis-200)'}`,
        boxShadow: open ? `0 1px 8px rgba(${rgb}, 0.06)` : 'none',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          padding: '0.65rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--ifm-font-family-monospace)',
            background: `rgba(${rgb}, 0.08)`,
            color: `rgba(${rgb}, 0.8)`,
            padding: '0.12rem 0.4rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          📋 Vorlage
        </span>
        <span style={{ fontWeight: 500, fontSize: '0.88rem', flex: 1 }}>{title}</span>
        <span
          style={{
            fontSize: '0.6rem',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            color: 'var(--ifm-font-color-secondary)',
            flexShrink: 0,
          }}
        >
          &#9654;
        </span>
      </button>

      <div className={`day-section-body${open ? ' day-section-body--open' : ''}`}>
        <div className="day-section-body__inner">
          <div
            style={{
              borderTop: `1px solid rgba(${rgb}, 0.12)`,
              padding: '0.85rem 1rem 1.15rem',
              background: `rgba(${rgb}, 0.015)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

DayTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function VorlageLink({ title, href }) {
  const { color } = useContext(DayContext);
  const rgb = hexToRgb(color);

  return (
    <a
      href={href}
      className="day-section-tile vorlage-link-tile"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.65rem 1rem',
        textDecoration: 'none',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderLeft: `2px solid rgba(${rgb}, 0.4)`,
        background: 'var(--ifm-card-background-color)',
        '--vorlage-link-border-color': color,
      }}
    >
      <span
        style={{
          fontSize: '0.68rem',
          fontFamily: 'var(--ifm-font-family-monospace)',
          background: `rgba(${rgb}, 0.08)`,
          color: `rgba(${rgb}, 0.8)`,
          padding: '0.12rem 0.4rem',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        📋 Vorlage
      </span>
      <span style={{ fontWeight: 500, fontSize: '0.88rem', flex: 1, color: 'var(--ifm-font-color-base)' }}>
        {title}
      </span>
      <span style={{ fontSize: '0.75rem', color: `rgba(${rgb}, 0.7)`, flexShrink: 0 }}>→</span>
    </a>
  );
}

VorlageLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
