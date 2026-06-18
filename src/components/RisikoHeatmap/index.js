// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const DEFAULT_COLOR = '#6B7280';

// heat colors: row 0 = top (fast sicher), row 4 = bottom (selten)
// col 0 = left (unbedeutend), col 4 = right (extrem)
const HEAT_COLORS = [
  ['#fef3c7', '#fde68a', '#fca5a5', '#f87171', '#ef4444'],
  ['#d1fae5', '#fef3c7', '#fde68a', '#fca5a5', '#f87171'],
  ['#d1fae5', '#fef3c7', '#fef3c7', '#fde68a', '#fca5a5'],
  ['#d1fae5', '#d1fae5', '#fef3c7', '#fef3c7', '#fde68a'],
  ['#d1fae5', '#d1fae5', '#d1fae5', '#fef3c7', '#fef3c7'],
];

const HEAT_TEXT = [
  ['#92400e', '#92400e', '#991b1b', '#991b1b', '#7f1d1d'],
  ['#065f46', '#92400e', '#92400e', '#991b1b', '#991b1b'],
  ['#065f46', '#92400e', '#92400e', '#92400e', '#991b1b'],
  ['#065f46', '#065f46', '#92400e', '#92400e', '#92400e'],
  ['#065f46', '#065f46', '#065f46', '#92400e', '#92400e'],
];

// Median column index per row used to tint row-header backgrounds
const ROW_MEDIAN_COL = [2, 2, 1, 1, 0];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '107, 114, 128';
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

const LABELS = {
  de: {
    yLabels: ['Fast sicher', 'Wahrscheinlich', 'Möglich', 'Unwahrscheinlich', 'Selten'],
    xLabels: ['Unbedeutend', 'Geringfügig', 'Wichtig', 'Besorgniserr.', 'Extrem'],
    yAxisTitle: 'Eintrittswahrscheinlichkeit ↓',
    xAxisTitle: 'Schadensausmaß →',
    cellPh: 'R-ID…',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'risiko-heatmap',
    legendLow: 'Geringes Risiko', legendMid: 'Mittleres Risiko', legendHigh: 'Hohes Risiko',
  },
  en: {
    yLabels: ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'],
    xLabels: ['Insignificant', 'Minor', 'Moderate', 'Concerning', 'Extreme'],
    yAxisTitle: 'Likelihood ↓',
    xAxisTitle: 'Impact →',
    cellPh: 'R-ID…',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'risk-heatmap',
    legendLow: 'Low Risk', legendMid: 'Medium Risk', legendHigh: 'High Risk',
  },
};

const makeInitialState = () => ({ cells: Array.from({ length: 5 }, () => Array(5).fill('')) });

export default function RisikoHeatmap({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ cells }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const setCell = (row, col, val) => setState(s => {
    const next = s.cells.map(r => [...r]);
    next[row][col] = val;
    return { cells: next };
  });

  const downloadCsv = () => {
    const header = ['', ...L.xLabels];
    const dataRows = L.yLabels.map((yl, ri) => [yl, ...cells[ri]]);
    const csv = [header, ...dataRows]
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
  const thBase = {
    border: cellBorder, borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)', fontSize: '0.78rem',
    padding: '0.4rem 0.5rem', verticalAlign: 'middle', textAlign: 'center',
  };

  return (
    <div style={{ borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', padding: '0.6rem 0.75rem', background: 'var(--ifm-card-background-color)', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>

      {/* Table area with axis labels */}
      <div style={{ padding: '0.75rem' }}>
        {/* X-axis title bar */}
        <div style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: 'var(--ifm-font-color-secondary)', letterSpacing: '0.03em', marginBottom: '0.4rem', paddingLeft: '120px' }}>
          {L.xAxisTitle}
        </div>

        {/* Row: Y-axis vertical label + scrollable table */}
        <div ref={tableRef} style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', overflowX: 'auto' }}>
          {/* Y-axis vertical label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--ifm-font-color-secondary)', letterSpacing: '0.03em', padding: '0.5rem 0', whiteSpace: 'nowrap' }}>
              {L.yAxisTitle}
            </span>
          </div>

          {/* Heatmap table */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ ...thBase, width: '120px', textAlign: 'left' }}>&nbsp;</th>
                  {L.xLabels.map(xl => <th key={xl} style={thBase}>{xl}</th>)}
                </tr>
              </thead>
              <tbody>
                {L.yLabels.map((yl, ri) => (
                  <tr key={yl}>
                    <td style={{
                      border: cellBorder,
                      padding: '0.4rem 0.5rem',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      color: HEAT_TEXT[ri][ROW_MEDIAN_COL[ri]],
                      verticalAlign: 'middle',
                      background: HEAT_COLORS[ri][ROW_MEDIAN_COL[ri]],
                      textAlign: 'left',
                    }}>
                      {yl}
                    </td>
                    {HEAT_COLORS[ri].map((bg, ci) => (
                      <td key={ci} style={{ border: cellBorder, padding: 0, verticalAlign: 'top', background: bg }}>
                        <textarea
                          value={cells[ri][ci]}
                          placeholder={L.cellPh}
                          rows={1}
                          onChange={e => {
                            setCell(ri, ci, e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                          }}
                          style={{
                            width: '100%', resize: 'none', overflow: 'hidden',
                            border: 'none', outline: 'none', background: 'transparent',
                            padding: '0.35rem 0.4rem', fontSize: '0.78rem',
                            fontFamily: 'inherit', color: HEAT_TEXT[ri][ci],
                            lineHeight: 1.4, minHeight: '2.2rem',
                            boxSizing: 'border-box', textAlign: 'center',
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { bg: '#d1fae5', text: '#065f46', label: L.legendLow },
            { bg: '#fef3c7', text: '#92400e', label: L.legendMid },
            { bg: '#f87171', text: '#991b1b', label: L.legendHigh },
          ].map(({ bg, text, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--ifm-font-color-secondary)' }}>
              <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '3px', background: bg, border: `1px solid ${text}22`, flexShrink: 0 }} />
              <span style={{ color: text, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

RisikoHeatmap.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
