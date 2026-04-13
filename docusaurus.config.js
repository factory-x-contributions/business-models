// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import {themes as prismThemes} from 'prism-react-renderer';

const organizationName = "factory-x-contributions";
const projectName = "business-models";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Factory-X Geschäftsmodelle',
  tagline: 'Diese Website erklärt die Hausbaulogik und ihre Anwendung.',
  favicon: 'https://factory-x.org/wp-content/uploads//factory-x-logo.svg',

  baseUrl: `/${projectName}/`,
  url: `https://${organizationName}.github.io`,
  organizationName, 
  projectName, 
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  future: {
    v4: true,
  },

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    localeConfigs: {
      de: {
        label: 'Deutsch',
        htmlLang: 'de-DE',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'https://factory-x.org/wp-content/uploads//factory-x-logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Factory-X Business Models',
        logo: {
          alt: 'Factory-X Logo',
          src: 'https://factory-x.org/wp-content/uploads//factory-x-logo.svg',
        },
        items: [
          {to: 'docs/methodology/overview', label: 'Methodik', position: 'left'},
          {to: 'docs/ai/ai_approaches', label: 'AI-Assistent', position: 'left'},
          {to: 'docs/workshop/overview_workshop', label: 'Workshop', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/factory-x-contributions',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
              label: 'AI-Assistent',
                to: 'docs/ai/single_prompt_guide',
              },
              {
                label: 'Methodik',
                to: 'docs/methodology/overview',
              },
              {
                label: 'Workshop',
                to: 'docs/workshop/overview_workshop',
              },
            ],
          },
          {
            title: 'General Information',
            items: [
              {
                label: 'Legal Notice',
                href: 'https://factory-x.org/de/impressum/',
              },
              {
                label: 'Privacy Policy',
                href: 'https://factory-x.org/privacy-policy/',
              },
              {
                label: 'Contact',
                href: 'https://factory-x.org/contact/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/factory-x-contributions',
              },
              {
                label: 'Website',
                href: 'https://factory-x.org/de/',
              },
            ],
          },
        ],
        copyright: `Copyright © 2025-${new Date().getFullYear()} Contributors to the Factory-X project. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;