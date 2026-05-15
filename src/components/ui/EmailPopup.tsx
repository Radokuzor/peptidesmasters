"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";

const SESSION_KEY = "email-popup-shown";

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setIsMobile(window.innerWidth < 768);

    let triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(true);
    }

    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total >= 0.5) trigger();
    }

    const timer = setTimeout(trigger, 20000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function dismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return isMobile ? (
    <MobileBottomSheet onDismiss={dismiss} />
  ) : (
    <DesktopModal onDismiss={dismiss} />
  );
}

function DesktopModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <>
      <div
        onClick={onDismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,22,20,0.4)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          zIndex: 998,
          animation: "pm-fadeIn 0.2s ease",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 999,
          background: "#FFFFFF",
          border: "1px solid #E8E2D8",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "460px",
          width: "calc(100% - 2rem)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
          animation: "pm-scaleIn 0.22s ease",
        }}
      >
        <button
          onClick={onDismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid #E8E2D8",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#6B6460",
            padding: "0.3rem",
            display: "flex",
            lineHeight: 1,
          }}
        >
          <X size={15} />
        </button>
        <PopupBody onSuccess={onDismiss} onDismiss={onDismiss} />
      </div>
      <PopupKeyframes />
    </>
  );
}

function MobileBottomSheet({ onDismiss }: { onDismiss: () => void }) {
  return (
    <>
      <div
        onClick={onDismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,22,20,0.4)",
          zIndex: 998,
          animation: "pm-fadeIn 0.2s ease",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#FFFFFF",
          borderTop: "1px solid #E8E2D8",
          borderRadius: "20px 20px 0 0",
          padding: "0 1.5rem 2.5rem",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
          animation: "pm-slideUp 0.28s ease",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.875rem", marginBottom: "1.25rem" }}>
          <div style={{ width: "36px", height: "4px", background: "#E8E2D8", borderRadius: "2px" }} />
        </div>
        <button
          onClick={onDismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#A89E98",
            padding: "0.25rem",
            display: "flex",
          }}
        >
          <X size={18} />
        </button>
        <PopupBody onSuccess={onDismiss} onDismiss={onDismiss} />
      </div>
      <PopupKeyframes />
    </>
  );
}

function PopupBody({
  onSuccess,
  onDismiss,
}: {
  onSuccess: () => void;
  onDismiss: () => void;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.875rem",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "rgba(59,130,160,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Mail size={20} color="#3B82A0" />
        </div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "#1A1614",
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          Don&apos;t Miss What&apos;s Coming Next
        </h2>
      </div>

      <p
        style={{
          color: "#6B6460",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          margin: "0 0 1.25rem 0",
        }}
      >
        Get the latest peptide research, legal updates, and stack guides — straight to your
        inbox.
      </p>

      <EmailCaptureForm buttonText="Send Me the Research" onSuccess={onSuccess} />

      <p
        style={{
          color: "#A89E98",
          fontSize: "0.75rem",
          textAlign: "center",
          margin: "0.6rem 0 0 0",
        }}
      >
        No spam. Unsubscribe anytime.
      </p>

      <button
        onClick={onDismiss}
        style={{
          display: "block",
          width: "100%",
          marginTop: "0.5rem",
          background: "none",
          border: "none",
          color: "#A89E98",
          fontSize: "0.8rem",
          cursor: "pointer",
          textDecoration: "underline",
          padding: "0.25rem 0",
          textAlign: "center",
        }}
      >
        No thanks
      </button>
    </>
  );
}

function PopupKeyframes() {
  return (
    <style>{`
      @keyframes pm-fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes pm-scaleIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.95) }
        to   { opacity: 1; transform: translate(-50%, -50%) scale(1)    }
      }
      @keyframes pm-slideUp {
        from { transform: translateY(100%) }
        to   { transform: translateY(0)    }
      }
    `}</style>
  );
}
