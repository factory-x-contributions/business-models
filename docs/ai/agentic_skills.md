---
id: agentic_skills
title: "Agentic Skills: Übersicht"
description: Interaktive AI-Skills zur strukturierten Geschäftsmodellentwicklung nach der Hausbaulogik
sidebar_position: 4
---

import SkillCard from '@site/src/components/SkillCard';
import ProcessFlow from '@site/src/components/ProcessFlow';

<br></br>

<div style={{background: 'linear-gradient(135deg, rgba(56, 111, 179, 0.08) 0%, rgba(56, 111, 179, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>⚡</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#386FB3', fontWeight: '600'}}>AI-Skills</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>AI-gestützte Geschäftsmodellentwicklung</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    Dieses Projekt stellt <strong>23 spezialisierte AI-Skills</strong> bereit - strukturierte Methoden, die ein AI-Assistent Schritt für Schritt mit dir durcharbeitet. Jeder Skill kann <strong>einzeln</strong> oder als Teil des <strong>Gesamtprozesses</strong> genutzt werden.
  </p>
</div>

## Was ist ein AI-Skill?

Ein AI-Skill ist eine **strukturierte Anleitung für einen AI-Assistenten**. Er enthält eine klare Methodenbeschreibung, einen Fragebogen im Interview-Stil, Qualitätskriterien und definierte Output-Formate. Die AI führt dich dabei wie ein erfahrener Berater durch den Prozess - sie stellt gezielte Fragen, hinterfragt Annahmen und erstellt strukturierte Ergebnisdokumente.

