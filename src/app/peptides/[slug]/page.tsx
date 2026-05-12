import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ChevronRight,
  FlaskConical,
  Scale,
  Syringe,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import peptides, { getPeptideBySlug, getAllPeptideSlugs } from "@/data/peptides";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import AffiliateLink from "@/components/ui/AffiliateLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPeptideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) return {};

  return {
    title: `${peptide.name}: Research, Mechanism, Legal Status`,
    description: `${peptide.tagline} Research status: ${peptide.researchLevel}. Legal: ${peptide.fdaStatus}. ${peptide.mechanismOfAction.slice(0, 100)}`,
    alternates: { canonical: `https://peptidesmasters.com/peptides/${slug}` },
    openGraph: {
      title: `${peptide.name}: What It Is, What the Research Says`,
      description: peptide.tagline,
      type: "article",
      url: `https://peptidesmasters.com/peptides/${slug}`,
    },
  };
}

const researchColors: Record<string, { text: string; bg: string; border: string }> = {
  "Well-Studied": { text: "#00D4AA", bg: "rgba(0,212,170,0.1)", border: "rgba(0,212,170,0.25)" },
  Emerging: { text: "#F5A623", bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.25)" },
  Experimental: { text: "#F87171", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)" },
};

export default async function PeptidePage({ params }: Props) {
  const { slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const colors = researchColors[peptide.researchLevel] || researchColors.Emerging;

  const relatedPeptides = peptides
    .filter(
      (p) =>
        p.slug !== peptide.slug &&
        p.primaryUses.some((u) => peptide.primaryUses.includes(u))
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${peptide.name}: What It Is, What the Research Says, and What You Need to Know`,
    description: peptide.tagline,
    dateModified: peptide.lastUpdated,
    author: { "@type": "Organization", name: "PeptidesMasters.com" },
    publisher: {
      "@type": "Organization",
      name: "PeptidesMasters.com",
      url: "https://peptidesmasters.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidesmasters.com" },
        { "@type": "ListItem", position: 2, name: "Peptide Library", item: "https://peptidesmasters.com/peptides" },
        { "@type": "ListItem", position: 3, name: peptide.name, item: `https://peptidesmasters.com/peptides/${slug}` },
      ],
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: peptide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#6B7280", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/peptides" style={{ color: "#6B7280", textDecoration: "none" }}>Peptide Library</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#F0F0F0" }}>{peptide.name}</span>
          </div>
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr min(320px, 35%)",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Main Content */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {peptide.researchLevel}
                </span>
                {peptide.primaryUses.map((use) => (
                  <span
                    key={use}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      background: "rgba(255,255,255,0.06)",
                      color: "#9CA3AF",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {use}
                  </span>
                ))}
              </div>

              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.15,
                  margin: "0 0 0.75rem 0",
                }}
              >
                {peptide.name}: What It Is, What the Research Says, and What You Need to Know
              </h1>

              <p style={{ color: "#9CA3AF", fontSize: "1.05rem", lineHeight: 1.7, margin: "0 0 0.75rem 0" }}>
                {peptide.tagline}
              </p>

              <p style={{ color: "#4B5563", fontSize: "0.813rem", margin: 0 }}>
                Last updated: {new Date(peptide.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Quick Stats (mobile — show here) */}
            <div
              className="quick-stats-mobile"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "1.25rem",
                marginBottom: "2rem",
                display: "none",
              }}
            >
              <QuickStats peptide={peptide} />
            </div>

            {/* Medical Disclaimer — above the fold on mobile */}
            <div style={{ marginBottom: "2rem" }}>
              <MedicalDisclaimer />
            </div>

            {/* What Is It */}
            <Section title={`What Is ${peptide.name}?`} icon={<FlaskConical size={18} color="#00D4AA" />}>
              {peptide.whatItIs.map((para, i) => (
                <p key={i} style={{ color: "#D1D5DB", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
            </Section>

            {/* What Research Says */}
            <Section title="What Does the Research Say?" icon={<TrendingUp size={18} color="#00D4AA" />}>
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                {peptide.whatResearchSays.map((point, i) => (
                  <li key={i} style={{ color: "#D1D5DB", fontSize: "1rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                    {point}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "0.875rem 1rem",
                  background: "rgba(245,166,35,0.07)",
                  border: "1px solid rgba(245,166,35,0.2)",
                  borderRadius: "8px",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <AlertTriangle size={16} color="#F5A623" style={{ flexShrink: 0, marginTop: "2px" }} />
                <p style={{ color: "#9CA3AF", fontSize: "0.813rem", lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: "#F5A623" }}>Research context:</strong> Animal studies showing
                  positive effects do not guarantee the same results in humans. Human evidence strength
                  varies significantly by peptide — see the Quick Stats sidebar for details.
                </p>
              </div>
            </Section>

            {/* Common Use Cases */}
            <Section title="Common Use Cases in Research" icon={<FlaskConical size={18} color="#00D4AA" />}>
              <p style={{ color: "#9CA3AF", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                <em>These reflect how researchers and research communities discuss this compound — not therapeutic recommendations.</em>
              </p>
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                {peptide.commonUseCases.map((use, i) => (
                  <li key={i} style={{ color: "#D1D5DB", fontSize: "1rem", lineHeight: 1.8, marginBottom: "0.4rem" }}>
                    {use}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Mechanism of Action */}
            <Section title="How It Works (Mechanism of Action)" icon={<FlaskConical size={18} color="#00D4AA" />}>
              <p style={{ color: "#D1D5DB", fontSize: "1rem", lineHeight: 1.8 }}>
                {peptide.mechanismOfAction}
              </p>
            </Section>

            {/* Benefits and Risks side by side */}
            <Section title="Reported Benefits &amp; Risks" icon={<Scale size={18} color="#00D4AA" />}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "rgba(0,212,170,0.05)",
                    border: "1px solid rgba(0,212,170,0.15)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <p style={{ color: "#00D4AA", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                    Reported Benefits
                  </p>
                  {peptide.reportedBenefits.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <CheckCircle2 size={14} color="#00D4AA" style={{ flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "rgba(239,68,68,0.05)",
                    border: "1px solid rgba(239,68,68,0.15)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <p style={{ color: "#F87171", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                    Reported Risks
                  </p>
                  {peptide.reportedRisks.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <XCircle size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* FAQ Section */}
            <Section title="What People Ask" icon={<FlaskConical size={18} color="#00D4AA" />}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {peptide.faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      padding: "1.25rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#fff",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <p style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Legal Status */}
            <Section title="Legal &amp; Regulatory Status" icon={<Scale size={18} color="#F5A623" />}>
              <div
                style={{
                  background: "rgba(245,166,35,0.06)",
                  border: "1px solid rgba(245,166,35,0.2)",
                  borderRadius: "8px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ color: "#F5A623", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    FDA Status
                  </span>
                  <p style={{ color: "#F0F0F0", fontWeight: 600, margin: "0.25rem 0 0 0" }}>{peptide.fdaStatus}</p>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {peptide.legalStatus}
                </p>
              </div>
            </Section>

            {/* Cited Studies */}
            {peptide.studies.length > 0 && (
              <Section title="Cited Research" icon={<ExternalLink size={18} color="#00D4AA" />}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {peptide.studies.map((study, i) => (
                    <a
                      key={i}
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        padding: "0.875rem 1rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#00D4AA",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          flexShrink: 0,
                        }}
                      >
                        [{i + 1}]
                      </span>
                      <div>
                        <p style={{ color: "#F0F0F0", fontSize: "0.875rem", margin: "0 0 0.25rem 0", lineHeight: 1.5 }}>
                          {study.title}
                        </p>
                        <p style={{ color: "#6B7280", fontSize: "0.8rem", margin: 0 }}>
                          {study.source} · {study.year} <ExternalLink size={10} style={{ verticalAlign: "middle" }} />
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </Section>
            )}

            {/* Commonly Stacked With */}
            {peptide.commonlyStackedWith.length > 0 && (
              <Section title="Commonly Stacked With" icon={<Syringe size={18} color="#00D4AA" />}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {peptide.commonlyStackedWith.map((name) => {
                    const related = peptides.find(
                      (p) => p.name === name || p.slug === name.toLowerCase().replace(/[^a-z0-9]/g, "-")
                    );
                    return related ? (
                      <Link
                        key={name}
                        href={`/peptides/${related.slug}`}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          background: "rgba(0,212,170,0.08)",
                          border: "1px solid rgba(0,212,170,0.2)",
                          color: "#00D4AA",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        {name} <ArrowRight size={12} />
                      </Link>
                    ) : (
                      <span
                        key={name}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#9CA3AF",
                          fontSize: "0.875rem",
                        }}
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
                {peptide.commonlyStackedWith.length >= 2 && (
                  <Link
                    href={`/compare?a=${peptide.slug}&b=${
                      peptides.find((p) => p.name === peptide.commonlyStackedWith[0])?.slug || ""
                    }`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginTop: "0.75rem",
                      color: "#00D4AA",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Compare in the Compare Tool <ArrowRight size={14} />
                  </Link>
                )}
              </Section>
            )}

            {/* Affiliate Section */}
            <Section title="Research Suppliers" icon={<ExternalLink size={18} color="#F5A623" />}>
              <AffiliateLink
                peptideName={peptide.name}
                placeholder={peptide.affiliatePlaceholder}
                label={`View ${peptide.name} Research Suppliers`}
              />
            </Section>

            {/* Related Peptides */}
            {relatedPeptides.length > 0 && (
              <Section title="Related Peptides" icon={<ArrowRight size={18} color="#00D4AA" />}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {relatedPeptides.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/peptides/${rel.slug}`}
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
                        <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.2rem 0" }}>
                          {rel.name}
                        </p>
                        <p style={{ color: "#6B7280", fontSize: "0.8rem", margin: 0 }}>{rel.tagline.slice(0, 60)}…</p>
                      </div>
                      <ArrowRight size={14} color="#00D4AA" />
                    </Link>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Sidebar — Quick Stats */}
          <aside
            className="quick-stats-desktop"
            style={{
              position: "sticky",
              top: "90px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  margin: "0 0 1rem 0",
                }}
              >
                Quick Stats
              </h2>
              <QuickStats peptide={peptide} />
            </div>

            {/* Compare CTA */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1.25rem",
                background: "rgba(0,212,170,0.05)",
                border: "1px solid rgba(0,212,170,0.15)",
                borderRadius: "10px",
              }}
            >
              <p style={{ color: "#00D4AA", fontWeight: 600, fontSize: "0.875rem", margin: "0 0 0.5rem 0" }}>
                Compare {peptide.name}
              </p>
              <p style={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.5, margin: "0 0 0.75rem 0" }}>
                See how it stacks up against other peptides
              </p>
              <Link
                href={`/compare?a=${peptide.slug}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  background: "#00D4AA",
                  color: "#0A0A0F",
                  fontWeight: 700,
                  fontSize: "0.813rem",
                  textDecoration: "none",
                }}
              >
                Open Compare Tool
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .quick-stats-mobile { display: block !important; }
          .quick-stats-desktop { display: none !important; }
          div[style*="grid-template-columns: 1fr min(320px"] {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .quick-stats-mobile { display: none !important; }
          .quick-stats-desktop { display: block !important; }
        }
      `}</style>
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {icon}
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#fff",
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      {children}
    </div>
  );
}

function QuickStats({ peptide }: { peptide: ReturnType<typeof getPeptideBySlug> & object }) {
  if (!peptide) return null;
  const colors = researchColors[peptide.researchLevel] || researchColors.Emerging;

  const stats = [
    { label: "Also Known As", value: peptide.alsoKnownAs.join(", ") || "—" },
    { label: "Primary Uses", value: peptide.primaryUses.join(", ") },
    { label: "Form", value: peptide.form },
    {
      label: "Research Status",
      value: peptide.researchLevel,
      color: colors.text,
    },
    { label: "FDA Status", value: peptide.fdaStatus },
    {
      label: "Human Studies",
      value: peptide.humanStudies > 0 ? `~${peptide.humanStudies}` : "None completed",
    },
    {
      label: "Animal Studies",
      value: peptide.animalStudies > 0 ? `~${peptide.animalStudies}` : "Limited",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            style={{
              color: "#6B7280",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 0.2rem 0",
            }}
          >
            {stat.label}
          </p>
          <p
            style={{
              color: stat.color || "#F0F0F0",
              fontSize: "0.875rem",
              fontWeight: stat.color ? 600 : 400,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {stat.value}
          </p>
        </div>
      ))}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}>
        <p
          style={{
            color: "#6B7280",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            margin: "0 0 0.4rem 0",
          }}
        >
          Legal Status
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
          {peptide.legalStatus}
        </p>
      </div>
    </div>
  );
}
