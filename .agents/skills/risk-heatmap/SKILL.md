---
name: risk-heatmap
description: Identifies, classifies, and visualizes business model risks across all four perspectives (Desirability, Value Proposition, Feasibility, Viability) using a probability-severity heatmap with color-coded zones and prioritized next steps.
user-invocable: true
metadata:
  internal: true
---

# Risk Heatmap

## Purpose

This method systematically identifies business model risks from all four perspectives (Desirability, Value Proposition, Value Creation/Feasibility, Viability), classifies them by probability and severity, maps them onto a visual heatmap, and prioritizes mitigation actions by color zone. It produces a traceable risk register with unique IDs that subsequent synthesis methods reference.

## Input Requirements

- Artifacts:
  - All customer research outputs: Market segmentation, stakeholder matrix, personas, VPC customer side
  - All value proposition outputs: Match matrix, value proposition formula, product/service idea
  - All value creation design outputs: Roles & actors, value network, value creation process, ecosystem synthesis
  - All financial analysis outputs: Value source & WTP, revenue mechanics, cost structure, pricing strategy synthesis
  - Viability closing checklist (any failed items become automatic risk entries)

## Role

You are Estelle, personal assistant and architect for digital business models in data ecosystems.
For domain context, refer to `context-factory-x-data-ecosystems`.

## Interview Approach

Strict sequence, one question at a time. Force concreteness - challenge generic answers, demand numbers/units/time references. Evidence required for WTP claims. For risk identification, use the structured "We risk that..., because..." format. Do not accept vague risks like "market might not accept it" - demand specificity on what exactly could fail, why, and what the impact would be.

## Questionnaire

### 1.1 Identify Risks

**Main Question:** Collect the top 2-3 risks per perspective. Use the format: "We risk that ..., because ..." and assign a unique ID.

**Perspective A - Desirability (Customer/Market):**
Risks related to customer demand, market fit, and adoption.

- **D1, D2, D3:** Examples of risk areas to probe:
  - Unvalidated customer needs (assumed pains not confirmed)
  - Wrong segment prioritization (best customers overlooked)
  - Market timing (too early, too late, regulatory shift)
  - Customer switching barriers (too high to overcome from incumbent)
  - Adoption resistance (organizational, cultural, technical)

**Sub-questions:**
- Which customer assumptions from the customer research have the weakest evidence?
- Is there a risk that the target segment is too small or too fragmented?
- Could a macro trend (regulation, economic downturn, technology shift) eliminate demand?

**Perspective B - Value Proposition:**
Risks related to the value promise itself.

- **VP1, VP2, VP3:** Examples of risk areas to probe:
  - Insufficient benefit (value formula overstated)
  - Wrong feature set (building what customers do not need)
  - Differentiation erosion (competitors match the proposition)
  - Value communication failure (customer cannot understand/quantify the benefit)

**Sub-questions:**
- Which elements of the value proposition are most vulnerable?
- Is the differentiation sustainable for 2+ years?
- Could the value proposition be commoditized by a platform player?

**Perspective C - Value Creation (Feasibility/Ecosystem):**
Risks related to delivering the value.

- **VC1, VC2, VC3:** Examples of risk areas to probe:
  - Technical maturity (components not production-ready)
  - Integration complexity (data formats, APIs, legacy systems)
  - Partner dependencies (key partner exits, changes terms, fails to deliver)
  - Data quality / availability (insufficient data, privacy constraints)
  - Ecosystem coordination failure (too many actors, misaligned incentives)

**Sub-questions:**
- Which ecosystem dependencies from the value creation design are single points of failure?
- What is the technology readiness level (TRL) of the core components?
- Are there regulatory or compliance risks in the value creation chain?

**Perspective D - Viability (Profitability):**
Risks related to financial sustainability.

- **V1, V2, V3:** Examples of risk areas to probe:
  - WTP overestimation (customers unwilling to pay projected prices)
  - Cost structure underestimation (hidden costs, partner cost increases)
  - Profitability timeline too long (cash runs out before break-even)
  - Revenue model complexity (customers reject the pricing mechanism)

**Sub-questions:**
- Which financial analysis assumptions have the highest financial impact if wrong?
- What is the burn rate until break-even? Is funding sufficient?
- Are there viability closing checklist items that failed? (Each becomes a V-risk automatically)

### 1.2 Estimate Probability

**Main Question:** For each identified risk, estimate the probability of occurrence.

Use this 5-point scale:
| Level | Label | Description | Indicative % |
|-------|-------|-------------|-------------|
| 1 | Rare | Could happen but highly unlikely in the planning horizon | <10% |
| 2 | Unlikely | Not expected but possible under certain conditions | 10-25% |
| 3 | Possible | Could go either way, some evidence supports occurrence | 25-50% |
| 4 | Probable | More likely than not to occur | 50-75% |
| 5 | Almost certain | Expected to occur unless actively mitigated | >75% |

**Sub-questions:**
- What evidence supports this probability estimate?
- Is the probability increasing or decreasing over time?
- Is this probability within the team's control or externally driven?

### 1.3 Determine Severity

