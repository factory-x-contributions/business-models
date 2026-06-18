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
import TagOutlined from '@mui/icons-material/TagOutlined';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import EventOutlined from '@mui/icons-material/EventOutlined';
import TrackChangesOutlined from '@mui/icons-material/TrackChangesOutlined';
import LinkOutlined from '@mui/icons-material/LinkOutlined';

const DEFAULT_COLOR = '#6B7280';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}` : '107, 114, 128';
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

const LABELS = {
  de: {
    col1: 'ID', col2: 'Workstream', col3: 'Beschreibung (Was?)', col4: 'Deadline (Bis wann?)', col5: 'Ergebnis / KPI', col6: 'Risiko-Ref.',
    ph: { mid: 'M1', ws: 'Workstream…', desc: 'Was ist die Maßnahme?', deadline: 'TT.MM.JJJJ', kpi: 'Messbares Ergebnis…', risk: 'R-ID…' },
    addRow: 'Maßnahme hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'action-plan',
    rowCount: (n) => `${n} Maßnahmen / Actions`,
  },
  en: {
    col1: 'ID', col2: 'Workstream', col3: 'Description (What?)', col4: 'Deadline (By when?)', col5: 'Result / KPI', col6: 'Risk Ref.',
    ph: { mid: 'M1', ws: 'Workstream…', desc: 'What is the action?', deadline: 'DD.MM.YYYY', kpi: 'Measurable result…', risk: 'R-ID…' },
    addRow: 'Add Action', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'action-plan',
    rowCount: (n) => `${n} Actions`,
  },
};

function makeInitialState() {
  return {
    rows: [1, 2, 3, 4, 5].map(n => ({ id: uid(), mid: `M${n}`, ws: '', desc: '', deadline: '', kpi: '', risk: '' })),
  };
}

const COL_ICONS = {
  col1: <TagOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
  col2: <AccountTreeOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
  col3: <DescriptionOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
  col4: <EventOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
  col5: <TrackChangesOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
  col6: <LinkOutlined sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />,
};

export default function ActionPlan({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const addRow = () => setState(s => {
    const nextNum = s.rows.length + 1;
    return { rows: [...s.rows, { id: uid(), mid: `M${nextNum}`, ws: '', desc: '', deadline: '', kpi: '', risk: '' }] };
  });

  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({ rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r) }));

  const downloadCsv = () => {
    const header = [L.col1, L.col2, L.col3, L.col4, L.col5, L.col6];
    const data = rows.map(r => [r.mid, r.ws, r.desc, r.deadline, r.kpi, r.risk]);
    const csv = [header, ...data].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
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

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: `rgba(${rgb}, 0.75)` }}>
          {L.rowCount(rows.length)}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 44, padding: 0 }} />
              <th style={{ ...thBase, width: '7%' }}>{COL_ICONS.col1}{L.col1}</th>
              <th style={{ ...thBase, width: '13%' }}>{COL_ICONS.col2}{L.col2}</th>
              <th style={{ ...thBase, width: '25%' }}>{COL_ICONS.col3}{L.col3}</th>
              <th style={{ ...thBase, width: '15%' }}>{COL_ICONS.col4}{L.col4}</th>
              <th style={{ ...thBase, width: '20%' }}>{COL_ICONS.col5}{L.col5}</th>
              <th style={{ ...thBase, width: '10%' }}>{COL_ICONS.col6}{L.col6}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} style={{ background: i % 2 === 0 ? 'var(--ifm-table-background, transparent)' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))' }}>
                {/* Number badge + delete stacked in 44px cell */}
                <td style={{ ...tdBase, width: 44, textAlign: 'center', verticalAlign: 'middle', padding: '4px 2px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: `rgba(${rgb}, 0.12)`,
                      color: color, fontSize: '0.7rem', fontWeight: 700, lineHeight: 1,
                    }}>
                      {i + 1}
                    </span>
                    <IconButton
                      size="small"
                      onClick={() => removeRow(row.id)}
                      title={L.removeRow}
                      sx={{ color: 'var(--ifm-color-emphasis-400)', padding: '2px', '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' } }}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                  </div>
                </td>
                <td style={tdBase}><Cell value={row.mid} placeholder={L.ph.mid} onChange={val => setField(row.id, 'mid', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.ws} placeholder={L.ph.ws} onChange={val => setField(row.id, 'ws', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.desc} placeholder={L.ph.desc} onChange={val => setField(row.id, 'desc', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.deadline} placeholder={L.ph.deadline} onChange={val => setField(row.id, 'deadline', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.kpi} placeholder={L.ph.kpi} onChange={val => setField(row.id, 'kpi', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.risk} placeholder={L.ph.risk} onChange={val => setField(row.id, 'risk', val)} color={color} /></td>
              </tr>
            ))}
            {/* Add row as last tbody row */}
            <tr>
              <td colSpan={7} style={{ border: cellBorder, padding: 0 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddOutlinedIcon />}
                  onClick={addRow}
                  fullWidth
                  sx={{
                    textTransform: 'none', fontSize: '0.82rem', borderStyle: 'dashed',
                    border: 'none', borderRadius: 0,
                    color: 'var(--ifm-font-color-secondary)', backgroundColor: 'transparent',
                    justifyContent: 'center', padding: '0.45rem',
                    '&:hover': { borderStyle: 'dashed', borderColor: color, color, backgroundColor: `rgba(${rgb}, 0.05)` },
                  }}
                >
                  {L.addRow}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

ActionPlan.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
