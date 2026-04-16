---
name: cost-structure-analysis
description: Maps the complete cost structure across value creation steps including fixed/variable, one-time/recurring, partner costs, scalability analysis, and controllability measures.
user-invocable: true
metadata:
  internal: true
---

# Cost Structure Analysis

## Purpose

This method maps every cost block across the entire value creation lifecycle - from customer onboarding through operations to billing. It separates fixed from variable, one-time from recurring, and own costs from partner costs, then stress-tests scalability and controllability. The result ensures the revenue model from the pricing analysis is backed by a realistic, complete cost picture.

## Input Requirements

- Artifacts:
  - Revenue model and pricing patterns from the revenue mechanics analysis
  - Unit economics simulation with contribution margin
  - Value creation process and ecosystem roles (from value creation design)
  - Value network with data/goods/finance flows (from value creation design)

## Role

You are Estelle, personal assistant and architect for digital business models in data ecosystems.
For domain context, refer to `context-factory-x-data-ecosystems`.

## Interview Approach

Strict sequence, one question at a time. Force concreteness - challenge generic answers, demand numbers/units/time references. Evidence required for WTP claims. Do not accept cost estimates without specifying the unit, frequency, and driver. Challenge "included in overhead" answers - every cost must be allocated. Push for transparency on partner cost structures and SLA conditions.

## Questionnaire

### 3.1 Value Creation Steps

**Main Question:** List all value creation steps from first customer contact to ongoing operations and identify the cost blocks in each.

Map costs across these standard lifecycle steps:
- **Onboarding:** Customer setup, configuration, data migration, API integration, initial training. What does it cost to make one new customer operational?
- **Operations:** Running the service/platform, data processing, compute, storage, monitoring. What does it cost per customer per month to keep the lights on?
- **Support:** Helpdesk, incident management, customer success, SLA management. Cost per customer per tier.
- **Spare parts / consumables:** Physical components, sensor replacements, hardware refresh cycles. Cost per unit per year.
- **Data / cloud infrastructure:** Cloud compute, storage, data transfer, third-party data licenses, API calls. Cost per customer or per transaction.
- **Billing & administration:** Invoicing, payment processing, contract management, compliance. Cost per customer per period.
- **Partner costs:** Payments to ecosystem partners for their contributions. Cost per partner per period or per transaction.

**Sub-questions:**
- Which step is the most cost-intensive?
- Which steps have costs that are not yet well understood or estimated?
- Are there steps that could be eliminated or automated?
- Which steps are performed by partners vs. in-house?

### 3.2 Fixed vs. Variable Costs

**Main Question:** For each cost block identified in 3.1, classify as fixed or variable and identify the cost driver.

**Fixed costs** (do not change with number of customers/usage):
- Platform development & maintenance
- Core team salaries
- Licenses and base infrastructure
- Office/overhead

**Variable costs** (scale with customers, usage, or transactions):
- Cloud compute per query/transaction
- Support tickets per customer
- Partner revenue shares per transaction
- Data transfer per GB

For each cost block, specify:
- Classification: Fixed / Variable / Semi-variable (step-fixed)
- Cost driver: What causes this cost to change? (number of customers, transactions, data volume, support tickets)
- Unit cost: EUR per driver unit
- Expected range: Low / typical / high volume scenarios

**Sub-questions:**
- What percentage of total costs is fixed vs. variable at current scale?
- How does the fixed/variable ratio change at 10x scale?
- Are there semi-variable costs that are fixed up to a threshold and then jump? (e.g., need additional server cluster at 500 customers)
- Which variable costs have the steepest scaling curve?

### 3.3 One-time vs. Recurring Costs

**Main Question:** Separate one-time rollout/integration/training costs from ongoing lifecycle costs.

**One-time costs** (occur once per customer or once for the business):
- **Rollout / deployment:** Installation, configuration, go-live support. EUR per customer.
- **Integration:** API development, system integration, data pipeline setup. EUR per customer or per integration type.
- **Training:** Initial user training, admin training, certification. EUR per session or per user.
- **Development (platform):** One-time feature development, MVP build. Total EUR (amortized over expected customer base).

**Recurring costs** (repeat periodically):
- **Operations:** Monthly/annual run costs. EUR per customer per period.
- **Maintenance:** Updates, patches, security. EUR per period.
- **License renewals:** Third-party software, data sources. EUR per period.
- **Partner payments:** Ongoing revenue shares, service fees. EUR per period or per transaction.

**Sub-questions:**
- What is the total one-time cost to acquire and onboard a new customer (Customer Acquisition Cost - fully loaded)?
- How long until one-time costs are recovered through recurring revenue (payback period)?
- Are there hidden one-time costs that recur (e.g., annual recertification, periodic hardware refresh)?
- Which one-time costs can be charged to the customer vs. absorbed by the provider?

### 3.4 Partner Costs & Cost Sharing

**Main Question:** Who bears which costs in the ecosystem, and under what conditions?

For each ecosystem partner (from the roles mapping):
- **Partner name / role:** (e.g., "Cloud Provider," "Sensor OEM," "System Integrator")
- **Cost type:** What do we pay them for?
- **Cost structure:** Fixed fee, per-transaction, revenue share, cost-plus, hybrid.
- **SLA / conditions:** What service levels are contractually guaranteed? Penalties for non-performance.
- **Pass-through vs. absorbed:** Which partner costs are passed to the customer, which are absorbed?
- **Negotiation status:** Contracted, in negotiation, estimated.

