import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Scale, AlertTriangle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal & Disclaimer — FDA, FTC, and Medical Disclaimer",
  description:
    "PeptidesMasters.com legal disclaimers — FDA peptide classification, FTC affiliate disclosure, medical disclaimer, and what 'research use only' means.",
  alternates: { canonical: "https://peptidesmasters.com/legal" },
};

export default function LegalPage() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.813rem", color: "#A89E98" }}>
          <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={12} />
          <span style={{ color: "#6B6460" }}>Legal & Disclaimer</span>
        </div>
      </nav>

      <h1
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "#1A1614",
          margin: "0 0 1rem 0",
        }}
      >
        Legal & Disclaimer
      </h1>
      <p style={{ color: "#A89E98", fontSize: "0.813rem", marginBottom: "2.5rem" }}>
        Last updated: May 1, 2026
      </p>

      {/* Medical Disclaimer */}
      <LegalSection
        icon={<ShieldCheck size={22} color="#3B82A0" />}
        title="Medical Disclaimer"
        accent="#3B82A0"
      >
        <p>
          <strong>PeptidesMasters.com is for educational and informational purposes only.</strong> Nothing on
          this website constitutes medical advice, diagnosis, or treatment. The information provided is
          not a substitute for professional medical advice, diagnosis, or treatment from a licensed healthcare
          provider.
        </p>
        <p>
          Always seek the advice of your physician or other qualified health provider with any questions you
          may have regarding a medical condition, compound, or treatment regimen. Never disregard professional
          medical advice or delay seeking it because of something you have read on this website.
        </p>
        <p>
          If you think you may have a medical emergency, call your doctor or 911 immediately. PeptidesMasters.com
          does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or
          other information that may be mentioned on this website.
        </p>
      </LegalSection>

      {/* FDA Classification */}
      <LegalSection
        icon={<Scale size={22} color="#8B6B4A" />}
        title="FDA Peptide Classification"
        accent="#8B6B4A"
      >
        <p>
          The U.S. Food and Drug Administration (FDA) regulates peptides under various frameworks depending
          on their intended use, formulation, and approval status.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>FDA-Approved Peptides:</strong> Some peptides have completed
          the full FDA approval process and may be legally prescribed by a licensed healthcare provider.
          Examples include semaglutide (Ozempic®, Wegovy®), tirzepatide (Mounjaro®, Zepbound®), and
          bremelanotide (Vyleesi®). These compounds have undergone extensive clinical testing for safety
          and efficacy.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>Research Chemicals:</strong> Most peptides discussed on this
          website (BPC-157, TB-500, CJC-1295, ipamorelin, and others) are classified as research chemicals.
          They have not been approved by the FDA for human therapeutic use. They may be legally purchased
          for bona fide scientific research purposes but cannot legally be sold for human consumption or
          with therapeutic claims.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>Compounded Peptides:</strong> In 2023–2024, the FDA added many
          peptides to lists restricting pharmacy compounding. The regulatory environment for compounded
          peptides continues to evolve. Consult a licensed pharmacist or healthcare provider for current
          information.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>&quot;Research Use Only&quot;:</strong> This designation means a compound
          has not been approved for clinical use. It does not mean a compound is safe, effective, or
          appropriate for personal use. Compounds sold as &quot;research chemicals&quot; are intended for laboratory
          investigation only.
        </p>
      </LegalSection>

      {/* FTC Affiliate Disclosure */}
      <LegalSection
        icon={<ExternalLink size={22} color="#7B6BA0" />}
        title="FTC Affiliate Disclosure"
        accent="#7B6BA0"
      >
        <p>
          PeptidesMasters.com participates in affiliate marketing programs. When you click certain links on
          this website and make a purchase, we may earn a commission at no additional cost to you.
        </p>
        <p>
          This affiliate relationship is disclosed in compliance with the Federal Trade Commission&apos;s
          Endorsement Guides (16 CFR Part 255) and the FTC&apos;s guidelines concerning the use of endorsements
          and testimonials in advertising.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>What this means for you:</strong> All affiliate links on this
          site are clearly labeled with &quot;(affiliate link)&quot; or a visual indicator. Our editorial content
          is never influenced by affiliate relationships. Compounds are discussed based on the quality and
          quantity of research evidence, not commission rates.
        </p>
        <p>
          We only include affiliate links for suppliers or products that we believe maintain reasonable
          quality standards. However, inclusion of an affiliate link is not an endorsement of any specific
          supplier, product, or compound for human use.
        </p>
      </LegalSection>

      {/* Legal Status of Peptides */}
      <LegalSection
        icon={<AlertTriangle size={22} color="#DC6B6B" />}
        title="Legal Status & Sports Regulations"
        accent="#DC6B6B"
      >
        <p>
          <strong style={{ color: "#1A1614" }}>US Legal Status:</strong> Most research peptides are legal
          to purchase as research chemicals in the United States. They are not legal to sell for human
          consumption or with therapeutic claims. Purchasing for personal human use occupies a legal
          gray area.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>WADA / Sports Regulations:</strong> Many research peptides
          are prohibited in competitive sports by the World Anti-Doping Agency (WADA) and national
          anti-doping organizations. Athletes subject to drug testing must consult the current WADA
          Prohibited List before using any compound. This includes growth hormone-releasing peptides (GHRPs),
          growth hormone-releasing hormones (GHRHs), thymosin beta-4 (TB-500), and others.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>International Variations:</strong> Legal status varies
          significantly by country. What is a research chemical in the US may be a controlled substance
          or unapproved drug in another jurisdiction. Always consult local laws before purchasing or
          possessing any compound.
        </p>
        <p>
          <strong style={{ color: "#1A1614" }}>Not Legal Advice:</strong> This website does not provide
          legal advice. The legal information presented here is educational and general in nature.
          For specific legal guidance, consult a qualified attorney familiar with pharmaceutical and
          regulatory law in your jurisdiction.
        </p>
      </LegalSection>

      {/* Website Terms */}
      <LegalSection
        icon={<ShieldCheck size={22} color="#3B82A0" />}
        title="Website Terms of Use"
        accent="#3B82A0"
      >
        <p>
          By using PeptidesMasters.com, you agree that you are accessing this website for educational
          and informational purposes only. You agree not to rely on any information on this website
          as medical advice.
        </p>
        <p>
          PeptidesMasters.com makes reasonable efforts to ensure information is accurate and up-to-date,
          but does not warrant the completeness, accuracy, reliability, or suitability of any information
          on the site. The peptide research landscape changes rapidly; information may become outdated.
        </p>
        <p>
          All content on PeptidesMasters.com is protected by copyright. You may share educational excerpts
          with proper attribution and a link back to the original page.
        </p>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the website constitutes
          acceptance of any changes.
        </p>
      </LegalSection>

      {/* Contact */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "#FFFFFF",
          border: "1px solid #E8E2D8",
          borderRadius: "10px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{ color: "#6B6460", fontSize: "0.875rem", margin: 0 }}>
          Questions about our legal policies or affiliate relationships? Contact us at{" "}
          <a
            href="mailto:legal@peptidesmasters.com"
            style={{ color: "#3B82A0", textDecoration: "none" }}
          >
            legal@peptidesmasters.com
          </a>
        </p>
      </div>

      {/* Navigation back */}
      <div style={{ marginTop: "2rem" }}>
        <Link
          href="/"
          style={{ color: "#3B82A0", textDecoration: "none", fontSize: "0.875rem" }}
        >
          ← Back to PeptidesMasters.com
        </Link>
      </div>
    </div>
  );
}

function LegalSection({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "2.5rem",
        paddingBottom: "2.5rem",
        borderBottom: "1px solid #E8E2D8",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        {icon}
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.35rem",
            color: "#1A1614",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          paddingLeft: "1rem",
          borderLeft: `3px solid ${accent}30`,
          fontSize: "0.95rem",
          lineHeight: 1.85,
          color: "#6B6460",
        }}
      >
        {children}
      </div>
    </div>
  );
}
