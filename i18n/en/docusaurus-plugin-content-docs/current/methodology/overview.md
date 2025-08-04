---
id: overview
title: Introduction to House-Building Logic
description: A structured approach to developing data-driven business models in an industrial context
sidebar_position: 1
---

import GradientButton from '@site/src/components/buttons/GradientButton';

## What is the House-Building Logic?

The **House-Building Logic (HBL)** is a structured approach to developing data-driven business models – specifically designed for industrial contexts such as mechanical and plant engineering.

Classic frameworks like the Business Model Canvas are often too abstract: They show which building blocks a business model has, but not how to develop them. Teams face an empty canvas and don't know where to start. The HBL solves this problem by providing a **clear process with concrete methods**.

### Why a House?

The framework uses the metaphor of a **house** because it's intuitively understandable:

- **You enter the house through the entrance** – here you clarify the initial situation and define your business idea
- **You pass through different rooms** – each room addresses a central question of your business model
- **You exit the house through the exit** – with a completed, validated business model

The rooms are color-coded and are traversed in a fixed sequence. Each room builds on the results of the previous one – creating a consistent overall picture.

---

## Overview of the Rooms

Click on a room to see the details:

{/* House Visualization - Modern with Details */}
<div style={{ width: '100%', maxWidth: '480px', marginTop: '1.5rem', marginBottom: '2rem' }}>

  {/* Roof with SVG */}
  <svg viewBox="0 0 200 50" style={{ width: '100%', height: 'auto', display: 'block' }}>
    {/* Chimney */}
    <rect x="145" y="5" width="12" height="20" fill="var(--ifm-color-emphasis-500)" rx="2" />
    {/* Smoke */}
    <text x="148" y="4" fontSize="8" fill="var(--ifm-color-emphasis-400)">~</text>
    {/* Roof Outline */}
    <polygon points="100,8 195,48 5,48" fill="none" stroke="var(--ifm-color-emphasis-500)" strokeWidth="3" strokeLinejoin="round" />
    {/* Skylight */}
    <ellipse cx="100" cy="35" rx="12" ry="8" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-500)" strokeWidth="2" />
  </svg>

  {/* House Frame */}
  <div style={{
    border: '3px solid var(--ifm-color-emphasis-500)',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    background: 'var(--ifm-background-surface-color)',
    padding: '1rem'
  }}>

    {/* Upper Floor Label */}
    <div style={{
      fontSize: '11px',
      color: 'var(--ifm-color-emphasis-600)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '0.5rem',
      paddingLeft: '0.25rem'
    }}>Rooms</div>

    {/* Rooms - 2x2 Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem',
      marginBottom: '1rem',
      padding: '0.75rem',
      background: 'var(--ifm-color-emphasis-100)',
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-300)'
    }}>
      <GradientButton
        href='./blue-room'
        text="Blue Room"
        gradient="linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
        shadowColor="rgba(59, 130, 246, 0.15)"
        shadowColorHover="rgba(59, 130, 246, 0.3)"
        external={false}
        minWidth="auto"
      />
      <GradientButton
        href='./red-room'
        text="Red Room"
        gradient="linear-gradient(135deg, #f87171 0%, #ef4444 100%)"
        shadowColor="rgba(239, 68, 68, 0.15)"
        shadowColorHover="rgba(239, 68, 68, 0.3)"
        external={false}
        minWidth="auto"
      />
      <GradientButton
        href='./green-room'
        text="Green Room"
        gradient="linear-gradient(135deg, #34d399 0%, #10b981 100%)"
        shadowColor="rgba(16, 185, 129, 0.15)"
        shadowColorHover="rgba(16, 185, 129, 0.3)"
        external={false}
        minWidth="auto"
      />
      <GradientButton
        href='./yellow-room'
        text="Yellow Room"
        gradient="linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        shadowColor="rgba(245, 158, 11, 0.15)"
        shadowColorHover="rgba(245, 158, 11, 0.3)"
        external={false}
        minWidth="auto"
      />
    </div>

    {/* Ground Floor Label */}
    <div style={{
      fontSize: '11px',
      color: 'var(--ifm-color-emphasis-600)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '0.5rem',
      paddingLeft: '0.25rem'
    }}>Entrance & Exit</div>

    {/* Ground Floor */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem',
      padding: '0.75rem',
      background: 'var(--ifm-color-emphasis-100)',
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-300)'
    }}>
      <GradientButton
        href='./entrance-area'
        text="Entrance"
        gradient="linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
        shadowColor="rgba(107, 114, 128, 0.15)"
        shadowColorHover="rgba(107, 114, 128, 0.3)"
        external={false}
        minWidth="auto"
      />
      <GradientButton
        href='./exit-room'
        text="Exit"
        gradient="linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
        shadowColor="rgba(107, 114, 128, 0.15)"
        shadowColorHover="rgba(107, 114, 128, 0.3)"
        external={false}
        minWidth="auto"
      />
    </div>

    {/* Foundation */}
    <div style={{
      marginTop: '0.75rem',
      height: '6px',
      background: 'var(--ifm-color-emphasis-500)',
      borderRadius: '3px'
    }} />

  </div>
