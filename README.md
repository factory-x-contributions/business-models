<p align="center">
  <img src="https://factory-x.org/wp-content/uploads//factory-x-logo.svg" alt="Factory-X Logo" width="200"/>
</p>

<h1 align="center">Factory-X Business Models</h1>

<p align="center">
  <strong>Subproject 3: Methodology and Tools for Developing Data-Driven Business Models</strong>
</p>

<p align="center">
  <a href="https://github.com/factory-x-contributions/business-models/actions"><img src="https://img.shields.io/github/actions/workflow/status/factory-x-contributions/business-models/build-and-deploy-gh-pages.yaml?style=flat-square&label=Build" alt="Build Status"/></a>
  <a href="https://github.com/factory-x-contributions/business-models/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square" alt="License Code"/></a>
  <a href="https://creativecommons.org/licenses/by/4.0/"><img src="https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg?style=flat-square" alt="License Docs"/></a>
  <a href="https://docusaurus.io/"><img src="https://img.shields.io/badge/Docusaurus-3.10.0-blue.svg?style=flat-square" alt="Docusaurus"/></a>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-house-building-logic">House Building Logic</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-support">Support</a>
</p>

---

## 📋 Overview

This repository is part of the [Factory-X](https://www.bmwk.de/Redaktion/DE/Artikel/Industrie/factory-x.html) lighthouse project funded by the German Federal Ministry for Economic Affairs and Climate Action (BMWK). It contains the **House Building Logic (HBL)** – a structured methodology for developing data-driven business models in industrial contexts.

Factory-X creates an open data ecosystem for factory equipment suppliers and operators. Subproject 3 focuses on the question: **How do companies develop viable business models based on data?**

## 🏠 House Building Logic

The House Building Logic uses the metaphor of a house to make the complex process of business model development tangible:

| Room | Focus | Key Question |
|------|-------|--------------|
| **Entrance** | Starting Point | What is the business idea? |
| **Blue Room** | Customer Segments | Who are our customers and what do they need? |
| **Red Room** | Value Proposition | What value do we offer? |
| **Green Room** | Value Creation | How do we create the value? |
| **Yellow Room** | Economics | How do we make money? |
| **Exit** | Synthesis | Go, Review, or Stop? |

## ✨ Features

### 📚 Methodology Documentation

- Detailed description of each room with methods and templates
- Quality gates for quality assurance between phases
- Practical examples from machinery and plant engineering

### 🎓 Workshop Format

- 5-day design sprint concept
- PowerPoint templates (A2 format) for on-site workshops
- Facilitation guides and checklists

### 🤖 AI Assistant "Estelle"

- System prompt for ChatGPT, Claude, Copilot, and other LLMs
- Guided business model development through all rooms
- Automatic document generation

### 🌐 Internationalization (i18n)

- Full support for German (default) and English
- Language switcher in the navigation bar
- Translated documentation, blog posts, and UI elements

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/factory-x-contributions/business-models.git
cd business-models

# Install dependencies
npm install

# Start the development server
npm start
```

The documentation will be available at `http://localhost:3000`.

### Additional Commands

```bash
npm run build      # Create production build (all locales)
npm run serve      # Test build locally
npm run clear      # Clear cache

# Build specific locale
npm run build -- --locale de    # German only
npm run build -- --locale en    # English only

# Start dev server with specific locale
npm start -- --locale en        # English version
```

## 📁 Project Structure

```text
business-models/
├── docs/                    # Documentation (MDX)
│   ├── methodology/         # House Building Logic methodology
│   │   ├── overview.md      # Introduction
│   │   ├── entrance-area.md # Entrance area
│   │   ├── blue-room.md     # Blue Room
│   │   ├── red-room.md      # Red Room
│   │   ├── green-room.md    # Green Room
│   │   ├── yellow-room.md   # Yellow Room
│   │   └── exit-room.md     # Exit area
│   ├── workshop/            # Workshop materials
│   └── ai/                  # AI assistant documentation
├── i18n/                    # Internationalization
│   └── en/                  # English translations
│       ├── docusaurus-plugin-content-docs/
│       │   └── current/     # Translated documentation
│       ├── docusaurus-plugin-content-blog/
│       │                    # Translated blog posts
│       ├── docusaurus-theme-classic/
│       │                    # Navbar & footer translations
│       └── code.json        # UI string translations
├── files/
│   └── ai/                  # System prompt for AI assistants
├── src/
│   ├── components/          # React components
│   ├── css/                 # Styling
│   └── pages/               # Static pages
├── static/                  # Static assets
├── blog/                    # Blog posts (German)
└── docusaurus.config.js     # Docusaurus configuration
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Setting up the development environment
- Pull request process
- Commit conventions
- Writing documentation

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating — we expect all contributors to engage in a respectful and constructive manner.

By contributing to this project, you agree to the [Developer Certificate of Origin (DCO)](DCO). All commits must be signed off (`git commit --signoff`).

See also [SECURITY.md](SECURITY.md) for security guidelines.

## 💬 Support

If you need help or have questions about this project:

- **Questions & Discussions**: Open an [Issue](https://github.com/factory-x-contributions/business-models/issues) with the `question` label
- **Bug Reports**: Use the [Bug Report template](https://github.com/factory-x-contributions/business-models/issues/new?template=bug_report.md)
- **Feature Requests**: Use the [Feature Request template](https://github.com/factory-x-contributions/business-models/issues/new?template=feature_request.md)
- **Security Issues**: See [SECURITY.md](SECURITY.md) — please do **not** report security vulnerabilities through public issues
- **General Contact**: [info@factory-x.org](mailto:info@factory-x.org)

## 📖 Resources

- [Factory-X Website](https://factory-x.org/)
- [Factory-X Project Page (BMWK)](https://www.bmwk.de/Redaktion/DE/Artikel/Industrie/factory-x.html)
- [Manufacturing-X Initiative](https://www.plattform-i40.de/IP/Navigation/DE/Manufacturing-X/manufacturing-x.html)
- [Docusaurus Documentation](https://docusaurus.io/)

## 📜 Licensing and Copyright

Copyright 2025-2026 Contributors to the Factory-X project

This project uses a dual-licensing approach:

- **Code** (JavaScript, CSS, configuration files): [Apache License 2.0](LICENCE) (Apache-2.0)
- **Documentation and non-code content** (Markdown, images, PDFs): [Creative Commons Attribution 4.0 International](LICENCE_non-code) (CC-BY-4.0)

This project follows the [REUSE specification](https://reuse.software/spec/) for clear and unambiguous license and copyright information. Each file contains SPDX license identifiers either inline or via the [`REUSE.toml`](REUSE.toml) file.

For details, see the [NOTICE](NOTICE) file.
