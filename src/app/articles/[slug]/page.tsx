import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, ExternalLink, ArrowRight } from "lucide-react";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getArticlesBySlugList,
} from "@/lib/articles-db";
import { formatDate } from "@/lib/utils";
import AffiliateLink from "@/components/ui/AffiliateLink";
import EmailInlineBar from "@/components/ui/EmailInlineBar";
import ArticleLayout from "@/components/layout/ArticleLayout";

// Pre-build existing articles; new ones are rendered on first request and cached
export const dynamicParams = true;
export const revalidate = 3600; // re-check Supabase every hour

interface Props {
  params: Promise<{ slug: string }>;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return []; // Supabase unavailable at build time — pages generated on first request
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = await getArticlesBySlugList(article.relatedSlugs);

  const tocItems = article.content
    .filter((s) => s.heading)
    .map((s) => ({
      id: slugifyHeading(s.heading!),
      text: s.heading!,
    }));

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

      <ArticleLayout tocItems={tocItems}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#9CA3AF", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/articles" style={{ color: "#9CA3AF", textDecoration: "none" }}>Articles</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#525456", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "220px", whiteSpace: "nowrap" }}>
              {article.title}
            </span>
          </div>
        </nav>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "999px",
              background: "rgba(253,108,104,0.08)",
              border: "1px solid rgba(253,108,104,0.22)",
              color: "#E55550",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {article.category}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#9CA3AF", fontSize: "0.75rem" }}>
            <Clock size={11} /> {article.readTime} min read
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{formatDate(article.publishedAt)}</span>
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.15,
            margin: "0 0 1rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            color: "#525456",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            margin: "0 0 1.5rem 0",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {article.summary}
        </p>

        {/* Article body */}
        <article style={{ marginTop: "2rem" }}>
          {article.content.map((section, i) => (
            <div key={i}>
              <div style={{ marginBottom: "2.25rem" }}>
                {section.heading && (
                  <h2
                    id={slugifyHeading(section.heading)}
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      color: "#111827",
                      margin: "0 0 0.875rem 0",
                      letterSpacing: "-0.01em",
                      scrollMarginTop: "90px",
                    }}
                  >
                    {section.heading}
                  </h2>
                )}
                <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.85, margin: 0 }}>
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
                          color: "#FD6C68",
                          textDecoration: "none",
                          padding: "0.4rem 0.75rem",
                          background: "rgba(253,108,104,0.05)",
                          borderRadius: "6px",
                          border: "1px solid rgba(253,108,104,0.15)",
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
              {i === 2 && <EmailInlineBar />}
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
                background: "#F8F9FA",
                border: "1px solid #E5E7EB",
                color: "#525456",
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
                fontSize: "1.2rem",
                color: "#111827",
                marginBottom: "1rem",
                letterSpacing: "-0.01em",
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
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "border-color 0.15s",
                  }}
                >
                  <div>
                    <p style={{ color: "#111827", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.25rem 0" }}>
                      {rel.title}
                    </p>
                    <p style={{ color: "#9CA3AF", fontSize: "0.8rem", margin: 0 }}>
                      {rel.readTime} min · {rel.category}
                    </p>
                  </div>
                  <ArrowRight size={14} color="#FD6C68" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </ArticleLayout>
    </>
  );
}
