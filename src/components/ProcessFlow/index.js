// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const defaultPhases = [
  {
    label: 'Ausgangslage',
    color: '#607D8B',
    sectionAnchor: '#ausgangslage-klären',
    skills: ['company-assessment', 'business-idea-canvas'],
    shortLabels: ['Unternehmens-analyse', 'Geschäftsidee-Canvas'],
  },
  {
    label: 'Kunden verstehen',
    color: '#1565C0',
    sectionAnchor: '#kunden-verstehen',
    skills: ['market-segmentation', 'stakeholder-matrix', 'persona-development', 'vpc-customer-side'],
    shortLabels: ['Markt-segmentierung', 'Stakeholder-Matrix', 'Persona-Entwicklung', 'VPC Kundenseite'],
  },
  {
    label: 'Wertversprechen',
    color: '#C62828',
    sectionAnchor: '#wertversprechen-formulieren',
    skills: ['match-matrix', 'value-proposition-formula', 'product-service-idea'],
    shortLabels: ['Match-Matrix', 'Value-Proposition-Formel', 'Produkt-/Serviceidee'],
  },
  {
    label: 'Wertschöpfung',
    color: '#2E7D32',
    sectionAnchor: '#wertschöpfung-gestalten',
    skills: ['roles-actors-mapping', 'value-network-analysis', 'value-creation-process', 'ecosystem-synthesis'],
    shortLabels: ['Rollen & Akteure', 'Wertnetzwerk', 'Wertschöpfungs-prozess', 'Ökosystem-Synthese'],
  },
  {
    label: 'Wirtschaftlichkeit',
    color: '#F9A825',
    sectionAnchor: '#wirtschaftlichkeit-prüfen',
    skills: ['value-source-wtp', 'revenue-mechanics-pricing', 'cost-structure-analysis', 'pricing-strategy-targets'],
    shortLabels: ['Wertquellen & WTP', 'Erlösmodell & Pricing', 'Kostenstruktur', 'Preisstrategie'],
  },
  {
    label: 'Konsolidierung',
    color: '#6A1B9A',
    sectionAnchor: '#ergebnisse-konsolidieren',
    skills: ['risk-heatmap', 'action-plan-raci', '30-60-90-day-roadmap', 'executive-summary'],
    shortLabels: ['Risiko-Heatmap', 'Maßnahmenplan & RACI', '30/60/90-Tage-Plan', 'Executive Summary'],
  },
];

export default function ProcessFlow({ phases: customPhases }) {
  const phases = customPhases || defaultPhases;
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div style={{ overflowX: 'auto', padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-start' }}>
        {phases.map((phase, pi) => (
          <React.Fragment key={phase.label}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <a
                href={phase.sectionAnchor}
                style={{
                  display: 'block',
                  background: phase.color,
                  color: '#fff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px 6px 0 0',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                }}
              >
                {phase.label}
              </a>
              <div
                style={{
                  border: `2px solid ${phase.color}`,
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  padding: '0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                {phase.skills.map((skill, si) => (
                  <a
                    key={skill}
                    href={`#${skill}`}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                    style={{
                      padding: '0.4rem 0.5rem',
                      fontSize: '0.73rem',
                      fontWeight: 500,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: activeSkill === skill ? phase.color + '18' : 'var(--ifm-card-background-color)',
                      border: `1px solid ${activeSkill === skill ? phase.color : 'var(--ifm-color-emphasis-200)'}`,
                      transition: 'all 0.15s',
                      textAlign: 'center',
                      lineHeight: 1.3,
                      color: activeSkill === skill ? phase.color : 'var(--ifm-font-color-base)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                    title={skill}
                  >
                    {phase.shortLabels[si]}
                  </a>
                ))}
              </div>
            </div>
            {pi < phases.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.8rem', color: 'var(--ifm-font-color-secondary)', fontSize: '1.1rem', flexShrink: 0 }}>
                &#8594;
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

ProcessFlow.propTypes = {
  phases: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      sectionAnchor: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
      shortLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};
