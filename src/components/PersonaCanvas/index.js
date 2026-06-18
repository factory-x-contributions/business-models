// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const DEFAULT_COLOR = '#386FB3';
const ENV_COLOR = '#7B5EA7';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${Number.parseInt(r[1], 16)}, ${Number.parseInt(r[2], 16)}, ${Number.parseInt(r[3], 16)}`
    : '56, 111, 179';
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
Cell.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const CORE_ICONS = {
  name: <BadgeOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  desc: <PersonOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  problems: <ErrorOutlineOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  demo: <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  goals: <EmojiEventsOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
};

const ENV_ICONS = {
  jobs: <WorkOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  daily: <TodayOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  emotionsBuy: <ShoppingCartOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  emotionsUse: <AutoAwesomeOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  barriers: <BlockOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  triggers: <BoltOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
  motivation: <FavoriteOutlinedIcon sx={{ fontSize: '0.9rem' }} />,
};

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
  const envRgb = hexToRgb(ENV_COLOR);
  const [state, setState] = useState(makeInitialState);
  const tableRef = useRef(null);

  const reset = () => setState(makeInitialState());

  const allFields = [...coreFields, ...envFields];
  const filledCount = allFields.filter(f => state[f.key].trim() !== '').length;
  const totalCount = allFields.length;
  const progressPct = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

  const downloadCsv = () => {
    const csv = allFields
      .map(f => `"${f.label}","${String(state[f.key]).replaceAll('"', '""')}"`)
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

  const fieldCard = (f, sectionColor, sectionRgb, iconMap) => {
    const icon = iconMap[f.key];
    return (
      <div
        key={f.key}
        style={{
          borderRadius: '5px',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderLeft: `3px solid ${sectionColor}`,
          overflow: 'hidden',
          marginBottom: '0.5rem',
          background: 'var(--ifm-card-background-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.6rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: sectionColor,
            background: `rgba(${sectionRgb}, 0.07)`,
            borderBottom: '1px solid var(--ifm-color-emphasis-200)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {icon}
          {f.label}
        </div>
        <Cell
          value={state[f.key]}
          placeholder={f.ph}
          onChange={val => setState(s => ({ ...s, [f.key]: val }))}
          color={sectionColor}
        />
      </div>
    );
  };

  const sectionHeader = (title, sectionColor, sectionRgb) => (
    <div
      style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: sectionColor,
        borderRadius: '20px',
        padding: '0.2rem 0.75rem',
        marginBottom: '0.65rem',
        boxShadow: `0 1px 4px rgba(${sectionRgb}, 0.3)`,
      }}
    >
      {title}
    </div>
  );

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
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          padding: '0.6rem 1rem',
          borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          background: 'var(--ifm-card-background-color)',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={downloadCsv}
          sx={actionSx(color, rgb, true)}
        >
          {L.csv}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={downloadPdf}
          sx={actionSx(color, rgb, true)}
        >
          {L.pdf}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RestartAltOutlinedIcon />}
          onClick={reset}
          sx={actionSx(color, rgb, false)}
        >
          {L.reset}
        </Button>

        {/* Progress bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', minWidth: 120 }}>
          <div
            style={{
              flex: 1,
              maxWidth: 160,
              height: '6px',
              borderRadius: '3px',
              background: 'var(--ifm-color-emphasis-200)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: color,
                borderRadius: '3px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--ifm-font-color-secondary)', whiteSpace: 'nowrap' }}>
            {filledCount}/{totalCount}
          </span>
        </div>
      </div>

      {/* Canvas grid */}
      <div
        ref={tableRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          padding: '1rem',
        }}
      >
        <div>
          {sectionHeader(L.core, color, rgb)}
          {coreFields.map(f => fieldCard(f, color, rgb, CORE_ICONS))}
        </div>
        <div>
          {sectionHeader(L.env, ENV_COLOR, envRgb)}
          {envFields.map(f => fieldCard(f, ENV_COLOR, envRgb, ENV_ICONS))}
        </div>
      </div>
    </div>
  );
}

PersonaCanvas.propTypes = {
  color: PropTypes.string,
  lang: PropTypes.oneOf(['de', 'en']),
};
