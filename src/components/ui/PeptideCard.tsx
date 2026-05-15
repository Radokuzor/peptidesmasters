import Link from "next/link";
import { type Peptide } from "@/data/peptides";
import { ArrowRight, Beaker } from "lucide-react";

interface PeptideCardProps {
  peptide: Peptide;
  compact?: boolean;
}

const researchColors: Record<string, { bg: string; text: string; border: string }> = {
  "Well-Studied": {
    bg: "rgba(31, 107, 80, 0.08)",
    text: "#1F6B50",
    border: "rgba(31, 107, 80, 0.2)",
  },
  Emerging: {
    bg: "rgba(122, 82, 32, 0.08)",
    text: "#7A5220",
    border: "rgba(122, 82, 32, 0.2)",
  },
  Experimental: {
    bg: "rgba(139, 58, 58, 0.08)",
    text: "#8B3A3A",
    border: "rgba(139, 58, 58, 0.2)",
  },
};

export default function PeptideCard({ peptide, compact = false }: PeptideCardProps) {
  const colors = researchColors[peptide.researchLevel] || researchColors["Emerging"];

  return (
    <Link
      href={`/peptides/${peptide.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="glass-card"
        style={{
          padding: compact ? "1rem" : "1.25rem",
          transition: "box-shadow 0.2s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: compact ? "1rem" : "1.1rem",
                color: "#1A1614",
                margin: 0,
                marginBottom: "0.25rem",
              }}
            >
              {peptide.name}
            </h3>
            {!compact && peptide.alsoKnownAs.length > 0 && (
              <p style={{ color: "#A89E98", fontSize: "0.75rem", margin: 0 }}>
                {peptide.alsoKnownAs[0]}
              </p>
            )}
          </div>

          {/* Research level badge */}
          <span
            style={{
              padding: "3px 8px",
              borderRadius: "999px",
              fontSize: "0.7rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              flexShrink: 0,
            }}
          >
            {peptide.researchLevel}
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: "#6B6460",
            fontSize: "0.813rem",
            lineHeight: 1.6,
            margin: "0 0 0.75rem 0",
            flex: 1,
          }}
        >
          {compact
            ? peptide.tagline.slice(0, 80) + (peptide.tagline.length > 80 ? "…" : "")
            : peptide.tagline}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {/* Use case tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {peptide.primaryUses.slice(0, compact ? 1 : 2).map((use) => (
              <span
                key={use}
                style={{
                  padding: "2px 7px",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  background: "rgba(0,0,0,0.04)",
                  color: "#6B6460",
                  border: "1px solid #E8E2D8",
                }}
              >
                {use}
              </span>
            ))}
            <span
              style={{
                padding: "2px 7px",
                borderRadius: "4px",
                fontSize: "0.7rem",
                background: "rgba(0,0,0,0.04)",
                color: "#6B6460",
                border: "1px solid #E8E2D8",
              }}
            >
              <Beaker size={10} style={{ display: "inline", marginRight: "3px" }} />
              {peptide.form}
            </span>
          </div>

          <ArrowRight size={14} color="#3B82A0" />
        </div>
      </div>
    </Link>
  );
}
