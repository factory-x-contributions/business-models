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

const DEFAULT_COLOR = '#6B7280';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '107, 114, 128';
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
Cell.propTypes = { value: PropTypes.string.isRequired, placeholder: PropTypes.string, onChange: PropTypes.func.isRequired, color: PropTypes.string.isRequired };

const LABELS = {
  de: {
    col1: 'ID', col2: 'Workstream', col3: 'Beschreibung (Was?)', col4: 'Deadline (Bis wann?)', col5: 'Ergebnis / KPI', col6: 'Risiko-Ref.',
    ph: { mid: 'M1', ws: 'Workstream…', desc: 'Was ist die Maßnahme?', deadline: 'TT.MM.JJJJ', kpi: 'Messbares Ergebnis…', risk: 'R-ID…' },
    addRow: 'Maßnahme hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'action-plan',
  },
  en: {
    col1: 'ID', col2: 'Workstream', col3: 'Description (What?)', col4: 'Deadline (By when?)', col5: 'Result / KPI', col6: 'Risk Ref.',
    ph: { mid: 'M1', ws: 'Workstream…', desc: 'What is the action?', deadline: 'DD.MM.YYYY', kpi: 'Measurable result…', risk: 'R-ID…' },
    addRow: 'Add Action', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'action-plan',
  },
};

function makeInitialState() {
  return {
    rows: [1, 2, 3, 4, 5].map(n => ({ id: uid(), mid: `M${n}`, ws: '', desc: '', deadline: '', kpi: '', risk: '' })),
  };
}

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
  const thBase = { border: cellBorder, borderBottom: `2px solid ${color}`, background: 'var(--ifm-table-head-background, transparent)', color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))', fontWeight: 'var(--ifm-table-head-font-weight, 700)', fontSize: '0.875rem', padding: '0.5rem 0.75rem', verticalAlign: 'middle' };
  const tdBase = { border: cellBorder, padding: 0, verticalAlign: 'top', background: 'var(--ifm-table-background, transparent)' };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 36, padding: 0 }} />
              <th style={{ ...thBase, width: '7%' }}>{L.col1}</th>
              <th style={{ ...thBase, width: '13%' }}>{L.col2}</th>
              <th style={{ ...thBase, width: '25%' }}>{L.col3}</th>
              <th style={{ ...thBase, width: '15%' }}>{L.col4}</th>
              <th style={{ ...thBase, width: '20%' }}>{L.col5}</th>
              <th style={{ ...thBase, width: '10%' }}>{L.col6}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} style={{ background: i % 2 === 0 ? 'var(--ifm-table-background, transparent)' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))' }}>
                <td style={{ ...tdBase, width: 36, textAlign: 'center', verticalAlign: 'middle', padding: '0 2px' }}>
                  <IconButton size="small" onClick={() => removeRow(row.id)} title={L.removeRow} sx={{ color: 'var(--ifm-color-emphasis-400)', padding: '4px', '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' } }}>
                    <CloseOutlinedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </td>
                <td style={tdBase}><Cell value={row.mid} placeholder={L.ph.mid} onChange={val => setField(row.id, 'mid', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.ws} placeholder={L.ph.ws} onChange={val => setField(row.id, 'ws', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.desc} placeholder={L.ph.desc} onChange={val => setField(row.id, 'desc', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.deadline} placeholder={L.ph.deadline} onChange={val => setField(row.id, 'deadline', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.kpi} placeholder={L.ph.kpi} onChange={val => setField(row.id, 'kpi', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.risk} placeholder={L.ph.risk} onChange={val => setField(row.id, 'risk', val)} color={color} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        variant="outlined" size="small" startIcon={<AddOutlinedIcon />}
        onClick={addRow} fullWidth
        sx={{ marginTop: '0.5rem', textTransform: 'none', fontSize: '0.82rem', borderStyle: 'dashed', borderColor: `rgba(${rgb}, 0.35)`, color: 'var(--ifm-font-color-secondary)', backgroundColor: 'transparent', borderRadius: '6px', justifyContent: 'center', '&:hover': { borderStyle: 'dashed', borderColor: color, color, backgroundColor: `rgba(${rgb}, 0.05)` } }}
      >
        {L.addRow}
      </Button>
    </div>
  );
}

ActionPlan.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
