import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import peptides, { getPeptideBySlug } from "@/data/peptides";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import AffiliateLink from "@/components/ui/AffiliateLink";

const staticComparisons: Record<
  string,
  { a: string; b: string; intro: string }
> = {
  "bpc-157-vs-tb-500": {
    a: "bpc-157",
    b: "tb-500",
    intro:
      "BPC-157 and TB-500 are the two most researched peptides for injury recovery and tissue healing — and they're often stacked together. But they work through different mechanisms and have different evidence profiles. Here's a detailed, side-by-side breakdown.",
  },
  "semaglutide-vs-tirzepatide": {
    a: "semaglutide",
    b: "nad-plus",
    intro:
      "Semaglutide (Ozempic/Wegovy) and NAD+ represent two very different approaches to metabolic health and longevity. One is an FDA-approved GLP-1 agonist with massive clinical trial data; the other is a cellular coenzyme with growing human trial support. Here's how they compare.",
  },
  "cjc-1295-vs-ipamorelin": {
    a: "cjc-1295",
    b: "ipamorelin",
    intro:
      "CJC-1295 and Ipamorelin are most commonly discussed together — as a stack. But understanding how each works individually is key to understanding why people combine them. This is the definitive comparison of the two most popular growth hormone-releasing peptides.",
  },
  "nad-plus-vs-nmn": {
    a: "nad-plus",
    b: "epithalon",
    intro:
      "NAD+ and Epithalon represent two of the most researched anti-aging peptide compounds. NAD+ targets cellular energy metabolism and DNA repair; Epithalon targets telomere length and pineal function. Both are central to longevity research — here's how they compare.",
  },
  "mk-677-vs-ipamorelin": {
    a: "mk-677",
    b: "ipamorelin",
    intro:
      "MK-677 and Ipamorelin both stimulate growth hormone release through the ghrelin receptor — but one is taken orally and the other by injection. This comparison covers their mechanisms, evidence, side effect profiles, and practical differences for research contexts.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(staticComparisons).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = staticComparisons[slug];
  if (!comp) return {};

  const peptideA = getPeptideBySlug(comp.a);
  const peptideB = getPeptideBySlug(comp.b);
  if (!peptideA || !peptideB) return {};

  return {
    title: `${peptideA.name} vs ${peptideB.name}: Detailed Comparison`,
    description: `${peptideA.name} vs ${peptideB.name} — mechanism, research status, legal status, side effects, and which to research for your goals. ${comp.intro.slice(0, 80)}`,
    alternates: { canonical: `https://peptidesmasters.com/compare/${slug}` },
    openGraph: {
      title: `${peptideA.name} vs ${peptideB.name}: Which Should You Research?`,
      description: comp.intro.slice(0, 155),
      type: "article",
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comp = staticComparisons[slug];
  if (!comp) notFound();

  const peptideA = getPeptideBySlug(comp.a);
  const peptideB = getPeptideBySlug(comp.b);
  if (!peptideA || !peptideB) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${peptideA.name} vs ${peptideB.name}: Detailed Comparison`,
    description: comp.intro,
    author: { "@type": "Organization", name: "PeptidesMasters.com" },
    publisher: { "@type": "Organization", name: "PeptidesMasters.com" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidesmasters.com" },
        { "@type": "ListItem", position: 2, name: "Compare", item: "https://peptidesmasters.com/compare" },
        {
          "@type": "ListItem",
          position: 3,
          name: `${peptideA.name} vs ${peptideB.name}`,
          item: `https://peptidesmasters.com/compare/${slug}`,
        },
      ],
    },
  };

  const rows = [
    { label: "Also Known As", a: peptideA.alsoKnownAs.join(", ") || "—", b: peptideB.alsoKnownAs.join(", ") || "—" },
    { label: "Primary Uses", a: peptideA.primaryUses.join(", "), b: peptideB.primaryUses.join(", ") },
    { label: "Research Status", a: peptideA.researchLevel, b: peptideB.researchLevel },
    { label: "FDA Status", a: peptideA.fdaStatus, b: peptideB.fdaStatus },
    { label: "Form", a: peptideA.form, b: peptideB.form },
    { label: "Human Studies", a: peptideA.humanStudies > 0 ? `~${peptideA.humanStudies}` : "None", b: peptideB.humanStudies > 0 ? `~${peptideB.humanStudies}` : "None" },
    { label: "Animal Studies", a: `~${peptideA.animalStudies}`, b: `~${peptideB.animalStudies}` },
    {
      label: "Mechanism",
      a: peptideA.mechanismOfAction,
      b: peptideB.mechanismOfAction,
    },
    {
      label: "Stacks With",
      a: peptideA.commonlyStackedWith.join(", ") || "—",
      b: peptideB.commonlyStackedWith.join(", ") || "—",
    },
    { label: "Legal Status", a: peptideA.legalStatus, b: peptideB.legalStatus },
  ];

  const researchColor = (level: string) => {
    const map: Record<string, string> = {
      "Well-Studied": "#3B82A0",
      Emerging: "#8B6B4A",
      Experimental: "#DC6B6B",
    };
    return map[level] || "#A89E98";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#A89E98", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/compare" style={{ color: "#A89E98", textDecoration: "none" }}>Compare</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#6B6460" }}>{peptideA.name} vs {peptideB.name}</span>
          </div>
        </nav>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#1A1614",
            margin: "0 0 1rem 0",
          }}
        >
          {peptideA.name} vs {peptideB.name}: Detailed Comparison
        </h1>

        <p style={{ color: "#6B6460", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          {comp.intro}
        </p>

        <MedicalDisclaimer />

        {/* Side-by-side header cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          {[
            { peptide: peptideA, accent: "#3B82A0" },
            { peptide: peptideB, accent: "#8B6B4A" },
          ].map(({ peptide, accent }) => (
            <div
              key={peptide.slug}
              style={{
                padding: "1.5rem",
                background: `${accent}08`,
                border: `1px solid ${accent}25`,
                borderRadius: "12px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: accent,
                  margin: "0 0 0.5rem 0",
                }}
              >
                {peptide.name}
              </h2>
              <p style={{ color: "#6B6460", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                {peptide.tagline}
              </p>
              <Link
                href={`/peptides/${peptide.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: accent,
                  fontSize: "0.813rem",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Full profile <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "0.875rem 1rem", textAlign: "left", color: "#A89E98", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #E8E2D8", width: "25%", background: "#F5F2ED" }}>
                  Criteria
                </th>
                <th style={{ padding: "0.875rem 1rem", textAlign: "left", borderBottom: "1px solid #E8E2D8", color: "#3B82A0", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", background: "#F5F2ED" }}>
                  {peptideA.name}
                </th>
                <th style={{ padding: "0.875rem 1rem", textAlign: "left", borderBottom: "1px solid #E8E2D8", color: "#8B6B4A", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", background: "#F5F2ED" }}>
                  {peptideB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? "rgba(0,0,0,0.02)" : "#FFFFFF" }}>
                  <td style={{ padding: "0.875rem 1rem", color: "#6B6460", fontSize: "0.813rem", fontWeight: 600, borderBottom: "1px solid #E8E2D8", verticalAlign: "top" }}>
                    {row.label}
                  </td>
                  <td style={{
                    padding: "0.875rem 1rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    borderBottom: "1px solid #E8E2D8",
                    verticalAlign: "top",
                    color: row.label === "Research Status" ? researchColor(row.a) : "#3A3330",
                    fontWeight: row.label === "Research Status" ? 600 : 400,
                  }}>
                    {row.a}
                  </td>
                  <td style={{
                    padding: "0.875rem 1rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    borderBottom: "1px solid #E8E2D8",
                    verticalAlign: "top",
                    color: row.label === "Research Status" ? researchColor(row.b) : "#3A3330",
                    fontWeight: row.label === "Research Status" ? 600 : 400,
                  }}>
                    {row.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benefits/Risks side by side */}
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1A1614", marginBottom: "1rem" }}>
          Benefits &amp; Risks: Head to Head
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { peptide: peptideA, accent: "#3B82A0" },
            { peptide: peptideB, accent: "#8B6B4A" },
          ].map(({ peptide, accent }) => (
            <div key={peptide.slug}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: accent, marginBottom: "0.75rem" }}>
                {peptide.name}
              </h3>
              <div style={{ marginBottom: "0.75rem" }}>
                <p style={{ color: "#3B82A0", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                  Benefits
                </p>
                {peptide.reportedBenefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <CheckCircle2 size={13} color="#3B82A0" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#6B6460", fontSize: "0.813rem" }}>{b}</span>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ color: "#DC6B6B", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                  Risks
                </p>
                {peptide.reportedRisks.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <XCircle size={13} color="#DC6B6B" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#6B6460", fontSize: "0.813rem" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <AffiliateLink peptideName={peptideA.name} placeholder={peptideA.affiliatePlaceholder} label={`View ${peptideA.name} Suppliers`} />
          <AffiliateLink peptideName={peptideB.name} placeholder={peptideB.affiliatePlaceholder} label={`View ${peptideB.name} Suppliers`} />
        </div>

        {/* Links to full profiles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[peptideA, peptideB].map((p) => (
            <Link
              key={p.slug}
              href={`/peptides/${p.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                background: "#FFFFFF",
                border: "1px solid #E8E2D8",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ color: "#1A1614", fontWeight: 600, fontSize: "0.9rem" }}>
                Full {p.name} Profile
              </span>
              <ArrowRight size={14} color="#3B82A0" />
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/compare" style={{ color: "#3B82A0", textDecoration: "none", fontSize: "0.875rem" }}>
            ← Back to Compare Tool
          </Link>
        </div>
      </div>
    </>
  );
}
