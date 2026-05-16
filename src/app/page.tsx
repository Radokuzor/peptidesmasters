import type { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles";

export const metadata: Metadata = {
  title: "Which Peptides Does the Research Actually Support?",
  description:
    "Research-based profiles for 15 peptides — mechanism, human evidence, legal status. Sourced from PubMed and peer-reviewed journals. Not medical advice.",
  alternates: { canonical: "https://peptidesmasters.com" },
};

const questionTitles: Record<string, string> = {
  "bpc-157-complete-research-review": "What Does the Research Actually Say About BPC-157?",
  "are-peptides-legal-us-2026": "Are Peptides Legal in the US in 2026?",
  "bpc-157-vs-tb-500": "BPC-157 vs TB-500: Which Works Better for Healing?",
  "what-is-semaglutide": "How Does Semaglutide Actually Work for Weight Loss?",
  "best-peptides-muscle-recovery-2026": "Which Peptides Are Best-Researched for Muscle Recovery?",
  "peptides-for-skin-what-science-says": "Do Skincare Peptides Actually Work?",
  "how-to-read-coa": "How Do You Verify a Peptide's Purity?",
  "nad-vs-nmn-difference": "NAD+ vs NMN: What's the Actual Difference?",
  "cjc-1295-vs-ipamorelin": "Why Do People Stack CJC-1295 With Ipamorelin?",
  "ftc-peptide-marketing": "What Are the Legal Rules Around Peptide Marketing?",
};

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <section className="mb-10">
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            color: "#111827",
            lineHeight: 1.2,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          What does peptide research actually say?
        </h1>
        <p style={{ color: "#525456", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
          Profiles, comparisons, and legal breakdowns for 15 peptides — sourced from PubMed
          and peer-reviewed journals. Not medical advice.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.15s, border-color 0.15s",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#FD6C68",
                  }}
                >
                  {article.category}
                </span>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#111827",
                    lineHeight: 1.45,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {questionTitles[article.slug] ?? article.title}
                </h2>
                <p
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.825rem",
                    lineHeight: 1.6,
                    margin: 0,
                    flexGrow: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {article.summary}
                </p>
                <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  {article.readTime} min read
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <Link
            href="/peptides"
            style={{
              color: "#FD6C68",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Browse the full peptide library →
          </Link>
        </div>
      </section>
    </div>
  );
}
