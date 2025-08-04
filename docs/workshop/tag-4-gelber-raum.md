---
id: workshop_gelber_raum
title: Tag 4 - Gelber Raum
description: 🟡 Wirtschaftlich tragfähiges Erlös- und Preismodell je Segment entwickeln
sidebar_position: 6
---

<div style={{background: 'linear-gradient(135deg, rgba(196, 160, 0, 0.08) 0%, rgba(196, 160, 0, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>🟡</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4A000', fontWeight: '600'}}>Viability</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>Wie verdienen wir Geld?</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    Ein wirtschaftlich tragfähiges Erlös- und Preisdesign je Segment/Use Case entwickeln
  </p>
  <div style={{marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'linear-gradient(135deg, rgba(196, 160, 0, 0.12) 0%, rgba(196, 160, 0, 0.04) 100%)', borderRadius: '8px', border: '1px solid rgba(196, 160, 0, 0.2)'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
      <span style={{fontSize: '1.1rem'}}>🎯</span>
      <strong style={{color: '#C4A000', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Tagesziel</strong>
    </div>
    <p style={{margin: 0, fontSize: '1rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.6'}}>Am Ende des Tages haben wir eine <strong>Wertquantifizierung in EUR, ein Preismodell und einen ersten Business Case</strong> – der Reality-Check für das Geschäftsmodell.</p>
  </div>
</div>

---

## Tagesübersicht

| Zeit | Thema | Beschreibung |
|------|-------|--------------|
| 09:00 - 09:30 | Begrüßung & Rückblick | Zusammenfassung Tag 3, Ziele Tag 4 |
| 09:30 - 10:45 | Deep-Dive 1: Wertquelle & Zahlungsbereitschaft | Wertquantifizierung in EUR |
| 10:45 - 11:00 | Pause | |
| 11:00 - 12:30 | Deep-Dive 2: Erlösmechanik & Preismodell | Monetarisierungslogik festlegen |
| 12:30 - 13:30 | Mittagspause | |
| 13:30 - 14:45 | Deep-Dive 3: Kostenstruktur | Kostenblöcke identifizieren |
| 14:45 - 15:00 | Pause | |
| 15:00 - 16:30 | Synthese: Business Case | Kosten-Nutzen, Break-even |
| 16:30 - 17:00 | Gate-Review & Daily-Log | Quality Check, Artefakte sichern |

---

## Deep-Dive 1: Wertquelle & Zahlungsbereitschaft (09:30 - 10:45)

### Ziel

Verstehen, **wofür der Kunde zahlt** und diesen Wert in EUR quantifizieren.

:::info Wichtig
Kunden zahlen für **Ergebnisse**, nicht für Features. Verknüpfe den Preis mit dem messbaren Nutzen.
:::

### Arten von Wertquellen

| Wertquelle | Beschreibung | Beispiel |
|------------|--------------|----------|
| **Einsparungen** | Kostenreduktion beim Kunden | Weniger Stillstände, geringere Wartungskosten |
| **Mehrumsatz** | Zusätzliche Erlöse ermöglichen | Höhere Produktivität |
| **Risikoreduktion** | Vermeidung von Schäden | Weniger Ausfälle |
| **Zeitgewinn** | Schnellere Prozesse | Kürzere Reaktionszeiten |
| **Compliance** | Nachweispflichten erfüllen | Dokumentation |

### Wertquantifizierung (Beispiel)

| Kundennutzen | Quantifizierung | Berechnung |
|--------------|-----------------|------------|
| Stillstände reduziert | 40% weniger | 10 Ausfälle/Jahr → 6 Ausfälle/Jahr |
| Ausfallkosten | 10.000 EUR/h | 4 vermiedene Ausfälle × 4h × 10.000 EUR |
| **Wert pro Jahr** | | **160.000 EUR** |

### KPIs zur Wertmessung

| KPI | Typ | Zielgruppe |
|-----|-----|------------|
| **Ungeplante Stillstandzeit** (h/Monat) | Primär | Management |
| Anlagenverfügbarkeit (%) | Sekundär | Operations |
| MTTR (Mean Time to Repair) | Sekundär | Instandhaltung |
| Wartungskosten (EUR/Maschine) | Sekundär | Controlling |

### Moderationsfragen

- „Für welchen konkreten Wert zahlt der Kunde?"
- „Eher 5% oder 30% Kostenreduktion – was ist realistisch?"
- „Wie können wir den Wert messbar machen?"

---

## Deep-Dive 2: Erlösmechanik & Preismodell (11:00 - 12:30)

### Ziel

Das **passende Erlösmodell** für das Angebot wählen.

### Erlösmodelle im Überblick

| Modell | Beschreibung | Vorteile | Nachteile |
|--------|--------------|----------|-----------|
| **Subscription** | Regelmäßige Gebühr | Planbare Erlöse | Churn-Risiko |
| **Pay-per-Use** | Nutzungsbasiert | Fair, skaliert | Variable Erlöse |
| **Outcome-Based** | Bezahlung nach Ergebnis | Starke Value-Alignment | Risiko beim Anbieter |
| **Freemium** | Basis kostenlos | Niedrige Hürde | Conversion nötig |
| **License** | Einmalige Zahlung | Hoher Sofort-Umsatz | Kein Recurring |
| **Hybrid** | Kombination | Flexibel | Komplexität |

### Preismodell-Komponenten

| Komponente | Beschreibung | Beispiel |
|------------|--------------|----------|
| **Fix-Anteil** | Grundgebühr | Subscription pro Maschine/Monat |
| **Variabel-Anteil** | Nutzungsabhängig | Pro Alert, pro Report |
| **Setup-Fee** | Einmalig | Integration, Onboarding |
| **Add-ons** | Optionale Erweiterungen | Advanced Analytics |

### Vorgehen (90 Min)

1. **Erlösmodelle bewerten** (30 Min): Welches Modell passt?
2. **Preiskomponenten definieren** (30 Min): Fix, variabel, Setup
3. **Preispunkte setzen** (20 Min): Erste Preisvorschläge
4. **Plausibilisieren** (10 Min): Ist das für den Kunden akzeptabel?

### Moderationsfragen

- „Welche Erlösmechanik passt zum Kundennutzen?"
- „Welche Preistreiber sind fair und nachvollziehbar?"
- „Ist die Preislogik einfach genug für den Vertrieb?"

---

## Deep-Dive 3: Kostenstruktur (13:30 - 14:45)

### Ziel

Alle **relevanten Kostenblöcke** dokumentieren – ehrlich und vollständig.

### Kostenarten

| Kategorie | Beispiele | Verhalten |
|-----------|-----------|-----------|
| **Entwicklung** | Software, Modelle, Integration | Einmalig/Projekt |
| **Infrastruktur** | Cloud, Server, Netzwerk | Fix + variabel |
| **Personal** | Support, Operations, Sales | Fix |
| **Partner** | Provisionen, Lizenzen | Variabel |
| **Datenraum** | Connector-Gebühren, Registry | Fix + variabel |
| **Marketing** | Vertrieb, Onboarding | Variabel |

### Kostenstruktur-Template

| Kostenblock | Fix/Variabel | Einmalig/Laufend | Schätzung |
|-------------|--------------|------------------|-----------|
| Entwicklung Initial | Fix | Einmalig | X EUR |
| Cloud-Infrastruktur | Variabel | Laufend | Y EUR/Monat |
| Support-Personal | Fix | Laufend | Z EUR/Monat |
| Datenraum-Gebühren | Fix + Var | Laufend | A EUR/Monat |
| Kundenakquise | Variabel | Pro Kunde | B EUR/Kunde |

### Moderationsfragen

- „Welche Kosten sind fix vs. variabel?"
- „Wo brauchen wir Partner & SLAs?"
- „Wie verhalten sich Kosten bei Skalierung?"

---

## Synthese: Business Case (15:00 - 16:30)

### Ziel

Wirtschaftlichkeit bewerten und Break-even berechnen.

### Business Case Struktur

| Element | Jahr 1 | Jahr 2 | Jahr 3 |
|---------|--------|--------|--------|
| **Erlöse** | | | |
| Anzahl Kunden | 5 | 15 | 30 |
| Maschinen/Kunde | 3 | 5 | 8 |
| Erlös/Maschine/Jahr | X EUR | X EUR | X EUR |
| **Gesamterlöse** | A EUR | B EUR | C EUR |
| **Kosten** | | | |
| Fixkosten | Y EUR | Y EUR | Y EUR |
| Variable Kosten | Z EUR | Z EUR | Z EUR |
| **Gesamtkosten** | D EUR | E EUR | F EUR |
| **Ergebnis** | A-D | B-E | C-F |

### Break-even-Analyse

| Kennzahl | Berechnung |
|----------|------------|
| **Break-even-Punkt** | Fixkosten / (Erlös - var. Kosten pro Einheit) |
| **Payback-Period** | Investition / jährlicher Cashflow |
| **ROI** | (Gewinn - Investition) / Investition |

### Szenarioanalyse

| Szenario | Annahmen | Break-even |
|----------|----------|------------|
| **Best Case** | Schnelle Adoption, hohe Preise | 12 Monate |
| **Base Case** | Realistische Adoption | 18 Monate |
| **Worst Case** | Langsame Adoption, Preisdruck | 30 Monate |

:::info Kernaussage
Der entscheidende Hebel ist oft **nicht der Preis**, sondern die **Skalierung über Maschinenanzahl pro Kunde**. Volumen schlägt Preisoptimierung.
:::

### Moderationsfragen

- „Welche Ziele verfolgen wir mit der Preisstrategie?"
- „Mit welchen Piloten können wir das Modell testen?"
- „Was sind No-Gos bei der Preisgestaltung?"

---

## AI-Unterstützung (Hybrides Format)

<div style={{background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid rgba(139, 92, 246, 0.2)'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.25rem'}}>🤖</span>
    <strong style={{color: '#8B5CF6', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>AI-gestützter Workshop</strong>
  </div>

Im hybriden Format kann AI bei der Wirtschaftlichkeitsanalyse unterstützen:

| Session | AI-Einsatz | Wie |
|---------|------------|-----|
| **Wertquantifizierung** | Nutzenberechnung | AI hilft bei der Quantifizierung von Einsparungen und ROI |
| **Erlösmechanik** | Modellvergleich | AI analysiert Vor-/Nachteile verschiedener Preismodelle |
| **Kostenstruktur** | Kostenidentifikation | AI identifiziert oft vergessene Kostenblöcke |
| **Business Case** | Szenario-Berechnung | AI erstellt Kalkulationen und Sensitivitätsanalysen |

### Konkrete AI-Prompts

**Wertquantifizierung:**
> „Berechne den wirtschaftlichen Wert für einen Kunden, wenn [Pain] um X% reduziert wird. Annahmen: [Ausfallkosten], [Häufigkeit], [Branche]. Zeige die Rechnung."

**Preismodell-Analyse:**
> „Vergleiche Subscription vs. Pay-per-Use vs. Outcome-Based Pricing für [Angebot]. Welches Modell passt zu [Kundentyp]? Was sind Risiken und Chancen?"

**Kostenstruktur:**
> „Welche Kostenblöcke entstehen beim Aufbau und Betrieb eines [Service]-Angebots? Unterscheide Entwicklung, Infrastruktur, Personal, Partner, Marketing. Was sind typische Größenordnungen?"

**Business Case:**
> „Erstelle einen 3-Jahres-Business-Case für [Angebot] mit: [Preis], [geschätzte Kunden Jahr 1/2/3], [Fixkosten], [variable Kosten pro Kunde]. Berechne Break-even und ROI."

:::tip Best Practice
AI kann **Kalkulationen schnell durchrechnen** und Szenarien vergleichen. Das Team liefert die Annahmen, AI rechnet und visualisiert. Besonders nützlich für Sensitivitätsanalysen.
:::

</div>

---

## Gate-Review

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', background: 'var(--ifm-background-surface-color)'}}>

<h4 style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ifm-font-color-secondary)', marginBottom: '1rem', fontWeight: '500'}}>Quality Check</h4>

##### Wertquelle & Zahlungsbereitschaft

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Ist der Wert für den Kunden quantifiziert (€ oder %)?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Ist die Zahlungsbereitschaft realistisch eingeschätzt?</span>
</label>

##### Erlösmechanik & Preismodell

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Passt die Erlösmechanik zum Kundennutzen?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Sind die Preistreiber fair und nachvollziehbar?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Ist die Preislogik einfach genug für den Vertrieb?</span>
</label>

##### Kostenstruktur

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Sind alle relevanten Kostenblöcke erfasst?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Sind externe Abhängigkeiten (Partner, SLAs) dokumentiert?</span>
</label>

##### Gesamtbewertung

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Ist ein positiver Business Case realistisch erreichbar?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Gibt es einen klaren Plan für den Piloten?</span>
</label>

</div>

---

## Ergebnisse

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem'}}>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(196, 160, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>📈</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Wertquantifizierung</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Konkrete Zahlen zum Kundennutzen</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(196, 160, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>💵</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Erlös- und Preismodell</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Dokumentierte Monetarisierungslogik</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(196, 160, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>🧮</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Kostenstruktur</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Vollständige Kostenübersicht</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(196, 160, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>🚀</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Business Case & Pilot-Plan</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Kosten-Nutzen-Zusammenfassung</p>
</div>

</div>
