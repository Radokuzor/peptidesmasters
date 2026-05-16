"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import type { FAQItem } from "@/data/faqs";
import { faqQuestionToSlug } from "@/data/faqs";

export default function FAQSearchClient({
  faqs,
  categories,
}: {
  faqs: FAQItem[];
  categories: string[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        !search ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, search, activeCategory]);

  return (
    <>
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "0.6rem 1rem",
          marginBottom: "1.25rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Search size={16} color="#9CA3AF" />
        <input
          type="text"
          placeholder='Search FAQs... try "legal", "safe", "injectable"'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#111827",
            fontSize: "0.9rem",
          }}
        />
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              fontSize: "0.813rem",
              cursor: "pointer",
              background: activeCategory === cat ? "rgba(253,108,104,0.1)" : "rgba(0,0,0,0.04)",
              border: activeCategory === cat ? "1px solid rgba(253,108,104,0.35)" : "1px solid #E5E7EB",
              color: activeCategory === cat ? "#FD6C68" : "#525456",
              fontWeight: activeCategory === cat ? 600 : 400,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ items grouped by category */}
      {categories
        .filter((cat) => activeCategory === "All" || cat === activeCategory)
        .map((category) => {
          const categoryFAQs = filtered.filter((f) => f.category === category);
          if (categoryFAQs.length === 0) return null;
          return (
            <div key={category} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.813rem",
                  color: "#FD6C68",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.875rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(253,108,104,0.18)",
                }}
              >
                {category}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {categoryFAQs.map((faq) => (
                  <div
                    key={faq.question}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      padding: "1.25rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <h3
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#111827",
                        margin: "0 0 0.5rem 0",
                      }}
                      itemProp="name"
                    >
                      <Link
                        href={`/faq/${faqQuestionToSlug(faq.question)}`}
                        style={{ color: "#111827", textDecoration: "none" }}
                      >
                        {faq.question}
                      </Link>
                    </h3>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p
                        style={{
                          color: "#525456",
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          margin: "0 0 0.75rem 0",
                        }}
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </div>
                    {faq.relatedLink && (
                      <Link
                        href={faq.relatedLink}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          color: "#FD6C68",
                          fontSize: "0.813rem",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {faq.relatedLinkText || "Read more"} <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#9CA3AF" }}>
          <p>No FAQs match your search. Try different keywords.</p>
        </div>
      )}
    </>
  );
}
