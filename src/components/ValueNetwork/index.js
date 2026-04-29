// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const DEFAULT_COLOR = '#6B8E50';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '107, 142, 80';
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

const ROWS_CONFIG = {
  de: [
    { key: 'akteure', label: '🏭 Akteure', ph: 'Welche Akteure sind beteiligt?' },
    { key: 'rollen', label: '🎭 Rollen', ph: 'Welche Rollen nehmen die Akteure ein?' },
    { key: 'gueter', label: '⬛ Güterströme', ph: 'Welche physischen Güter fließen?' },
    { key: 'services', label: '🔵 Serviceströme', ph: 'Welche Services werden erbracht?' },
    { key: 'daten', label: '🟢 Datenströme', ph: 'Welche Daten werden ausgetauscht?' },
    { key: 'finanzen', label: '🟠 Finanzströme', ph: 'Wie fließen die Finanzen?' },
  ],
  en: [
    { key: 'akteure', label: '🏭 Actors', ph: 'Which actors are involved?' },
    { key: 'rollen', label: '🎭 Roles', ph: 'What roles do the actors play?' },
    { key: 'gueter', label: '⬛ Goods Flows', ph: 'What physical goods flow?' },
    { key: 'services', label: '🔵 Service Flows', ph: 'What services are provided?' },
    { key: 'daten', label: '🟢 Data Flows', ph: 'What data is exchanged?' },
    { key: 'finanzen', label: '🟠 Financial Flows', ph: 'How do finances flow?' },
  ],
};

const LABELS = {
  de: { reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'value-network' },
  en: { reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'value-network' },
};

const makeInitialState = () => ({ akteure: '', rollen: '', gueter: '', services: '', daten: '', finanzen: '' });

export default function ValueNetwork({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rowsConfig = ROWS_CONFIG[lang] ?? ROWS_CONFIG.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const downloadCsv = () => {
    const csv = rowsConfig.map(r => `"${r.label}","${String(state[r.key]).replace(/"/g, '""')}"`).join('\r\n');
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

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '200px' }} />
            <col />
          </colgroup>
          <tbody>
            {rowsConfig.map((row, i) => (
              <tr key={row.key} style={{ background: i % 2 === 0 ? 'var(--ifm-table-background, transparent)' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.03))' }}>
                <td style={{ border: cellBorder, padding: '0.5rem 0.75rem', fontWeight: 600, fontSize: '0.875rem', color, verticalAlign: 'middle', background: `rgba(${rgb}, 0.06)` }}>
                  {row.label}
                </td>
                <td style={{ border: cellBorder, padding: 0, verticalAlign: 'top' }}>
                  <Cell value={state[row.key]} placeholder={row.ph} onChange={val => setState(s => ({ ...s, [row.key]: val }))} color={color} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ValueNetwork.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