**Sub-questions:**
- Which partner has the most significant cost impact?
- Are partner costs locked in (contracted) or volatile (market-based)?
- What happens if a key partner increases prices by 20%?
- Are there alternative partners that could reduce costs?
- Is there a risk of a partner becoming a competitor?

### 3.5 Cost Models per Segment / Use Case

**Main Question:** Build a complete cost model for each segment and use case, showing per-unit and per-contract costs including scaling effects.

For each segment/use case combination:
- **Per-unit cost:** Total cost to serve one unit of the price base (e.g., one machine-hour, one part, one outcome event).
- **Per-contract cost:** Total cost to serve one customer contract per period (monthly/annually), including all fixed allocations.
- **Scaling effects:** How does per-unit and per-contract cost change at 1 / 10 / 50 / 100 / 500 customers?

**Sub-questions:**
- Which segment/use case has the lowest cost to serve?
- Which has the highest margin potential (considering both revenue and cost)?
- Are there segments where the cost to serve exceeds realistic pricing?
- What is the minimum contract size that is economically viable?

### 3.6 Scalability Assessment

**Main Question:** Where are the limits - where does technical scaling diverge from economic scaling?

**Technical scalability:**
- Can the platform/service handle 10x / 100x current load?
- What are the technical bottlenecks? (compute, storage, data throughput, API limits)
- What investments are needed to remove bottlenecks?

**Economic scalability:**
- Do unit costs decrease with scale (economies of scale)?
- At what point do diminishing returns set in?
- Are there diseconomies of scale? (complexity, support burden, customization demands)

**Thresholds and bottlenecks:**
- At what customer count do you need to hire additional staff? (Step functions in cost)
- At what volume do you need infrastructure upgrades?
- What is the maximum number of customers the current team can support?

**Learning curves:**
- How do onboarding costs decrease with experience? (Customer 1 vs. customer 20)
- How does support cost per customer decrease over time?
- What efficiency gains are expected and by when?

**Sub-questions:**
- What is the single biggest barrier to scaling the cost structure?
- Is the cost structure designed for a venture/startup approach (invest now, profit later) or must it be profitable from customer 1?
- What happens to unit economics at 10x scale? Better or worse?

### 3.7 Controllability

**Main Question:** How do you measure, monitor, and control costs in practice?

- **Measurement points:** Where and how often are costs measured? (real-time, monthly, quarterly)
- **Responsible parties:** Who owns each cost block? (Name/role, not "the team")
- **Budget logic:** How are budgets set and reviewed? (Top-down, bottom-up, zero-based)
- **Cost tracking:** What tools/systems are used to track costs? (ERP, spreadsheets, cloud cost dashboards)
- **Variance management:** What happens when actual costs exceed budget? (Escalation process, decision rights)

**Sub-questions:**
- Which cost blocks are currently not measured or only estimated?
- What is the biggest source of cost surprises today?
- How quickly can you detect a cost overrun? (Days, weeks, months?)
- Are partner costs transparent or opaque?
- What cost governance structure exists or needs to be built?

## Quality Criteria

- Every value creation step has identified cost blocks with EUR amounts.
- Fixed/variable classification is complete with cost drivers specified.
- One-time/recurring separation is clear with payback periods calculated.
- Partner costs are documented with SLA conditions and negotiation status.
- Cost models exist per segment/use case with scaling scenarios.
- Technical vs. economic scalability is assessed with thresholds identified.
- Controllability measures are defined with responsible parties named.
- All estimates are marked with confidence levels.

## Output

### PPTX Template Check

Check if a file matching `Template*.pptx` is attached or available in the working directory.

**If PPTX template is found:**
Use the slide titled **"3) Cost Structure"** and populate accordingly.

**If no PPTX template is found (PDF fallback):**

Generate a PDF document with the following specifications:
- **Format:** A4 landscape orientation
- **Title:** "Cost Structure Analysis"
- **Subtitle:** Business model name, date, version

**Block A - Lifecycle Cost Table** (6 columns):

| Value Creation Step | Cost Block | Fixed / Variable | One-time / Recurring | EUR Amount (per unit / per period) | Cost Driver & Scaling |
|--------------------|-----------|-----------------|---------------------|-----------------------------------|----------------------|
| Onboarding | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |
| Operations | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |
| Support | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |
| Data/Cloud | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |
| Partners | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |
| Billing/Admin | *(detail)* | *(F/V/SV)* | *(OT/R)* | *(EUR)* | *(driver)* |

**Block B - Fixed/Variable 2x2 Matrix:**

A 2x2 matrix visualization:
- Y-axis: One-time vs. Recurring
- X-axis: Fixed vs. Variable
- Each quadrant lists the relevant cost blocks with EUR amounts
- Quadrant shading: darker = higher total cost

**Block C - Risks & Control:**

| Risk / Open Point | Impact (EUR) | Likelihood | Mitigation | Owner |
|-------------------|-------------|------------|------------|-------|
| *(per risk)* | *(EUR)* | *(H/M/L)* | *(action)* | *(name/role)* |

**Filename:** `Yellow_P3_CostStructure.pdf`

