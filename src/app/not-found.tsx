import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "rgba(0,212,170,0.1)",
          border: "1px solid rgba(0,212,170,0.25)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <FlaskConical size={32} color="#00D4AA" />
      </div>

      <h1
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 0.75rem 0",
        }}
      >
        404 — Page Not Found
      </h1>

      <p style={{ color: "#9CA3AF", fontSize: "1.05rem", maxWidth: "420px", lineHeight: 1.7, margin: "0 0 2rem 0" }}>
        That page doesn&apos;t exist. Try searching the peptide library or browsing the FAQ.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/peptides"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.65rem 1.25rem",
            borderRadius: "8px",
            background: "#00D4AA",
            color: "#0A0A0F",
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Peptide Library <ArrowRight size={14} />
        </Link>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.65rem 1.25rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F0F0F0",
            fontWeight: 600,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
