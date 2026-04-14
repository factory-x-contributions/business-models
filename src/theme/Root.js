// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Factory-X',
  url: 'https://factory-x.org',
  logo: 'https://factory-x.org/wp-content/uploads//factory-x-logo.svg',
  sameAs: [
    'https://github.com/factory-x-contributions',
    'https://www.bmwk.de/Redaktion/DE/Artikel/Industrie/factory-x.html',
  ],
  description:
    'Factory-X is a lighthouse project funded by the German Federal Ministry for Economic Affairs and Climate Action (BMWK), creating an open data ecosystem for factory equipment suppliers and operators.',
};

export default function Root({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </>
  );
}
