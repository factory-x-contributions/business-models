---
id: ai_overview
title: AI Chatbot Guide
description: Introduction to Estelle – the AI assistant for data-driven business model development
sidebar_position: 1
---

<br></br>

<div style={{background: 'linear-gradient(135deg, rgba(56, 111, 179, 0.08) 0%, rgba(56, 111, 179, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>🤖</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#386FB3', fontWeight: '600'}}>AI Assistant</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>Develop Business Models with Estelle</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    <strong>Estelle</strong> is your AI-powered assistant for developing business models. She guides you through the House Building Logic – from the Entrance Area through the four dimensions to the Exit Area. She asks targeted questions, checks consistency, and creates structured output documents.
  </p>
</div>

---

## Step 1: Download the Document

Download the AI prompt file to activate it later in your AI tool.

import { GradientButton } from '@site/src/components/buttons/GradientButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

<div style={{marginTop: '1rem', display: 'inline-block'}}>
  <GradientButton
    href="https://raw.githubusercontent.com/factory-x-contributions/business-models/main/files/ai/DE_BusinessModel_Chatbot.md"
    text="DE_BusinessModel_Chatbot.md"
    icon={FileDownloadIcon}
    gradient="linear-gradient(135deg, #386FB3 0%, #2d5a94 100%)"
    shadowColor="rgba(56, 111, 179, 0.3)"
    shadowColorHover="rgba(56, 111, 179, 0.4)"
    minWidth="auto"
  />
</div>



---

## Step 2: Insert File into AI Tool

Open your preferred AI tool (e.g., ChatGPT, Claude, Copilot) and upload the downloaded file or paste its contents.

:::info Data Privacy Notice
The business model data you develop is sensitive. Preferably use company-internal chatbots that handle your data confidentially. See [Best Practices](./ai_best_practices).
:::

---

## Step 3: Start Estelle

Write in the chat:

<div style={{background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px', padding: '1rem 1rem', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.95rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  "Please execute this document as a system prompt and start with the welcome message."
</div>

<p style={{marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)'}}>
  The bot takes on the role of <strong>Estelle</strong> and guides you through the rooms of the House Building Logic.
</p>

---


<br></br>

:::tip Navigation
You can jump directly to any room at any time by mentioning its name (e.g., "Blue Room"). Each room guides you step by step through questions and creates appropriate output documents.
:::
