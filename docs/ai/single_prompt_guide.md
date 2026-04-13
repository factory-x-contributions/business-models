---
id: single_prompt_guide
title: "Single Prompt: Anleitung"
description: Einführung in Estelle - den AI-Assistenten für datenbasierte Geschäftsmodellentwicklung
sidebar_position: 2
---

<br></br>

<div style={{background: 'linear-gradient(135deg, rgba(56, 111, 179, 0.08) 0%, rgba(56, 111, 179, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>🤖</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#386FB3', fontWeight: '600'}}>AI-Assistent</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>Geschäftsmodelle mit Estelle entwickeln</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    <strong>Estelle</strong> ist dein AI-gestützter Assistent für die Entwicklung von Geschäftsmodellen. Sie führt dich durch die Hausbaulogik - vom Eingangsbereich über die vier Dimensionen bis zum Ausgangsbereich. Dabei stellt sie gezielte Fragen, prüft die Konsistenz und erstellt strukturierte Output-Dokumente.
  </p>
</div>

---

## Schritt 1: Dokument herunterladen

Lade die AI-Prompt-Datei herunter, um diese später in deinem AI-Tool aktivieren zu können.

import { GradientButton } from '@site/src/components/buttons/GradientButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

<div style={{marginTop: '1rem', display: 'inline-block'}}>
  <GradientButton
    href="https://raw.githubusercontent.com/factory-x-contributions/business-models/main/files/ai/DE_BusinessModel_SinglePrompt.md"
    text="DE_BusinessModel_SinglePrompt.md"
    icon={FileDownloadIcon}
    gradient="linear-gradient(135deg, #386FB3 0%, #2d5a94 100%)"
    shadowColor="rgba(56, 111, 179, 0.3)"
    shadowColorHover="rgba(56, 111, 179, 0.4)"
    minWidth="auto"
  />
</div>



---

## Schritt 2: Datei in AI-Tool einfügen

Öffne dein bevorzugtes AI-Tool (z.B. ChatGPT, Claude, Copilot) und lade die heruntergeladene Datei hoch oder füge den Inhalt ein.

:::info Datenschutz beachten
Die erarbeiteten Geschäftsmodell-Daten sind sensibel. Nutze bevorzugt unternehmensinterne Chatbots, die deine Daten vertraulich behandeln. Siehe [Best Practices](./single_prompt_best_practices).
:::

---

## Schritt 3: Estelle starten

Schreibe in den Chat:

<div style={{background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px', padding: '1rem 1rem', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.95rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  „Bitte führe dieses Dokument als System-Prompt aus und starte mit der Willkommensnachricht."
</div>

<p style={{marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)'}}>
  Der Bot übernimmt die Rolle <strong>Estelle</strong> und führt dich durch die Räume der Hausbaulogik.
</p>

---


<br></br>

:::tip Navigation
Du kannst jederzeit direkt in einen Raum springen, indem du seinen Namen nennst (z.B. „Blauer Raum"). Jeder Raum führt dich Schritt für Schritt durch Fragen und erstellt passende Output-Dokumente.
:::
