// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './styles.css';

/**
 * GradientButton component - A reusable button with gradient background and hover effects
 *
 * @param {Object} props - Component props
 * @param {string} props.href - URL to navigate to
 * @param {string} props.text - Button text
 * @param {React.Component} props.icon - Material-UI icon component
 * @param {string} [props.gradient='linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'] - CSS gradient
 * @param {string} [props.shadowColor='rgba(76, 175, 80, 0.3)'] - Box shadow color
 * @param {string} [props.shadowColorHover='rgba(76, 175, 80, 0.4)'] - Box shadow color on hover
 * @param {boolean} [props.external=true] - Whether link opens in new tab
 * @param {string} [props.minWidth='250px'] - Minimum button width
 * @param {boolean} [props.pill=false] - Use pill shape (rounded)
 * @param {boolean} [props.showArrow=false] - Show animated arrow instead of external icon
 */
export const GradientButton = ({
  href,
  text,
  download,
  icon: Icon,
  gradient = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  shadowColor = 'rgba(76, 175, 80, 0.3)',
  shadowColorHover = 'rgba(76, 175, 80, 0.4)',
  external = true,
  minWidth = '250px',
  pill = false,
  showArrow = false
}) => {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="gradient-button"
      style={{
        '--gradient': gradient,
        '--shadow-color': shadowColor,
        '--shadow-color-hover': shadowColorHover,
        '--min-width': minWidth,
        '--border-radius': pill ? '50px' : '12px',
      }}
    >
      <span className="gradient-button__shine"></span>
      <div className="gradient-button__content">
        {Icon && <Icon sx={{ fontSize: 20 }} />}
        <span>{text}</span>
      </div>
      {showArrow ? (
        <ArrowForwardIcon className="gradient-button__arrow" sx={{ fontSize: 20 }} />
      ) : (
        <OpenInNewIcon sx={{ fontSize: 18, opacity: 0.8 }} />
      )}
    </a>
  );
};

export default GradientButton;