// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './styles.css';

export const PdfDownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const handleDownload = useCallback(async () => {
    setIsLoading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.querySelector('.theme-doc-markdown');
      if (!element) {
        console.error('Could not find document content');
        return;
      }

      const pathParts = location.pathname.split('/').filter(Boolean);
      const filename = pathParts[pathParts.length - 1] || 'document';

      const opt = {
        margin: [15, 15, 15, 15],
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="pdf-download-button"
      title={currentLocale === 'en' ? 'Download as PDF' : 'Als PDF herunterladen'}
      aria-label={currentLocale === 'en' ? 'Download as PDF' : 'Als PDF herunterladen'}
    >
      <PictureAsPdfIcon sx={{ fontSize: 18 }} />
      <span className="pdf-download-button__text">
        {isLoading ? (
          <Translate id="pdf.generating">Generiere...</Translate>
        ) : (
          <Translate id="pdf.downloadButton">PDF</Translate>
        )}
      </span>
    </button>
  );
};

export default PdfDownloadButton;
