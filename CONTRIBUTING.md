# Contributing to Factory-X Business Models

Thank you for your interest in contributing to this project! This document describes how you can submit contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Developer Certificate of Origin (DCO)](#developer-certificate-of-origin-dco)
- [How Can I Contribute?](#how-can-i-contribute)
- [Issue Handling Process](#issue-handling-process)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Pull Request Process](#pull-request-process)
- [Contribution Handling Process](#contribution-handling-process)
- [Commit Conventions](#commit-conventions)
- [Writing Documentation](#writing-documentation)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to engage in a respectful and constructive manner. By participating in this project, you agree to abide by its terms.

## Developer Certificate of Origin (DCO)

Due to legal reasons, contributors will be asked to accept a Developer Certificate of Origin (DCO) when they create the first pull request to this project. This happens in an automated fashion during the submission process. Factory-X uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

All commits must be signed off to indicate that you agree to the terms of the DCO. You can do this by adding `--signoff` (or `-s`) to your `git commit` command:

```bash
git commit --signoff -m "feat: my contribution"
```

This will add a `Signed-off-by` line to your commit message:

```text
Signed-off-by: Your Name <your.email@example.com>
```

If you have already made commits without a sign-off, you can amend the last commit:

```bash
git commit --amend --signoff
```

For more details, see the [DCO](DCO) file in the repository root.

## How Can I Contribute?

### Reporting Bugs

- First check if the bug has already been reported as an [Issue](https://github.com/factory-x-contributions/business-models/issues)
- Create a new issue with a clear description of the problem
- Include steps to reproduce the issue

### Suggesting Improvements

- Open an issue with the `enhancement` label
- Describe the value your idea would add
- Discuss the proposal with the community

### Contributing Code

- Fix bugs or implement new features
- Improve the documentation
- Write or update tests

## Issue Handling Process

We use GitHub Issues to track bugs, feature requests, and discussions.

### Triage

All new issues are reviewed by the maintainers within **5 business days**. During triage, we:

1. Verify the issue is valid and reproducible (for bugs)
2. Assign appropriate labels (`bug`, `enhancement`, `documentation`, `question`)
3. Prioritize the issue based on impact and effort
4. Assign the issue to a milestone if applicable

### Labels

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature or improvement request |
| `documentation` | Improvements or additions to documentation |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention is needed |
| `duplicate` | This issue already exists |
| `wontfix` | This will not be worked on |

### Response Times

We aim for the following response times (best effort):

| Action | Target |
|--------|--------|
| Initial triage | 5 business days |
| First response to contributor | 10 business days |
| Review of pull request | 10 business days |

## Setting Up the Development Environment

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0
- npm or yarn
- Git

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/business-models.git
cd business-models

# Install dependencies
npm install

# Start the development server
npm start
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `npm start` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run serve` | Tests the build locally |
| `npm run clear` | Clears the cache |

## Pull Request Process

1. **Fork** the repository on GitHub

2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/business-models.git
   ```

3. **Create a feature branch**:

   ```bash
   git checkout -b feature/my-improvement
   ```

4. **Make your changes** and test them locally

5. **Commit** your changes (see [Commit Conventions](#commit-conventions)):

   ```bash
   git commit -m "feat: short description of the change"
   ```

6. **Push** your branch:

   ```bash
   git push origin feature/my-improvement
   ```

7. **Create a Pull Request** on GitHub

### PR Checklist

- [ ] Code follows project conventions
- [ ] Changes have been tested locally
- [ ] Documentation has been updated if needed
- [ ] Commit messages follow the conventions
- [ ] All commits are signed off (DCO)

## Contribution Handling Process

### Review Process

Every pull request is reviewed by at least one maintainer. The review process follows these steps:

1. **Automated checks**: CI pipeline runs build verification and linting
2. **Code review**: A maintainer reviews the changes for quality, correctness, and alignment with the project
3. **Feedback**: The reviewer may request changes or ask questions — please respond within a reasonable timeframe
4. **Approval**: Once all feedback is addressed, the PR is approved
5. **Merge**: A maintainer merges the PR into the main branch

### Merge Criteria

A pull request is ready to merge when:

- All CI checks pass
- At least one maintainer has approved
- All review comments are resolved
- The DCO sign-off is present on all commits
- The branch is up to date with the target branch

### Stale Contributions

If a pull request has had no activity for **30 days**, we will reach out to the contributor. If there is no response within another **14 days**, the PR may be closed. You are welcome to reopen it at any time.

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages:

```text
<type>: <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no code change |
| `refactor` | Code refactoring |
| `test` | Adding/modifying tests |
| `chore` | Maintenance tasks |

### Examples

```text
feat: extend AI assistant with Yellow Room
fix: correct broken link in methodology overview
docs: update installation instructions
```

## Writing Documentation

The documentation uses [Docusaurus](https://docusaurus.io/) with MDX.

### File Structure

```text
docs/
├── methodology/    # House Building Logic methodology
├── workshop/       # Workshop materials
└── ai/             # AI assistant documentation
```

### MDX Frontmatter

Each documentation page requires a frontmatter header:

```yaml
---
id: unique-id
title: Page Title
description: Short description for SEO
sidebar_position: 1
---
```

### Images and Assets

- Images belong in `/static/img/`
- Use descriptive file names
- Optimize images before uploading

---

## Questions?

If you have questions or need clarification, feel free to open an [Issue](https://github.com/factory-x-contributions/business-models/issues) or contact the team.

See also: [SECURITY.md](SECURITY.md) for security guidelines.
