"use client";

import { Bell } from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";

export default function PeptideEmailCard({ peptideName }: { peptideName: string }) {
  return (
    <div
      style={{
        marginTop: "2.5rem",
        padding: "1.5rem",
        background: "rgba(59,130,160,0.05)",
        border: "1px solid rgba(59,130,160,0.18)",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.5rem",
        }}
      >
        <Bell size={16} color="#3B82A0" />
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#1A1614",
            margin: 0,
          }}
        >
          Stay current on {peptideName} research
        </h3>
      </div>
      <p
        style={{
          color: "#6B6460",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          margin: "0 0 1rem 0",
        }}
      >
        New studies, legal updates, and stack protocols — delivered weekly.
      </p>
      <EmailCaptureForm buttonText="Get Updates" />
      <p style={{ color: "#A89E98", fontSize: "0.75rem", margin: "0.5rem 0 0 0" }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
