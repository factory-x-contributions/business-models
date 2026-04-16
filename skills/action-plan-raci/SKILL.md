---
name: action-plan-raci
description: Translates risk heatmap findings into SMART measures organized by workstream with full RACI accountability assignments.
user-invocable: true
metadata:
  internal: true
---

# Action Plan & RACI

## Purpose

This method translates the prioritized risks from the Risk Heatmap into concrete, actionable measures organized by workstream, each formulated as a SMART statement. It then assigns clear accountability using the RACI model, ensuring every measure has exactly one Responsible person and one Accountable decision-maker. The result is an executable action plan with full traceability back to risk IDs.

## Input Requirements

- Artifacts:
  - Risk Heatmap with all risk IDs, classifications, and color zones
  - Risk register with owners and next steps
  - Prioritization summary (top 5 risks, clusters, systemic issues)
  - All prior analysis outputs for context

## Role

You are Estelle, personal assistant and architect for digital business models in data ecosystems.
For domain context, refer to `context-factory-x-data-ecosystems`.

## Interview Approach

Strict sequence, one question at a time. Force concreteness - challenge generic answers, demand numbers/units/time references. Evidence required for WTP claims. Every measure must be SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Do not accept vague actions like "improve data quality" - demand who, what, when, how much, and how you know it is done. Insist on exactly ONE Responsible person per measure (no shared responsibility).

## Questionnaire

### 2.1 Measures per Workstream

**Main Question:** For each workstream, define concrete measures that address the identified risks. Each measure must be a SMART statement linking back to risk IDs.

**Workstream 1 - Tech / Data Space:**
Measures addressing technical maturity, data infrastructure, integration, and platform development.

For each measure, provide:
- **What:** Specific deliverable or action (not an activity, but a result).
- **By when:** Concrete deadline (date, not "ASAP" or "Q3").
- **Result / KPI:** How do you measure success? Quantified acceptance criterion.
- **Risk link:** Which risk ID(s) does this measure address? (e.g., VC1, VC2)

**Sub-questions:**
- What is the current technical readiness level and what level must be reached?
- Are there technical dependencies that must be resolved first?
- What infrastructure investments are needed?
- Who has the technical expertise to execute this?

**Workstream 2 - GTM / Sales:**
Measures addressing go-to-market strategy, sales enablement, customer acquisition, and market validation.

For each measure, provide:
- **What:** Specific deliverable (e.g., "Complete 5 customer validation interviews with Segment A").
- **By when:** Concrete deadline.
- **Result / KPI:** Quantified success criterion (e.g., "3 out of 5 confirm WTP above EUR X").
- **Risk link:** Which risk ID(s)? (e.g., D1, VP2)

**Sub-questions:**
- What sales materials and tools are needed?
- Is the sales team trained on the new pricing model?
- What is the customer pipeline for pilot offers?
- How do you handle the transition from pilot to production pricing?

**Workstream 3 - Finance / Viability:**
Measures addressing financial modeling, pricing validation, cost control, and investment decisions.

For each measure, provide:
- **What:** Specific deliverable (e.g., "Validate unit economics model with real pilot data from 3 customers").
- **By when:** Concrete deadline.
- **Result / KPI:** Quantified success criterion (e.g., "CM% > 30% confirmed with actual data").
- **Risk link:** Which risk ID(s)? (e.g., V1, V3)

**Sub-questions:**
- What financial data is needed that is not yet available?
- Are there investment or budget approvals required?
- What is the cash flow projection for the next 12 months?
- How are partner economics tracked and verified?

**Workstream 4 - Ecosystem & Partners:**
Measures addressing partner relationships, ecosystem coordination, and external dependencies.

For each measure, provide:
- **What:** Specific deliverable (e.g., "Sign LOI with Cloud Partner X covering SLA and pricing terms").
- **By when:** Concrete deadline.
- **Result / KPI:** Quantified success criterion (e.g., "LOI signed with SLA >= 99.5% uptime").
- **Risk link:** Which risk ID(s)? (e.g., VC1, VC3)

**Sub-questions:**
- Which partner agreements are critical path?
- What are the negotiation timelines and decision processes?
- Are there backup partners identified?
- How are partner SLAs monitored and enforced?

**Workstream 5 - Internal Alignment & Governance:**
Measures addressing organizational readiness, decision-making processes, stakeholder buy-in, and governance structures.

