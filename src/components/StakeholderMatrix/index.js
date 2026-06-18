// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DEFAULT_COLOR = '#386FB3';

const QUAD_COLORS = {
  qs: '#C07830',
  qe: '#6B8E50',
  qm: '#6B7280',
  qi: '#4A7FA8',
};

const QUAD_ICONS = {
  qs: NotificationsOutlinedIcon,
  qe: StarOutlinedIcon,
  qm: VisibilityOutlinedIcon,
  qi: InfoOutlinedIcon,
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '56, 111, 179';
}

function hexToRgbDirect(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: Number.parseInt(r[1], 16), g: Number.parseInt(r[2], 16), b: Number.parseInt(r[3], 16) } : { r: 107, g: 142, b: 80 };
}

function quadRgb(hex) {
  const { r, g, b } = hexToRgbDirect(hex);
  return `${r}, ${g}, ${b}`;
}

function actionSx(color, rgb, primary) {
  return {
    textTransform: 'none', fontSize: '0.8rem', fontWeight: 500, borderRadius: '6px',
    color: primary ? color : 'var(--ifm-font-color-secondary)',
    borderColor: primary ? `rgba(${rgb}, 0.4)` : 'var(--ifm-color-emphasis-300)',
    backgroundColor: 'var(--ifm-card-background-color)',
    '&:hover': { borderColor: color, color: color, backgroundColor: `rgba(${rgb}, 0.06)` },
  };
}

function Cell({ value, placeholder, onChange, color }) {
  const rgb = hexToRgb(color);
  function handleChange(e) {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={4}
      onChange={handleChange}
      onFocus={e => { e.target.style.background = `rgba(${rgb}, 0.05)`; }}
      onBlur={e => { e.target.style.background = 'transparent'; }}
      style={{
        width: '100%', resize: 'none', overflow: 'hidden', border: 'none', outline: 'none',
        background: 'transparent', padding: '0.5rem 0.6rem', fontSize: '0.875rem',
        fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.45,
        minHeight: '6rem', boxSizing: 'border-box', transition: 'background 0.15s',
      }}
    />
  );
}
Cell.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const LABELS = {
  de: {
    qs: { label: 'Keep Satisfied', sub: 'Hoher Einfluss · Fern', ph: 'Stakeholder eintragen…' },
    qe: { label: 'Actively Engaged', sub: 'Hoher Einfluss · Nah', ph: 'Stakeholder eintragen…' },
    qm: { label: 'Monitor', sub: 'Niedriger Einfluss · Fern', ph: 'Stakeholder eintragen…' },
    qi: { label: 'Keep Informed', sub: 'Niedriger Einfluss · Nah', ph: 'Stakeholder eintragen…' },
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'stakeholder-matrix',
    yHigh: 'Hoher Einfluss', yLow: 'Niedriger Einfluss', xFar: 'Fern', xNear: 'Nah',
  },
  en: {
    qs: { label: 'Keep Satisfied', sub: 'High Influence · Far', ph: 'Add stakeholders…' },
    qe: { label: 'Actively Engaged', sub: 'High Influence · Close', ph: 'Add stakeholders…' },
    qm: { label: 'Monitor', sub: 'Low Influence · Far', ph: 'Add stakeholders…' },
    qi: { label: 'Keep Informed', sub: 'Low Influence · Close', ph: 'Add stakeholders…' },
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'stakeholder-matrix',
    yHigh: 'High Influence', yLow: 'Low Influence', xFar: 'Far', xNear: 'Close',
  },
};

const makeInitialState = () => ({ qs: '', qe: '', qm: '', qi: '' });

export default function StakeholderMatrix({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const downloadCsv = () => {
    const rows = [
      [L.qs.label, state.qs],
      [L.qe.label, state.qe],
      [L.qm.label, state.qm],
      [L.qi.label, state.qi],
    ];
    const csv = rows.map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${L.filename}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    const { default: html2pdf } = await import('html2pdf.js');
    html2pdf().set({
      margin: 10, filename: `${L.filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    }).from(tableRef.current).save();
  };

  const cellBorder = '1px solid var(--ifm-table-border-color, var(--ifm-color-emphasis-300))';

  const quadrant = (key) => {
    const q = L[key];
    const quadColor = QUAD_COLORS[key];
    const qRgb = quadRgb(quadColor);
    const Icon = QUAD_ICONS[key];
    return (
      <div key={key} style={{
        border: cellBorder,
        borderLeft: `4px solid ${quadColor}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        <div style={{
          background: `rgba(${qRgb}, 0.10)`,
          padding: '0.5rem 0.75rem',
          borderBottom: cellBorder,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <Icon style={{ fontSize: '1rem', color: quadColor, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: quadColor }}>{q.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ifm-font-color-secondary)', marginTop: 2 }}>{q.sub}</div>
          </div>
        </div>
        <Cell
          value={state[key]}
          placeholder={q.ph}
          onChange={val => setState(s => ({ ...s, [key]: val }))}
          color={quadColor}
        />
      </div>
    );
  };

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
      }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>

      {/* Grid with axis labels */}
      <div style={{ padding: '0.75rem', background: 'var(--ifm-card-background-color)' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem' }}>
          {/* Vertical axis label (y-axis: influence) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '1.25rem',
          }}>
            <span style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--ifm-font-color-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {`↑ ${L.yHigh}`}
            </span>
          </div>

          <div style={{ flex: 1 }}>
            {/* Horizontal axis label (x-axis: proximity) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--ifm-font-color-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {`← ${L.xFar}`}
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--ifm-font-color-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {`${L.xNear} →`}
              </span>
            </div>

            {/* 2x2 quadrant grid */}
            <div ref={tableRef}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {quadrant('qs')}
                {quadrant('qe')}
                {quadrant('qm')}
                {quadrant('qi')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StakeholderMatrix.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
