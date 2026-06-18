// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const DEFAULT_COLOR = '#B85450';

// Semantic groups: each field belongs to a named group with its own accent color
const GROUPS = {
  product:  { color: '#B85450', label: { de: 'Produkt', en: 'Product' } },
  customer: { color: '#4A7FA8', label: { de: 'Zielgruppe', en: 'Customer' } },
  value:    { color: '#2d8a5e', label: { de: 'Wert', en: 'Value' } },
  position: { color: '#7B5EA7', label: { de: 'Position', en: 'Position' } },
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}` : '184, 84, 80';
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

function Cell({ value, placeholder, onChange, groupColor }) {
  const rgb = hexToRgb(groupColor);
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
        background: 'transparent', padding: '0.55rem 0.75rem', fontSize: '0.875rem',
        fontFamily: 'inherit', color: 'var(--ifm-font-color-base)', lineHeight: 1.5,
        minHeight: '2.5rem', boxSizing: 'border-box', transition: 'background 0.15s',
      }}
    />
  );
}
Cell.propTypes = {
  value: PropTypes.string.isRequired, placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, groupColor: PropTypes.string.isRequired,
};

const FIELD_ICONS = [
  DevicesOutlinedIcon,
  PeopleOutlinedIcon,
  AssignmentOutlinedIcon,
  BuildOutlinedIcon,
  TrendingUpOutlinedIcon,
  CompareArrowsOutlinedIcon,
];

const FIELDS = {
  de: [
    { key: 'f1', label: 'Unser …',            ph: 'Produkt / Service benennen…',          group: 'product' },
    { key: 'f2', label: '… hilft …',           ph: 'Zielgruppe benennen…',                 group: 'customer' },
    { key: 'f3', label: '… die/der …',         ph: 'Job-to-be-Done beschreiben…',          group: 'customer' },
    { key: 'f4', label: '… indem es/er …',     ph: 'Lösung / Mechanismus beschreiben…',    group: 'value' },
    { key: 'f5', label: '… und damit …',       ph: 'Nutzen / Ergebnis für den Kunden…',    group: 'value' },
    { key: 'f6', label: '… im Gegensatz zu …', ph: 'Alternative / Wettbewerb benennen…',   group: 'position' },
  ],
  en: [
    { key: 'f1', label: 'Our …',       ph: 'Name the product / service…',      group: 'product' },
    { key: 'f2', label: '… helps …',   ph: 'Name the target group…',           group: 'customer' },
    { key: 'f3', label: '… who …',     ph: 'Describe the job-to-be-done…',     group: 'customer' },
    { key: 'f4', label: '… by …',      ph: 'Describe the solution / mechanism…', group: 'value' },
    { key: 'f5', label: '… so that …', ph: 'Describe the benefit / outcome…',  group: 'value' },
    { key: 'f6', label: '… unlike …',  ph: 'Name the alternative / competitor…', group: 'position' },
  ],
};

const LABELS = {
  de: {
    reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'vp-formulierung',
    previewTitle: 'VP-Satz Vorschau',
    previewEmpty: 'Fülle die Felder oben aus — der Satz entsteht hier automatisch.',
    step: 'Schritt',
  },
  en: {
    reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'vp-formulation',
    previewTitle: 'VP Sentence Preview',
    previewEmpty: 'Fill in the fields above — the sentence will appear here automatically.',
    step: 'Step',
  },
};

const makeInitialState = () => ({ f1: '', f2: '', f3: '', f4: '', f5: '', f6: '' });

// Builds the sentence with fallback placeholders for empty fields
function buildSentence(state, fields) {
  return fields.map(f => {
    const connector = f.label.replaceAll('…', '').trim();
    const value = state[f.key].trim();
    return { connector, value, key: f.key, group: f.group };
  });
}

export default function ValuePropositionFormulierung({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const fields = FIELDS[lang] ?? FIELDS.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());
  const filledCount = fields.filter(f => state[f.key].trim() !== '').length;

  const downloadCsv = () => {
    const csv = fields.map(f => `"${f.label}","${String(state[f.key]).replaceAll('"', '""')}"`).join('\r\n');
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

  const sentence = buildSentence(state, fields);
  const hasAnyValue = filledCount > 0;

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'space-between',
        alignItems: 'center', padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-card-background-color)',
      }}>
        {/* Progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {fields.map((f, i) => {
              const gc = GROUPS[f.group].color;
              const filled = state[f.key].trim() !== '';
              return (
                <div key={f.key} style={{
                  width: 18, height: 6, borderRadius: 3,
                  background: filled ? gc : 'var(--ifm-color-emphasis-200)',
                  transition: 'background 0.2s',
                  title: `${L.step} ${i + 1}`,
                }} />
              );
            })}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 500 }}>
            {filledCount}/{fields.length}
          </span>
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
          <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
        </div>
      </div>

      {/* Fields */}
      <div ref={tableRef}>
        {fields.map((f, i) => {
          const gc = GROUPS[f.group].color;
          const gcRgb = hexToRgb(gc);
          const Icon = FIELD_ICONS[i];
          const isEven = i % 2 === 0;

          return (
            <div key={f.key} style={{
              display: 'flex', alignItems: 'stretch',
              borderBottom: i < fields.length - 1 ? '1px solid var(--ifm-color-emphasis-200)' : 'none',
              background: isEven ? 'transparent' : 'var(--ifm-table-stripe-background, rgba(0,0,0,0.015))',
              borderLeft: `4px solid ${gc}`,
            }}>
              {/* Step badge + label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                minWidth: 200, maxWidth: 200, padding: '0.6rem 0.75rem',
                borderRight: '1px solid var(--ifm-color-emphasis-200)',
                background: `rgba(${gcRgb}, 0.04)`,
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: `rgba(${gcRgb}, 0.15)`,
                  color: gc, fontSize: '0.7rem', fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <Icon sx={{ fontSize: 15, color: gc, opacity: 0.7, flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: gc, lineHeight: 1.3 }}>
                  {f.label}
                </span>
              </div>
              {/* Input cell */}
              <div style={{ flex: 1 }}>
                <Cell
                  value={state[f.key]}
                  placeholder={f.ph}
                  onChange={val => setState(s => ({ ...s, [f.key]: val }))}
                  groupColor={gc}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live VP sentence preview */}
      <div style={{
        padding: '0.85rem 1rem',
        borderTop: '2px solid var(--ifm-color-emphasis-200)',
        background: `rgba(${rgb}, 0.04)`,
      }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: `rgba(${rgb}, 0.6)`, marginBottom: '0.5rem' }}>
          {L.previewTitle}
        </div>
        {hasAnyValue ? (
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ifm-font-color-base)' }}>
            {sentence.map((part, idx) => {
              const gc = GROUPS[part.group].color;
              return (
                <React.Fragment key={part.key}>
                  <span style={{ color: gc, fontWeight: 600, fontSize: '0.82rem' }}>
                    {part.connector}
                  </span>
                  {' '}
                  {part.value
                    ? <span style={{ fontWeight: 500 }}>{part.value}</span>
                    : <span style={{ color: 'var(--ifm-color-emphasis-400)', fontStyle: 'italic' }}>…</span>
                  }
                  {idx < sentence.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)', fontStyle: 'italic' }}>
            {L.previewEmpty}
          </p>
        )}
      </div>
    </div>
  );
}

ValuePropositionFormulierung.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
