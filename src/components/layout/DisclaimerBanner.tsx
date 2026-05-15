"use client";

import { useState, useEffect } from "react";
import { X, ShieldAlert } from "lucide-react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("disclaimer-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("disclaimer-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="alert"
      style={{
        background: "rgba(59,130,160,0.07)",
        borderBottom: "1px solid rgba(59,130,160,0.18)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <ShieldAlert size={16} color="#3B82A0" style={{ flexShrink: 0 }} />
      <p
        style={{
          color: "#6B6460",
          fontSize: "0.813rem",
          margin: 0,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        <strong style={{ color: "#3B82A0" }}>Educational purposes only.</strong>{" "}
        This site contains educational information about peptide research — not medical advice.
        Always consult a licensed healthcare provider before using any compound.{" "}
        <a href="/legal" style={{ color: "#3B82A0", textDecoration: "underline" }}>
          Full disclaimer →
        </a>
      </p>
      <button
        onClick={dismiss}
        style={{
          background: "none",
          border: "none",
          color: "#A89E98",
          cursor: "pointer",
          padding: "0.25rem",
          flexShrink: 0,
        }}
        aria-label="Dismiss disclaimer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
