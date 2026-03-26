---
id: ai_approaches
title: Zwei Ansätze im Vergleich
description: Single Prompt File vs. Agentic Skills - wann du welchen Ansatz nutzen solltest
sidebar_position: 1
---

<br></br>

<div style={{background: 'linear-gradient(135deg, rgba(56, 111, 179, 0.08) 0%, rgba(56, 111, 179, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>🔀</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#386FB3', fontWeight: '600'}}>Entscheidungshilfe</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>Single Prompt File oder Agentic Skills?</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    Es gibt zwei Wege, die Hausbaulogik mit AI-Unterstützung zu durchlaufen. Beide nutzen dieselbe Methodik - unterscheiden sich aber in Werkzeug, Flexibilität und technischem Aufwand.
  </p>
</div>

---

## Auf einen Blick

<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>

<div style={{background: 'var(--ifm-background-surface-color)', border: '2px solid #386FB3', borderRadius: '12px', padding: '1.5rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.25rem'}}>📄</span>
    <span style={{fontWeight: '700', fontSize: '1.05rem', color: '#386FB3'}}>Single Prompt File</span>
  </div>
  <p style={{fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)', marginBottom: '1rem'}}>
    Eine einzige Markdown-Datei, die als System-Prompt in jeden Standard-Chatbot geladen wird. Der AI-Assistent <strong>Estelle</strong> übernimmt die Moderation und führt durch alle Räume der Hausbaulogik.
  </p>
  <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Kein Setup nötig</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Funktioniert mit ChatGPT, Claude, Copilot & Co.</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Gesamtprozess in einem Gespräch</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#f59e0b'}}>~</span> Weniger flexibel bei Einzelmethoden</div>
  </div>
</div>

<div style={{background: 'var(--ifm-background-surface-color)', border: '2px solid #95A532', borderRadius: '12px', padding: '1.5rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.25rem'}}>⚡</span>
    <span style={{fontWeight: '700', fontSize: '1.05rem', color: '#95A532'}}>Agentic Skills</span>
  </div>
  <p style={{fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)', marginBottom: '1rem'}}>
    23 spezialisierte Skill-Dateien, die in einem AI-Coding-Tool (z.B. Claude Code) installiert werden. Jeder Skill deckt eine einzelne Methode ab und kann gezielt aufgerufen werden.
  </p>
  <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Einzelne Methoden gezielt abrufbar</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Höhere Konsistenz & Qualitätskontrolle</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Geeignet für iterative & parallele Arbeit</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#22c55e'}}>✓</span> Vollständig kompatibel mit AI-Agents & Automatisierungspipelines</div>
    <div style={{fontSize: '0.85rem', display: 'flex', gap: '0.5rem'}}><span style={{color: '#f59e0b'}}>~</span> Erfordert Claude Code oder kompatibles Tool</div>
  </div>
</div>

</div>

---

## Detailvergleich

| | **Single Prompt File** | **Agentic Skills** |
|---|---|---|
| **Werkzeug** | Jeder Chatbot (ChatGPT, Claude, Copilot …) | Claude Code oder Agent-Skills-kompatibles Tool |
| **Setup** | Datei herunterladen & hochladen | Skills einmalig installieren |
| **Nutzung** | Gesamtprozess als Gespräch | Einzelne Methoden per Befehl aufrufen |
| **Flexibilität** | Lineare Führung durch alle Räume | Beliebige Kombination & Reihenfolge |
| **Kontextfenster** | Ein Chat für den Gesamtprozess | Pro Skill ein fokussierter Kontext |
| **Zielgruppe** | Einsteiger, schneller Einstieg | Erfahrene Nutzer, iterative Entwicklung |
| **Methoden** | Alle Räume in einem Prompt | 23 spezialisierte Skills |

---

## Wann welchen Ansatz nutzen?

<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem'}}>

<div style={{background: 'rgba(56, 111, 179, 0.06)', border: '1px solid rgba(56, 111, 179, 0.2)', borderRadius: '8px', padding: '1.25rem'}}>
  <div style={{fontWeight: '600', marginBottom: '0.75rem', color: '#386FB3'}}>📄 Single Prompt File - wenn du …</div>
  <ul style={{margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
    <li>den Prozess zum ersten Mal durchläufst</li>
    <li>keinen technischen Setup-Aufwand möchtest</li>
    <li>ein bestehendes AI-Tool (ChatGPT, Claude.ai) nutzt</li>
    <li>das gesamte Geschäftsmodell in einer Session entwickeln willst</li>
    <li>im Workshop-Kontext mit einem Team arbeitest</li>
  </ul>
</div>

<div style={{background: 'rgba(149, 165, 50, 0.06)', border: '1px solid rgba(149, 165, 50, 0.2)', borderRadius: '8px', padding: '1.25rem'}}>
  <div style={{fontWeight: '600', marginBottom: '0.75rem', color: '#6b7a1e'}}>⚡ Agentic Skills - wenn du …</div>
  <ul style={{margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
    <li>einzelne Methoden gezielt anwenden willst</li>
    <li>iterativ arbeitest und Methoden wiederholst</li>
    <li>Claude Code oder ein kompatibles Tool nutzt</li>
    <li>den Prozess in ein bestehendes Workflow-Tool integrieren möchtest</li>
    <li>Skills in AI-Agents oder Automatisierungspipelines einbinden willst</li>
  </ul>
</div>

</div>