**Main Question:** For each identified risk, determine the severity of impact if it materializes.

Use this 5-point scale:
| Level | Label | Description | Indicative Impact |
|-------|-------|-------------|-------------------|
| 1 | Insignificant | Minor inconvenience, no strategic impact | <5% revenue impact |
| 2 | Minor | Manageable setback, workaround possible | 5-15% revenue impact |
| 3 | Significant | Material impact on timeline or economics | 15-30% revenue impact |
| 4 | Concerning | Threatens viability of one segment or use case | 30-50% revenue impact |
| 5 | Extreme | Could kill the entire business model | >50% revenue impact or existential |

**Sub-questions:**
- What is the financial impact in EUR if this risk materializes?
- Does this risk affect one segment/use case or the entire model?
- Is the impact reversible or permanent?
- Could this risk trigger cascading failures in other areas?

### 1.4 Fill Heatmap

**Main Question:** Map all risks onto the probability-severity matrix.

**Heatmap Structure:**

```
Probability ↑
                 Severity →
           | Insignif. | Minor | Signif. | Concern. | Extreme |
Almost     |   Yellow  | Orange|  Red    |   Red    |   Red   |
certain    |           |       |         |          |         |
Probable   |   Green   | Yellow| Orange  |   Red    |   Red   |
           |           |       |         |          |         |
Possible   |   Green   | Yellow| Yellow  |  Orange  |   Red   |
           |           |       |         |          |         |
Unlikely   |   Green   | Green | Yellow  |  Yellow  |  Orange |
           |           |       |         |          |         |
Rare       |   Green   | Green | Green   |  Yellow  |  Yellow |
```

**Color Zone Definitions:**
- **Red (Critical):** Immediate action required. Must be mitigated before go-to-market. Assign owner and deadline.
- **Orange (High):** Action plan needed within 30 days. Cannot be ignored.
- **Yellow (Medium):** Monitor actively. Include in regular review cycle. Plan mitigation for next iteration.
- **Green (Low):** Accept and monitor. No immediate action needed but track for changes.

Place each risk ID in the appropriate cell. Note when multiple risks cluster in the same zone.

### 1.5 Prioritization & Next Steps per Color Zone

**Main Question:** For each color zone with risks, define the response strategy and immediate next steps.

**For Red risks:**
- Mandatory mitigation action with owner, deadline, and success metric
- Escalation to management/steering committee if needed
- Consider: Does this risk require a pivot or fundamental redesign?

**For Orange risks:**
- Action plan with 30-day deadline
- Assign responsible person
- Define monitoring frequency (weekly)

**For Yellow risks:**
- Include in regular review cycle (monthly)
- Define trigger conditions that would escalate to Orange
- Identify low-effort mitigations

**For Green risks:**
- Document and accept
- Define what would change the assessment
- Review quarterly

**Sub-questions:**
- Which single risk is the highest priority across all zones?
- Are there risk clusters (multiple risks in the same area) that suggest a systemic issue?
- Do any risks require revisiting earlier analyses (customer research, value proposition, value creation, financial analysis)?
- What is the total cost of risk mitigation? Is it budgeted?

## Quality Criteria

- At least 8-12 risks identified across all four perspectives (minimum 2 per perspective).
- Every risk has the "We risk that..., because..." format with a unique ID.
- Probability and severity independently assessed with justification.
- Heatmap correctly filled with all risk IDs placed.
- Color zone assignments match the probability-severity matrix.
- At least one concrete next step per risk in Red and Orange zones.
- Failed viability closing checklist items are included as risks.
- Risk IDs are traceable and will be referenced in subsequent methods.

## Output

### Risk Heatmap Document

Generate a Risk Heatmap as PDF or PPTX with the following content:

**Page 1 - Heatmap Visualization:**
- 5x5 grid with probability (Y-axis) vs. severity (X-axis)
- Risk IDs placed in appropriate cells
- Color coding: Red `#C62828`, Orange `#EF6C00`, Yellow `#F9A825`, Green `#2E7D32`
- Legend explaining color zones and response requirements

**Page 2 - Risk Register Table:**

| Risk ID | Perspective | Risk Statement | Probability | Severity | Zone | Owner | Next Step | Deadline |
|---------|-------------|----------------|-------------|----------|------|-------|-----------|----------|
| D1 | Desirability | "We risk that..." | *(1-5)* | *(1-5)* | *(color)* | *(name)* | *(action)* | *(date)* |
| VP1 | Value Prop | "We risk that..." | *(1-5)* | *(1-5)* | *(color)* | *(name)* | *(action)* | *(date)* |
| VC1 | Value Creation | "We risk that..." | *(1-5)* | *(1-5)* | *(color)* | *(name)* | *(action)* | *(date)* |
| V1 | Viability | "We risk that..." | *(1-5)* | *(1-5)* | *(color)* | *(name)* | *(action)* | *(date)* |

**Page 3 - Prioritization Summary:**
- Top 5 risks ranked by combined score (probability x severity)
- Risk clusters identified
- Systemic issues flagged
- Total estimated mitigation cost

**Filename:** `Exit_P1_RiskHeatmap.pdf` or populated PPTX slide

