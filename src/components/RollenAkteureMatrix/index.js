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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

const DEFAULT_COLOR = '#6B8E50';

// Suggested ecosystem roles for quick-insert chips
const ECOSYSTEM_ROLE_CHIPS = {
  de: ['Orchestrator', 'Enabler', 'Value Provider', 'Platform Owner', 'Integrator', 'Data Provider'],
  en: ['Orchestrator', 'Enabler', 'Value Provider', 'Platform Owner', 'Integrator', 'Data Provider'],
};
const CLASSICAL_ROLE_CHIPS = {
  de: ['Lieferant', 'Dienstleister', 'Kunde', 'Partner', 'Hersteller', 'Händler'],
  en: ['Supplier', 'Service Provider', 'Customer', 'Partner', 'Manufacturer', 'Reseller'],
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}` : '107, 142, 80';
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
  value: PropTypes.string.isRequired, placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, color: PropTypes.string.isRequired,
};

// Quick-insert chips below a cell
function ChipBar({ chips, current, onAdd, color }) {
  const rgb = hexToRgb(color);
  const active = new Set(current.split(',').map(s => s.trim()).filter(Boolean));
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', padding: '0 0.5rem 0.4rem' }}>
      {chips.map(chip => {
        const isActive = active.has(chip);
        return (
          <button
            key={chip}
            type="button"
            onClick={() => {
              if (isActive) return;
              const next = current.trim() ? `${current.trim()}, ${chip}` : chip;
              onAdd(next);
            }}
            style={{
              padding: '1px 7px', borderRadius: 10, border: '1px solid',
              fontSize: '0.7rem', cursor: isActive ? 'default' : 'pointer',
              fontFamily: 'inherit', lineHeight: 1.6, transition: 'all 0.12s',
              borderColor: isActive ? `rgba(${rgb}, 0.5)` : 'var(--ifm-color-emphasis-300)',
              color: isActive ? color : 'var(--ifm-color-emphasis-600)',
              background: isActive ? `rgba(${rgb}, 0.12)` : 'transparent',
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}
ChipBar.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const LABELS = {
  de: {
    col1: 'Akteur', col2: 'Kommentar', col3: 'Key Ecosystem Roles', col4: 'Classical Roles',
    ph: {
      akteur: 'z.B. Hersteller, Integrator…',
      kommentar: 'Rolle im Ökosystem…',
      keyRoles: 'z.B. Orchestrator, Enabler, Value Provider…',
      classRoles: 'z.B. Lieferant, Dienstleister…',
    },
    addRow: 'Akteur hinzufügen', removeRow: 'Zeile entfernen',
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'rollen-akteure-matrix',
    actorCount: (n) => {
      const word = n === 1 ? 'Akteur' : 'Akteure';
      return `${n} ${word}`;
    },
    groupActor: 'Akteur', groupRoles: 'Rollen',
  },
  en: {
    col1: 'Actor', col2: 'Comment', col3: 'Key Ecosystem Roles', col4: 'Classical Roles',
    ph: {
      akteur: 'e.g. Manufacturer, Integrator…',
      kommentar: 'Role in the ecosystem…',
      keyRoles: 'e.g. Orchestrator, Enabler, Value Provider…',
      classRoles: 'e.g. Supplier, Service Provider…',
    },
    addRow: 'Add Actor', removeRow: 'Remove row',
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'roles-actors-matrix',
    actorCount: (n) => {
      const word = n === 1 ? 'Actor' : 'Actors';
      return `${n} ${word}`;
    },
    groupActor: 'Actor', groupRoles: 'Roles',
  },
};

function makeInitialState() {
  return { rows: Array.from({ length: 3 }, () => ({ id: uid(), akteur: '', kommentar: '', keyRoles: '', classRoles: '' })) };
}

export default function RollenAkteureMatrix({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [{ rows }, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const addRow = () => setState(s => ({ rows: [...s.rows, { id: uid(), akteur: '', kommentar: '', keyRoles: '', classRoles: '' }] }));
  const removeRow = (id) => setState(s => ({ rows: s.rows.filter(r => r.id !== id) }));
  const setField = (id, field, val) => setState(s => ({ rows: s.rows.map(r => r.id === id ? { ...r, [field]: val } : r) }));

  const downloadCsv = () => {
    const header = [L.col1, L.col2, L.col3, L.col4];
    const data = rows.map(r => [r.akteur, r.kommentar, r.keyRoles, r.classRoles]);
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
    border: cellBorder, borderBottom: `2px solid ${color}`,
    background: 'var(--ifm-table-head-background, transparent)',
    color: 'var(--ifm-table-head-color, var(--ifm-font-color-base))',
    fontWeight: 'var(--ifm-table-head-font-weight, 700)', fontSize: '0.875rem',
    padding: '0.55rem 0.75rem', verticalAlign: 'middle',
  };
  const tdBase = { border: cellBorder, padding: 0, verticalAlign: 'top', background: 'transparent' };

  // Tint for the roles group columns
  const rolesTint = `rgba(${rgb}, 0.03)`;

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
        justifyContent: 'space-between', alignItems: 'center',
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: `rgba(${rgb}, 0.75)` }}>
          {L.actorCount(rows.length)}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 580 }}>
          <thead>
            {/* Column-group labels */}
            <tr>
              <th colSpan={3} style={{ ...thBase, borderBottom: 'none', paddingBottom: '0.2rem', fontSize: '0.7rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ifm-color-emphasis-500)', fontWeight: 600, width: '42%' }}>
                {L.groupActor}
              </th>
              <th colSpan={2} style={{ ...thBase, borderBottom: 'none', paddingBottom: '0.2rem', fontSize: '0.7rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: `rgba(${rgb}, 0.7)`, fontWeight: 600, background: rolesTint, borderLeft: `3px solid rgba(${rgb}, 0.25)` }}>
                {L.groupRoles}
              </th>
            </tr>
            {/* Column headers */}
            <tr>
              <th style={{ ...thBase, width: 44, padding: '0.35rem 0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--ifm-color-emphasis-400)', fontWeight: 600 }}>#</span>
              </th>
              <th style={{ ...thBase, width: '22%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <PersonOutlinedIcon sx={{ fontSize: 14, opacity: 0.6 }} />{L.col1}
                </div>
              </th>
              <th style={{ ...thBase, width: '20%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CommentOutlinedIcon sx={{ fontSize: 14, opacity: 0.6 }} />{L.col2}
                </div>
              </th>
              <th style={{ ...thBase, width: '29%', background: rolesTint, borderLeft: `3px solid rgba(${rgb}, 0.25)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <HubOutlinedIcon sx={{ fontSize: 14, opacity: 0.65, color }} />{L.col3}
                </div>
              </th>
              <th style={{ ...thBase, background: rolesTint }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AccountTreeOutlinedIcon sx={{ fontSize: 14, opacity: 0.65, color }} />{L.col4}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isEven = i % 2 === 0;
              const rowBg = isEven ? 'transparent' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.02))';
              return (
                <tr key={row.id} style={{ background: rowBg }}>
                  {/* Number + delete */}
                  <td style={{ ...tdBase, width: 44, textAlign: 'center', verticalAlign: 'middle', padding: '0 4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: `rgba(${rgb}, 0.12)`, color,
                        fontSize: '0.7rem', fontWeight: 700,
                      }}>
                        {i + 1}
                      </div>
                      <IconButton size="small" onClick={() => removeRow(row.id)} title={L.removeRow}
                        sx={{ color: 'var(--ifm-color-emphasis-300)', padding: '2px', '&:hover': { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.08)' } }}>
                        <CloseOutlinedIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </div>
                  </td>
                  <td style={tdBase}>
                    <Cell value={row.akteur} placeholder={L.ph.akteur} onChange={val => setField(row.id, 'akteur', val)} color={color} />
                  </td>
                  <td style={tdBase}>
                    <Cell value={row.kommentar} placeholder={L.ph.kommentar} onChange={val => setField(row.id, 'kommentar', val)} color={color} />
                  </td>
                  {/* Roles group — subtle tint + left border accent */}
                  <td style={{ ...tdBase, background: isEven ? rolesTint : `rgba(${rgb}, 0.04)`, borderLeft: `3px solid rgba(${rgb}, 0.2)` }}>
                    <Cell value={row.keyRoles} placeholder={L.ph.keyRoles} onChange={val => setField(row.id, 'keyRoles', val)} color={color} />
                    <ChipBar
                      chips={ECOSYSTEM_ROLE_CHIPS[lang] ?? ECOSYSTEM_ROLE_CHIPS.de}
                      current={row.keyRoles}
                      onAdd={val => setField(row.id, 'keyRoles', val)}
                      color={color}
                    />
                  </td>
                  <td style={{ ...tdBase, background: isEven ? rolesTint : `rgba(${rgb}, 0.04)` }}>
                    <Cell value={row.classRoles} placeholder={L.ph.classRoles} onChange={val => setField(row.id, 'classRoles', val)} color={color} />
                    <ChipBar
                      chips={CLASSICAL_ROLE_CHIPS[lang] ?? CLASSICAL_ROLE_CHIPS.de}
                      current={row.classRoles}
                      onAdd={val => setField(row.id, 'classRoles', val)}
                      color={color}
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} style={{ ...tdBase, padding: '0.25rem' }}>
                <Button
                  variant="outlined" size="small" startIcon={<AddOutlinedIcon />}
                  onClick={addRow} fullWidth
                  sx={{
                    textTransform: 'none', fontSize: '0.8rem', borderStyle: 'dashed',
                    borderColor: `rgba(${rgb}, 0.35)`, color: 'var(--ifm-font-color-secondary)',
                    backgroundColor: 'transparent', borderRadius: '6px',
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

RollenAkteureMatrix.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
