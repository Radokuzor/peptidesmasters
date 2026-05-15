import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import faqs, { getFAQBySlug, faqQuestionToSlug } from "@/data/faqs";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return faqs.map((faq) => ({ slug: faqQuestionToSlug(faq.question) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) return {};
  return {
    title: faq.question,
    description: faq.answer.slice(0, 160),
    alternates: { canonical: `https://peptidesmasters.com/faq/${slug}` },
  };
}

export default async function FAQItemPage({ params }: Props) {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidesmasters.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://peptidesmasters.com/faq" },
      {
        "@type": "ListItem",
        position: 3,
        name: faq.question,
        item: `https://peptidesmasters.com/faq/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.813rem",
              color: "#A89E98",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/faq" style={{ color: "#A89E98", textDecoration: "none" }}>
              FAQ
            </Link>
            <ChevronRight size={12} />
            <span style={{ color: "#6B6460" }}>{faq.category}</span>
          </div>
        </nav>

        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: "rgba(59,130,160,0.08)",
            color: "#3B82A0",
            border: "1px solid rgba(59,130,160,0.22)",
            marginBottom: "1rem",
          }}
        >
          {faq.category}
        </span>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 800,
            color: "#1A1614",
            lineHeight: 1.2,
            margin: "0 0 1.5rem 0",
          }}
        >
          {faq.question}
        </h1>

        <p
          style={{
            color: "#3A3330",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            margin: "0 0 2rem 0",
          }}
        >
          {faq.answer}
        </p>

        {faq.relatedLink && (
          <Link
            href={faq.relatedLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#3B82A0",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              marginBottom: "2rem",
            }}
          >
            {faq.relatedLinkText ?? "Learn more"} →
          </Link>
        )}

        <div
          style={{
            borderTop: "1px solid #E8E2D8",
            paddingTop: "1.5rem",
          }}
        >
          <Link href="/faq" style={{ color: "#A89E98", fontSize: "0.875rem", textDecoration: "none" }}>
            ← All FAQs
          </Link>
        </div>
      </div>
    </>
  );
}
