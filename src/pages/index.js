// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';
import { GradientButton } from '@site/src/components/buttons/GradientButton';


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
            href="docs/methodology/overview"
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
      </main>
    </Layout>
  );
}
