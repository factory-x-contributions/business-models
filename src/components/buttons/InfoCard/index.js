// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

/**
 * InfoCard component – Eine wiederverwendbare Card mit Gradient-Hintergrund,
 * Schatten, Hover-Effekten und flexiblem Inhalt.
 *
 * @param {string} title - Überschrift der Card
 * @param {string} description - Beschreibungstext
 * @param {React.Component} props.icon - Optionales Icon (z. B. aus @mui/icons-material)
 * @param {string} [gradient] - Hintergrund-Gradient
 * @param {string} [shadowColor] - Schattenfarbe
 * @param {string} [shadowColorHover] - Schattenfarbe beim Hover
 * @param {string} [href] - Optionaler Link (macht die gesamte Card klickbar)
 * @param {boolean} [external=true] - Link extern öffnen (nur relevant, wenn href gesetzt ist)
 */

export const InfoCard = ({
  title,
  description,
  icon: Icon,
  gradient = "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  shadowColor = "rgba(0, 0, 0, 0.08)",
  shadowColorHover = "rgba(0, 0, 0, 0.15)",
  href,
  external = true
}) => {
  // Wenn href vorhanden ist, rendert als <a>, sonst als <div>
  const Wrapper = href ? "a" : "div";

  // Gemeinsamer Style
  const baseStyle = {
    padding: "24px",
    borderRadius: "16px",
    background: gradient,
    color: "#000",
    boxShadow: `0 4px 14px 0 ${shadowColor}`,
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
    cursor: href ? "pointer" : "default",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "relative",
    overflow: "hidden",
    textDecoration: "none", // wichtig für <a>
    outline: "none",
    // Fokus-Stil für Tastatur-Nutzung
    // (sichtbar nur beim Fokus)
  };

  // Tastatursteuerung für den <div>-Fall (falls kein href)
  const handleKeyDown = (e) => {
    if (!href) return;
    // Standard-Verhalten bei <a> übernimmt der Browser
    if (e.key === " " || e.key === "Enter") {
      e.currentTarget.click();
      e.preventDefault();
    }
  };

  return (
    <Wrapper
      href={href || undefined}
      target={href && external ? "_blank" : undefined}
      rel={href && external ? "noopener noreferrer" : undefined}
      aria-label={href ? title : undefined}
      role={href ? "link" : "group"}
      tabIndex={0}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 8px 22px 0 ${shadowColorHover}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = `0 4px 14px 0 ${shadowColor}`;
      }}
      onKeyDown={handleKeyDown}
    >
      {Icon && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon sx={{ fontSize: 32, opacity: 0.9, color: "#000" }} />
          {/* Optional: OpenInNewIcon nur anzeigen, wenn external */}
          {href && external && (
            <OpenInNewIcon sx={{ fontSize: 18, opacity: 0.6, color: "#000" }} />
          )}
        </div>
      )}

      <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
        {title}
      </h3>

      <p style={{ margin: 0, fontSize: "15px", opacity: 0.9, lineHeight: "1.5" }}>
        {description}
      </p>
    </Wrapper>
  );
};

export default InfoCard;
