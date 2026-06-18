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
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const DEFAULT_COLOR = '#386FB3';

// Cycling top-border colors for segment columns
const SEG_ACCENT_COLORS = ['#4A7FA8', '#6B8E50', '#C07830', '#7B5EA7', '#B85450'];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '56, 111, 179';
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const RELEVANZ_STYLE = {
  hoch:    { bg: '#dcfce7', fg: '#16a34a', border: '#bbf7d0' },
  mittel:  { bg: '#fef9c3', fg: '#ca8a04', border: '#fde68a' },
  niedrig: { bg: '#fee2e2', fg: '#dc2626', border: '#fecaca' },
};

const LABELS = {
  de: {
    col1: 'Kriterium',
    col2: 'Ausprägungen',
    summary: 'Zusammenfassung / Relevanz',
    summaryAusp: 'hoch / mittel / niedrig',
    addRow: 'Kriterium hinzufügen',
    addSeg: 'Segment',
    reset: 'Zurücksetzen',
    csv: 'CSV',
    pdf: 'PDF',
    rel: { hoch: '🟢 hoch', mittel: '🟡 mittel', niedrig: '🔴 niedrig' },
    segNames: ['Segment A', 'Segment B', 'Segment n'],
    rows: [
      ['z.B. Unternehmensgröße', 'klein / mittel / groß'],
      ['z.B. Branche', 'Produktion / Handel / …'],
      ['z.B. Region', 'DACH / Europa / global'],
      ['z.B. Digitaler Reifegrad', 'niedrig / mittel / hoch'],
      ['…', '…'],
    ],
    filename: 'marktsegmentierung',
    removeRow: 'Zeile entfernen',
    removeSeg: 'Segment entfernen',
    renameSeg: 'Klicken zum Umbenennen',
  },
  en: {
    col1: 'Criterion',
    col2: 'Options',
    summary: 'Summary / Relevance',
    summaryAusp: 'high / medium / low',
    addRow: 'Add Criterion',
    addSeg: 'Segment',
    reset: 'Reset',
    csv: 'CSV',
    pdf: 'PDF',
    rel: { hoch: '🟢 high', mittel: '🟡 medium', niedrig: '🔴 low' },
    segNames: ['Segment A', 'Segment B', 'Segment n'],
    rows: [
      ['e.g. Company Size', 'small / medium / large'],
      ['e.g. Industry', 'Manufacturing / Retail / …'],
      ['e.g. Region', 'DACH / Europe / global'],
      ['e.g. Digital Maturity', 'low / medium / high'],
      ['…', '…'],
    ],
    filename: 'market-segmentation',
    removeRow: 'Remove row',
    removeSeg: 'Remove segment',
    renameSeg: 'Click to rename',
  },
};

function makeInitialState(L) {
  const segments = L.segNames.map((name, i) => ({ id: `s${i}`, name }));
  const rows = L.rows.map(([pk, pa], i) => ({ id: `r${i}`, k: '', a: '', pk, pa, v: {} }));
  const rel = Object.fromEntries(segments.map(s => [s.id, '']));
  return { segments, rows, rel };
}

