import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Flame,
  Zap,
  Clock,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  RefreshCw,
  Award,
  GitCompare,
} from "lucide-react";
import peptides from "@/data/peptides";
import faqs from "@/data/faqs";
import PeptideCard from "@/components/ui/PeptideCard";

export const metadata: Metadata = {
  title: "PeptidesMasters.com — The Trusted Peptide Research Authority",
  description:
    "The most trusted, evidence-based resource for peptide research. Explore 15+ peptide profiles, comparison tools, and educational guides. Not medical advice.",
  alternates: { canonical: "https://peptidesmasters.com" },
};

const goalCards = [
  {
    goal: "Fat Loss",
    icon: Flame,
    color: "#F5A623",
    bg: "rgba(245,166,35,0.08)",
    border: "rgba(245,166,35,0.2)",
    href: "/peptides?goal=Fat+Loss",
    desc: "Peptides studied for body composition",
  },
  {
    goal: "Muscle Recovery",
    icon: Zap,
    color: "#00D4AA",
    bg: "rgba(0,212,170,0.08)",
    border: "rgba(0,212,170,0.2)",
    href: "/peptides?goal=Muscle+Recovery",
    desc: "Research on repair and performance",
  },
  {
    goal: "Longevity",
    icon: Clock,
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    href: "/peptides?goal=Longevity",
    desc: "Anti-aging and cellular health",
  },
  {
    goal: "Cognitive Performance",
    icon: Brain,
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
    href: "/peptides?goal=Cognitive+Performance",
    desc: "Focus, memory, neuroprotection",
  },
  {
    goal: "Injury Healing",
    icon: Heart,
    color: "#F87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    href: "/peptides?goal=Injury+Healing",
    desc: "Tendon, muscle, and tissue repair",
  },
  {
    goal: "Skin & Beauty",
    icon: Sparkles,
    color: "#F472B6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
    href: "/peptides?goal=Skin+%26+Beauty",
    desc: "Collagen, skin, hair research",
  },
];

const featuredSlugs = ["bpc-157", "tb-500", "semaglutide", "cjc-1295", "ipamorelin", "nad-plus"];

const trustSignals = [
  { icon: ShieldCheck, label: "Evidence-Based", desc: "Cited sources on every page" },
  { icon: BookOpen, label: "Sources Cited", desc: "PubMed & peer-reviewed journals" },
  { icon: RefreshCw, label: "Updated Monthly", desc: "Reflects latest research" },
  { icon: Award, label: "No Medical Claims", desc: "Educational only — always" },
];

const topFAQs = faqs.slice(0, 8);

