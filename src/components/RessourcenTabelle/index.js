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
    col1: 'ID', col2: 'Rollen / Skills', col3: 'Kapazität (PT)', col4: 'Kostenrahmen', col5: 'Partner-Abhängigkeiten', col6: 'Mgmt-Entscheidung',
    ph: { mid: 'R1', rollen: 'Benötigte Rollen…', kapazitaet: 'z.B. 5 PT', kosten: 'z.B. 10.000 €', partner: 'Externe Abhängigkeiten…', mgmt: 'Owner, Deadline…' },
    addRow: 'Ressource hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'ressourcen-tabelle',
  },
  en: {
    col1: 'ID', col2: 'Roles / Skills', col3: 'Capacity (PD)', col4: 'Budget', col5: 'Partner Dependencies', col6: 'Mgmt Decision',
    ph: { mid: 'R1', rollen: 'Required roles…', kapazitaet: 'e.g. 5 PD', kosten: 'e.g. €10,000', partner: 'External dependencies…', mgmt: 'Owner, deadline…' },
    addRow: 'Add Resource', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'resources-table',
  },
};

function makeInitialState() {
  return { rows: [1, 2, 3].map(n => ({ id: uid(), mid: `R${n}`, rollen: '', kapazitaet: '', kosten: '', partner: '', mgmt: '' })) };
}

export default function RessourcenTabelle({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const addRow = () => setState(s => {
    const nextNum = s.rows.length + 1;
    return { rows: [...s.rows, { id: uid(), mid: `R${nextNum}`, rollen: '', kapazitaet: '', kosten: '', partner: '', mgmt: '' }] };
  });
  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({ rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r) }));

  const downloadCsv = () => {
    const header = [L.col1, L.col2, L.col3, L.col4, L.col5, L.col6];
    const data = rows.map(r => [r.mid, r.rollen, r.kapazitaet, r.kosten, r.partner, r.mgmt]);
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
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 560 }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 36, padding: 0 }} />
              <th style={{ ...thBase, width: '8%' }}>{L.col1}</th>
              <th style={{ ...thBase, width: '20%' }}>{L.col2}</th>
              <th style={{ ...thBase, width: '12%' }}>{L.col3}</th>
              <th style={{ ...thBase, width: '15%' }}>{L.col4}</th>
              <th style={{ ...thBase, width: '20%' }}>{L.col5}</th>
              <th style={thBase}>{L.col6}</th>
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
                <td style={tdBase}><Cell value={row.rollen} placeholder={L.ph.rollen} onChange={val => setField(row.id, 'rollen', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.kapazitaet} placeholder={L.ph.kapazitaet} onChange={val => setField(row.id, 'kapazitaet', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.kosten} placeholder={L.ph.kosten} onChange={val => setField(row.id, 'kosten', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.partner} placeholder={L.ph.partner} onChange={val => setField(row.id, 'partner', val)} color={color} /></td>
                <td style={tdBase}><Cell value={row.mgmt} placeholder={L.ph.mgmt} onChange={val => setField(row.id, 'mgmt', val)} color={color} /></td>
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

RessourcenTabelle.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
