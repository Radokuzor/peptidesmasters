import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function QuizCtaBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(253,108,104,0.07) 0%, rgba(245,166,35,0.05) 100%)",
        border: "1px solid rgba(253,108,104,0.22)",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "rgba(253,108,104,0.1)",
          border: "1px solid rgba(253,108,104,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Zap size={18} color="#FD6C68" />
      </div>
      <div style={{ flex: 1, minWidth: "200px" }}>
        <p
          style={{
            color: "#111827",
            fontWeight: 700,
            fontSize: "0.975rem",
            margin: "0 0 0.2rem 0",
            fontFamily: "Syne, sans-serif",
          }}
        >
          Not sure which peptide fits your goals?
        </p>
        <p style={{ color: "#525456", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
          Find the exact research protocol for your specific goals in 2 minutes. Take the Peptide Quiz.
        </p>
      </div>
      <Link
        href="/quiz"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.6rem 1.25rem",
          borderRadius: "8px",
          background: "#FD6C68",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Take the Quiz <ArrowRight size={14} />
      </Link>
    </div>
  );
}
