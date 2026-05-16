"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
}

interface Props {
  items: TocItem[];
}

export default function ArticleTableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0% -55% 0%", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const TocList = ({ onClick }: { onClick?: () => void }) => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id} style={{ position: "relative" }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                onClick?.();
              }}
              style={{
                display: "block",
                padding: "5px 0 5px 14px",
                fontSize: "0.813rem",
                lineHeight: 1.5,
                color: isActive ? "#FD6C68" : "#525456",
                textDecoration: "none",
                borderLeft: isActive ? "2px solid #FD6C68" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside
        className="toc-sidebar-desktop"
        style={{
          position: "sticky",
          top: "90px",
          width: "240px",
          flexShrink: 0,
          maxHeight: "calc(100vh - 110px)",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#9CA3AF",
            margin: "0 0 0.875rem 0",
            fontFamily: "Syne, sans-serif",
          }}
        >
          Contents
        </p>
        <TocList />
      </aside>

      {/* Mobile collapsible */}
      <div
        className="toc-mobile-wrapper"
        style={{
          display: "none",
          marginBottom: "1.5rem",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.875rem 1rem",
            background: "#F8F9FA",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#111827",
            fontFamily: "Syne, sans-serif",
          }}
        >
          <span>Table of contents</span>
          <ChevronDown
            size={17}
            style={{
              transition: "transform 0.2s",
              transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "#525456",
            }}
          />
        </button>
        {mobileOpen && (
          <div style={{ padding: "0.75rem 1rem 1rem", background: "#FFFFFF" }}>
            <TocList onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .toc-sidebar-desktop { display: none !important; }
          .toc-mobile-wrapper { display: block !important; }
        }
        @media (min-width: 901px) {
          .toc-sidebar-desktop { display: block !important; }
          .toc-mobile-wrapper { display: none !important; }
        }
        .toc-sidebar-desktop::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
