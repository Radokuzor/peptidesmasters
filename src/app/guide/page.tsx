import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "The Complete Beginner's Guide to Peptides in 2026",
  description:
    "Everything you need to know about peptides — what they are, how they work, legal status, how to read research, and what to look for in a supplier. For beginners.",
  alternates: { canonical: "https://peptidesmasters.com/guide" },
};

const tocItems = [
  { id: "what-are-peptides", label: "What Are Peptides?" },
  { id: "peptides-vs-steroids", label: "Peptides vs Steroids vs SARMs" },
  { id: "legal-status", label: "What's Legal and What's Not" },
  { id: "how-research-works", label: "How Peptide Research Works" },
  { id: "most-researched", label: "Most Researched Peptides" },
  { id: "read-a-study", label: "How to Read a Research Study" },
  { id: "sourcing", label: "Red Flags & What to Look For in a Supplier" },
  { id: "glossary", label: "Glossary of Terms" },
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
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#6B7280" }}>
            <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#F0F0F0" }}>Beginner&apos;s Guide</span>
          </div>
        </nav>

        <div style={{ display: "grid", gridTemplateColumns: "1fr min(280px, 30%)", gap: "3rem", alignItems: "start" }}>
          {/* Main Content */}
          <article>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                background: "rgba(0,212,170,0.1)",
                border: "1px solid rgba(0,212,170,0.25)",
                fontSize: "0.75rem",
                color: "#00D4AA",
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
                color: "#fff",
                lineHeight: 1.15,
                margin: "0 0 1.25rem 0",
              }}
            >
              The Complete Beginner&apos;s Guide to Peptides in 2026
            </h1>

            <p style={{ color: "#9CA3AF", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              If you&apos;ve heard about peptides and don&apos;t know where to start — this is the guide for you.
              We cover everything from the basics of what a peptide is, to how to evaluate research, to what
              to look for when sourcing. No hype, no fluff. Just the facts.
            </p>

            <MedicalDisclaimer />

            {/* Section 1 */}
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

            {/* Section 2 */}
            <Section id="peptides-vs-steroids" title="How Are Peptides Different From Steroids or SARMs?">
              <p>
                This is one of the most common questions new researchers have — and it matters for both
                understanding mechanisms and understanding legal status.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>Anabolic steroids</strong> are synthetic derivatives of
                testosterone. They bind directly to androgen receptors in muscle and other tissues,
                producing anabolic (muscle-building) and androgenic (masculinizing) effects. They work
                at the receptor level in the nucleus of cells. Most are controlled substances (Schedule III
                in the US) with significant hormonal side effects.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>SARMs (Selective Androgen Receptor Modulators)</strong> also
                target androgen receptors but are designed to be tissue-selective — ideally producing muscle
                effects without androgenic side effects. They are not peptides. They are not FDA-approved and
                have been the subject of significant enforcement action.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>Peptides</strong> work through an entirely different mechanism.
                They bind to peptide-specific receptors and trigger downstream signaling cascades.
                Growth hormone-releasing peptides stimulate the pituitary; tissue-repair peptides like BPC-157
                upregulate growth factors locally; cognitive peptides like Semax modulate neurotransmitter
                systems. Most do not interact with androgen receptors at all.
              </p>

              <ComparisonTable
                headers={["Feature", "Steroids", "SARMs", "Research Peptides"]}
                rows={[
                  ["Target receptor", "Androgen receptor", "Androgen receptor (selective)", "Peptide-specific receptors"],
                  ["Hormonal effects", "Strong", "Moderate", "Varies by peptide"],
                  ["FDA status", "Controlled (Sched. III)", "Not approved", "Varies — mostly research only"],
                  ["Oral bioavailability", "Some (17-alpha)", "Yes", "Most require injection"],
                  ["Mechanism", "Nuclear/genomic", "Nuclear/genomic", "Receptor signaling, tissue-specific"],
                ]}
              />
            </Section>

            {/* Section 3 */}
            <Section id="legal-status" title="What's Legal and What's Not (Plain English)">
              <p>
                Peptide legality in the US exists on a spectrum. Here&apos;s a simplified framework:
              </p>
              <ol style={{ paddingLeft: "1.5rem", color: "#D1D5DB", lineHeight: 2 }}>
                <li>
                  <strong style={{ color: "#fff" }}>FDA-approved peptides (with prescription):</strong> Semaglutide
                  (Ozempic/Wegovy), tirzepatide (Mounjaro/Zepbound), bremelanotide (Vyleesi), and others.
                  Fully legal with a valid prescription from a licensed provider.
                </li>
                <li>
                  <strong style={{ color: "#fff" }}>Research chemicals:</strong> BPC-157, TB-500, CJC-1295,
                  ipamorelin, and most of the peptides on this site. Legal to purchase as research chemicals.
                  Not legal to sell for human consumption. Not FDA-approved for therapeutic use.
                </li>
                <li>
                  <strong style={{ color: "#fff" }}>Banned in sports:</strong> Many research peptides are on
                  WADA&apos;s Prohibited List. Athletes subject to testing should check the current list before
                  using any compound.
                </li>
                <li>
                  <strong style={{ color: "#fff" }}>Compounded peptides:</strong> The FDA&apos;s 2023–2024
                  enforcement actions added many peptides to lists that restrict compounding pharmacies from
                  producing them. This is an evolving regulatory area.
                </li>
              </ol>
              <Link
                href="/articles/are-peptides-legal-us-2026"
                style={{ color: "#00D4AA", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}
              >
                Read the full 2026 legal breakdown →
              </Link>
            </Section>

            {/* Section 4 */}
            <Section id="how-research-works" title="How Peptide Research Works">
              <p>
                When you see claims about a peptide &quot;working&quot; for something, it&apos;s worth understanding
                what type of evidence that claim is based on. Evidence quality ranges enormously.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>In vitro studies</strong> test compounds on cells in a dish.
                They can show whether a compound interacts with a cell receptor or produces a cellular response.
                They can&apos;t tell us what happens in a living body — absorption, metabolism, distribution,
                and dozens of variables all change everything.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>Animal studies (in vivo)</strong> test compounds in living
                animals — usually rodents. They&apos;re far more informative than cell studies but still have
                significant translational limitations. Many compounds that dramatically extend mouse lifespan
                have failed in humans.
              </p>
              <p>
                <strong style={{ color: "#fff" }}>Human trials (clinical trials)</strong> are the gold standard.
                A randomized, double-blind, placebo-controlled trial (RCT) is the strongest form of evidence.
                Most research peptides on this site do not have completed human RCTs. Semaglutide, with
                thousands of human trial participants, is the exception — not the rule.
              </p>

              <InfoBox title="The Evidence Hierarchy" color="#F5A623">
                In vitro → Animal studies → Observational human data → Small human trials →
                Randomized controlled trials (RCTs) → Systematic reviews and meta-analyses.
                Most research peptides sit at the animal study level.
              </InfoBox>
            </Section>

            {/* Section 5 */}
            <Section id="most-researched" title="The Most Researched Peptides and What They're Used For">
              <p>Based on the quality and quantity of available research (as of 2026):</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
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
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <div>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</span>
                      <span style={{ color: "#6B7280", fontSize: "0.8rem", marginLeft: "0.75rem" }}>{p.use}</span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background:
                          p.level === "Well-Studied"
                            ? "rgba(0,212,170,0.1)"
                            : p.level === "Emerging"
                            ? "rgba(245,166,35,0.1)"
                            : "rgba(239,68,68,0.1)",
                        color:
                          p.level === "Well-Studied"
                            ? "#00D4AA"
                            : p.level === "Emerging"
                            ? "#F5A623"
                            : "#F87171",
                      }}
                    >
                      {p.level}
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/peptides" style={{ color: "#00D4AA", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
                View the full peptide library →
              </Link>
            </Section>

            {/* Section 6 */}
            <Section id="read-a-study" title="How to Read a Research Study">
              <p>
                You don&apos;t need a PhD to evaluate whether a peptide study means something. Here&apos;s a framework:
              </p>
              <ol style={{ paddingLeft: "1.5rem", color: "#D1D5DB", lineHeight: 2 }}>
                <li><strong style={{ color: "#fff" }}>Who were the subjects?</strong> Cells in a dish, mice, rats, or humans? The further up this ladder, the more relevant the data.</li>
                <li><strong style={{ color: "#fff" }}>Was it randomized and blinded?</strong> A randomized, double-blind, placebo-controlled design is the strongest. Open-label or uncontrolled studies are much weaker.</li>
                <li><strong style={{ color: "#fff" }}>Sample size:</strong> A 10-person study tells you much less than a 10,000-person study. Look for adequate statistical power.</li>
                <li><strong style={{ color: "#fff" }}>Who funded it?</strong> Industry-funded studies can have conflicts of interest. Check for independent replication.</li>
                <li><strong style={{ color: "#fff" }}>What were the actual outcomes?</strong> A statistically significant result may still be clinically meaningless if the effect size is tiny.</li>
                <li><strong style={{ color: "#fff" }}>Has it been replicated?</strong> A single study — no matter how well designed — should be treated with appropriate skepticism until independently replicated.</li>
              </ol>
            </Section>

            {/* Section 7 */}
            <Section id="sourcing" title="Red Flags When Buying / What to Look for in a Supplier">
              <p>
                Since most research peptides exist in a gray area, quality varies enormously. The difference
                between a responsible supplier and a fraudulent one can be the difference between getting
                the compound you ordered at the purity advertised — or getting something entirely different.
              </p>
              <p><strong style={{ color: "#fff" }}>What to look for:</strong></p>
              <ul style={{ paddingLeft: "1.5rem", color: "#D1D5DB", lineHeight: 2 }}>
                <li>Third-party Certificate of Analysis (COA) from an independent, verifiable lab</li>
                <li>HPLC purity &gt;98%</li>
                <li>Mass spectrometry confirmation of correct molecular identity</li>
                <li>Endotoxin testing (critical for injectable peptides)</li>
                <li>Lot-specific COAs that match your batch</li>
              </ul>
              <p><strong style={{ color: "#fff" }}>Red flags:</strong></p>
              <ul style={{ paddingLeft: "1.5rem", color: "#D1D5DB", lineHeight: 2 }}>
                <li>No COA available or COA is generic/undated</li>
                <li>Claims like &quot;guaranteed results&quot; or therapeutic health claims</li>
                <li>Prices dramatically below market rate</li>
                <li>No contact information, no physical address</li>
                <li>Certificates from labs that don&apos;t appear to exist</li>
              </ul>
              <Link href="/articles/how-to-read-coa" style={{ color: "#00D4AA", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
                How to read a peptide COA in detail →
              </Link>
            </Section>

            {/* Section 8 */}
            <Section id="glossary" title="Glossary of Key Terms">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
                  { term: "Reconstitution", def: "Adding bacteriostatic water or another solvent to lyophilized peptide to create a solution for administration." },
                  { term: "COA", def: "Certificate of Analysis — a document from a testing laboratory certifying compound identity, purity, and quality." },
                  { term: "WADA", def: "World Anti-Doping Agency — publishes the Prohibited List of substances banned in competitive sports." },
                ].map(({ term, def }) => (
                  <div
                    key={term}
                    style={{
                      padding: "0.875rem 1rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "8px",
                    }}
                  >
                    <strong style={{ color: "#00D4AA", fontSize: "0.875rem" }}>{term}</strong>
                    <p style={{ color: "#9CA3AF", fontSize: "0.875rem", margin: "0.25rem 0 0 0", lineHeight: 1.6 }}>{def}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Continue reading */}
            <div
              style={{
                marginTop: "3rem",
                padding: "1.75rem",
                background: "rgba(0,212,170,0.05)",
                border: "1px solid rgba(0,212,170,0.15)",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", margin: "0 0 0.5rem 0" }}>
                Ready to Go Deeper?
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.875rem", margin: "0 0 1rem 0" }}>
                Explore individual peptide profiles, compare compounds side-by-side, or take the Peptide Finder Quiz.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/peptides" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "7px", background: "#00D4AA", color: "#0A0A0F", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                  Peptide Library <ArrowRight size={14} />
                </Link>
                <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "7px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F0F0", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
                  Peptide Finder Quiz <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky TOC */}
          <aside style={{ position: "sticky", top: "90px" }} className="guide-toc-desktop">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "1.25rem",
              }}
            >
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                In This Guide
              </p>
              <nav>
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="toc-link"
                    style={{
                      display: "block",
                      padding: "0.35rem 0",
                      color: "#6B7280",
                      textDecoration: "none",
                      fontSize: "0.813rem",
                      borderLeft: "2px solid rgba(255,255,255,0.06)",
                      paddingLeft: "0.75rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .guide-toc-desktop { display: none !important; }
          div[style*="grid-template-columns: 1fr min(280px"] {
            display: block !important;
          }
        }
      `}</style>
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
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          color: "#fff",
          margin: "0 0 1rem 0",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#D1D5DB", fontSize: "1rem", lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}

function InfoBox({ title, children, color = "#00D4AA" }: { title: string; children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        margin: "1.5rem 0",
        padding: "1.25rem",
        background: `${color}08`,
        border: `1px solid ${color}25`,
        borderRadius: "8px",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <p style={{ color, fontWeight: 700, fontSize: "0.813rem", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.5rem 0" }}>
        {title}
      </p>
      <p style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
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
                  color: i === 0 ? "#6B7280" : "#00D4AA",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
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
                    color: ci === 0 ? "#9CA3AF" : "#D1D5DB",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
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
