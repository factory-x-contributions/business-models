// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';
import { GradientButton } from '@site/src/components/buttons/GradientButton';

function ProjectEndBlock() {
  return (
    <section className={styles.projectEndSection}>
      <div className={styles.projectEndContent}>
        <div className={styles.projectEndIcon}>⏳</div>
        <Heading as="h2">
          <Translate id="projectEnd.title">Projektlaufzeit von Factory-X endet</Translate>
        </Heading>
        <p>
          <Translate id="projectEnd.body">
            Das Förderprojekt Factory-X nähert sich seinem Ende. Mit dem Abschluss der Projektlaufzeit wird auch diese Website nur noch für einen begrenzten Zeitraum verfügbar sein. Alle Inhalte – die Hausbaulogik, der AI-Assistent, das Workshop-Format und die Agentic Skills – sind Open Source und bleiben über das GitHub-Repository dauerhaft zugänglich.
          </Translate>
        </p>
        <div className={styles.projectEndActions}>
          <GradientButton
            href="https://github.com/factory-x-contributions/business-models"
            text={<Translate id="projectEnd.githubButton">Repository auf GitHub</Translate>}
            gradient="linear-gradient(135deg, #386FB3 0%, #175A95 100%)"
            shadowColor="rgba(56, 111, 179, 0.4)"
            shadowColorHover="rgba(56, 111, 179, 0.5)"
            external={true}
            pill={true}
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
}


function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="title">Factory-X Geschäftsmodelle</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="tagline">Diese Website erklärt die Hausbaulogik und ihre Anwendung.</Translate>
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '25px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <GradientButton
            href="docs/landing"
            text={<Translate id="homepage.startButton">Start</Translate>}
            gradient="linear-gradient(135deg, #95A532 0%, #727B1E 100%)"
            shadowColor="rgba(149, 165, 50, 0.4)"
            shadowColorHover="rgba(149, 165, 50, 0.5)"
            external={false}
            pill={true}
            showArrow={true}
            minWidth="180px"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const pageTitle = translate({
    id: 'title',
    message: 'Factory-X Geschäftsmodelle',
  });
  const pageDescription = translate({
    id: 'tagline',
    message: 'Strukturierter Leitfaden zur Entwicklung datenbasierter Geschäftsmodelle in Factory-X – mit Hausbaulogik, AI-Assistent und Workshop-Format.',
  });

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}>
      <HomepageHeader />
      <main>
        <ProjectEndBlock />
      </main>
    </Layout>
  );
}