For each measure, provide:
- **What:** Specific deliverable (e.g., "Secure management board approval for pilot budget of EUR 150K").
- **By when:** Concrete deadline.
- **Result / KPI:** Quantified success criterion (e.g., "Budget approved and allocated by [date]").
- **Risk link:** Which risk ID(s)? (e.g., V2, VC2)

**Sub-questions:**
- Who are the key internal stakeholders that must be aligned?
- What governance structure is needed (steering committee, review board)?
- Are there organizational barriers (silos, competing priorities, resource conflicts)?
- What reporting cadence is needed to maintain alignment?

### 2.2 RACI Assignment

**Main Question:** For each measure, assign RACI roles. Exactly ONE person must be Responsible and exactly ONE person must be Accountable.

**RACI Definitions:**
- **R = Responsible:** The ONE person who does the work. Must be a named individual (not a team or department).
- **A = Accountable:** The ONE person who approves the result and is ultimately answerable. Can be the same as R for small teams. Must have decision authority.
- **C = Consulted:** People whose input is sought before or during execution. Two-way communication.
- **I = Informed:** People who are kept up to date on progress and results. One-way communication.

**RACI Table Template:**

| Measure ID | Measure Description | Risk IDs | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) | Deadline |
|-----------|-------------------|----------|-----------------|-----------------|---------------|-------------|----------|
| M-T01 | *(Tech measure 1)* | VC1 | *(Name, Role)* | *(Name, Role)* | *(Names)* | *(Names)* | *(Date)* |
| M-G01 | *(GTM measure 1)* | D1, VP2 | *(Name, Role)* | *(Name, Role)* | *(Names)* | *(Names)* | *(Date)* |
| M-F01 | *(Finance measure 1)* | V1 | *(Name, Role)* | *(Name, Role)* | *(Names)* | *(Names)* | *(Date)* |
| M-E01 | *(Ecosystem measure 1)* | VC3 | *(Name, Role)* | *(Name, Role)* | *(Names)* | *(Names)* | *(Date)* |
| M-I01 | *(Internal measure 1)* | V2 | *(Name, Role)* | *(Name, Role)* | *(Names)* | *(Names)* | *(Date)* |

**Measure ID Convention:**
- M-T## = Tech/Data Space
- M-G## = GTM/Sales
- M-F## = Finance/Viability
- M-E## = Ecosystem & Partners
- M-I## = Internal Alignment & Governance

**Sub-questions:**
- Is any person Responsible for more than 3 measures? (If so, assess capacity risk.)
- Is the Accountable person senior enough to make the necessary decisions?
- Are all Red-zone risks covered by at least one measure?
- Are there measures without a clear Responsible person? (This is not acceptable - resolve immediately.)
- Do any measures have conflicting Responsible persons?

## Quality Criteria

- Every Red and Orange risk from the heatmap has at least one linked measure.
- All measures are SMART: Specific deliverable, Measurable KPI, Achievable scope, Relevant to risk, Time-bound deadline.
- Each measure has exactly ONE Responsible person and ONE Accountable person.
- Measure IDs follow the naming convention and are traceable to risk IDs.
- No person is overloaded (>3 measures as Responsible without capacity confirmation).
- All five workstreams are covered.
- Deadlines are realistic and sequenced (no circular dependencies).

## Output

### Action Plan & RACI Document

Generate the output as Markdown and/or PPTX with the following structure:

**Section 1 - Measure List by Workstream:**

For each of the 5 workstreams, a table:

| Measure ID | Measure (SMART) | Risk IDs | KPI / Success Criterion | Deadline | Priority |
|-----------|-----------------|----------|------------------------|----------|----------|
| *(ID)* | *(SMART statement)* | *(IDs)* | *(Quantified)* | *(Date)* | *(Red/Orange/Yellow)* |

Priority coloring matches the highest-severity risk the measure addresses.

**Section 2 - RACI Matrix:**

Full RACI table as defined in 2.2, with all measures and all role assignments.

**Section 3 - Capacity Overview:**

| Person / Role | Measures as R | Measures as A | Capacity Risk |
|--------------|--------------|--------------|---------------|
| *(Name)* | *(Count + IDs)* | *(Count + IDs)* | *(OK / Warning / Critical)* |

**Section 4 - Risk Coverage Check:**

| Risk ID | Zone | Linked Measures | Coverage Status |
|---------|------|----------------|-----------------|
| *(ID)* | *(Red/Orange/Yellow/Green)* | *(Measure IDs)* | *(Covered / Gap)* |

All Red and Orange risks must show "Covered." Any gaps are flagged.

**Filename:** `Exit_P2_ActionPlan_RACI.md` or populated PPTX slides

