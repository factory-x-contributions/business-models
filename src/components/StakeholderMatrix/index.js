// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const DEFAULT_COLOR = '#386FB3';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '56, 111, 179';
}

function actionSx(color, rgb, primary = false) {
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
Cell.propTypes = { value: PropTypes.string.isRequired, placeholder: PropTypes.string, onChange: PropTypes.func.isRequired, color: PropTypes.string.isRequired };

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
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${L.filename}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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

  const quadrant = (key, primary = false) => {
    const q = L[key];
    return (
      <div style={{
        border: cellBorder,
        borderLeft: `3px solid ${primary ? color : 'var(--ifm-color-emphasis-300)'}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        <div style={{
          background: primary ? `rgba(${rgb}, 0.12)` : `rgba(${rgb}, 0.05)`,
          padding: '0.5rem 0.75rem',
          borderBottom: cellBorder,
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: primary ? color : 'var(--ifm-font-color-base)' }}>{q.label}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ifm-font-color-secondary)', marginTop: 2 }}>{q.sub}</div>
        </div>
        <Cell value={state[key]} placeholder={q.ph} onChange={val => setState(s => ({ ...s, [key]: val }))} color={color} />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {quadrant('qs')}
          {quadrant('qe', true)}
          {quadrant('qm')}
          {quadrant('qi')}
        </div>
      </div>
    </div>
  );
}

StakeholderMatrix.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
