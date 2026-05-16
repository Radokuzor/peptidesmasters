"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const isToolsActive = toolsLinks.some((l) => pathname === l.href);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
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
                width: "30px",
                height: "30px",
                background: "#FD6C68",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlaskConical size={16} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#111827",
                letterSpacing: "-0.01em",
              }}
            >
              PeptidesMasters
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}
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
                  color: pathname === link.href ? "#FD6C68" : "#525456",
                  background:
                    pathname === link.href
                      ? "rgba(253,108,104,0.08)"
                      : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setToolsOpen((o) => !o)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: isToolsActive ? "rgba(253,108,104,0.08)" : "transparent",
                  color: isToolsActive ? "#FD6C68" : "#525456",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Tools <ChevronDown size={12} />
              </button>
              {toolsOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "0.375rem",
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
                        color: pathname === link.href ? "#FD6C68" : "#525456",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        background:
                          pathname === link.href
                            ? "rgba(253,108,104,0.07)"
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
                padding: "0.45rem",
                borderRadius: "6px",
                background: "transparent",
                border: "1px solid #E5E7EB",
                color: "#525456",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Search"
            >
              <Search size={15} />
            </button>

            <Link
              href="/guide"
              className="hidden-mobile"
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "6px",
                background: "#FD6C68",
                color: "#FFFFFF",
                fontSize: "0.875rem",
                fontWeight: 700,
                textDecoration: "none",
                flexShrink: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Start Here
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile"
              style={{
                padding: "0.45rem",
                borderRadius: "6px",
                background: "transparent",
                border: "1px solid #E5E7EB",
                color: "#111827",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              padding: "1rem 1.5rem",
              background: "#FFFFFF",
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
                  background: "#F8F9FA",
                  border: "1px solid #E5E7EB",
                  color: "#111827",
                  fontSize: "1rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              {searchQuery.length > 1 && (
                <div
                  style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#525456" }}
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
              borderTop: "1px solid #E5E7EB",
              padding: "1rem 1.5rem 1.5rem",
              background: "#FFFFFF",
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
                  borderBottom: "1px solid #E5E7EB",
                  color: pathname === link.href ? "#FD6C68" : "#111827",
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
                  borderBottom: "1px solid #E5E7EB",
                  color: pathname === link.href ? "#FD6C68" : "#111827",
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
                background: "#FD6C68",
                color: "#FFFFFF",
                textAlign: "center",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Start Here →
            </Link>
          </nav>
        )}

        {/* Reading progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "transparent",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${scrollProgress}%`,
              background: "#FD6C68",
              transition: "width 0.1s linear",
            }}
          />
        </div>
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
