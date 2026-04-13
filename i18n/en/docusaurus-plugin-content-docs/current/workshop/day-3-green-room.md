---
id: workshop_gruener_raum
title: Day 3 - Green Room
description: Define ecosystem roles and design operational value creation
sidebar_position: 5
---

<div style={{background: 'linear-gradient(135deg, rgba(107, 142, 80, 0.08) 0%, rgba(107, 142, 80, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.5rem'}}>🟢</span>
    <span style={{fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B8E50', fontWeight: '600'}}>Value Creation</span>
  </div>
  <h2 style={{margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ifm-heading-color)'}}>How do we create the value?</h2>
  <p style={{margin: 0, fontSize: '1.05rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.7', maxWidth: '640px'}}>
    Understand who contributes what in the ecosystem and how value is operationally created
  </p>
  <div style={{marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'linear-gradient(135deg, rgba(107, 142, 80, 0.12) 0%, rgba(107, 142, 80, 0.04) 100%)', borderRadius: '8px', border: '1px solid rgba(107, 142, 80, 0.2)'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
      <span style={{fontSize: '1.1rem'}}>🎯</span>
      <strong style={{color: '#6B8E50', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Daily Goal</strong>
    </div>
    <p style={{margin: 0, fontSize: '1rem', color: 'var(--ifm-font-color-secondary)', lineHeight: '1.6'}}>By the end of the day we have a <strong>roles-actors matrix, a value creation network and a documented end-to-end process</strong> - the "how" behind the value proposition.</p>
  </div>
</div>

---

## Daily Overview

| Time | Topic | Description |
|------|-------|-------------|
| 09:00 - 09:30 | Welcome & Recap | Summary Day 2, Goals Day 3 |
| 09:30 - 10:45 | Deep-Dive 1: Roles & Actors | Develop matrix, clarify own role |
| 10:45 - 11:00 | Break | |
| 11:00 - 12:30 | Deep-Dive 2: Value Creation Network | Create value network diagram |
| 12:30 - 13:30 | Lunch Break | |
| 13:30 - 15:00 | Deep-Dive 3: Value Creation Process | Process description with responsibilities |
| 15:00 - 15:15 | Break | |
| 15:15 - 16:00 | Scalability & Bottlenecks | Check growth potential |
| 16:00 - 17:00 | Gate Review & Daily Log | Quality check, save artifacts |

---

## Deep-Dive 1: Roles & Actors (09:30 - 10:45)

### Goal

Understand **who is involved** and what value contribution each makes. Important: The distinction between **role** (function) and **actor** (concrete entity).

:::info Important Distinction
**Role** = Expected tasks/functions (e.g., Data Provider)
**Actor** = Concrete entity that takes on the role (e.g., machine operator)
A company can play multiple roles!
:::

### Typical Roles in Data Ecosystem

| Role | Description | Value Contribution |
|------|-------------|-------------------|
| **Data Provider** | Provides data | Machine data, sensor data, operational data |
| **Data Consumer** | Uses data | Analytics, decisions, services |
| **Service Provider** | Offers services based on data | Analytics, alerts, recommendations |
| **Platform Operator** | Operates technical infrastructure | Hosting, scaling, availability |
| **Orchestrator** | Coordinates the ecosystem | Governance, onboarding, standards |

### Creating Actor Landscape

| Actor | Role(s) | Value Contribution | Internal/External |
|-------|---------|-------------------|-------------------|
| Operator (Customer) | Data Provider, Consumer | Machine data, usage | External |
| We (Provider) | Service Provider | Analytics, alerting | Internal |
| Cloud Provider | Infrastructure | Hosting, scaling | External |
| Data Space Operator | Orchestrator | Governance, IAM | External |

### Clarifying Own Role

Explicitly clarify: **Which role(s) do we take on?**

- [ ] Data Provider - We provide data
- [ ] Data Consumer - We use data from others
- [ ] Service Provider - We offer services
- [ ] Platform Operator - We operate the platform
- [ ] Orchestrator - We coordinate the ecosystem

### Facilitation Questions

- "Who plays which role in the ecosystem?"
- "Are there actors with multiple roles?"
- "What contribution does each actor make?"
- "Which role(s) do we take on ourselves?"

---

## Deep-Dive 2: Value Creation Network (11:00 - 12:30)

### Goal

Describe **how goods, services, data and money flow between actors**.

### The Four Flow Types

| Flow Type | Color | Description | Examples |
|-----------|-------|-------------|----------|
| **Goods** | Black | Physical products | Machine maintenance, spare parts |
| **Services** | Blue | Digital services | Software updates, reports |
| **Data** | Green | Raw data, insights | Sensor data, analytics |
| **Financial** | Orange | Payment flows | Subscription, pay-per-use |

### Approach (90 Min)

1. **Position Actors** (15 Min): All actors on whiteboard/Miro
2. **Draw Goods Flows** (15 Min): Black arrows
3. **Draw Service Flows** (15 Min): Blue arrows
4. **Draw Data Flows** (20 Min): Green arrows with conditions
5. **Draw Financial Flows** (15 Min): Orange arrows
6. **Review & Gaps** (10 Min): Missing flows? Dependencies?

### Facilitation Questions

- "Where does which data flow?"
- "Who pays whom for what?"
- "What dependencies exist?"
- "Where are critical handovers?"

---

## Deep-Dive 3: Value Creation Process (13:30 - 15:00)

### Goal

Put everything into a **chronological order**: What happens when a customer uses our offering?

### End-to-End Process

| Phase | Activities | Responsible |
|-------|------------|-------------|
| **1. Onboarding** | Contract, setup, integration | Sales, IT |
| **2. Data Connection** | Sensors, interfaces, connectors | IT, OT |
| **3. Monitoring** | Ongoing data capture | Automated |
| **4. Analysis** | Anomaly detection, analytics | Service Provider |
| **5. Alerting** | Warnings, notifications | Automated |
| **6. Service Execution** | Maintenance, repair, support | Maintenance |
| **7. Reporting** | KPI reports, value proofs | Controlling |
| **8. Optimization** | Improve models | Data Science |

### Clarifying Process Responsibility (RACI)

| Step | With Us | With Customer | With Partners |
|------|---------|---------------|---------------|
| Setup | Configuration | Hardware access | Cloud setup |
| Data Flow | API integration | Data release | Connector |
| Analytics | Models, algorithms | - | Infrastructure |
| Support | L2/L3 support | L1 support | - |

### Facilitation Questions

- "Which steps are mandatory for the VP?"
- "Where are critical handovers?"
- "What happens if there's an error in step X?"

---

## Scalability & Bottlenecks (15:15 - 16:00)

### Scaling Questions

| Dimension | Questions |
|-----------|-----------|
| **Technical** | Does the infrastructure scale? Cloud-native? |
| **Organizational** | Can processes be standardized? |
| **Partners** | Can partners be replicated? |
| **Costs** | How do costs develop with growth? |

### Typical Bottlenecks

| Bottleneck | Description | Mitigation |
|------------|-------------|------------|
| Support | Customer count exceeds capacity | Self-service, automation |
| Integration | Every customer is a special case | Standardization |
| Data Quality | Heterogeneous data sources | Validation, normalization |
| Partners | Dependency on individuals | Redundancy, standards |

---

## AI Support (Hybrid Format)

<div style={{background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 100%)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid rgba(139, 92, 246, 0.2)'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
    <span style={{fontSize: '1.25rem'}}>🤖</span>
    <strong style={{color: '#8B5CF6', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>AI-Assisted Workshop</strong>
  </div>

In the hybrid format, AI can support value creation design:

| Session | AI Use | How |
|---------|--------|-----|
| **Roles & Actors** | Ecosystem Mapping | AI identifies typical roles and actors for the use case |
| **Value Creation Network** | Flow Analysis | AI suggests data, goods and financial flows |
| **Value Creation Process** | Process Description | AI generates end-to-end processes as discussion basis |
| **Scalability** | Bottleneck Identification | AI analyzes potential scaling problems |

### Specific AI Prompts

**Roles & Actors:**
> "What typical roles and actors exist in a [data space/platform] ecosystem for [use case]? Distinguish Data Provider, Consumer, Service Provider, Platform Operator, Orchestrator."

**Value Creation Network:**
> "Describe the value flows between [Actor 1], [Actor 2] and [Actor 3] for [use case]. What data, services, goods and payments flow between actors?"

**Process Description:**
> "Create an end-to-end process for [service] from customer request to ongoing operation. What phases are there? Who is responsible in each?"

**Scaling Analysis:**
> "What typical bottlenecks occur when an [offering] scales from 5 to 50 customers? How can these be addressed?"

:::tip Best Practice
AI can describe complex **process diagrams as text** and later transfer to BPMN or Miro. Use AI for the first draft, the team refines.
:::

</div>

---

## Gate Review

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', background: 'var(--ifm-background-surface-color)'}}>

<h4 style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ifm-font-color-secondary)', marginBottom: '1rem', fontWeight: '500'}}>Quality Check</h4>

##### Roles & Actors

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Are all relevant actors in the ecosystem identified?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Are the roles clearly defined and distinguished from each other?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Is it clear what contribution each actor makes?</span>
</label>

##### Value Creation Network

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Are all four flows (Goods, Services, Data, Financial) documented?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Are the data flows provided with conditions (when, how)?</span>
</label>

##### Value Creation Process

<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Does the process cover the entire path from data creation to customer benefit?</span>
</label>
<label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer'}}>
  <input type="checkbox" style={{marginTop: '0.25rem', width: '16px', height: '16px'}} />
  <span style={{color: 'var(--ifm-font-color-base)'}}>Are critical handovers/interfaces identified?</span>
</label>

</div>

---

## Results

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem'}}>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(107, 142, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>👥</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Roles & Actors Matrix</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Complete overview of all actors and roles</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(107, 142, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>🔀</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Value Creation Network</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Visualization of all flows between actors</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(107, 142, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>📐</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Value Creation Process</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>BPMN-based process description</p>
</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.25rem', background: 'var(--ifm-background-surface-color)'}}>
  <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(107, 142, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem'}}>
    <span style={{fontSize: '1rem'}}>⚠️</span>
  </div>
  <h4 style={{margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600'}}>Interface Documentation</h4>
  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)'}}>Critical handovers and risks</p>
</div>

</div>
