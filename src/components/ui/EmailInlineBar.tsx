"use client";

import { useState } from "react";
import EmailCaptureForm from "./EmailCaptureForm";

export default function EmailInlineBar() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return (
    <div
      style={{
        background: "rgba(59,130,160,0.05)",
        border: "1px solid rgba(59,130,160,0.18)",
        borderRadius: "10px",
        padding: "1rem 1.25rem",
        margin: "2rem 0",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          color: "#3B82A0",
          fontWeight: 600,
          fontSize: "0.875rem",
          margin: 0,
          flex: "1 1 180px",
          lineHeight: 1.5,
        }}
      >
        Enjoying this? Get weekly peptide research in your inbox →
      </p>
      <div style={{ flex: "1 1 280px" }}>
        <EmailCaptureForm
          buttonText="Subscribe"
          placeholder="your@email.com"
          onSuccess={() => setTimeout(() => setDone(true), 2500)}
          compact
        />
      </div>
    </div>
  );
}
