// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export const CopyPromptBox = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      background: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      padding: '1rem 1.25rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
    }}>
      <span style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ifm-font-color-base)' }}>
        {text}
      </span>
      <button
        onClick={handleCopy}
        title={copied ? 'Kopiert!' : 'In Zwischenablage kopieren'}
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem 0.75rem',
          background: copied ? 'rgba(56, 111, 179, 0.12)' : 'transparent',
          border: `1px solid ${copied ? '#386FB3' : 'var(--ifm-color-emphasis-300)'}`,
          borderRadius: '6px',
          cursor: 'pointer',
          color: copied ? '#386FB3' : 'var(--ifm-font-color-secondary)',
          fontSize: '0.8rem',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {copied
          ? <><CheckIcon sx={{ fontSize: 15 }} /> Kopiert!</>
          : <><ContentCopyIcon sx={{ fontSize: 15 }} /> Kopieren</>
        }
      </button>
    </div>
  );
};

export default CopyPromptBox;
