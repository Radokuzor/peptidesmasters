"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, ShieldCheck } from "lucide-react";
import peptides from "@/data/peptides";
import type { Goal } from "@/data/peptides";
import PeptideCard from "@/components/ui/PeptideCard";

type Step = {
  id: string;
  question: string;
  required?: boolean;
  options: { value: string; label: string; desc: string }[];
};

const steps: Step[] = [
  {
    id: "goal",
    question: "What is your primary research interest?",
    required: true,
    options: [
      { value: "Fat Loss", label: "Fat Loss & Body Composition", desc: "Peptides studied for fat metabolism and weight management" },
      { value: "Muscle Recovery", label: "Muscle Recovery & Performance", desc: "Research on tissue repair and athletic performance" },
      { value: "Longevity", label: "Longevity & Anti-Aging", desc: "Cellular health, telomeres, and aging biology" },
      { value: "Cognitive Performance", label: "Cognitive Performance & Focus", desc: "Neuropeptides for memory, focus, and neurological health" },
      { value: "Injury Healing", label: "Injury & Tissue Healing", desc: "Tendons, ligaments, muscle repair research" },
      { value: "Skin & Beauty", label: "Skin, Hair & Beauty", desc: "Collagen, skin repair, hair restoration research" },
      { value: "Hormonal Health", label: "Hormonal Health", desc: "GH axis, peptide hormone modulation" },
    ],
  },
  {
    id: "age",
    question: "Your age range (optional — helps narrow results)",
    options: [
      { value: "under30", label: "Under 30", desc: "Natural GH is typically still robust" },
      { value: "30-45", label: "30–45", desc: "GH and NAD+ decline begins" },
      { value: "45-60", label: "45–60", desc: "Significant metabolic and longevity research interest" },
      { value: "60plus", label: "60+", desc: "Immune and longevity peptides most researched" },
    ],
  },
  {
    id: "experience",
    question: "What's your experience level with peptide research?",
    options: [
      { value: "beginner", label: "Complete beginner", desc: "Just starting to learn about peptides" },
      { value: "some-research", label: "Some research done", desc: "I've read about peptides, not used them" },
      { value: "supplements", label: "Supplement user", desc: "Experienced with supplements and optimization" },
      { value: "experienced", label: "Peptide-familiar", desc: "Already researched or used peptides" },
    ],
  },
  {
    id: "form",
    question: "Form preference for research context?",
    options: [
      { value: "any", label: "No preference", desc: "Open to all forms — injectable, oral, topical" },
      { value: "noinjection", label: "Prefer non-injectable", desc: "Oral, nasal, or topical forms" },
      { value: "all", label: "Open to all forms", desc: "Including injectables" },
    ],
  },
  {
    id: "considerations",
    question: "Any important considerations? (Optional)",
    options: [
      { value: "none", label: "No specific concerns", desc: "General research interest" },
      { value: "athlete", label: "Competitive athlete", desc: "Subject to WADA testing — important for legal status" },
      { value: "health-condition", label: "Existing health condition", desc: "Should consult a physician before any compound" },
      { value: "medication", label: "Currently on medication", desc: "Interactions possible — physician consult essential" },
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendations(answers: Answers) {
  const goal = answers.goal as Goal | undefined;
  const form = answers.form;
  const isAthlete = answers.considerations === "athlete";

  let candidates = peptides.filter((p) => {
    if (goal && !p.primaryUses.includes(goal)) return false;
    if (form === "noinjection" && p.form === "Injectable") return false;
    if (isAthlete && ["bpc-157", "tb-500", "cjc-1295", "ipamorelin", "mk-677"].includes(p.slug))
      return false;
    return true;
  });

  // Sort: Well-Studied first, then Emerging, then Experimental
  const order = { "Well-Studied": 0, Emerging: 1, Experimental: 2 };
  candidates = candidates.sort(
    (a, b) => order[a.researchLevel] - order[b.researchLevel]
  );

  return candidates.slice(0, 4);
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;
  const isRequired = step?.required;
  const hasAnswer = answers[step?.id];

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function restart() {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setEmail("");
    setEmailSubmitted(false);
  }

  const recommendations = showResults ? getRecommendations(answers) : [];

  if (showResults) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          Your Peptide Research Profile
        </h1>

        <div
          style={{
            padding: "0.875rem 1rem",
            background: "rgba(0,212,170,0.08)",
            border: "1px solid rgba(0,212,170,0.2)",
            borderRadius: "8px",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <ShieldCheck size={16} color="#00D4AA" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ color: "#9CA3AF", fontSize: "0.813rem", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#00D4AA" }}>Disclaimer:</strong> These results reflect what
            research exists for your stated goals — not a medical recommendation. Always consult
            a licensed healthcare provider before using any compound.
          </p>
        </div>

        {recommendations.length > 0 ? (
          <>
            <p style={{ color: "#9CA3AF", marginBottom: "1.5rem" }}>
              Based on your answers (Goal: <strong style={{ color: "#00D4AA" }}>{answers.goal || "General"}</strong>),
              here are the most researched peptides matching your profile:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {recommendations.map((p) => (
                <div key={p.slug}>
                  <PeptideCard peptide={p} />
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                      padding: "0 0.25rem",
                    }}
                  >
                    <strong style={{ color: "#9CA3AF" }}>Why this matches:</strong>{" "}
                    Researched for {p.primaryUses.filter((u) => u === answers.goal || !answers.goal).join(", ") || p.primaryUses[0]}.
                    Research level: {p.researchLevel}.
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
            <p>No peptides matched all your filters. Try adjusting form preferences.</p>
          </div>
        )}

        {/* Email capture */}
        {!emailSubmitted ? (
          <div
            style={{
              padding: "1.75rem",
              background: "rgba(0,212,170,0.06)",
              border: "1px solid rgba(0,212,170,0.15)",
              borderRadius: "12px",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#fff",
                margin: "0 0 0.5rem 0",
              }}
            >
              Get Your Full Research Profile
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "0.875rem", marginBottom: "1rem" }}>
              Optional: Get a PDF breakdown of your top peptide matches with research summaries delivered to your inbox.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "0.6rem 1rem",
                  borderRadius: "7px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0F0F0",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button
                onClick={() => {
                  /* TODO: Connect to Mailchimp/ConvertKit endpoint */
                  if (email) setEmailSubmitted(true);
                }}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "7px",
                  background: "#00D4AA",
                  color: "#0A0A0F",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Send My Profile
              </button>
            </div>
            <p style={{ color: "#4B5563", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              No spam. Unsubscribe any time.
            </p>
          </div>
        ) : (
          <div
            style={{
              padding: "1.25rem",
              background: "rgba(0,212,170,0.08)",
              borderRadius: "8px",
              color: "#00D4AA",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            ✓ Profile sent! Check your inbox.
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={restart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9CA3AF",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            <RotateCcw size={14} /> Retake Quiz
          </button>
          <Link
            href="/peptides"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              background: "#00D4AA",
              color: "#0A0A0F",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Browse Full Library <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Progress */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ color: "#6B7280", fontSize: "0.813rem" }}>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "0.813rem" }}>
            {Math.round(progress)}% complete
          </span>
        </div>
        <div
          style={{
            height: "4px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            className="progress-bar"
            style={{ height: "100%", width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 0.5rem 0",
        }}
      >
        {step.question}
      </h2>
      {!isRequired && (
        <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          Optional — skip if you prefer
        </p>
      )}

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
        {step.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => selectOption(opt.value)}
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "10px",
              textAlign: "left",
              cursor: "pointer",
              background:
                answers[step.id] === opt.value
                  ? "rgba(0,212,170,0.1)"
                  : "rgba(255,255,255,0.04)",
              border:
                answers[step.id] === opt.value
                  ? "2px solid rgba(0,212,170,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.2s",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: answers[step.id] === opt.value ? "#00D4AA" : "#fff",
                margin: "0 0 0.25rem 0",
              }}
            >
              {opt.label}
            </p>
            <p
              style={{
                color: "#6B7280",
                fontSize: "0.813rem",
                margin: 0,
              }}
            >
              {opt.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {currentStep > 0 && (
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.7rem 1.25rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9CA3AF",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <button
          onClick={goNext}
          disabled={isRequired && !hasAnswer}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.5rem",
            borderRadius: "8px",
            background: isRequired && !hasAnswer ? "rgba(255,255,255,0.05)" : "#00D4AA",
            color: isRequired && !hasAnswer ? "#4B5563" : "#0A0A0F",
            fontWeight: 700,
            fontSize: "0.95rem",
            border: "none",
            cursor: isRequired && !hasAnswer ? "not-allowed" : "pointer",
          }}
        >
          {currentStep === steps.length - 1 ? "See My Results" : "Next"}
          <ArrowRight size={16} />
        </button>
        {!isRequired && !hasAnswer && (
          <button
            onClick={goNext}
            style={{
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#6B7280",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
