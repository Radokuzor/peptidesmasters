interface AffiliateLinkProps {
  peptideName: string;
  placeholder: string;
  label?: string;
  className?: string;
}

export default function AffiliateLink({
  peptideName,
  placeholder,
  label = "View Research Suppliers",
}: AffiliateLinkProps) {
  return (
    <div
      style={{
        background: "rgba(139, 107, 74, 0.07)",
        border: "1px solid rgba(139, 107, 74, 0.2)",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
      }}
    >
      <p style={{ color: "#6B6460", fontSize: "0.75rem", margin: "0 0 0.5rem 0" }}>
        <strong style={{ color: "#8B6B4A" }}>Affiliate link below</strong> — we may earn a
        commission if you purchase. This does not influence our research coverage.
      </p>
      {/* AFFILIATE: swap [AFFILIATE_LINK_PEPTIDE_NAME] with your actual affiliate URL when ready */}
      <a
        href={`[AFFILIATE_LINK_${placeholder}]`}
        className="affiliate-link"
        data-product={peptideName}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          background: "rgba(139, 107, 74, 0.1)",
          border: "1px solid rgba(139, 107, 74, 0.35)",
          color: "#8B6B4A",
          fontSize: "0.875rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {label} <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>(affiliate link)</span>
      </a>
    </div>
  );
}