// Shared MUI sx base for action buttons — uses Docusaurus CSS variables
function actionSx(color, rgb, primary) {
  const isPrimary = primary === true;
  return {
    textTransform: 'none',
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: '6px',
    color: isPrimary ? color : 'var(--ifm-font-color-secondary)',
    borderColor: isPrimary ? `rgba(${rgb}, 0.4)` : 'var(--ifm-color-emphasis-300)',
    backgroundColor: 'var(--ifm-card-background-color)',
    '&:hover': {
      borderColor: color,
      color: color,
      backgroundColor: `rgba(${rgb}, 0.06)`,
    },
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
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '0.5rem 0.6rem',
        fontSize: '0.875rem',
        fontFamily: 'inherit',
        color: 'var(--ifm-font-color-base)',
        lineHeight: 1.45,
        minHeight: '2.4rem',
        boxSizing: 'border-box',
        transition: 'background 0.15s',
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

export default function MarktsegmentierungsMatrix({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);

  const [{ segments, rows, rel }, setState] = useState(() => makeInitialState(L));
  const [editSegId, setEditSegId] = useState(null);
  const tableRef = useRef(null);

  // ── Segment operations ───────────────────────────────────────────────────────
  const addSegment = () => {
    const id = uid();
    setState(s => ({
      ...s,
      segments: [...s.segments, { id, name: `Segment ${String.fromCharCode(65 + s.segments.length)}` }],
      rel: { ...s.rel, [id]: '' },
    }));
  };

  const removeSegment = (segId) =>
    setState(s => {
      const newRel = { ...s.rel };
      delete newRel[segId];
      return { ...s, segments: s.segments.filter(sg => sg.id !== segId), rel: newRel };
    });

  const renameSegment = (segId, name) =>
    setState(s => ({ ...s, segments: s.segments.map(sg => sg.id === segId ? { ...sg, name } : sg) }));

  // ── Row operations ───────────────────────────────────────────────────────────
  const addRow = () =>
    setState(s => ({ ...s, rows: [...s.rows, { id: uid(), k: '', a: '', pk: '…', pa: '…', v: {} }] }));

  const removeRow = (rowId) =>
    setState(s => ({ ...s, rows: s.rows.filter(r => r.id !== rowId) }));

  const setK = (rowId, val) =>
    setState(s => ({ ...s, rows: s.rows.map(r => r.id === rowId ? { ...r, k: val } : r) }));

  const setA = (rowId, val) =>
    setState(s => ({ ...s, rows: s.rows.map(r => r.id === rowId ? { ...r, a: val } : r) }));

  const setV = (rowId, segId, val) =>
    setState(s => ({
      ...s,
      rows: s.rows.map(r => r.id === rowId ? { ...r, v: { ...r.v, [segId]: val } } : r),
    }));

  // ── Relevanz ─────────────────────────────────────────────────────────────────
  const setRel = (segId, val) =>
    setState(s => ({ ...s, rel: { ...s.rel, [segId]: val === s.rel[segId] ? '' : val } }));

  const reset = () => setState(makeInitialState(L));

  // ── CSV export ───────────────────────────────────────────────────────────────
  const downloadCsv = () => {
    const header = [L.col1, L.col2, ...segments.map(s => s.name)];
    const dataRows = rows.map(r => [r.k || r.pk, r.a || r.pa, ...segments.map(s => r.v[s.id] || '')]);
    const relRow = [L.summary, L.summaryAusp, ...segments.map(s => rel[s.id] || '')];
    const csv = [header, ...dataRows, relRow]
      .map(row => row.map(c => `"${String(c).replaceAll('"', '""')}"`).join(','))
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

  // ── PDF export ───────────────────────────────────────────────────────────────
  const downloadPdf = async () => {
    const { default: html2pdf } = await import('html2pdf.js');
    html2pdf()
      .set({
        margin: 10,
        filename: `${L.filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      })
      .from(tableRef.current)
      .save();
  };

  // ── Table styles — Docusaurus CSS variables ──────────────────────────────────
  const cellBorder = '1px solid var(--ifm-table-border-color, var(--ifm-color-emphasis-300))';

  const thBase = {
    border: cellBorder,
    borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)',
    fontSize: '0.875rem',
    padding: '0.5rem 0.75rem',
    verticalAlign: 'middle',
  };

  const tdBase = {
    border: cellBorder,
    padding: 0,
    verticalAlign: 'top',
    background: 'var(--ifm-table-background, transparent)',
  };

  // Total column count: badge/del col + Kriterium + Ausprägungen + segments + add-seg col
  const totalCols = 1 + 1 + 1 + segments.length + 1;

  return (
    <div
      style={{
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          padding: '0.6rem 0.75rem',
          borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          background: 'var(--ifm-card-background-color)',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={downloadCsv}
          sx={actionSx(color, rgb, true)}
        >
          {L.csv}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={downloadPdf}
          sx={actionSx(color, rgb, true)}
        >
          {L.pdf}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RestartAltOutlinedIcon />}
          onClick={reset}
          sx={actionSx(color, rgb, false)}
        >
          {L.reset}
        </Button>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 540 }}>
          <thead>
            <tr>
              {/* badge+delete col: narrow, no header text */}
              <th style={{ ...thBase, width: 44, padding: 0, borderBottom: `2px solid ${color}` }} />
              {/* Kriterium col with icon */}
              <th style={{ ...thBase, width: '22%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FilterListOutlinedIcon sx={{ fontSize: 15, opacity: 0.65 }} />
                  {L.col1}
                </span>
              </th>
              {/* Ausprägungen col with icon */}
              <th style={{ ...thBase, width: '20%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <TuneOutlinedIcon sx={{ fontSize: 15, opacity: 0.65 }} />
                  {L.col2}
                </span>
              </th>
              {segments.map((seg, segIdx) => {
                const accentColor = SEG_ACCENT_COLORS[segIdx % SEG_ACCENT_COLORS.length];
                const segThStyle = {
                  ...thBase,
                  minWidth: 110,
                  borderTop: `3px solid ${accentColor}`,
                };
                if (editSegId === seg.id) {
                  return (
                    <th key={seg.id} style={segThStyle}>
                      <input
                        autoFocus
                        value={seg.name}
                        onChange={e => renameSegment(seg.id, e.target.value)}
                        onBlur={() => setEditSegId(null)}
                        onKeyDown={e => { if (e.key === 'Enter') { setEditSegId(null); } }}
                        style={{
                          width: '100%',
                          background: 'var(--ifm-card-background-color)',
                          border: `1px solid ${color}`,
                          borderRadius: 4,
                          color: 'var(--ifm-font-color-base)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          padding: '0.15rem 0.4rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </th>
                  );
                }
                return (
                  <th key={seg.id} style={segThStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span
                        onClick={() => setEditSegId(seg.id)}
                        title={L.renameSeg}
                        style={{ cursor: 'text', flex: 1 }}
                      >
                        {seg.name}
                      </span>
                      {segments.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={() => removeSegment(seg.id)}
                          title={L.removeSeg}
                          sx={{
                            padding: '2px',
                            color: 'var(--ifm-font-color-secondary)',
                            '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' },
                          }}
                        >
                          <CloseOutlinedIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      )}
                    </span>
                  </th>
                );
              })}
              {/* add-segment */}
              <th style={{ ...thBase, width: 44, padding: '0.25rem', textAlign: 'center' }}>
                <IconButton
                  size="small"
                  onClick={addSegment}
                  title={L.addSeg}
                  sx={{
                    color: color,
                    '&:hover': { backgroundColor: `rgba(${rgb}, 0.1)` },
                  }}
                >
                  <AddOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rowBg = i % 2 === 0
                ? 'var(--ifm-table-background, transparent)'
                : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))';
              return (
                <tr key={row.id} style={{ background: rowBg }}>
                  {/* number badge + delete stacked in col1 */}
                  <td style={{ ...tdBase, width: 44, textAlign: 'center', verticalAlign: 'middle', padding: '0 4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: `rgba(${rgb}, 0.12)`,
                          color: color,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {i + 1}
                      </span>
                      <IconButton
                        size="small"
                        onClick={() => removeRow(row.id)}
                        title={L.removeRow}
                        sx={{
                          color: 'var(--ifm-color-emphasis-400)',
                          padding: '2px',
                          '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' },
                        }}
                      >
                        <CloseOutlinedIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                  </td>
                  <td style={tdBase}>
                    <Cell value={row.k} placeholder={row.pk} onChange={val => setK(row.id, val)} color={color} />
                  </td>
                  <td style={tdBase}>
                    <Cell value={row.a} placeholder={row.pa} onChange={val => setA(row.id, val)} color={color} />
                  </td>
                  {segments.map(seg => (
                    <td key={seg.id} style={tdBase}>
                      <Cell value={row.v[seg.id] || ''} placeholder="" onChange={val => setV(row.id, seg.id, val)} color={color} />
                    </td>
                  ))}
                  {/* spacer under add-segment column */}
                  <td style={{ ...tdBase, background: 'var(--ifm-color-emphasis-100)' }} />
                </tr>
              );
            })}

            {/* Add row — inside tbody as last data row, dashed style */}
            <tr>
              <td
                colSpan={totalCols}
                style={{
                  border: cellBorder,
                  padding: 0,
                  background: 'var(--ifm-table-background, transparent)',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddOutlinedIcon />}
                  onClick={addRow}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.82rem',
                    borderStyle: 'dashed',
                    border: 'none',
                    borderRadius: 0,
                    borderColor: `rgba(${rgb}, 0.35)`,
                    color: 'var(--ifm-font-color-secondary)',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    padding: '0.4rem 0.75rem',
                    '&:hover': {
                      borderStyle: 'dashed',
                      borderColor: color,
                      color: color,
                      backgroundColor: `rgba(${rgb}, 0.05)`,
                    },
                  }}
                >
                  {L.addRow}
                </Button>
              </td>
            </tr>

            {/* Relevanz row */}
            <tr style={{ background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))' }}>
              <td style={{ ...tdBase, width: 44, padding: '0 4px', textAlign: 'center', verticalAlign: 'middle', background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))' }} />
              <td style={{ ...tdBase, padding: '0.5rem 0.75rem', fontWeight: 700, fontSize: '0.875rem', verticalAlign: 'middle', background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))' }}>
                {L.summary}
              </td>
              <td style={{ ...tdBase, padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: 'var(--ifm-font-color-secondary)', verticalAlign: 'middle', background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))' }}>
                {L.summaryAusp}
              </td>
              {segments.map(seg => (
                <td key={seg.id} style={{ ...tdBase, padding: '0.35rem 0.5rem', verticalAlign: 'middle', background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {['hoch', 'mittel', 'niedrig'].map(opt => {
                      const s = RELEVANZ_STYLE[opt];
                      const active = (rel[seg.id] || '') === opt;
                      const btnStyle = {
                        background: active ? s.bg : 'var(--ifm-card-background-color)',
                        border: `1px solid ${active ? s.border : 'var(--ifm-color-emphasis-200)'}`,
                        color: active ? s.fg : 'var(--ifm-font-color-secondary)',
                        borderRadius: 999,
                        padding: '0.1rem 0.5rem',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: active ? 600 : 400,
                        textAlign: 'center',
                        transition: 'all 0.15s',
                        fontFamily: 'inherit',
                        width: '100%',
                      };
                      return (
                        <button
                          key={opt}
                          onClick={() => setRel(seg.id, opt)}
                          style={btnStyle}
                        >
                          {L.rel[opt]}
                        </button>
                      );
                    })}
                  </div>
                </td>
              ))}
              <td style={{ ...tdBase, background: 'var(--ifm-color-emphasis-100)' }} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

MarktsegmentierungsMatrix.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
