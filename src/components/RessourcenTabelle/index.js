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
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';

const DEFAULT_COLOR = '#6B7280';

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

const LABELS = {
  de: {
    col1: 'ID', col2: 'Rollen / Skills', col3: 'Kapazität (PT)', col4: 'Kostenrahmen',
    col5: 'Partner-Abhängigkeiten', col6: 'Mgmt-Entscheidung',
    groupRessource: 'Ressource', groupPlanung: 'Planung',
    ph: { mid: 'R1', rollen: 'Benötigte Rollen…', kapazitaet: 'z.B. 5 PT', kosten: 'z.B. 10.000 €', partner: 'Externe Abhängigkeiten…', mgmt: 'Owner, Deadline…' },
    addRow: 'Ressource hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'ressourcen-tabelle',
    rowCount: n => `${n} Ressourcen`,
  },
  en: {
    col1: 'ID', col2: 'Roles / Skills', col3: 'Capacity (PD)', col4: 'Budget',
    col5: 'Partner Dependencies', col6: 'Mgmt Decision',
    groupRessource: 'Resource', groupPlanung: 'Planning',
    ph: { mid: 'R1', rollen: 'Required roles…', kapazitaet: 'e.g. 5 PD', kosten: 'e.g. €10,000', partner: 'External dependencies…', mgmt: 'Owner, deadline…' },
    addRow: 'Add Resource', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'resources-table',
    rowCount: n => `${n} Resources`,
  },
};

function makeInitialState() {
  return {
    rows: [1, 2, 3].map(n => ({
      id: uid(), mid: `R${n}`, rollen: '', kapazitaet: '', kosten: '', partner: '', mgmt: '',
    })),
  };
}

export default function RessourcenTabelle({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const addRow = () => setState(s => {
    const nextNum = s.rows.length + 1;
    return {
      rows: [...s.rows, {
        id: uid(), mid: `R${nextNum}`, rollen: '', kapazitaet: '', kosten: '', partner: '', mgmt: '',
      }],
    };
  });
  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({
    rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r),
  }));

  const downloadCsv = () => {
    const header = [L.col1, L.col2, L.col3, L.col4, L.col5, L.col6];
    const data = rows.map(r => [r.mid, r.rollen, r.kapazitaet, r.kosten, r.partner, r.mgmt]);
    const csv = [header, ...data]
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

  // Base th style — no bottom border here; each cell decides its own bottom border
  const thBase = {
    border: cellBorder,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)',
    fontSize: '0.8rem',
    padding: '0.35rem 0.6rem',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  };

  // Column-label row: bottom accent border
  const thCol = { ...thBase, borderBottom: `2px solid ${color}` };

  // Group header cells
  const thGroupBase = {
    ...thBase,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--ifm-font-color-secondary)',
    borderBottom: cellBorder,
    padding: '0.25rem 0.6rem',
  };

  // "Planung" group gets left accent + tint
  const thGroupPlanung = {
    ...thGroupBase,
    borderLeft: `3px solid ${color}`,
    background: `rgba(${rgb}, 0.04)`,
    color,
  };

  // "Planung" data columns inherit accent left border + tint
  const tdPlanung = {
    border: cellBorder,
    borderLeft: `3px solid rgba(${rgb}, 0.25)`,
    padding: 0,
    verticalAlign: 'top',
    background: `rgba(${rgb}, 0.025)`,
  };
  const tdBase = {
    border: cellBorder,
    padding: 0,
    verticalAlign: 'top',
    background: 'var(--ifm-table-background, transparent)',
  };
  const thColPlanung = {
    ...thCol,
    borderLeft: `3px solid rgba(${rgb}, 0.25)`,
    background: `rgba(${rgb}, 0.04)`,
  };

  // Shared icon style next to column label text
  const iconStyle = { fontSize: '0.9rem', verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 };

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
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ifm-font-color-secondary)' }}>
          {L.rowCount(rows.length)}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 560 }}>
          <thead>
            {/* Group label row */}
            <tr>
              {/* col0: action column — no group label */}
              <th style={{ ...thGroupBase, width: 44, padding: 0, border: cellBorder, borderBottom: cellBorder }} rowSpan={1} />
              {/* "Ressource" spans ID + Rollen */}
              <th style={thGroupBase} colSpan={2}>{L.groupRessource}</th>
              {/* "Planung" spans Kapazität + Kosten + Partner + Mgmt */}
              <th style={thGroupPlanung} colSpan={4}>{L.groupPlanung}</th>
            </tr>
            {/* Column label row */}
            <tr>
              <th style={{ ...thCol, width: 44, padding: 0 }} />
              <th style={{ ...thCol, width: '8%' }}>
                <TagOutlinedIcon sx={iconStyle} />{L.col1}
              </th>
              <th style={{ ...thCol, width: '20%' }}>
                <WorkOutlinedIcon sx={iconStyle} />{L.col2}
              </th>
              <th style={{ ...thColPlanung, width: '12%' }}>
                <TimerOutlinedIcon sx={iconStyle} />{L.col3}
              </th>
              <th style={{ ...thColPlanung, width: '15%' }}>
                <EuroOutlinedIcon sx={iconStyle} />{L.col4}
              </th>
              <th style={{ ...thColPlanung, width: '20%' }}>
                <HandshakeOutlinedIcon sx={iconStyle} />{L.col5}
              </th>
              <th style={thColPlanung}>
                <GavelOutlinedIcon sx={iconStyle} />{L.col6}
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
                  {/* col0: number badge + delete stacked */}
                  <td style={{
                    ...tdBase,
                    width: 44,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '0 2px',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '4px 0' }}>
                      <span style={{
                        display: 'inline-block',
                        minWidth: '1.25rem',
                        height: '1.25rem',
                        lineHeight: '1.25rem',
                        borderRadius: '50%',
                        background: `rgba(${rgb}, 0.12)`,
                        color,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textAlign: 'center',
                      }}>
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
                  <td style={tdBase}><Cell value={row.mid} placeholder={L.ph.mid} onChange={val => setField(row.id, 'mid', val)} color={color} /></td>
                  <td style={tdBase}><Cell value={row.rollen} placeholder={L.ph.rollen} onChange={val => setField(row.id, 'rollen', val)} color={color} /></td>
                  <td style={tdPlanung}><Cell value={row.kapazitaet} placeholder={L.ph.kapazitaet} onChange={val => setField(row.id, 'kapazitaet', val)} color={color} /></td>
                  <td style={tdPlanung}><Cell value={row.kosten} placeholder={L.ph.kosten} onChange={val => setField(row.id, 'kosten', val)} color={color} /></td>
                  <td style={tdPlanung}><Cell value={row.partner} placeholder={L.ph.partner} onChange={val => setField(row.id, 'partner', val)} color={color} /></td>
                  <td style={tdPlanung}><Cell value={row.mgmt} placeholder={L.ph.mgmt} onChange={val => setField(row.id, 'mgmt', val)} color={color} /></td>
                </tr>
              );
            })}
            {/* Add-row as last tbody row */}
            <tr>
              <td
                colSpan={7}
                style={{
                  border: cellBorder,
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <button
                  type="button"
                  onClick={addRow}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    width: '100%', padding: '0.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    fontSize: '0.82rem', fontWeight: 500,
                    color: 'var(--ifm-font-color-secondary)',
                    outline: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = `rgba(${rgb}, 0.04)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--ifm-font-color-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <AddOutlinedIcon style={{ fontSize: '1rem' }} />
                  {L.addRow}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

RessourcenTabelle.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
