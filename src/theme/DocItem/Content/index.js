// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Content from '@theme-original/DocItem/Content';
import PdfDownloadButton from '@site/src/components/PdfDownloadButton';

export default function ContentWrapper(props) {
  return (
    <>
      <div className="doc-header-actions" style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '0.5rem',
        marginTop: '-0.5rem'
      }}>
        <PdfDownloadButton />
      </div>
      <Content {...props} />
    </>
  );
}
