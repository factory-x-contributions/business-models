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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const DEFAULT_COLOR = '#B85450';

// Priority-based accent colors per section
const SECTION_COLORS = {
  pains: '#B85450',
  essentials: '#C07830',
  nice: '#4A7FA8',
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}` : '184, 84, 80';
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

const TYPE_STYLES = {
  pain: { borderColor: '#B85450', color: '#B85450', background: 'rgba(184,84,80,0.12)' },
  gain: { borderColor: '#2d8a5e', color: '#2d8a5e', background: 'rgba(45,138,94,0.12)' },
  none: { borderColor: 'var(--ifm-color-emphasis-300)', color: 'var(--ifm-color-emphasis-400)', background: 'transparent' },
};

const TYPE_LABEL = { pain: 'P', gain: 'G', none: '·' };

// Cycles: null → 'pain' → 'gain' → null
function TypeBadge({ type, title, onClick }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 22, height: 22, borderRadius: '50%', border: '1.5px solid',
    fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 0.15s', userSelect: 'none', padding: 0, lineHeight: 1,
  };
  const key = type === 'pain' || type === 'gain' ? type : 'none';
  return (
    <button type="button" onClick={onClick} title={title} style={{ ...base, ...TYPE_STYLES[key] }}>
      {TYPE_LABEL[key]}
    </button>
  );
}
TypeBadge.propTypes = { type: PropTypes.string, title: PropTypes.string.isRequired, onClick: PropTypes.func.isRequired };

const TYPE_BG = { pain: 'rgba(184,84,80,0.03)', gain: 'rgba(45,138,94,0.03)', none: 'transparent' };

function Cell({ value, placeholder, onChange, sectionColor, type }) {
  const rgb = hexToRgb(sectionColor);
  const typeBg = TYPE_BG[type] ?? TYPE_BG.none;
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
      onFocus={e => { e.target.style.background = `rgba(${rgb}, 0.06)`; }}
      onBlur={e => { e.target.style.background = typeBg; }}
      style={{
        width: '100%', resize: 'none', overflow: 'hidden', border: 'none', outline: 'none',
        background: typeBg, padding: '0.5rem 0.6rem', fontSize: '0.875rem',
        fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.45,
        minHeight: '2.4rem', boxSizing: 'border-box', transition: 'background 0.15s',
      }}
    />
  );
}
Cell.propTypes = {
  value: PropTypes.string.isRequired, placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, sectionColor: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const SECTIONS = ['pains', 'essentials', 'nice'];

const LABELS = {
  de: {
    col1: 'Pain / Gain', col2: 'Wirkhebel', col3: 'Value',
    sections: { pains: 'Pains & Gains', essentials: 'Essentials', nice: 'Nice-to-Haves' },
    ph: { pg: 'Pain oder Gain eintragen…', wirk: 'Pain Reliever / Gain Creator…', val: 'Wertbeitrag…' },
    addRow: 'Zeile hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'match-matrix',
    rowCount: (n) => {
      const word = n === 1 ? 'Eintrag' : 'Einträge';
      return `${n} ${word}`;
    },
    typeBadgeTitle: (t) => {
      if (t === 'pain') return 'Pain → weiter zu Gain';
      if (t === 'gain') return 'Gain → Markierung entfernen';
      return 'Typ setzen: Pain (P) oder Gain (G)';
    },
  },
  en: {
    col1: 'Pain / Gain', col2: 'Value Driver', col3: 'Value',
    sections: { pains: 'Pains & Gains', essentials: 'Essentials', nice: 'Nice-to-Haves' },
    ph: { pg: 'Enter pain or gain…', wirk: 'Pain Reliever / Gain Creator…', val: 'Value contribution…' },
    addRow: 'Add Row', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'match-matrix',
    rowCount: (n) => {
      const word = n === 1 ? 'entry' : 'entries';
      return `${n} ${word}`;
    },
    typeBadgeTitle: (t) => {
      if (t === 'pain') return 'Pain → switch to Gain';
      if (t === 'gain') return 'Gain → remove type';
      return 'Set type: Pain (P) or Gain (G)';
    },
  },
};

function makeRows(n) {
  return Array.from({ length: n }, () => ({ id: uid(), pg: '', wirk: '', val: '', type: null }));
}

function makeInitialState() {
  return { rows: { pains: makeRows(3), essentials: makeRows(2), nice: makeRows(1) } };
}

export default function MatchMatrix({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const addRow = (section) => setState(s => ({
    rows: { ...s.rows, [section]: [...s.rows[section], { id: uid(), pg: '', wirk: '', val: '', type: null }] },
  }));

  const removeRow = (section, rowId) => setState(s => ({
    rows: { ...s.rows, [section]: s.rows[section].filter(r => r.id !== rowId) },
  }));

  const setField = (section, rowId, field, val) => setState(s => ({
    rows: { ...s.rows, [section]: s.rows[section].map(r => r.id === rowId ? { ...r, [field]: val } : r) },
  }));

  const cycleType = (section, rowId) => setState(s => ({
    rows: {
      ...s.rows,
      [section]: s.rows[section].map(r => {
        if (r.id !== rowId) return r;
        let next = null;
        if (r.type === null) next = 'pain';
        else if (r.type === 'pain') next = 'gain';
        return { ...r, type: next };
      }),
    },
  }));

  const downloadCsv = () => {
    const header = ['Type', L.col1, L.col2, L.col3];
    const dataRows = SECTIONS.flatMap(sec => [
      [`--- ${L.sections[sec]} ---`, '', '', ''],
      ...rows[sec].map(r => [r.type ?? '', r.pg, r.wirk, r.val]),
    ]);
    const csv = [header, ...dataRows].map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${L.filename}.csv`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
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
  const thBase = {
    border: cellBorder, borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)', fontSize: '0.875rem',
    padding: '0.6rem 0.75rem', verticalAlign: 'middle',
  };
  const tdBase = { border: cellBorder, padding: 0, verticalAlign: 'top', background: 'transparent' };

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end',
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
      }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 520 }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 30, padding: '0.6rem 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.03em' }}>P·G</span>
              </th>
              <th style={{ ...thBase, width: 30, padding: 0 }} />
              <th style={{ ...thBase, width: '34%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <PeopleOutlinedIcon sx={{ fontSize: 15, opacity: 0.65 }} />
                  {L.col1}
                </div>
              </th>
              <th style={{ ...thBase, width: '34%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <TuneOutlinedIcon sx={{ fontSize: 15, opacity: 0.65 }} />
                  {L.col2}
                </div>
              </th>
              <th style={{ ...thBase }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <TrendingUpOutlinedIcon sx={{ fontSize: 15, opacity: 0.65 }} />
                  {L.col3}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {SECTIONS.map(sec => {
              const secColor = SECTION_COLORS[sec];
              const secRgb = hexToRgb(secColor);
              return (
                <React.Fragment key={sec}>
                  {/* Section header */}
                  <tr>
                    <td colSpan={5} style={{
                      ...tdBase,
                      padding: '0.45rem 0.75rem',
                      background: `rgba(${secRgb}, 0.08)`,
                      borderLeft: `4px solid ${secColor}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: secColor }}>
                          {L.sections[sec]}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: `rgba(${secRgb}, 0.65)`, fontWeight: 500 }}>
                          {L.rowCount(rows[sec].length)}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {/* Data rows */}
                  {rows[sec].map((row, i) => {
                    let rowBg = i % 2 === 0 ? 'transparent' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.02))';
                    if (row.type === 'pain') rowBg = 'rgba(184,84,80,0.04)';
                    else if (row.type === 'gain') rowBg = 'rgba(45,138,94,0.04)';
                    return (
                      <tr key={row.id} style={{ background: rowBg }}>
                        <td style={{ ...tdBase, width: 30, textAlign: 'center', verticalAlign: 'middle', padding: '0 4px' }}>
                          <TypeBadge
                            type={row.type}
                            title={L.typeBadgeTitle(row.type)}
                            onClick={() => cycleType(sec, row.id)}
                          />
                        </td>
                        <td style={{ ...tdBase, width: 30, textAlign: 'center', verticalAlign: 'middle', padding: '0 2px' }}>
                          <IconButton size="small" onClick={() => removeRow(sec, row.id)} title={L.removeRow}
                            sx={{ color: 'var(--ifm-color-emphasis-400)', padding: '4px', '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' } }}>
                            <CloseOutlinedIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </td>
                        <td style={tdBase}>
                          <Cell value={row.pg} placeholder={L.ph.pg} onChange={val => setField(sec, row.id, 'pg', val)} sectionColor={secColor} type={row.type} />
                        </td>
                        <td style={tdBase}>
                          <Cell value={row.wirk} placeholder={L.ph.wirk} onChange={val => setField(sec, row.id, 'wirk', val)} sectionColor={secColor} type={row.type} />
                        </td>
                        <td style={tdBase}>
                          <Cell value={row.val} placeholder={L.ph.val} onChange={val => setField(sec, row.id, 'val', val)} sectionColor={secColor} type={row.type} />
                        </td>
                      </tr>
                    );
                  })}
                  {/* Add row */}
                  <tr>
                    <td colSpan={5} style={{ ...tdBase, padding: '0.25rem' }}>
                      <Button variant="outlined" size="small" startIcon={<AddOutlinedIcon />}
                        onClick={() => addRow(sec)} fullWidth
                        sx={{
                          textTransform: 'none', fontSize: '0.8rem', borderStyle: 'dashed',
                          borderColor: `rgba(${secRgb}, 0.35)`, color: 'var(--ifm-font-color-secondary)',
                          backgroundColor: 'transparent', borderRadius: '6px',
                          '&:hover': { borderStyle: 'dashed', borderColor: secColor, color: secColor, backgroundColor: `rgba(${secRgb}, 0.05)` },
                        }}>
                        {L.addRow}
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

MatchMatrix.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
