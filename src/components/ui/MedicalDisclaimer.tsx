import { ShieldCheck } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      style={{
        background: "rgba(253,108,104,0.05)",
        border: "1px solid rgba(253,108,104,0.18)",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
    >
      <ShieldCheck size={18} color="#FD6C68" style={{ flexShrink: 0, marginTop: "2px" }} />
      <p style={{ color: "#525456", fontSize: "0.813rem", lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: "#FD6C68" }}>Educational purposes only.</strong> The information on
        this page is for educational and research purposes only. It does not constitute medical
        advice, diagnosis, or treatment. Research peptides are not FDA-approved for human
        therapeutic use unless explicitly stated. Always consult a licensed healthcare provider
        before using any compound.
      </p>
    </div>
  );
}
