import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#F0EBE3",
        borderTop: "1px solid #E8E2D8",
        paddingTop: "3rem",
        paddingBottom: "2rem",
        marginBottom: "64px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "#3B82A0",
                  borderRadius: "6px",
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
                  fontSize: "1rem",
                  color: "#1A1614",
                }}
              >
                PeptidesMasters
              </span>
            </Link>
            <p style={{ color: "#6B6460", fontSize: "0.813rem", lineHeight: 1.6 }}>
              An educational resource for peptide research. Evidence-based. Cited. Updated regularly.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4
              style={{
                color: "#1A1614",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
              }}
            >
              Learn
            </h4>
            <FooterLinks
              links={[
                { href: "/guide", label: "Beginner's Guide" },
                { href: "/peptides", label: "Peptide Library" },
                { href: "/articles", label: "Articles" },
                { href: "/faq", label: "FAQ Hub" },
              ]}
            />
          </div>

          {/* Tools */}
          <div>
            <h4
              style={{
                color: "#1A1614",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
              }}
            >
              Tools
            </h4>
            <FooterLinks
              links={[
                { href: "/compare", label: "Compare Peptides" },
                { href: "/quiz", label: "Peptide Finder Quiz" },
                { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
                { href: "/compare/semaglutide-vs-tirzepatide", label: "Semaglutide vs Tirzepatide" },
              ]}
            />
          </div>

          {/* Popular Peptides */}
          <div>
            <h4
              style={{
                color: "#1A1614",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
              }}
            >
              Popular Peptides
            </h4>
            <FooterLinks
              links={[
                { href: "/peptides/bpc-157", label: "BPC-157" },
                { href: "/peptides/tb-500", label: "TB-500" },
                { href: "/peptides/semaglutide", label: "Semaglutide" },
                { href: "/peptides/nad-plus", label: "NAD+" },
                { href: "/peptides/ghk-cu", label: "GHK-Cu" },
              ]}
            />
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                color: "#1A1614",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
              }}
            >
              Legal
            </h4>
            <FooterLinks
              links={[
                { href: "/legal", label: "Disclaimer & Legal" },
                { href: "/articles/are-peptides-legal-us-2026", label: "Are Peptides Legal?" },
                { href: "/articles/ftc-peptide-marketing", label: "FTC & Affiliates" },
              ]}
            />
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div
          style={{
            background: "rgba(139,107,74,0.07)",
            border: "1px solid rgba(139,107,74,0.2)",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "#6B6460", fontSize: "0.813rem", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#8B6B4A" }}>Affiliate Disclosure:</strong> PeptidesMasters.com participates in affiliate programs.
            When you click certain links and make a purchase, we may earn a commission at no extra cost to you.
            This never influences our editorial content. All reviews and recommendations are based on research
            quality and user benefit, not commission rates.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div
          style={{
            background: "rgba(59,130,160,0.06)",
            border: "1px solid rgba(59,130,160,0.18)",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "#6B6460", fontSize: "0.813rem", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#3B82A0" }}>Medical Disclaimer:</strong> PeptidesMasters.com is for
            educational purposes only. Nothing on this site constitutes medical advice, diagnosis, or treatment.
            Always consult a licensed healthcare provider before using any compound discussed here.
            Research peptides are not FDA-approved for human use unless stated otherwise.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #E8E2D8",
            paddingTop: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "#A89E98", fontSize: "0.813rem", margin: 0 }}>
            © 2026 PeptidesMasters.com · All rights reserved
          </p>
          <p style={{ color: "#A89E98", fontSize: "0.813rem", margin: 0 }}>
            Evidence-Based · Sources Cited · Updated Regularly
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            style={{
              color: "#6B6460",
              fontSize: "0.813rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
