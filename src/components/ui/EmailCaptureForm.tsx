"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/email";

interface Props {
  buttonText?: string;
  placeholder?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function EmailCaptureForm({
  buttonText = "Send Me the Research",
  placeholder = "your@email.com",
  onSuccess,
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus("success");
      onSuccess?.();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          padding: compact ? "0.55rem 1rem" : "0.875rem",
          background: "rgba(59,130,160,0.08)",
          border: "1px solid rgba(59,130,160,0.22)",
          borderRadius: "8px",
          textAlign: "center",
          color: "#3B82A0",
          fontWeight: 600,
          fontSize: compact ? "0.875rem" : "1rem",
        }}
      >
        ✓ You&apos;re in! Check your inbox.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "0.5rem", flexWrap: compact ? "nowrap" : "wrap" }}
    >
      <input
        type="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          minWidth: compact ? "0" : "200px",
          padding: compact ? "0.55rem 0.875rem" : "0.65rem 1rem",
          borderRadius: "7px",
          background: "#FFFFFF",
          border: status === "error" ? "1px solid rgba(220,107,107,0.5)" : "1px solid #E8E2D8",
          color: "#1A1614",
          fontSize: "0.9rem",
          outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: compact ? "0.55rem 1rem" : "0.65rem 1.25rem",
          borderRadius: "7px",
          background: status === "loading" ? "rgba(59,130,160,0.6)" : "#3B82A0",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: compact ? "0.8rem" : "0.875rem",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        {status === "loading" ? "…" : buttonText}
      </button>
      {status === "error" && (
        <p
          style={{
            color: "#DC6B6B",
            fontSize: "0.75rem",
            margin: "0.25rem 0 0 0",
            width: "100%",
          }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
