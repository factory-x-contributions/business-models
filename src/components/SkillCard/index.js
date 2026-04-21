// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CopyButton({ text, copyText = 'Prompt kopieren', copiedText = 'Kopiert!' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.35rem 0.7rem',
        fontSize: '0.78rem',
        fontWeight: 500,
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '6px',
        background: copied ? '#2E7D32' : 'var(--ifm-card-background-color)',
        color: copied ? '#fff' : 'var(--ifm-font-color-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {copied ? copiedText : copyText}
    </button>
  );
}

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
  copyText: PropTypes.string,
  copiedText: PropTypes.string,
};

function DownloadButton({ url, filename }) {
  const [status, setStatus] = useState('idle');

  const handleDownload = (e) => {
    e.stopPropagation();
    setStatus('loading');
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  };

  let buttonLabel = '↓ Skill herunterladen';
  if (status === 'loading') buttonLabel = '...';
  if (status === 'error') buttonLabel = 'Fehler';

  return (
    <button
      onClick={handleDownload}
      disabled={status === 'loading'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.35rem 0.7rem',
        fontSize: '0.78rem',
        fontWeight: 500,
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '6px',
        background: status === 'error' ? '#c62828' : 'var(--ifm-card-background-color)',
        color: status === 'error' ? '#fff' : 'var(--ifm-font-color-secondary)',
        cursor: status === 'loading' ? 'wait' : 'pointer',
      }}
    >
      {buttonLabel}
    </button>
  );
}

DownloadButton.propTypes = {
  url: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};

export default function SkillCard({ name, title, description, prompt, output, copyLabel = 'Prompt kopieren', copiedLabel = 'Kopiert!', resultLabel = 'Ergebnis', exampleLabel = 'Beispiel-Prompt' }) {
  const [open, setOpen] = useState(false);

  const githubUrl = `https://github.com/factory-x-contributions/business-models/blob/main/.claude/skills/${name}/SKILL.md`;
  const downloadUrl = `https://raw.githubusercontent.com/factory-x-contributions/business-models/main/.claude/skills/${name}/SKILL.md`;

  return (
    <div
      style={{
        background: 'var(--ifm-card-background-color)',
        border: `1px solid ${open ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-200)'}`,
        borderRadius: '8px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: open ? '0 2px 12px rgba(56, 111, 179, 0.08)' : 'none',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          padding: '1rem 1.15rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            color: 'var(--ifm-font-color-secondary)',
          }}
        >
          &#9654;
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--ifm-font-color-secondary)', marginTop: '0.15rem' }}>
            {description}
          </div>
        </div>
      </button>

      {open && (
        <div
          style={{
            padding: '0 1.15rem 1.15rem',
            borderTop: '1px solid var(--ifm-color-emphasis-100)',
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ifm-font-color-secondary)', fontWeight: 600, marginBottom: '0.35rem' }}>
              {exampleLabel}
            </div>
            <div
              style={{
                background: 'var(--ifm-color-emphasis-100)',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontFamily: 'var(--ifm-font-family-monospace)',
                lineHeight: 1.5,
              }}
            >
              {prompt}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <CopyButton text={prompt} copyText={copyLabel} copiedText={copiedLabel} />
            </div>
          </div>

          {output && (
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ifm-font-color-secondary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                {resultLabel}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)', lineHeight: 1.5 }}>
                {output}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--ifm-font-color-secondary)', fontFamily: 'var(--ifm-font-family-monospace)' }}>
              Skill:{' '}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <code style={{ color: 'var(--ifm-color-primary)' }}>{name}</code>
              </a>
            </div>
            <DownloadButton url={downloadUrl} filename={`${name}.md`} />
          </div>
        </div>
      )}
    </div>
  );
}

SkillCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  prompt: PropTypes.string.isRequired,
  output: PropTypes.string,
  copyLabel: PropTypes.string,
  copiedLabel: PropTypes.string,
  resultLabel: PropTypes.string,
  exampleLabel: PropTypes.string,
};
