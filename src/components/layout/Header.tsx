"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/peptides", label: "Peptide Library" },
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Peptide Finder" },
  { href: "/faq", label: "FAQ" },
  { href: "/guide", label: "Beginner's Guide" },
  { href: "/articles", label: "Articles" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(10, 10, 15, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                background: "linear-gradient(135deg, #00D4AA, #00A888)",
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
                color: "#fff",
              }}
            >
              PeptidesMasters
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
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
                  color: pathname === link.href ? "#00D4AA" : "#9CA3AF",
                  background:
                    pathname === link.href
                      ? "rgba(0, 212, 170, 0.1)"
                      : "transparent",
                  transition: "all 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#9CA3AF",
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
                background: "#00D4AA",
                color: "#0A0A0F",
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
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#F0F0F0",
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
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "1rem 1.5rem",
              background: "rgba(10,10,15,0.98)",
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
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0F0F0",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              {searchQuery.length > 1 && (
                <div
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#9CA3AF",
                  }}
                >
                  Press Enter to search · Try &quot;BPC-157&quot;, &quot;fat loss&quot;, &quot;legal status&quot;
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "1rem 1.5rem 1.5rem",
              background: "rgba(10,10,15,0.98)",
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
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  color: pathname === link.href ? "#00D4AA" : "#F0F0F0",
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
                background: "#00D4AA",
                color: "#0A0A0F",
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
