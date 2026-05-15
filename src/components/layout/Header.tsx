"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Search, Menu, X, FlaskConical, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/peptides", label: "Library" },
  { href: "/articles", label: "Articles" },
  { href: "/faq", label: "FAQ" },
  { href: "/guide", label: "Guide" },
];

const toolsLinks = [
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Peptide Finder" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const isToolsActive = toolsLinks.some((l) => pathname === l.href);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(250, 247, 242, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid #E8E2D8",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#3B82A0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlaskConical size={18} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#1A1614",
              }}
            >
              PeptidesMasters
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: pathname === link.href ? "#3B82A0" : "#6B6460",
                  background:
                    pathname === link.href
                      ? "rgba(59, 130, 160, 0.08)"
                      : "transparent",
                  transition: "all 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div ref={toolsRef} style={{ position: "relative" }}>
              <button
                onClick={() => setToolsOpen((o) => !o)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: isToolsActive ? "rgba(59, 130, 160, 0.08)" : "transparent",
                  color: isToolsActive ? "#3B82A0" : "#6B6460",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Tools <ChevronDown size={13} />
              </button>
              {toolsOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    background: "#FFFFFF",
                    border: "1px solid #E8E2D8",
                    borderRadius: "8px",
                    padding: "0.4rem",
                    minWidth: "160px",
                    zIndex: 50,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setToolsOpen(false)}
                      style={{
                        display: "block",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "5px",
                        color: pathname === link.href ? "#3B82A0" : "#6B6460",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        background:
                          pathname === link.href
                            ? "rgba(59,130,160,0.07)"
                            : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E8E2D8",
                color: "#6B6460",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            <Link
              href="/guide"
              className="hidden-mobile"
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "6px",
                background: "#3B82A0",
                color: "#FFFFFF",
                fontSize: "0.875rem",
                fontWeight: 700,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              Start Here
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile"
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E8E2D8",
                color: "#1A1614",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div
            style={{
              borderTop: "1px solid #E8E2D8",
              padding: "1rem 1.5rem",
              background: "#FAF7F2",
            }}
          >
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <input
                type="text"
                placeholder="Search peptides, articles, FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  border: "1px solid #E8E2D8",
                  color: "#1A1614",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              {searchQuery.length > 1 && (
                <div
                  style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#6B6460" }}
                >
                  Press Enter to search · Try &quot;BPC-157&quot;, &quot;fat loss&quot;,
                  &quot;legal status&quot;
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            style={{
              borderTop: "1px solid #E8E2D8",
              padding: "1rem 1.5rem 1.5rem",
              background: "#FAF7F2",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #E8E2D8",
                  color: pathname === link.href ? "#3B82A0" : "#1A1614",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
            {toolsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #E8E2D8",
                  color: pathname === link.href ? "#3B82A0" : "#1A1614",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/guide"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "8px",
                background: "#3B82A0",
                color: "#FFFFFF",
                textAlign: "center",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Start Here →
            </Link>
          </nav>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
