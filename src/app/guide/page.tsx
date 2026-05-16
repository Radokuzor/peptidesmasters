import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import ArticleLayout from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "The Complete Beginner's Guide to Peptides in 2026",
  description:
    "Everything you need to know about peptides — what they are, how they work, legal status, how to read research, and what to look for in a supplier. For beginners.",
  alternates: { canonical: "https://peptidesmasters.com/guide" },
};

const tocItems = [
  { id: "what-are-peptides", text: "What Are Peptides?" },
  { id: "peptides-vs-steroids", text: "Peptides vs Steroids vs SARMs" },
  { id: "legal-status", text: "What's Legal and What's Not" },
  { id: "how-research-works", text: "How Peptide Research Works" },
  { id: "most-researched", text: "Most Researched Peptides" },
  { id: "read-a-study", text: "How to Read a Research Study" },
  { id: "sourcing", text: "Red Flags & What to Look For in a Supplier" },
  { id: "glossary", text: "Glossary of Terms" },
];

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Beginner's Guide to Peptides in 2026",
    description: "Everything beginners need to know about peptides — mechanisms, legality, research, and sourcing.",
    dateModified: "2026-05-01",
    author: { "@type": "Organization", name: "PeptidesMasters.com" },
    publisher: { "@type": "Organization", name: "PeptidesMasters.com" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleLayout tocItems={tocItems}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#9CA3AF" }}>
            <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#525456" }}>Beginner&apos;s Guide</span>
          </div>
        </nav>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            background: "rgba(253,108,104,0.08)",
            border: "1px solid rgba(253,108,104,0.22)",
            fontSize: "0.75rem",
            color: "#E55550",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          Beginner Guide · Updated May 2026
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.15,
            margin: "0 0 1.25rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          The Complete Beginner&apos;s Guide to Peptides in 2026
        </h1>

        <p style={{ color: "#525456", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
          If you&apos;ve heard about peptides and don&apos;t know where to start — this is the guide for you.
          We cover everything from the basics of what a peptide is, to how to evaluate research, to what
          to look for when sourcing. No hype, no fluff. Just the facts.
        </p>

        <MedicalDisclaimer />

        <article>
          <Section id="what-are-peptides" title="What Are Peptides?">
            <p>
              Peptides are short chains of amino acids — the same building blocks that make up proteins.
              The difference between a peptide and a protein is essentially size: chains under about 50
              amino acids are called peptides; longer chains are proteins.
            </p>
            <p>
              Your body naturally produces thousands of different peptides that serve as signaling molecules.
              They regulate everything from hunger and sleep to tissue repair and immune function. Insulin
              is a peptide. GLP-1 (the hormone that semaglutide mimics) is a peptide. The growth hormone
              your pituitary releases is triggered by peptide signals.
            </p>
            <p>
              Research peptides are synthetic compounds — either exact copies of naturally occurring peptides
              or modified analogs designed to have specific effects. The goal is usually to harness a peptide&apos;s
              natural biological function in a controlled, targeted way.
            </p>
            <InfoBox title="Key Takeaway">
              Peptides are not exotic substances — your body makes them constantly. Research peptides
              are synthetic versions or analogs of naturally occurring compounds, studied for their
              biological effects.
            </InfoBox>
          </Section>

          <Section id="peptides-vs-steroids" title="How Are Peptides Different From Steroids or SARMs?">
            <p>
              This is one of the most common questions new researchers have — and it matters for both
              understanding mechanisms and understanding legal status.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>Anabolic steroids</strong> are synthetic derivatives of
              testosterone. They bind directly to androgen receptors in muscle and other tissues,
              producing anabolic (muscle-building) and androgenic (masculinizing) effects. Most are controlled
              substances (Schedule III in the US) with significant hormonal side effects.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>SARMs</strong> also target androgen receptors but are
              designed to be tissue-selective. They are not peptides. They are not FDA-approved and have
              been the subject of significant enforcement action.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>Peptides</strong> work through an entirely different mechanism.
              They bind to peptide-specific receptors and trigger downstream signaling cascades.
              Growth hormone-releasing peptides stimulate the pituitary; tissue-repair peptides like BPC-157
              upregulate growth factors locally; cognitive peptides like Semax modulate neurotransmitter systems.
            </p>
            <ComparisonTable
              headers={["Feature", "Steroids", "SARMs", "Research Peptides"]}
              rows={[
                ["Target receptor", "Androgen receptor", "Androgen receptor (selective)", "Peptide-specific receptors"],
                ["Hormonal effects", "Strong", "Moderate", "Varies by peptide"],
                ["FDA status", "Controlled (Sched. III)", "Not approved", "Varies — mostly research only"],
                ["Oral bioavailability", "Some (17-alpha)", "Yes", "Most require injection"],
              ]}
            />
          </Section>

          <Section id="legal-status" title="What's Legal and What's Not (Plain English)">
            <p>Peptide legality in the US exists on a spectrum. Here&apos;s a simplified framework:</p>
            <ol style={{ paddingLeft: "1.5rem", color: "#374151", lineHeight: 2 }}>
              <li>
                <strong style={{ color: "#111827" }}>FDA-approved peptides (with prescription):</strong> Semaglutide,
                tirzepatide, bremelanotide, and others. Fully legal with a valid prescription.
              </li>
              <li>
                <strong style={{ color: "#111827" }}>Research chemicals:</strong> BPC-157, TB-500, CJC-1295,
                ipamorelin. Legal to purchase as research chemicals. Not legal to sell for human consumption.
              </li>
              <li>
                <strong style={{ color: "#111827" }}>Banned in sports:</strong> Many research peptides are on
                WADA&apos;s Prohibited List. Athletes should check the current list.
              </li>
              <li>
                <strong style={{ color: "#111827" }}>Compounded peptides:</strong> The FDA&apos;s 2023–2024
                enforcement actions restricted many peptides from compounding pharmacies. This is an evolving area.
              </li>
            </ol>
            <Link
              href="/articles/are-peptides-legal-us-2026"
              style={{ color: "#FD6C68", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}
            >
              Read the full 2026 legal breakdown →
            </Link>
          </Section>

          <Section id="how-research-works" title="How Peptide Research Works">
            <p>
              When you see claims about a peptide &quot;working&quot; for something, it&apos;s worth understanding
              what type of evidence that claim is based on.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>In vitro studies</strong> test compounds on cells in a dish.
              They can show cellular interactions but can&apos;t tell us what happens in a living body.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>Animal studies (in vivo)</strong> test compounds in living
              animals — usually rodents. Far more informative than cell studies but still have significant
              translational limitations.
            </p>
            <p>
              <strong style={{ color: "#111827" }}>Human trials (clinical trials)</strong> are the gold standard.
              A randomized, double-blind, placebo-controlled trial (RCT) is the strongest form of evidence.
              Most research peptides on this site do not have completed human RCTs.
            </p>
            <InfoBox title="The Evidence Hierarchy">
              In vitro → Animal studies → Observational human data → Small human trials →
              Randomized controlled trials (RCTs) → Systematic reviews and meta-analyses.
              Most research peptides sit at the animal study level.
            </InfoBox>
          </Section>

          <Section id="most-researched" title="The Most Researched Peptides and What They're Used For">
            <p>Based on the quality and quantity of available research (as of 2026):</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
              {[
                { name: "Semaglutide", slug: "semaglutide", use: "Weight loss, diabetes management", level: "Well-Studied" },
                { name: "BPC-157", slug: "bpc-157", use: "Tissue healing, gut repair", level: "Emerging" },
                { name: "TB-500 (Thymosin Beta-4)", slug: "tb-500", use: "Injury recovery, inflammation", level: "Emerging" },
                { name: "CJC-1295", slug: "cjc-1295", use: "GH optimization, body composition", level: "Emerging" },
                { name: "Ipamorelin", slug: "ipamorelin", use: "GH release, recovery, sleep", level: "Emerging" },
                { name: "NAD+", slug: "nad-plus", use: "Longevity, cellular energy", level: "Well-Studied" },
                { name: "GHK-Cu", slug: "ghk-cu", use: "Skin repair, collagen", level: "Emerging" },
                { name: "Epithalon", slug: "epithalon", use: "Telomeres, anti-aging", level: "Experimental" },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/peptides/${p.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1rem",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div>
                    <span style={{ color: "#111827", fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</span>
                    <span style={{ color: "#9CA3AF", fontSize: "0.8rem", marginLeft: "0.75rem" }}>{p.use}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background:
                        p.level === "Well-Studied"
                          ? "rgba(31,107,80,0.08)"
                          : p.level === "Emerging"
                          ? "rgba(122,82,32,0.08)"
                          : "rgba(139,58,58,0.08)",
                      color:
                        p.level === "Well-Studied"
                          ? "#1F6B50"
                          : p.level === "Emerging"
                          ? "#7A5220"
                          : "#8B3A3A",
                    }}
                  >
                    {p.level}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/peptides" style={{ color: "#FD6C68", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
              View the full peptide library →
            </Link>
          </Section>

          <Section id="read-a-study" title="How to Read a Research Study">
            <p>
              You don&apos;t need a PhD to evaluate whether a peptide study means something. Here&apos;s a framework:
            </p>
            <ol style={{ paddingLeft: "1.5rem", color: "#374151", lineHeight: 2 }}>
              <li><strong style={{ color: "#111827" }}>Who were the subjects?</strong> Cells, mice, or humans? The further up this ladder, the more relevant the data.</li>
              <li><strong style={{ color: "#111827" }}>Was it randomized and blinded?</strong> A randomized, double-blind, placebo-controlled design is the strongest.</li>
              <li><strong style={{ color: "#111827" }}>Sample size:</strong> A 10-person study tells you much less than a 10,000-person study.</li>
              <li><strong style={{ color: "#111827" }}>Who funded it?</strong> Industry-funded studies can have conflicts of interest.</li>
              <li><strong style={{ color: "#111827" }}>What were the actual outcomes?</strong> A statistically significant result may still be clinically meaningless if the effect size is tiny.</li>
              <li><strong style={{ color: "#111827" }}>Has it been replicated?</strong> A single study should be treated with skepticism until independently replicated.</li>
            </ol>
          </Section>

          <Section id="sourcing" title="Red Flags When Buying / What to Look for in a Supplier">
            <p>
              Since most research peptides exist in a gray area, quality varies enormously. The difference
              between a responsible supplier and a fraudulent one can be the difference between getting
              the compound you ordered at the purity advertised — or getting something entirely different.
            </p>
            <p><strong style={{ color: "#111827" }}>What to look for:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", color: "#374151", lineHeight: 2 }}>
              <li>Third-party Certificate of Analysis (COA) from an independent, verifiable lab</li>
              <li>HPLC purity &gt;98%</li>
              <li>Mass spectrometry confirmation of correct molecular identity</li>
              <li>Endotoxin testing (critical for injectable peptides)</li>
              <li>Lot-specific COAs that match your batch</li>
            </ul>
            <p><strong style={{ color: "#111827" }}>Red flags:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", color: "#374151", lineHeight: 2 }}>
              <li>No COA available or COA is generic/undated</li>
              <li>Claims like &quot;guaranteed results&quot; or therapeutic health claims</li>
              <li>Prices dramatically below market rate</li>
              <li>No contact information, no physical address</li>
            </ul>
            <Link href="/articles/how-to-read-coa" style={{ color: "#FD6C68", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
              How to read a peptide COA in detail →
            </Link>
          </Section>

          <Section id="glossary" title="Glossary of Key Terms">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { term: "Amino acid", def: "The molecular building blocks of peptides and proteins. There are 20 standard amino acids." },
                { term: "Peptide", def: "A chain of 2–50 amino acids linked by peptide bonds. Acts as a signaling molecule in biology." },
                { term: "GHRH", def: "Growth Hormone-Releasing Hormone — the hypothalamic peptide that signals the pituitary to release GH." },
                { term: "GLP-1", def: "Glucagon-Like Peptide-1 — a gut hormone that regulates blood sugar and appetite. Mimicked by semaglutide." },
                { term: "IGF-1", def: "Insulin-Like Growth Factor 1 — released by the liver in response to GH. Mediates many of GH's anabolic effects." },
                { term: "Half-life", def: "The time it takes for a compound's concentration to fall by 50% in the body. Determines dosing frequency." },
                { term: "HPLC", def: "High-Performance Liquid Chromatography — an analytical technique used to measure purity of compounds." },
                { term: "Bioavailability", def: "The fraction of a dose that reaches the bloodstream. Most peptides have low oral bioavailability." },
                { term: "Lyophilized", def: "Freeze-dried. Research peptides are typically shipped as lyophilized powder for stability." },
                { term: "COA", def: "Certificate of Analysis — a document from a testing laboratory certifying compound identity, purity, and quality." },
                { term: "WADA", def: "World Anti-Doping Agency — publishes the Prohibited List of substances banned in competitive sports." },
              ].map(({ term, def }) => (
                <div
                  key={term}
                  style={{
                    padding: "0.875rem 1rem",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                >
                  <strong style={{ color: "#FD6C68", fontSize: "0.875rem" }}>{term}</strong>
                  <p style={{ color: "#525456", fontSize: "0.875rem", margin: "0.25rem 0 0 0", lineHeight: 1.6 }}>{def}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Continue reading CTA */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.75rem",
              background: "rgba(253,108,104,0.05)",
              border: "1px solid rgba(253,108,104,0.15)",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem 0" }}>
              Ready to Go Deeper?
            </h3>
            <p style={{ color: "#525456", fontSize: "0.875rem", margin: "0 0 1rem 0" }}>
              Explore individual peptide profiles, compare compounds side-by-side, or take the Peptide Finder Quiz.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/peptides"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "7px",
                  background: "#FD6C68",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Peptide Library <ArrowRight size={14} />
              </Link>
              <Link
                href="/quiz"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "7px",
                  background: "transparent",
                  border: "1px solid #E5E7EB",
                  color: "#111827",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Peptide Finder Quiz <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </ArticleLayout>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginTop: "3rem", scrollMarginTop: "90px" }}>
      <h2
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 3vw, 1.65rem)",
          color: "#111827",
          margin: "0 0 1rem 0",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #E5E7EB",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "1.5rem 0",
        padding: "1.25rem",
        background: "rgba(253,108,104,0.05)",
        border: "1px solid rgba(253,108,104,0.2)",
        borderRadius: "8px",
        borderLeft: "3px solid #FD6C68",
      }}
    >
      <p
        style={{
          color: "#FD6C68",
          fontWeight: 700,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: "0 0 0.5rem 0",
        }}
      >
        {title}
      </p>
      <p style={{ color: "#525456", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                style={{
                  padding: "0.65rem 0.875rem",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: i === 0 ? "#9CA3AF" : "#FD6C68",
                  borderBottom: "1px solid #E5E7EB",
                  background: "#F8F9FA",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "0.65rem 0.875rem",
                    fontSize: "0.875rem",
                    color: ci === 0 ? "#525456" : "#374151",
                    borderBottom: "1px solid #E5E7EB",
                    fontWeight: ci === 0 ? 600 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
