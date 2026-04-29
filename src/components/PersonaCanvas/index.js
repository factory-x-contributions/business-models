// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const DEFAULT_COLOR = '#386FB3';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '56, 111, 179';
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

const CORE_FIELDS = {
  de: [
    { key: 'name', label: 'Name & Rolle', ph: 'z.B. Max Mustermann, Operations Manager' },
    { key: 'desc', label: 'Beschreibung', ph: 'Kurze Zusammenfassung der Person…' },
    { key: 'problems', label: 'Probleme & Herausforderungen', ph: 'Welche Probleme hat diese Person?' },
    { key: 'demo', label: 'Demografie', ph: 'Alter, Standort, Erfahrung…' },
    { key: 'goals', label: 'Wünsche & Ziele', ph: 'Was möchte diese Person erreichen?' },
  ],
  en: [
    { key: 'name', label: 'Name & Role', ph: 'e.g. Max Mustermann, Operations Manager' },
    { key: 'desc', label: 'Description', ph: 'Brief summary of the person…' },
    { key: 'problems', label: 'Problems & Challenges', ph: 'What problems does this person face?' },
    { key: 'demo', label: 'Demographics', ph: 'Age, location, experience…' },
    { key: 'goals', label: 'Goals & Desires', ph: 'What does this person want to achieve?' },
  ],
};

const ENV_FIELDS = {
  de: [
    { key: 'jobs', label: 'Jobs-to-be-Done', ph: 'Welche Aufgaben muss diese Person erledigen?' },
    { key: 'daily', label: 'Daily Responsibility', ph: 'Tägliche Verantwortlichkeiten…' },
    { key: 'emotionsBuy', label: 'Emotions – Buy', ph: 'Gefühle beim Kauf…' },
    { key: 'emotionsUse', label: 'Emotions – Usage', ph: 'Gefühle bei der Nutzung…' },
    { key: 'barriers', label: 'Barriers', ph: 'Was hält sie zurück?' },
    { key: 'triggers', label: 'Triggers', ph: 'Was motiviert sie zur Aktion?' },
    { key: 'motivation', label: 'Motivation', ph: 'Kernmotivation…' },
  ],
  en: [
    { key: 'jobs', label: 'Jobs-to-be-Done', ph: 'What tasks must this person accomplish?' },
    { key: 'daily', label: 'Daily Responsibility', ph: 'Daily responsibilities…' },
    { key: 'emotionsBuy', label: 'Emotions – Buy', ph: 'Feelings during purchase…' },
    { key: 'emotionsUse', label: 'Emotions – Usage', ph: 'Feelings during usage…' },
    { key: 'barriers', label: 'Barriers', ph: 'What holds them back?' },
    { key: 'triggers', label: 'Triggers', ph: 'What motivates them to act?' },
    { key: 'motivation', label: 'Motivation', ph: 'Core motivation…' },
  ],
};

const LABELS = {
  de: { core: 'CORE', env: 'ENVIRONMENT', reset: 'Zurücksetzen', csv: 'CSV', pdf: 'PDF', filename: 'persona-canvas' },
  en: { core: 'CORE', env: 'ENVIRONMENT', reset: 'Reset', csv: 'CSV', pdf: 'PDF', filename: 'persona-canvas' },
};

const makeInitialState = () => ({
  name: '', desc: '', problems: '', demo: '', goals: '',
  jobs: '', daily: '', emotionsBuy: '', emotionsUse: '', barriers: '', triggers: '', motivation: '',
});

export default function PersonaCanvas({ color = DEFAULT_COLOR, lang = 'de' }) {
  const L = LABELS[lang] ?? LABELS.de;
  const coreFields = CORE_FIELDS[lang] ?? CORE_FIELDS.de;
  const envFields = ENV_FIELDS[lang] ?? ENV_FIELDS.de;
  const rgb = hexToRgb(color);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const allFields = [...coreFields, ...envFields];

  const downloadCsv = () => {
    const csv = allFields.map(f => `"${f.label}","${String(state[f.key]).replace(/"/g, '""')}"`).join('\r\n');
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

  const fieldCard = (f) => (
    <div key={f.key} style={{ border: cellBorder, borderRadius: 4, overflow: 'hidden', marginBottom: '0.5rem' }}>
      <div style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', fontWeight: 700, color, background: `rgba(${rgb}, 0.07)`, borderBottom: cellBorder, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
        {f.label}
      </div>
      <Cell value={state[f.key]} placeholder={f.ph} onChange={val => setState(s => ({ ...s, [f.key]: val }))} color={color} />
    </div>
  );

  const sectionHeader = (title) => (
    <div style={{ fontSize: '0.7rem', fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0', marginBottom: '0.5rem', borderBottom: `2px solid ${color}` }}>
      {title}
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadCsv} sx={actionSx(color, rgb, true)}>{L.csv}</Button>
        <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon />} onClick={downloadPdf} sx={actionSx(color, rgb, true)}>{L.pdf}</Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltOutlinedIcon />} onClick={reset} sx={actionSx(color, rgb, false)}>{L.reset}</Button>
      </div>
      <div ref={tableRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          {sectionHeader(L.core)}
          {coreFields.map(fieldCard)}
        </div>
        <div>
          {sectionHeader(L.env)}
          {envFields.map(fieldCard)}
        </div>
      </div>
    </div>
  );
}

PersonaCanvas.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
