import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import faqs, { getAllFAQCategories } from "@/data/faqs";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import FAQSearchClient from "./FAQSearchClient";

export const metadata: Metadata = {
  title: "Peptide FAQ — Most Asked Questions Answered",
  description:
    "The most comprehensive peptide FAQ online. Answers to what are peptides, are peptides legal, are peptides safe, what is peptide therapy, and 50+ more questions.",
  alternates: { canonical: "https://peptidesmasters.com/faq" },
};

export default function FAQPage() {
  const categories = getAllFAQCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#6B7280" }}>
            <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#F0F0F0" }}>FAQ Hub</span>
          </div>
        </nav>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 0.75rem 0",
          }}
        >
          Peptide FAQ Hub
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", margin: "0 0 2rem 0", lineHeight: 1.7 }}>
          {faqs.length} questions answered with cited, plain-English responses. All answers updated for 2026.
        </p>

        {/* Search (client component) */}
        <FAQSearchClient faqs={faqs} categories={categories} />

        <div style={{ marginTop: "2.5rem" }}>
          <MedicalDisclaimer />
        </div>

        {/* Quick navigation */}
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Want to Go Deeper?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {[
              { href: "/guide", label: "Complete Beginner's Guide", desc: "Everything from scratch" },
              { href: "/peptides", label: "Peptide Library", desc: "15+ full peptide profiles" },
              { href: "/compare", label: "Compare Tool", desc: "Side-by-side comparisons" },
              { href: "/legal", label: "Legal & Disclaimer", desc: "FDA, FTC, research law" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "0.875rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", margin: "0 0 0.25rem 0" }}>{link.label}</p>
                <p style={{ color: "#6B7280", fontSize: "0.8rem", margin: 0 }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
