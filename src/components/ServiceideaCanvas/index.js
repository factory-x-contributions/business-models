// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const SECTION_META = {
  bestandteile: { color: '#4A7FA8', Icon: ExtensionOutlinedIcon },
  leistung:     { color: '#7B5EA7', Icon: StarOutlinedIcon },
  nutzen:       { color: '#6B8E50', Icon: EmojiEventsOutlinedIcon },
  unternehmen:  { color: '#C07830', Icon: BusinessOutlinedIcon },
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '184, 84, 80';
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
        minHeight: '5rem', boxSizing: 'border-box', transition: 'background 0.15s',
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
    nameLabel: 'Service-Name / Titel', namePh: 'Name der Service-Idee…',
    sections: [
      { key: 'bestandteile', label: 'Bestandteile', ph: 'Welche Komponenten hat der Service?…' },
      { key: 'leistung', label: 'Leistungsmerkmale & Differenzierung', ph: 'Was macht den Service besonders?…' },
      { key: 'nutzen', label: 'Kundennutzen & Value View', ph: 'Welchen Nutzen stiftet der Service?…' },
      { key: 'unternehmen', label: 'Unternehmenssicht & strategischer Fit', ph: 'Warum ist der Service strategisch relevant?…' },
    ],
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'serviceidee-canvas',
    progress: 'Felder ausgefüllt',
  },
  en: {
    nameLabel: 'Service Name / Title', namePh: 'Name of the service idea…',
    sections: [
      { key: 'bestandteile', label: 'Components', ph: 'What components does the service have?…' },
      { key: 'leistung', label: 'Features & Differentiation', ph: 'What makes the service special?…' },
      { key: 'nutzen', label: 'Customer Value & Value View', ph: 'What value does the service create?…' },
      { key: 'unternehmen', label: 'Business View & Strategic Fit', ph: 'Why is the service strategically relevant?…' },
    ],
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'service-idea-canvas',
    progress: 'fields filled',
  },
};

const TOTAL_FIELDS = 5;

const makeInitialState = () => ({ name: '', bestandteile: '', leistung: '', nutzen: '', unternehmen: '' });

export default function ServiceideaCanvas({ color = '#B85450', lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const downloadCsv = () => {
    const rows = [
      [L.nameLabel, state.name],
      ...L.sections.map(s => [s.label, state[s.key]]),
    ];
    const csv = rows
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

  const filledCount = Object.values(state).filter(v => v.trim().length > 0).length;

  const sectionCard = (sec) => {
    const meta = SECTION_META[sec.key];
    const secColor = meta.color;
    const secRgb = hexToRgb(secColor);
    const { Icon } = meta;
    const isFilled = state[sec.key].trim().length > 0;

    return (
      <div
        key={sec.key}
        style={{
          borderRadius: '6px',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderLeft: `4px solid ${secColor}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0.5rem 0.75rem',
            background: `rgba(${secRgb}, 0.08)`,
            borderBottom: `1px solid rgba(${secRgb}, 0.2)`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Icon style={{ fontSize: '1rem', color: secColor, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: secColor, flex: 1 }}>
            {sec.label}
          </span>
          {isFilled && (
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: secColor,
                flexShrink: 0,
              }}
            />
          )}
        </div>
        <Cell
          value={state[sec.key]}
          placeholder={sec.ph}
          onChange={val => setState(s => ({ ...s, [sec.key]: val }))}
          color={secColor}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '0.6rem 0.75rem',
          borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          background: 'var(--ifm-card-background-color)',
        }}
      >
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.78rem',
            color: 'var(--ifm-font-color-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          {filledCount}/{TOTAL_FIELDS} {L.progress}
        </span>
      </div>

      {/* Canvas body */}
      <div ref={tableRef} style={{ padding: '0.75rem' }}>
        {/* Title / hero area */}
        <div
          style={{
            borderRadius: '6px',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderLeft: `4px solid ${color}`,
            overflow: 'hidden',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.75rem',
              background: `rgba(${rgb}, 0.08)`,
              borderBottom: `1px solid rgba(${rgb}, 0.2)`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color, flex: 1 }}>
              {L.nameLabel}
            </span>
            {state.name.trim().length > 0 && (
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <textarea
            value={state.name}
            placeholder={L.namePh}
            rows={1}
            onChange={e => {
              setState(s => ({ ...s, name: e.target.value }));
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onFocus={e => { e.target.style.background = `rgba(${rgb}, 0.05)`; }}
            onBlur={e => { e.target.style.background = 'transparent'; }}
            style={{
              width: '100%', resize: 'none', overflow: 'hidden', border: 'none', outline: 'none',
              background: 'transparent', padding: '0.6rem 0.75rem',
              fontSize: '1.1rem', fontWeight: 700,
              fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.45,
              minHeight: '2.8rem', boxSizing: 'border-box', transition: 'background 0.15s',
            }}
          />
        </div>

        {/* 2x2 section grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {L.sections.map(sectionCard)}
        </div>
      </div>
    </div>
  );
}

ServiceideaCanvas.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