</div>

**The process in brief:**

1. **Entrance Area** – Define business idea, set scope
2. **Blue Room** – Understand customers: Who are they? What do they need?
3. **Red Room** – Develop value proposition: What value do we offer?
4. **Green Room** – Plan value creation: How do we create the value?
5. **Yellow Room** – Check profitability: How do we make money?
6. **Exit Area** – Synthesis and decision: Go, Review, or Stop?

At the end of each room is a **Quality Gate** – a checklist that ensures all important questions are answered before moving on.

---

## How Can I Use the House-Building Logic?

There are three ways to apply the methodology:

<div className="variant-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem'}}>

<a href="../workshop/overview_workshop" className="variant-card" style={{background: 'var(--ifm-background-surface-color)', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'}}>
  <div style={{position: 'absolute', top: 0, right: 0, background: '#386FB3', color: 'white', padding: '0.25rem 1rem', borderBottomLeftRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>CLASSIC</div>
  <h4 style={{marginTop: '1rem'}}>Workshop Format</h4>
  <p style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>5-day design sprint with a team on-site. Ideal for complex business models where various stakeholders need to be involved.</p>
  <ul style={{fontSize: '0.85rem', marginTop: '1rem'}}>
    <li>Structured agenda per day</li>
    <li>PowerPoint templates (A2)</li>
    <li>Interactive group work</li>
    <li>Quality gates per room</li>
  </ul>
</a>

<a href="../ai/ai_overview" className="variant-card" style={{background: 'var(--ifm-background-surface-color)', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'}}>
  <div style={{position: 'absolute', top: 0, right: 0, background: '#84a302', color: 'white', padding: '0.25rem 1rem', borderBottomLeftRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>AI-POWERED</div>
  <h4 style={{marginTop: '1rem'}}>Business Model Assistant</h4>
  <p style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Work independently with AI support. A chatbot guides you through all rooms and asks the right questions.</p>
  <ul style={{fontSize: '0.85rem', marginTop: '1rem'}}>
    <li>System prompt for download</li>
    <li>AI-compatible methodology description</li>
    <li>Compatible with ChatGPT, Copilot, Gemini</li>
  </ul>
</a>

<a href="../workshop/overview_workshop" className="variant-card" style={{background: 'var(--ifm-background-surface-color)', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'}}>
  <div style={{position: 'absolute', top: 0, right: 0, background: '#175A95', color: 'white', padding: '0.25rem 1rem', borderBottomLeftRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>HYBRID</div>
  <h4 style={{marginTop: '1rem'}}>Combined Approach</h4>
  <p style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Combine workshop and AI: Digitize sticky notes, automatically fill templates, validate intermediate results.</p>
  <ul style={{fontSize: '0.85rem', marginTop: '1rem'}}>
    <li>Digitize sticky notes</li>
    <li>Automatically fill templates</li>
    <li>Validate intermediate results</li>
  </ul>
</a>

</div>
