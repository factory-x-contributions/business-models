// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import GitHubIcon from '@mui/icons-material/GitHub';

const btnSx = {
  textTransform: 'none',
  fontSize: '0.78rem',
  fontWeight: 500,
  borderRadius: '6px',
  color: 'var(--ifm-font-color-secondary)',
  borderColor: 'var(--ifm-color-emphasis-300)',
  background: 'var(--ifm-card-background-color)',
  '&:hover': {
    borderColor: 'var(--ifm-color-primary)',
    color: 'var(--ifm-color-primary)',
    background: 'rgba(56, 111, 179, 0.06)',
  },
};

const labelSx = {
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--ifm-font-color-secondary)',
  mb: 0.5,
};

export default function SkillCard({
  name,
  title,
  description,
  prompt,
  output,
  copyLabel = 'Prompt kopieren',
  copiedLabel = 'Kopiert!',
  resultLabel = 'Ergebnis',
  exampleLabel = 'Beispiel-Prompt',
  downloadLabel = 'Skill herunterladen',
  errorLabel = 'Fehler',
  cliCopiedLabel = 'Kopiert!',
}) {
  const [promptCopied, setPromptCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [cliCopied, setCliCopied] = useState(false);

  const githubUrl = `https://github.com/factory-x-contributions/business-models/blob/main/.agents/skills/${name}/SKILL.md`;
  const downloadUrl = `https://raw.githubusercontent.com/factory-x-contributions/business-models/main/.agents/skills/${name}/SKILL.md`;
  const cliCommand = 'npx skills add factory-x-contributions/business-models';

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    setDownloadStatus('loading');
    fetch(downloadUrl)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${name}.md`;
        a.click();
        URL.revokeObjectURL(a.href);
        setDownloadStatus('idle');
      })
      .catch(() => setDownloadStatus('error'));
  };

  const handleCliCopy = () => {
    navigator.clipboard.writeText(cliCommand).then(() => {
      setCliCopied(true);
      setTimeout(() => setCliCopied(false), 2000);
    });
  };

  return (
    <Accordion
      id={name}
      disableGutters
      square
      elevation={0}
      sx={{
        background: 'var(--ifm-card-background-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          borderColor: 'var(--ifm-color-primary)',
          boxShadow: '0 2px 12px rgba(56, 111, 179, 0.08)',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'var(--ifm-font-color-secondary)', fontSize: '1.1rem' }} />}
        sx={{
          px: '1.15rem',
          py: '0.25rem',
          minHeight: 0,
          '& .MuiAccordionSummary-content': { my: '0.75rem', flexDirection: 'column', gap: 0 },
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ifm-font-color-base)', lineHeight: 1.3 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ fontSize: '0.82rem', color: 'var(--ifm-font-color-secondary)', mt: 0.25, lineHeight: 1.4 }}>
            {description}
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails sx={{ px: '1.15rem', pt: 0, pb: '1.15rem', borderTop: '1px solid var(--ifm-color-emphasis-100)' }}>
        <Stack spacing={1.5} sx={{ mt: 1.5 }}>
          <Box>
            <Typography sx={labelSx}>{exampleLabel}</Typography>
            <Box
              sx={{
                background: 'var(--ifm-color-emphasis-100)',
                borderRadius: '6px',
                p: '0.65rem 0.85rem',
                fontFamily: 'var(--ifm-font-family-monospace)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                color: 'var(--ifm-font-color-base)',
                mb: 0.75,
              }}
            >
              {prompt}
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={promptCopied ? <CheckIcon /> : <ContentCopyIcon />}
              onClick={handleCopyPrompt}
              sx={{
                ...btnSx,
                ...(promptCopied && {
                  borderColor: '#2E7D32',
                  color: '#2E7D32',
                  background: 'rgba(46, 125, 50, 0.06)',
                  '&:hover': { borderColor: '#2E7D32', color: '#2E7D32', background: 'rgba(46, 125, 50, 0.1)' },
                }),
              }}
            >
              {promptCopied ? copiedLabel : copyLabel}
            </Button>
          </Box>

          {output && (
            <Box>
              <Typography sx={labelSx}>{resultLabel}</Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)', lineHeight: 1.5 }}>
                {output}
              </Typography>
            </Box>
          )}

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Chip
              label={name}
              component="a"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              clickable
              size="small"
              variant="outlined"
              icon={<GitHubIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                fontFamily: 'var(--ifm-font-family-monospace)',
                fontSize: '0.75rem',
                height: '28px',
                color: 'var(--ifm-color-primary)',
                borderColor: 'rgba(56, 111, 179, 0.4)',
                background: 'rgba(56, 111, 179, 0.04)',
                '&:hover': { background: 'rgba(56, 111, 179, 0.1)', borderColor: 'var(--ifm-color-primary)' },
              }}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={downloadStatus === 'idle' ? <FileDownloadOutlinedIcon /> : undefined}
              disabled={downloadStatus === 'loading'}
              onClick={handleDownload}
              sx={{
                ...btnSx,
                ...(downloadStatus === 'error' && {
                  borderColor: '#c62828',
                  color: '#fff',
                  background: '#c62828',
                  '&:hover': { background: '#b71c1c', borderColor: '#b71c1c' },
                }),
              }}
            >
              {downloadStatus === 'loading' ? '…' : downloadStatus === 'error' ? errorLabel : downloadLabel}
            </Button>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '6px',
                overflow: 'hidden',
                height: '30px',
              }}
            >
              <Typography
                component="code"
                sx={{
                  px: 1,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  color: 'var(--ifm-font-color-secondary)',
                  background: 'var(--ifm-color-emphasis-100)',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  borderRight: '1px solid var(--ifm-color-emphasis-300)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cliCommand}
              </Typography>
              <Tooltip title={cliCopied ? cliCopiedLabel : 'CLI-Befehl kopieren'} arrow>
                <IconButton
                  size="small"
                  onClick={handleCliCopy}
                  sx={{
                    borderRadius: 0,
                    height: '100%',
                    px: 0.75,
                    color: cliCopied ? '#2E7D32' : 'var(--ifm-font-color-secondary)',
                    background: 'var(--ifm-card-background-color)',
                    '&:hover': { background: 'rgba(0,0,0,0.04)' },
                  }}
                >
                  {cliCopied
                    ? <CheckIcon sx={{ fontSize: '0.9rem' }} />
                    : <ContentCopyIcon sx={{ fontSize: '0.9rem' }} />}
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
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
  downloadLabel: PropTypes.string,
  errorLabel: PropTypes.string,
  cliCopiedLabel: PropTypes.string,
};
