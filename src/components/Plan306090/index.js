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
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import RouteOutlined from '@mui/icons-material/RouteOutlined';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import CommentOutlined from '@mui/icons-material/CommentOutlined';

const DEFAULT_COLOR = '#6B7280';

const PHASE_COLORS = {
  '30': '#4A7FA8',
  '60': '#C07830',
  '90': '#6B8E50',
};

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
Cell.propTypes = { value: PropTypes.string.isRequired, placeholder: PropTypes.string, onChange: PropTypes.func.isRequired, color: PropTypes.string.isRequired };

const LABELS = {
  de: {
    col1: 'ID', col2: '30/60/90 Tage', col3: 'Zielpfad (PoC/MVP)', col4: 'Abhängigkeiten', col5: 'Outcome', col6: 'KPI', col7: 'Reduziert Risiko?', col8: 'Rest-Risiko', col9: 'Kommentar',
    ph: { mid: 'A1', phase: '30/60/90', zielpfad: 'PoC / MVP', abh: 'Abhängigkeiten…', outcome: 'Ergebnis…', kpi: 'KPI…', reduziertRisiko: 'Ja / Nein', restRisiko: 'R-ID…', kommentar: 'Kommentar…' },
    addRow: 'Zeile hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: '30-60-90-plan',
    phaseLabel: { '30': '30 Tage', '60': '60 Tage', '90': '90 Tage' },
  },
  en: {
    col1: 'ID', col2: '30/60/90 Days', col3: 'Target Path (PoC/MVP)', col4: 'Dependencies', col5: 'Outcome', col6: 'KPI', col7: 'Reduces Risk?', col8: 'Residual Risk', col9: 'Comment',
    ph: { mid: 'A1', phase: '30/60/90', zielpfad: 'PoC / MVP', abh: 'Dependencies…', outcome: 'Result…', kpi: 'KPI…', reduziertRisiko: 'Yes / No', restRisiko: 'R-ID…', kommentar: 'Comment…' },
    addRow: 'Add Row', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: '30-60-90-plan',
    phaseLabel: { '30': '30 Days', '60': '60 Days', '90': '90 Days' },
  },
};

function makeRow(mid, phase) {
  return { id: uid(), mid, phase, zielpfad: '', abh: '', outcome: '', kpi: '', reduziertRisiko: '', restRisiko: '', kommentar: '' };
}

function makeInitialState() {
  return {
    rows: [
      makeRow('A1', '30'), makeRow('A2', '30'),
      makeRow('B1', '60'), makeRow('B2', '60'),
      makeRow('C1', '90'), makeRow('C2', '90'),
    ],
  };
}

const PHASE_ORDER = ['30', '60', '90'];

function groupRowsByPhase(rows) {
  const grouped = {};
  const ungrouped = [];
  for (const row of rows) {
    if (PHASE_COLORS[row.phase]) {
      if (!grouped[row.phase]) grouped[row.phase] = [];
      grouped[row.phase].push(row);
    } else {
      ungrouped.push(row);
    }
  }
  return { grouped, ungrouped };
}

