// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const DEFAULT_COLOR = '#6B7280';

// Per-column RACI accent colors
const RACI_COLORS = {
  r: '#4A7FA8',
  a: '#B85450',
  c: '#C07830',
  inf: '#6B8E50',
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '107, 114, 128';
}

function uid() { return Math.random().toString(36).slice(2, 9); }

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
      rows={1}
      onChange={handleChange}
      onFocus={e => { e.target.style.background = `rgba(${rgb}, 0.05)`; }}
      onBlur={e => { e.target.style.background = 'transparent'; }}
      style={{
        width: '100%', resize: 'none', overflow: 'hidden', border: 'none', outline: 'none',
        background: 'transparent', padding: '0.5rem 0.6rem', fontSize: '0.875rem',
        fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.45,
        minHeight: '2.4rem', boxSizing: 'border-box', transition: 'background 0.15s',
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

// Small colored badge showing the RACI letter
function RaciBadge({ letter, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '1.35rem', height: '1.35rem', borderRadius: '4px',
      backgroundColor: color, color: '#fff',
      fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0,
      marginRight: '0.4rem', flexShrink: 0,
    }}>
      {letter}
    </span>
  );
}
RaciBadge.propTypes = {
  letter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const LABELS = {
  de: {
    col1: 'Maßnahmen-ID', col2: 'Responsible', col3: 'Accountable', col4: 'Consulted', col5: 'Informed',
    ph: { mid: 'M1', r: 'Wer führt aus?', a: 'Wer verantwortet?', c: 'Wer wird konsultiert?', inf: 'Wer wird informiert?' },
    legendR: 'führt aus', legendA: 'verantwortet', legendC: 'konsultiert', legendI: 'informiert',
    addRow: 'Zeile hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'raci-tabelle',
    rowLabel: 'Einträge',
  },
  en: {
    col1: 'Action ID', col2: 'Responsible', col3: 'Accountable', col4: 'Consulted', col5: 'Informed',
    ph: { mid: 'M1', r: 'Who executes?', a: 'Who owns it?', c: 'Who is consulted?', inf: 'Who is informed?' },
    legendR: 'executes', legendA: 'owns', legendC: 'consulted', legendI: 'informed',
    addRow: 'Add Row', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'raci-table',
    rowLabel: 'rows',
  },
};

function makeInitialState() {
  return { rows: [1, 2, 3].map(n => ({ id: uid(), mid: `M${n}`, r: '', a: '', c: '', inf: '' })) };
}

export default function RaciTabelle({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const addRow = () => setState(s => {
    const nextNum = s.rows.length + 1;
    return { rows: [...s.rows, { id: uid(), mid: `M${nextNum}`, r: '', a: '', c: '', inf: '' }] };
  });
  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({ rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r) }));

  const downloadCsv = () => {
    const header = [L.col1, `${L.col2} (R)`, `${L.col3} (A)`, `${L.col4} (C)`, `${L.col5} (I)`];
    const data = rows.map(r => [r.mid, r.r, r.a, r.c, r.inf]);
    const legend = [`R=${L.legendR} A=${L.legendA} C=${L.legendC} I=${L.legendI}`, '', '', '', ''];
    const csv = [header, ...data, legend]
      .map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(','))
      .join('\r\n');
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

  // Base th style — each RACI column overrides borderBottom with its own color
  const thBase = {
    border: cellBorder,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)',
    fontSize: '0.875rem',
    padding: '0.5rem 0.75rem',
    verticalAlign: 'middle',
  };

  const tdBase = {
    border: cellBorder, padding: 0, verticalAlign: 'top',
    background: 'var(--ifm-table-background, transparent)',
  };

  // Per-column header styles with their accent border
  function raciTh(accentColor) {
    return { ...thBase, borderBottom: `2px solid ${accentColor}` };
  }

  // Per-column data cell with 3% tint
  function raciTd(accentColor, stripe) {
    const tintRgb = hexToRgb(accentColor);
    const base = stripe
      ? `rgba(${tintRgb}, 0.05)` // stripe rows get slightly more tint
      : `rgba(${tintRgb}, 0.03)`;
    return { ...tdBase, background: base };
  }

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--ifm-font-color-secondary)', fontWeight: 500 }}>
          {rows.length} {L.rowLabel}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 480 }}>
          <thead>
            <tr>
              {/* Number / delete col */}
              <th style={{ ...thBase, borderBottom: `2px solid ${color}`, width: 44, padding: 0 }} />
              {/* ID col */}
              <th style={{ ...thBase, borderBottom: `2px solid ${color}`, width: '15%' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: '1rem', opacity: 0.7 }} />
                  {L.col1}
                </span>
              </th>
              {/* R col */}
              <th style={raciTh(RACI_COLORS.r)}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <RaciBadge letter="R" color={RACI_COLORS.r} />
                  {L.col2}
                </span>
              </th>
              {/* A col */}
              <th style={raciTh(RACI_COLORS.a)}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <RaciBadge letter="A" color={RACI_COLORS.a} />
                  {L.col3}
                </span>
              </th>
              {/* C col */}
              <th style={raciTh(RACI_COLORS.c)}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <RaciBadge letter="C" color={RACI_COLORS.c} />
                  {L.col4}
                </span>
              </th>
              {/* I col */}
              <th style={raciTh(RACI_COLORS.inf)}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <RaciBadge letter="I" color={RACI_COLORS.inf} />
                  {L.col5}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const stripe = i % 2 !== 0;
              const rowBg = stripe
                ? 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))'
                : 'var(--ifm-table-background, transparent)';
              return (
                <tr key={row.id}>
                  {/* Number badge + delete */}
                  <td style={{
                    ...tdBase,
                    width: 44, textAlign: 'center', verticalAlign: 'middle',
                    padding: '0 2px', background: rowBg,
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, lineHeight: 1,
                        color: 'var(--ifm-color-emphasis-500)',
                      }}>
                        {i + 1}
                      </span>
                      <IconButton
                        size="small"
                        onClick={() => removeRow(row.id)}
                        title={L.removeRow}
                        sx={{
                          color: 'var(--ifm-color-emphasis-400)', padding: '2px',
                          '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' },
                        }}
                      >
                        <CloseOutlinedIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                  </td>
                  {/* ID cell — plain stripe background */}
                  <td style={{ ...tdBase, background: rowBg }}>
                    <Cell value={row.mid} placeholder={L.ph.mid} onChange={val => setField(row.id, 'mid', val)} color={color} />
                  </td>
                  {/* R cell */}
                  <td style={raciTd(RACI_COLORS.r, stripe)}>
                    <Cell value={row.r} placeholder={L.ph.r} onChange={val => setField(row.id, 'r', val)} color={RACI_COLORS.r} />
                  </td>
                  {/* A cell */}
                  <td style={raciTd(RACI_COLORS.a, stripe)}>
                    <Cell value={row.a} placeholder={L.ph.a} onChange={val => setField(row.id, 'a', val)} color={RACI_COLORS.a} />
                  </td>
                  {/* C cell */}
                  <td style={raciTd(RACI_COLORS.c, stripe)}>
                    <Cell value={row.c} placeholder={L.ph.c} onChange={val => setField(row.id, 'c', val)} color={RACI_COLORS.c} />
                  </td>
                  {/* I cell */}
                  <td style={raciTd(RACI_COLORS.inf, stripe)}>
                    <Cell value={row.inf} placeholder={L.ph.inf} onChange={val => setField(row.id, 'inf', val)} color={RACI_COLORS.inf} />
                  </td>
                </tr>
              );
            })}
            {/* Add-row as last tbody row, dashed */}
            <tr>
              <td
                colSpan={6}
                onClick={addRow}
                style={{
                  border: cellBorder,
                  borderTop: `1px dashed rgba(${rgb}, 0.4)`,
                  padding: '0.45rem 0.75rem',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `rgba(${rgb}, 0.04)`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.82rem', color: 'var(--ifm-font-color-secondary)',
                  userSelect: 'none',
                }}>
                  <AddOutlinedIcon sx={{ fontSize: '1rem' }} />
                  {L.addRow}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend footer */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
        padding: '0.55rem 0.75rem',
        borderTop: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.03))',
        alignItems: 'center',
      }}>
        {[
          { letter: 'R', color: RACI_COLORS.r, label: L.legendR },
          { letter: 'A', color: RACI_COLORS.a, label: L.legendA },
          { letter: 'C', color: RACI_COLORS.c, label: L.legendC },
          { letter: 'I', color: RACI_COLORS.inf, label: L.legendI },
        ].map(({ letter, color: c, label }) => (
          <span key={letter} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--ifm-font-color-secondary)' }}>
            <RaciBadge letter={letter} color={c} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

RaciTabelle.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
