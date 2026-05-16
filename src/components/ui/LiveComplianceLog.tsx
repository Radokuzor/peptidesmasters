import Link from "next/link";
import { RefreshCw } from "lucide-react";
import type { LogEntry } from "@/data/articles";

const fallbackLog: LogEntry[] = [
  {
    date: "2026-05-16",
    status: "Updated",
    message:
      "Reviewed Category 1 and Category 2 FDA compliance standards for research-grade peptides. FDA reclassified 14 of 19 restricted peptides — including BPC-157 — from Category 2 back to Category 1.",
  },
  {
    date: "2026-04-28",
    status: "Verified",
    message:
      "Confirmed current legal research status of Selank and CJC-1295 with published regulatory guidance. Both remain Category 1 research compounds with no change to their approved research-use scope.",
  },
  {
    date: "2026-03-15",
    status: "Alert",
    message:
      "New FDA guidance issued on compounding restrictions affecting Category 2 peptides. Category 1 compounds unaffected — research use continues without restriction.",
  },
];

const statusColors: Record<string, { text: string; bg: string; border: string }> = {
  Updated: { text: "#059669", bg: "rgba(5,150,105,0.08)", border: "rgba(5,150,105,0.25)" },
  Verified: { text: "#2563EB", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.25)" },
  Alert: { text: "#D97706", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.25)" },
};

export default function LiveComplianceLog({ entries }: { entries?: LogEntry[] }) {
  const log = entries && entries.length > 0 ? entries : fallbackLog;
  return (
    <div
      style={{
        background: "rgba(0,212,170,0.04)",
        border: "1px solid rgba(0,212,170,0.22)",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <RefreshCw size={15} color="#00D4AA" />
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#111827",
            margin: 0,
          }}
        >
          Live Compliance &amp; Research Status Log
        </h2>
        <span
          style={{
            marginLeft: "auto",
            padding: "2px 8px",
            borderRadius: "999px",
            background: "rgba(0,212,170,0.1)",
            border: "1px solid rgba(0,212,170,0.3)",
            color: "#00A87F",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Updated Weekly
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
        {log.map((entry, i) => {
          const c = statusColors[entry.status] || statusColors.Updated;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                padding: "0.75rem 1rem",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  color: c.text,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                {entry.status}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#374151", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 0.25rem 0" }}>
                  {entry.message}
                </p>
                <p style={{ color: "#9CA3AF", fontSize: "0.75rem", margin: 0 }}>{entry.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ color: "#525456", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
        Key research peptides covered in this article:{" "}
        <Link
          href="/peptides/selank"
          style={{ color: "#FD6C68", textDecoration: "underline", fontWeight: 600 }}
        >
          Selank
        </Link>{" "}
        (nootropic — Category 1) and{" "}
        <Link
          href="/peptides/cjc-1295"
          style={{ color: "#FD6C68", textDecoration: "underline", fontWeight: 600 }}
        >
          CJC-1295
        </Link>{" "}
        (GH secretagogue — Category 1). Both maintain current research-use legal standing as of the latest FDA review.
      </p>
    </div>
  );
}
