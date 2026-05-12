import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import articles, { getArticleCategories } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Peptide Research Articles & Guides",
  description:
    "Evidence-based articles on peptide research — legal breakdowns, compound comparisons, sourcing guides, and research deep dives. All citations included.",
  alternates: { canonical: "https://peptidesmasters.com/articles" },
};

const categoryColors: Record<string, string> = {
  "Research Deep Dives": "#00D4AA",
  "Legal & Regulatory": "#F5A623",
  Comparisons: "#A78BFA",
  "Goal Guides": "#60A5FA",
  Education: "#F472B6",
};

export default function ArticlesPage() {
  const categories = getArticleCategories();

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#6B7280" }}>
          <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={12} />
          <span style={{ color: "#F0F0F0" }}>Articles</span>
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
        Peptide Research Articles
      </h1>
      <p style={{ color: "#9CA3AF", fontSize: "1rem", margin: "0 0 2.5rem 0" }}>
        {articles.length} evidence-based articles with cited sources. Updated regularly.
      </p>

      {/* By category */}
      {categories.map((category) => {
        const categoryArticles = articles.filter((a) => a.category === category);
        const color = categoryColors[category] || "#00D4AA";
        return (
          <div key={category} style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${color}30`,
              }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: color,
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {category}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {categoryArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1rem",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "#fff",
                          margin: "0 0 0.4rem 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {article.title}
                      </h3>
                      <p
                        style={{
                          color: "#9CA3AF",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          margin: "0 0 0.75rem 0",
                        }}
                      >
                        {article.summary}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#6B7280", fontSize: "0.75rem" }}>
                          <Clock size={11} /> {article.readTime} min read
                        </span>
                        <span style={{ color: "#4B5563", fontSize: "0.75rem" }}>
                          {formatDate(article.publishedAt)}
                        </span>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                padding: "2px 7px",
                                borderRadius: "4px",
                                fontSize: "0.7rem",
                                background: "rgba(255,255,255,0.05)",
                                color: "#6B7280",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={18} color="#4B5563" style={{ flexShrink: 0, marginTop: "4px" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
