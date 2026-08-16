"use client";

import { useId } from "react";
import { firm } from "@/lib/data";

// Devanagari glyph coverage — neither Playfair nor Geist ships the script.
const devanagariStack =
  "'Noto Sans Devanagari', 'Nirmala UI', 'Mangal', 'Kohinoor Devanagari', system-ui, sans-serif";

export function Logo({
  className = "h-10 w-10",
  showMantra = true,
}: {
  className?: string;
  showMantra?: boolean;
}) {
  // The emblem renders several times per page; a shared <defs> id would collide.
  const arcId = `logo-mantra-arc-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${firm.name} emblem — ${firm.mantra}`}
    >
      <defs>
        {/* Upper semicircle, left to right, so the text sits upright along the top rim. */}
        <path id={arcId} d="M 11 50 A 39 39 0 0 1 89 50" fill="none" />
      </defs>

      <circle cx="50" cy="50" r="48" fill="#1c1917" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#f5f5f4" strokeWidth="2" />

      {showMantra && (
        <text fill="#f5f5f4" fontSize="7" fontFamily={devanagariStack} textAnchor="middle">
          <textPath href={`#${arcId}`} startOffset="50%">
            {firm.mantra}
          </textPath>
        </text>
      )}

      <g fill="#f5f5f4">
        <rect x="47" y="24" width="6" height="34" rx="1" />
        <path d="M50 22 L34 40 L38 42 L50 28 L62 42 L66 40 Z" />
        <path d="M50 22 L36 40 L64 40 Z" fill="none" stroke="#f5f5f4" strokeWidth="2" />
        <path d="M28 40 Q28 50 38 50 Q48 50 48 40 L44 40 Q44 46 38 46 Q32 46 32 40 Z" />
        <path d="M52 40 Q52 50 62 50 Q72 50 72 40 L68 40 Q68 46 62 46 Q56 46 56 40 Z" />
        <line x1="28" y1="40" x2="38" y2="40" stroke="#f5f5f4" strokeWidth="1.5" />
        <line x1="62" y1="40" x2="72" y2="40" stroke="#f5f5f4" strokeWidth="1.5" />
        <rect x="34" y="58" width="32" height="5" rx="1" />
      </g>

      <text
        x="50"
        y="80"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="1.5"
        fill="#f5f5f4"
        fontFamily="Georgia, serif"
      >
        ADVOCATE
      </text>
    </svg>
  );
}
