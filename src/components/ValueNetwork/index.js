// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const DEFAULT_COLOR = '#6B8E50';

// Each row gets its own semantic accent color and icon
const ROW_META = {
  akteure:  { icon: FactoryOutlinedIcon,                    color: '#4A7FA8', group: 'participants' },
  rollen:   { icon: PeopleOutlinedIcon,                     color: '#7B5EA7', group: 'participants' },
  gueter:   { icon: LocalShippingOutlinedIcon,              color: '#7A6040', group: 'flows' },
  services: { icon: MiscellaneousServicesOutlinedIcon,      color: '#2E86AB', group: 'flows' },
  daten:    { icon: StorageOutlinedIcon,                    color: '#6B8E50', group: 'flows' },
  finanzen: { icon: AccountBalanceOutlinedIcon,             color: '#C07830', group: 'flows' },
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}` : '107, 142, 80';
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

function Cell({ value, placeholder, onChange, accentColor }) {
  const rgb = hexToRgb(accentColor);
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
        background: 'transparent', padding: '0.6rem 0.75rem', fontSize: '0.875rem',
        fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.5,
        minHeight: '2.6rem', boxSizing: 'border-box', transition: 'background 0.15s',
      }}
    />
  );
}
Cell.propTypes = {
  value: PropTypes.string.isRequired, placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, accentColor: PropTypes.string.isRequired,
};

const ROWS_CONFIG = {
  de: [
    { key: 'akteure',  label: 'Akteure',       ph: 'Welche Akteure sind beteiligt?' },
    { key: 'rollen',   label: 'Rollen',         ph: 'Welche Rollen nehmen die Akteure ein?' },
    { key: 'gueter',   label: 'Güterströme',    ph: 'Welche physischen Güter fließen?' },
    { key: 'services', label: 'Serviceströme',  ph: 'Welche Services werden erbracht?' },
    { key: 'daten',    label: 'Datenströme',    ph: 'Welche Daten werden ausgetauscht?' },
    { key: 'finanzen', label: 'Finanzströme',   ph: 'Wie fließen die Finanzen?' },
  ],
  en: [
    { key: 'akteure',  label: 'Actors',         ph: 'Which actors are involved?' },
    { key: 'rollen',   label: 'Roles',           ph: 'What roles do the actors play?' },
    { key: 'gueter',   label: 'Goods Flows',     ph: 'What physical goods flow?' },
    { key: 'services', label: 'Service Flows',   ph: 'What services are provided?' },
    { key: 'daten',    label: 'Data Flows',      ph: 'What data is exchanged?' },
    { key: 'finanzen', label: 'Financial Flows', ph: 'How do finances flow?' },
  ],
};

const GROUP_LABELS = {
  de: { participants: 'Teilnehmer', flows: 'Flüsse' },
  en: { participants: 'Participants', flows: 'Flows' },
};

const LABELS = {
  de: { reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'value-network' },
  en: { reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'value-network' },
};

const makeInitialState = () => ({ akteure: '', rollen: '', gueter: '', services: '', daten: '', finanzen: '' });

export default function ValueNetwork({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rowsConfig = ROWS_CONFIG[lang] ?? ROWS_CONFIG.de;
  const groupLabels = GROUP_LABELS[lang] ?? GROUP_LABELS.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const filledCount = rowsConfig.filter(r => state[r.key].trim() !== '').length;
  const updateField = (key, val) => setState(s => ({ ...s, [key]: val }));

  const downloadCsv = () => {
    const csv = rowsConfig.map(r => `"${r.label}","${String(state[r.key]).replaceAll('"', '""')}"`).join('\r\n');
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

  // Rows grouped for rendering
  const groups = [
    { key: 'participants', rows: rowsConfig.filter(r => ROW_META[r.key].group === 'participants') },
    { key: 'flows',        rows: rowsConfig.filter(r => ROW_META[r.key].group === 'flows') },
  ];

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
        {/* Progress dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {rowsConfig.map(r => {
              const ac = ROW_META[r.key].color;
              const filled = state[r.key].trim() !== '';
              return (
                <div key={r.key} style={{
                  width: 18, height: 6, borderRadius: 3,
                  background: filled ? ac : 'var(--ifm-color-emphasis-200)',
                  transition: 'background 0.2s',
                }} />
              );
            })}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 500 }}>
            {filledCount}/{rowsConfig.length}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Content */}
      <div ref={tableRef}>
        {groups.map((group, gi) => (
          <div key={group.key}>
            {/* Group divider label */}
            <div style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ifm-color-emphasis-500)',
              background: 'var(--ifm-color-emphasis-100, rgba(0,0,0,0.04))',
              borderTop: gi > 0 ? '2px solid var(--ifm-color-emphasis-200)' : 'none',
              borderBottom: '1px solid var(--ifm-color-emphasis-200)',
            }}>
              {groupLabels[group.key]}
            </div>

            {group.rows.map((row) => {
              const meta = ROW_META[row.key];
              const ac = meta.color;
              const acRgb = hexToRgb(ac);
              const Icon = meta.icon;
              const filled = state[row.key].trim() !== '';

              return (
                <div key={row.key} style={{
                  display: 'flex', alignItems: 'stretch',
                  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                  borderLeft: `4px solid ${ac}`,
                }}>
                  {/* Label column */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.55rem',
                    minWidth: 190, maxWidth: 190,
                    padding: '0.6rem 0.75rem',
                    borderRight: '1px solid var(--ifm-color-emphasis-200)',
                    background: `rgba(${acRgb}, 0.06)`,
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `rgba(${acRgb}, 0.14)`,
                    }}>
                      <Icon sx={{ fontSize: 16, color: ac }} />
                    </div>
                    <span style={{
                      fontWeight: 600, fontSize: '0.875rem', color: ac,
                      lineHeight: 1.25,
                    }}>
                      {row.label}
                    </span>
                    {filled && (
                      <div style={{
                        marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                        background: ac, flexShrink: 0,
                      }} />
                    )}
                  </div>
                  {/* Input column */}
                  <div style={{ flex: 1 }}>
                    <Cell
                      value={state[row.key]}
                      placeholder={row.ph}
                      onChange={val => updateField(row.key, val)}
                      accentColor={ac}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

ValueNetwork.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