export default function Plan306090({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const addRow = () => setState(s => ({ rows: [...s.rows, makeRow('', '')] }));
  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({ rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r) }));

  const downloadCsv = () => {
    const header = [L.col1, L.col2, L.col3, L.col4, L.col5, L.col6, L.col7, L.col8, L.col9];
    const data = rows.map(r => [r.mid, r.phase, r.zielpfad, r.abh, r.outcome, r.kpi, r.reduziertRisiko, r.restRisiko, r.kommentar]);
    const csv = [header, ...data].map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(',')).join('\r\n');
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
    border: cellBorder,
    borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)',
    fontSize: '0.78rem',
    padding: '0.4rem 0.5rem',
    verticalAlign: 'middle',
  };
  const tdBase = { border: cellBorder, padding: 0, verticalAlign: 'top', background: 'var(--ifm-table-background, transparent)' };

  const { grouped, ungrouped } = groupRowsByPhase(rows);

  // Total column count: delete col + mid + phase + zielpfad + abh + outcome + kpi + reduziertRisiko + restRisiko + kommentar = 10
  const TOTAL_COLS = 10;

  function renderDataRow(row, i) {
    const rowBg = i % 2 === 0 ? 'var(--ifm-table-background, transparent)' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))';
    return (
      <tr key={row.id} style={{ background: rowBg }}>
        <td style={{ ...tdBase, width: 44, textAlign: 'center', verticalAlign: 'middle', padding: '0 2px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '4px 0' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--ifm-color-emphasis-500)', lineHeight: 1 }}>
              {i + 1}
            </span>
            <IconButton
              size="small"
              onClick={() => removeRow(row.id)}
              title={L.removeRow}
              sx={{ color: 'var(--ifm-color-emphasis-400)', padding: '2px', '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' } }}
            >
              <CloseOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </div>
        </td>
        <td style={tdBase}><Cell value={row.mid} placeholder={L.ph.mid} onChange={val => setField(row.id, 'mid', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.phase} placeholder={L.ph.phase} onChange={val => setField(row.id, 'phase', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.zielpfad} placeholder={L.ph.zielpfad} onChange={val => setField(row.id, 'zielpfad', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.abh} placeholder={L.ph.abh} onChange={val => setField(row.id, 'abh', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.outcome} placeholder={L.ph.outcome} onChange={val => setField(row.id, 'outcome', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.kpi} placeholder={L.ph.kpi} onChange={val => setField(row.id, 'kpi', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.reduziertRisiko} placeholder={L.ph.reduziertRisiko} onChange={val => setField(row.id, 'reduziertRisiko', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.restRisiko} placeholder={L.ph.restRisiko} onChange={val => setField(row.id, 'restRisiko', val)} color={color} /></td>
        <td style={tdBase}><Cell value={row.kommentar} placeholder={L.ph.kommentar} onChange={val => setField(row.id, 'kommentar', val)} color={color} /></td>
      </tr>
    );
  }

  function renderPhaseHeader(phase) {
    const phaseColor = PHASE_COLORS[phase];
    const phaseRgb = hexToRgb(phaseColor);
    const label = L.phaseLabel?.[phase] ?? `${phase} Tage`;
    return (
      <tr key={`phase-header-${phase}`}>
        <td
          colSpan={TOTAL_COLS}
          style={{
            borderLeft: `4px solid ${phaseColor}`,
            borderTop: cellBorder,
            borderRight: cellBorder,
            borderBottom: cellBorder,
            background: `rgba(${phaseRgb}, 0.08)`,
            padding: '0.35rem 0.75rem',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: phaseColor,
            letterSpacing: '0.03em',
          }}
        >
          {label}
        </td>
      </tr>
    );
  }

  // Build row segments: known phases in order, then ungrouped rows at end
  const rowSegments = [];
  let globalIndex = 0;

  for (const phase of PHASE_ORDER) {
    const phaseRows = grouped[phase];
    if (phaseRows && phaseRows.length > 0) {
      rowSegments.push(renderPhaseHeader(phase));
      for (const row of phaseRows) {
        rowSegments.push(renderDataRow(row, globalIndex));
        globalIndex += 1;
      }
    }
  }
  for (const row of ungrouped) {
    rowSegments.push(renderDataRow(row, globalIndex));
    globalIndex += 1;
  }

  const iconStyle = { fontSize: 14, verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.75 };

  return (
    <div style={{ borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--ifm-color-emphasis-200)', background: 'var(--ifm-card-background-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 44, padding: 0 }} />
              <th style={{ ...thBase, width: '6%' }}><TagOutlined style={iconStyle} />{L.col1}</th>
              <th style={{ ...thBase, width: '8%' }}><AccessTimeOutlined style={iconStyle} />{L.col2}</th>
              <th style={{ ...thBase, width: '11%' }}><RouteOutlined style={iconStyle} />{L.col3}</th>
              <th style={{ ...thBase, width: '11%' }}><LinkOutlined style={iconStyle} />{L.col4}</th>
              <th style={{ ...thBase, width: '14%' }}><CheckCircleOutlined style={iconStyle} />{L.col5}</th>
              <th style={{ ...thBase, width: '10%' }}><TrendingUpOutlined style={iconStyle} />{L.col6}</th>
              <th style={{ ...thBase, width: '10%' }}><ShieldOutlined style={iconStyle} />{L.col7}</th>
              <th style={{ ...thBase, width: '10%' }}><WarningAmberOutlined style={iconStyle} />{L.col8}</th>
              <th style={{ ...thBase }}><CommentOutlined style={iconStyle} />{L.col9}</th>
            </tr>
          </thead>
          <tbody>
            {rowSegments}
            <tr>
              <td colSpan={TOTAL_COLS} style={{ border: cellBorder, padding: 0 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddOutlinedIcon />}
                  onClick={addRow}
                  fullWidth
                  sx={{
                    textTransform: 'none', fontSize: '0.82rem', borderStyle: 'dashed',
                    border: 'none', borderRadius: 0,
                    color: 'var(--ifm-font-color-secondary)',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    padding: '0.45rem 0',
                    '&:hover': { borderStyle: 'dashed', color, backgroundColor: `rgba(${rgb}, 0.05)` },
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

Plan306090.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
