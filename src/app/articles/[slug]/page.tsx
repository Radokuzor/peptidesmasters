import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, ExternalLink, ArrowRight } from "lucide-react";
import articles, { getArticleBySlug, getAllArticleSlugs } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import AffiliateLink from "@/components/ui/AffiliateLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `https://peptidesmasters.com/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = article.relatedSlugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as typeof articles;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "PeptidesMasters.com" },
    publisher: { "@type": "Organization", name: "PeptidesMasters.com" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidesmasters.com" },
        { "@type": "ListItem", position: 2, name: "Articles", item: "https://peptidesmasters.com/articles" },
        { "@type": "ListItem", position: 3, name: article.title, item: `https://peptidesmasters.com/articles/${slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#A89E98", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/articles" style={{ color: "#A89E98", textDecoration: "none" }}>Articles</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#6B6460", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", whiteSpace: "nowrap" }}>
              {article.title}
            </span>
          </div>
        </nav>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "999px",
              background: "rgba(59,130,160,0.08)",
              border: "1px solid rgba(59,130,160,0.22)",
              color: "#3B82A0",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {article.category}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#A89E98", fontSize: "0.75rem" }}>
            <Clock size={11} /> {article.readTime} min read
          </span>
          <span style={{ color: "#A89E98", fontSize: "0.75rem" }}>{formatDate(article.publishedAt)}</span>
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#1A1614",
            lineHeight: 1.15,
            margin: "0 0 1rem 0",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            color: "#6B6460",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            margin: "0 0 1.5rem 0",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #E8E2D8",
          }}
        >
          {article.summary}
        </p>

        <MedicalDisclaimer />

        {/* Article body */}
        <article style={{ marginTop: "2rem" }}>
          {article.content.map((section, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              {section.heading && (
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: "#1A1614",
                    margin: "0 0 0.875rem 0",
                  }}
                >
                  {section.heading}
                </h2>
              )}
              <p style={{ color: "#3A3330", fontSize: "1rem", lineHeight: 1.85, margin: 0 }}>
                {section.body}
              </p>
              {section.sources && section.sources.length > 0 && (
                <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {section.sources.map((source, si) => (
                    <a
                      key={si}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.813rem",
                        color: "#3B82A0",
                        textDecoration: "none",
                        padding: "0.4rem 0.75rem",
                        background: "rgba(59,130,160,0.05)",
                        borderRadius: "6px",
                        border: "1px solid rgba(59,130,160,0.15)",
                      }}
                    >
                      <ExternalLink size={12} />
                      <span className="citation">[{si + 1}]</span>
                      {source.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Affiliate */}
        {article.affiliatePeptide && (
          <div style={{ marginTop: "2rem" }}>
            <AffiliateLink
              peptideName={article.affiliatePeptide.replace(/_/g, " ")}
              placeholder={article.affiliatePeptide}
              label="View Research Suppliers"
            />
          </div>
        )}

        {/* Tags */}
        <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: "999px",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E8E2D8",
                color: "#6B6460",
                fontSize: "0.8rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#1A1614",
                marginBottom: "1rem",
              }}
            >
              Related Articles
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "#FFFFFF",
                    border: "1px solid #E8E2D8",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div>
                    <p style={{ color: "#1A1614", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.25rem 0" }}>
                      {rel.title}
                    </p>
                    <p style={{ color: "#A89E98", fontSize: "0.8rem", margin: 0 }}>
                      {rel.readTime} min · {rel.category}
                    </p>
                  </div>
                  <ArrowRight size={14} color="#3B82A0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
