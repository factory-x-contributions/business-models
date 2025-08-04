// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';


export const StartButton = ({ 
  href, 
  text, 
  gradient = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  shadowColor = 'rgba(76, 175, 80, 0.3)',
  shadowColorHover = 'rgba(76, 175, 80, 0.4)',
  external = true,
  minWidth = '250px',
  fontSize = '20px',         
  fontWeight = '700'           
}) => {
  return (
    <a 
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',   
        padding: '18px 28px',
        background: gradient,
        color: 'white',
        textDecoration: 'none',
        borderRadius: '12px',
        fontWeight: fontWeight,
        fontSize: fontSize,          
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
        boxSizing: 'border-box',
        boxShadow: `0 4px 14px 0 ${shadowColor}`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minWidth: minWidth,
        gap: '12px',
        textAlign: 'center'          
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 8px 25px 0 ${shadowColorHover}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 4px 14px 0 ${shadowColor}`;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      }}
    >
      <span>{text}</span>
    </a>
   );
};

