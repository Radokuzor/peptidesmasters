import Link from "next/link";
import peptides from "@/data/peptides";

const recoveryPeptides = peptides.filter((p) =>
  p.primaryUses.includes("Muscle Recovery")
);

function statusBadge(fdaStatus: string) {
  const lower = fdaStatus.toLowerCase();
  if (lower.includes("research") || lower.includes("category 1")) {
    return {
      text: "Research Only",
      color: "#059669",
      bg: "rgba(5,150,105,0.08)",
      border: "rgba(5,150,105,0.25)",
    };
  }
  return {
    text: fdaStatus,
    color: "#D97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.25)",
  };
}

const researchBadge: Record<string, { color: string; bg: string; border: string }> = {
  "Well-Studied": { color: "#1F6B50", bg: "rgba(31,107,80,0.08)", border: "rgba(31,107,80,0.2)" },
  Emerging: { color: "#7A5220", bg: "rgba(122,82,32,0.08)", border: "rgba(122,82,32,0.2)" },
  Experimental: { color: "#8B3A3A", bg: "rgba(139,58,58,0.08)", border: "rgba(139,58,58,0.2)" },
};

export default function RecoveryPeptidesTable() {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "1.3rem",
          color: "#111827",
          margin: "0 0 0.5rem 0",
          letterSpacing: "-0.01em",
        }}
      >
        2026 Recovery Peptide Comparison
      </h2>
      <p style={{ color: "#525456", fontSize: "0.875rem", margin: "0 0 1rem 0", lineHeight: 1.6 }}>
        Research-grade status, primary uses, and 2026 compliance notes for each compound.{" "}
        <Link
          href="/articles/are-peptides-legal-us-2026"
          style={{ color: "#FD6C68", textDecoration: "underline" }}
        >
          See the full 2026 legality guide →
        </Link>
      </p>
      <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
            background: "#FFFFFF",
            minWidth: "560px",
          }}
        >
          <thead>
            <tr style={{ background: "#F8F9FA", borderBottom: "2px solid #E5E7EB" }}>
              {["Peptide", "Primary Uses", "Research Level", "2026 Legal Status", "Profile"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      color: "#525456",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {recoveryPeptides.map((p, i) => {
              const legal = statusBadge(p.fdaStatus);
              const research = researchBadge[p.researchLevel] || researchBadge.Emerging;
              return (
                <tr
                  key={p.slug}
                  style={{
                    borderBottom:
                      i < recoveryPeptides.length - 1 ? "1px solid #E5E7EB" : "none",
                    background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                  }}
                >
                  <td
                    style={{
                      padding: "0.875rem 1rem",
                      color: "#111827",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#525456" }}>
                    {p.primaryUses.join(", ")}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: research.bg,
                        color: research.color,
                        border: `1px solid ${research.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.researchLevel}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: legal.bg,
                        color: legal.color,
                        border: `1px solid ${legal.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {legal.text}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link
                      href={`/peptides/${p.slug}`}
                      style={{
                        color: "#FD6C68",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