export default function HomePage() {
  const featuredPeptides = featuredSlugs
    .map((slug) => peptides.find((p) => p.slug === slug))
    .filter(Boolean) as typeof peptides;

  return (
    <div>
      {/* Hero */}
      <section
        className="noise-overlay"
        style={{
          position: "relative",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,170,0.12) 0%, transparent 70%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              background: "rgba(0,212,170,0.1)",
              border: "1px solid rgba(0,212,170,0.25)",
              fontSize: "0.75rem",
              color: "#00D4AA",
              fontWeight: 600,
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <ShieldCheck size={12} /> Evidence-Based · Cited · Educational
          </div>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 1.25rem 0",
            }}
          >
            The Most Trusted{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #00A888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Peptide Research
            </span>{" "}
            Resource Online
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#9CA3AF",
              lineHeight: 1.7,
              margin: "0 0 2rem 0",
              maxWidth: "620px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore 15+ peptide profiles with cited research, plain-English explanations,
            and honest legal breakdowns. Built for curious minds, not pharma companies.
          </p>

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              maxWidth: "560px",
              margin: "0 auto 2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 0.875rem",
                color: "#6B7280",
              }}
            >
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder='Try "BPC-157", "peptides for weight loss"...'
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F0F0F0",
                fontSize: "0.9rem",
                padding: "0.65rem 0",
              }}
            />
            <Link
              href="/peptides"
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "7px",
                background: "#00D4AA",
                color: "#0A0A0F",
                fontSize: "0.875rem",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Search
            </Link>
          </div>

          {/* Quick links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {[
              { name: "BPC-157", slug: "bpc-157" },
              { name: "Semaglutide", slug: "semaglutide" },
              { name: "TB-500", slug: "tb-500" },
              { name: "NAD+", slug: "nad-plus" },
              { name: "GHK-Cu", slug: "ghk-cu" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/peptides/${item.slug}`}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9CA3AF",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section style={{ padding: "2rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {trustSignals.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Icon size={20} color="#00D4AA" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", fontFamily: "Syne, sans-serif" }}>
                  {label}
                </div>
                <div style={{ color: "#6B7280", fontSize: "0.75rem" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal Cards */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 0.75rem 0",
              }}
            >
              What Are You Trying to Achieve?
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>
              Browse peptides researched for your specific goal
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "1rem",
            }}
          >
            {goalCards.map(({ goal, icon: Icon, color, bg, border, href, desc }) => (
              <Link key={goal} href={href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: "1.5rem",
                    borderRadius: "12px",
                    background: bg,
                    border: `1px solid ${border}`,
                    textAlign: "center",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: `${color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.75rem",
                    }}
                  >
                    <Icon size={22} color={color} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#fff",
                      margin: "0 0 0.4rem 0",
                    }}
                  >
                    {goal}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: "0.775rem", margin: 0 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Peptides */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 0.4rem 0",
                }}
              >
                Most Searched Peptides
              </h2>
              <p style={{ color: "#6B7280", fontSize: "0.875rem", margin: 0 }}>
                Based on search data — the peptides researchers look up most
              </p>
            </div>
            <Link
              href="/peptides"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#00D4AA",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              View full library <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {featuredPeptides.map((peptide) => (
              <PeptideCard key={peptide.slug} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools CTA row */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              className="glass-card"
              style={{ padding: "2rem", background: "rgba(0,212,170,0.05)", border: "1px solid rgba(0,212,170,0.15)" }}
            >
              <GitCompare size={32} color="#00D4AA" style={{ marginBottom: "1rem" }} />
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#fff",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Compare Peptides Side-by-Side
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>
                Pick any 2–3 peptides and instantly see a detailed comparison — mechanisms, research,
                legal status, stacking options, and more.
              </p>
              <Link
                href="/compare"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "7px",
                  background: "#00D4AA",
                  color: "#0A0A0F",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Open Compare Tool <ArrowRight size={14} />
              </Link>
            </div>

            <div
              className="glass-card"
              style={{ padding: "2rem", background: "rgba(245,166,35,0.05)", border: "1px solid rgba(245,166,35,0.15)" }}
            >
              <Zap size={32} color="#F5A623" style={{ marginBottom: "1rem" }} />
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#fff",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Find Your Research Match
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>
                Take the 5-minute Peptide Finder Quiz. Tell us your goals and we&apos;ll show you which
                peptides are most researched for your profile.
              </p>
              <Link
                href="/quiz"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "7px",
                  background: "#F5A623",
                  color: "#0A0A0F",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Take the Quiz <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 0.4rem 0",
                }}
              >
                Most Asked Questions
              </h2>
              <p style={{ color: "#6B7280", fontSize: "0.875rem", margin: 0 }}>
                From search data — the exact questions people are asking
              </p>
            </div>
            <Link
              href="/faq"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#00D4AA",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              All FAQs <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {topFAQs.map((faq) => (
              <Link key={faq.question} href="/faq" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    style={{
                      color: "#F0F0F0",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      margin: "0 0 0.5rem 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {faq.question}
                  </p>
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "0.8rem",
                      margin: 0,
                      lineHeight: 1.5,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 0.75rem 0",
            }}
          >
            New to Peptides?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: "1rem", margin: "0 0 1.5rem 0", lineHeight: 1.7 }}>
            Start with our Beginner&apos;s Guide — everything you need to know in one place,
            from what peptides are to how to read a research study.
          </p>
          <Link
            href="/guide"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #00D4AA, #00A888)",
              color: "#0A0A0F",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            Read the Beginner&apos;s Guide <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
