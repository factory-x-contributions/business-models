// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

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

export default function SkillCard({ name, title, description, prompt, output, duration, copyLabel = 'Prompt kopieren', copiedLabel = 'Kopiert!', resultLabel = 'Ergebnis', exampleLabel = 'Beispiel-Prompt' }) {
  const [open, setOpen] = useState(false);

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
      <div
        onClick={() => setOpen(!open)}
        style={{
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
        {duration && (
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--ifm-font-color-secondary)',
              background: 'var(--ifm-color-emphasis-100)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ~{duration}
          </span>
        )}
      </div>

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

          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--ifm-font-color-secondary)',
              fontFamily: 'var(--ifm-font-family-monospace)',
            }}
          >
            Skill: <code>{name}</code>
          </div>
        </div>
      )}
    </div>
  );
}