Skills folgen dem offenen [Agent Skills](https://agentskills.io)-Standard und funktionieren mit kompatiblen AI-Coding-Tools.

---

## Prozessübersicht

Der Gesamtprozess umfasst 21 Methoden in 6 Phasen. Hover über die einzelnen Schritte, um den Skill-Namen zu sehen:

<ProcessFlow />

---

## Alle Skills im Detail

Klicke auf einen Skill, um Beispiel-Prompt, erwartetes Ergebnis und Dauer zu sehen.

### Ausgangslage klären

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="company-assessment"
  title="Unternehmensanalyse"
  description="Erfasst Unternehmensprofil, Rolle, Angebot, Kunden, Markt, Kompetenzen und digitalen Reifegrad."
  prompt="Wir sind ein mittelständischer Maschinenbauer mit 500 Mitarbeitern und möchten unser Servicegeschäft digitalisieren. Hilf mir mit einer strukturierten Unternehmensanalyse."
  output="Company Assessment Summary mit Ist-Zustand, digitaler Reife und Ökosystem-Touchpoints."
/>

<SkillCard
  name="business-idea-canvas"
  title="Geschäftsidee-Canvas"
  description="Strukturiert die erste Geschäftsidee in einem 6-Felder-Canvas: Ursprung, Datenraum-Rolle, Zielgruppe, Angebot, Wertschöpfung, Erlösquellen."
  prompt="Ich habe eine Idee für einen Predictive-Maintenance-Service basierend auf Maschinendaten. Hilf mir, diese Idee zu strukturieren."
  output="Business Idea Canvas (6 Felder) und Elevator Pitch (max. 150 Wörter)."
/>

</div>

### Kunden verstehen

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="market-segmentation"
  title="Marktsegmentierung"
  description="Identifiziert Kundensegmente, bewertet sie nach 6 Kriterien, schätzt die Marktgröße (TAM/SAM/SOM) und priorisiert 2-3 Fokus-Kombinationen."
  prompt="Hilf mir bei einer Marktsegmentierung für unseren IoT-basierten Condition-Monitoring-Service für die Fertigungsindustrie."
  output="Segment x Use-Case-Matrix mit Bewertung, priorisierte Shortlist (2-3 Fokus-Kombinationen)."
/>

<SkillCard
  name="stakeholder-matrix"
  title="Stakeholder-Matrix"
  description="Kartiert alle Stakeholder in einer 2x2-Matrix (Einfluss vs. Interesse) und definiert Engagement-Strategien pro Quadrant."
  prompt="Ich brauche eine Stakeholder-Analyse für unser Predictive-Maintenance-Angebot an Automobilzulieferer."
  output="2x2 Stakeholder-Matrix mit Engagement-Strategie pro Quadrant und Key-Stakeholder-Shortlist."
/>

<SkillCard
  name="persona-development"
  title="Persona-Entwicklung"
  description="Erstellt detaillierte Kundenprofile mit CORE (Rolle, Probleme, Ziele) und ENVIRONMENT (Alltag, Barrieren, Trigger, Emotionen)."
  prompt="Erstelle eine Persona für den Instandhaltungsleiter eines mittelständischen Automobilzulieferers."
  output="1-2 Persona-Profile mit CORE- und ENVIRONMENT-Blöcken."
/>

<SkillCard
  name="vpc-customer-side"
  title="Value Proposition Canvas (Kundenseite)"
  description="Entwickelt die Kundenseite des VPC: Jobs-to-be-Done (funktional, emotional, sozial), Pains und Gains - kategorisiert und priorisiert."
  prompt="Hilf mir, die Kundenseite des Value Proposition Canvas für unseren Predictive-Maintenance-Service zu entwickeln."
  output="VPC-Profil mit priorisierten Jobs, Pains und Gains inkl. Bewertungstabellen."
/>

</div>

### Wertversprechen formulieren

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="match-matrix"
  title="Match-Matrix"
  description="Verknüpft Pains und Gains mit Lösungshebeln, bewertet den messbaren Nutzen und clustert in Essentials vs. Nice-to-Haves."
  prompt="Ich habe priorisierte Pains und Gains meiner Kunden. Hilf mir, diese systematisch mit Lösungsansätzen zu verknüpfen."
  output="Match-Matrix-Tabelle (Pain/Gain → Lösungshebel → Wert → Priorität → Cluster) und Top-5-Essentials."
/>

<SkillCard
  name="value-proposition-formula"
  title="Value-Proposition-Formel"
  description="Formuliert das Wertversprechen nach einer 6-Komponenten-Formel und dem Promise-Deliver-Proof-Framework."
  prompt="Hilf mir, ein überzeugendes Wertversprechen für unseren datenbasierten Service zu formulieren."
  output="Value-Proposition-Statement, Pitch-Statement (1-2 Sätze), Evidenz-Checkliste, Wettbewerbsvergleich."
/>

<SkillCard
  name="product-service-idea"
  title="Produkt-/Serviceidee"
  description="Definiert das Angebot in einer 4-teiligen Matrix: Kernkomponenten, Differenzierungsmerkmale, Kundennutzen, strategischer Fit."
  prompt="Ich möchte meine Predictive-Maintenance-Idee als konkretes Produkt definieren. Hilf mir mit der Produktdefinition."
  output="Produktbeschreibung (Name, Typ, 4-teilige Matrix), Wettbewerbsvergleich, Evidenz-Checkliste."
/>

</div>

### Wertschöpfung gestalten

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="roles-actors-mapping"
  title="Rollen & Akteure"
  description="Identifiziert alle Ökosystem-Akteure, kartiert ihre Rollen (Data Provider, Service Provider, Orchestrator...) und klärt die eigene Positionierung."
  prompt="Hilf mir, alle Akteure für unseren Predictive-Maintenance-Service im Factory-X-Ökosystem zu identifizieren."
  output="Rollen-Akteurs-Matrix (Akteur, Rolle, Wertbeitrag, intern/extern, Make/Buy/Partner)."
/>

<SkillCard
  name="value-network-analysis"
  title="Wertnetzwerk-Analyse"
  description="Kartiert alle Austauschflüsse zwischen Akteuren: Daten, Güter/Services, Finanzen, Infrastruktur und Governance."
  prompt="Ich möchte die Daten-, Güter- und Finanzflüsse zwischen allen Akteuren in unserem Ökosystem kartieren."
  output="Wertnetzwerk-Diagramm (farbcodiert: Blau=Daten, Grün=Güter, Orange=Finanzen), Fluss-Detailtabellen."
/>

<SkillCard
  name="value-creation-process"
  title="Wertschöpfungsprozess"
  description="Gestaltet den End-to-End-Prozess mit Phasen, Akteursinteraktionen, RACI-Matrix und KPI-Messpunkten."
  prompt="Hilf mir, den operativen Prozess unseres Services von Onboarding bis laufendem Betrieb zu definieren."
  output="Prozessdiagramm (BPMN-Stil), RACI-Matrix pro Schritt, KPI-Dashboard, Skalierbarkeitsanalyse."
/>

<SkillCard
  name="ecosystem-synthesis"
  title="Ökosystem-Synthese"
  description="Bewertet die Machbarkeit: monetarisierbare Beiträge, Kosten, Governance-Reife, Risiken und Go/Review/Stop-Empfehlung."
  prompt="Fasse die Ergebnisse unserer Wertschöpfungsanalyse zusammen und bewerte die Machbarkeit."
  output="Synthese-Dokument mit Monetarisierung, Kosten, Governance-Scorecard, Risiken und Go/Review/Stop."
/>

</div>

### Wirtschaftlichkeit prüfen

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="value-source-wtp"
  title="Wertquellen & Zahlungsbereitschaft"
  description="Quantifiziert den Kundennutzen in EUR/Jahr, leitet Wertformeln ab und testet die Zahlungsbereitschaft mit Evidenz."
  prompt="Hilf mir, den monetären Wert unseres Predictive-Maintenance-Services für verschiedene Kundensegmente zu quantifizieren."
  output="Wertformeln (EUR/Jahr), Evidenz-Status (A/B/C), WTP-Bandbreiten, Go/Check/Stop pro Segment."
/>

<SkillCard
  name="revenue-mechanics-pricing"
  title="Erlösmodell & Pricing"
  description="Gestaltet Preisbasis, Modelltyp (Subscription/Pay-per-Use/Outcome/Hybrid), Preiskomponenten und Unit Economics."
  prompt="Ich brauche ein Pricing-Modell für unseren datenbasierten Service. Welches Erlösmodell passt am besten?"
  output="2-3 Modellvarianten mit Preisbasis, Komponenten, Unit Economics und Muster-Kalkulation."
/>

<SkillCard
  name="cost-structure-analysis"
  title="Kostenstruktur-Analyse"
  description="Kartiert die Kostenstruktur: fix/variabel, einmalig/laufend, Partnerkosten, Skalierbarkeit und Steuerbarkeit."
  prompt="Hilf mir, die Kostenstruktur unseres Services über den gesamten Lebenszyklus zu kartieren."
  output="Lebenszyklus-Kostentabelle, Fix/Variabel-Matrix (2x2), Risiken und Kontrollmechanismen."
/>

<SkillCard
  name="pricing-strategy-targets"
  title="Preisstrategie & Ziele"
  description="Definiert Preisstrategie, Positionierung, Rabattregeln, KPI-Leitplanken (ARPA, LTV/CAC) und Go-to-Market-Tests."
  prompt="Definiere eine Preisstrategie für unseren Service mit klaren KPI-Leitplanken und einem GTM-Testplan."
  output="Synthese-One-Pager mit Akteur-Tabellen, Break-Even-Analyse, Go/Check/Stop pro Akteur."
/>

</div>

### Ergebnisse konsolidieren

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem'}}>

<SkillCard
  name="risk-heatmap"
  title="Risiko-Heatmap"
  description="Identifiziert Risiken nach 4 Perspektiven, bewertet Wahrscheinlichkeit und Tragweite, visualisiert in farbcodierter Heatmap."
  prompt="Erstelle eine Risiko-Heatmap für unser Geschäftsmodell mit Bewertung aus allen Perspektiven."
  output="Risiko-Heatmap (2x2, farbcodiert), Risiko-Register mit IDs, Priorisierung und Maßnahmen."
/>

<SkillCard
  name="action-plan-raci"
  title="Maßnahmenplan & RACI"
  description="Übersetzt Risiken in SMART-Maßnahmen pro Workstream mit RACI-Zuordnung (genau ein Verantwortlicher pro Maßnahme)."
  prompt="Erstelle einen Maßnahmenplan mit RACI-Zuordnung basierend auf unserer Risiko-Heatmap."
  output="Maßnahmenliste (SMART, verknüpft mit Risiko-IDs), RACI-Matrix pro Maßnahme."
/>

<SkillCard
  name="30-60-90-day-roadmap"
  title="30/60/90-Tage-Roadmap"
  description="Ordnet Maßnahmen in Zeitphasen, klärt Abhängigkeiten, definiert ergebnisorientierte KPIs und Ressourcenbedarf."
  prompt="Erstelle eine 30/60/90-Tage-Roadmap für die Umsetzung unseres Geschäftsmodells."
  output="Roadmap mit Zeitbändern, Zielpfad (PoC/MVP), KPIs, Ressourcen- und Entscheidungsbedarf."
/>

<SkillCard
  name="executive-summary"
  title="Executive Summary"
  description="Konsolidiert alle Ergebnisse in einen entscheidungsfähigen One-Pager mit Rückverfolgbarkeit von der Idee bis zu den nächsten Schritten."
  prompt="Erstelle eine Executive Summary als One-Pager für die Management-Entscheidung über unser Geschäftsmodell."
  output="One-Pager: Idee, Zielgruppe, Wertversprechen, Wertnetzwerk, Business Case, Risiken, nächste Schritte."
/>

</div>

---

## So nutzt du die Skills

### Gesamtprozess durchlaufen

Beschreibe einfach deine Geschäftsidee - die AI erkennt den Kontext und startet den Orchestrator:

```text
Ich möchte ein Geschäftsmodell für einen datenbasierten
Predictive-Maintenance-Service entwickeln.
```

### Einzelne Methode nutzen

Beschreibe, welche Methode du brauchst - die AI wählt den passenden Skill:

```text
Hilf mir bei einer Marktsegmentierung für unser IoT-Angebot.
```

---

## Technischer Hintergrund

Die Skills nutzen den offenen [Agent Skills](https://agentskills.io)-Standard. Jeder Skill ist eine Markdown-Datei (`SKILL.md`) mit Metadaten und strukturierten Anweisungen. Die Dateien liegen unter `.claude/skills/` im Projektverzeichnis.

```yaml
---
name: skill-name
description: Wann und wofür der Skill eingesetzt wird
user-invocable: true
---

# Methodenname

## Purpose       - Was diese Methode erreicht
## Role          - Die AI-Persona und ihre Arbeitsweise
## Questionnaire - Die vollständigen Fragen und Schritte
## Quality       - Qualitätskriterien und Konsistenzprüfungen
## Output        - Welche Artefakte produziert werden
```

## Weiterführende Ressourcen

- [Agent Skills Open Standard](https://agentskills.io) - Der offene Standard hinter den Skills
- [Hausbaulogik - Methodik](/docs/methodology/overview) - Die vollständige Methodenbeschreibung
- [Workshop-Konzept](/docs/workshop/overview_workshop) - Die Skills als 5-Tage-Workshop
- [AI-Assistent Anleitung](/docs/ai/single_prompt_anleitung) - Estelle als AI-Assistenten nutzen
