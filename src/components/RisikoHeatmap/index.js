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
  ['#fef9c3', '#fef3c7', '#fee2e2', '#fee2e2', '#fee2e2'],
  ['#dcfce7', '#fef9c3', '#fef3c7', '#fee2e2', '#fee2e2'],
  ['#dcfce7', '#fef9c3', '#fef9c3', '#fef3c7', '#fee2e2'],
  ['#dcfce7', '#dcfce7', '#fef9c3', '#fef9c3', '#fef3c7'],
  ['#dcfce7', '#dcfce7', '#dcfce7', '#fef9c3', '#fef9c3'],
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '107, 114, 128';
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
  },
  en: {
    yLabels: ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'],
    xLabels: ['Insignificant', 'Minor', 'Moderate', 'Concerning', 'Extreme'],
    yAxisTitle: 'Likelihood ↓',
    xAxisTitle: 'Impact →',
    cellPh: 'R-ID…',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'risk-heatmap',
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
    const csv = [header, ...dataRows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
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
  const thBase = {
    border: cellBorder, borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)', fontSize: '0.78rem',
    padding: '0.4rem 0.5rem', verticalAlign: 'middle', textAlign: 'center',
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--ifm-font-color-secondary)', marginBottom: '0.25rem' }}>{L.xAxisTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: '120px', textAlign: 'left' }}>{L.yAxisTitle}</th>
              {L.xLabels.map(xl => <th key={xl} style={thBase}>{xl}</th>)}
            </tr>
          </thead>
          <tbody>
            {L.yLabels.map((yl, ri) => (
              <tr key={yl}>
                <td style={{ border: cellBorder, padding: '0.4rem 0.5rem', fontWeight: 600, fontSize: '0.78rem', color: 'var(--ifm-font-color-base)', verticalAlign: 'middle', background: 'var(--ifm-table-head-background, transparent)' }}>
                  {yl}
                </td>
                {HEAT_COLORS[ri].map((bg, ci) => (
                  <td key={ci} style={{ border: cellBorder, padding: 0, verticalAlign: 'top', background: bg }}>
                    <textarea
                      value={cells[ri][ci]}
                      placeholder={L.cellPh}
                      rows={1}
                      onChange={e => { setCell(ri, ci, e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; }}
                      style={{ width: '100%', resize: 'none', overflow: 'hidden', border: 'none', outline: 'none', background: 'transparent', padding: '0.35rem 0.4rem', fontSize: '0.78rem', fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.4, minHeight: '2.2rem', boxSizing: 'border-box', textAlign: 'center' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

RisikoHeatmap.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
