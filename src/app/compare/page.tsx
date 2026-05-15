"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, X, ArrowRight, ExternalLink, GitCompare } from "lucide-react";
import peptides from "@/data/peptides";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";

const popularComparisons = [
  { a: "bpc-157", b: "tb-500", label: "BPC-157 vs TB-500" },
  { a: "semaglutide", b: "nad-plus", label: "Semaglutide vs NAD+" },
  { a: "cjc-1295", b: "ipamorelin", label: "CJC-1295 vs Ipamorelin" },
  { a: "mk-677", b: "ipamorelin", label: "MK-677 vs Ipamorelin" },
  { a: "selank", b: "semax", label: "Selank vs Semax" },
];

const compareRows = [
  { label: "Primary Use Cases", key: "primaryUses", format: (v: string[]) => v.join(", ") },
  { label: "Research Status", key: "researchLevel", format: (v: string) => v },
  { label: "FDA Status", key: "fdaStatus", format: (v: string) => v },
  { label: "Form", key: "form", format: (v: string) => v },
  { label: "Mechanism", key: "mechanismOfAction", format: (v: string) => v.slice(0, 120) + "…" },
  { label: "Stacks With", key: "commonlyStackedWith", format: (v: string[]) => v.join(", ") || "—" },
  { label: "Human Studies", key: "humanStudies", format: (v: number) => v > 0 ? `~${v}` : "None completed" },
  { label: "Animal Studies", key: "animalStudies", format: (v: number) => v > 0 ? `~${v}` : "Limited" },
  { label: "Reported Benefits", key: "reportedBenefits", format: (v: string[]) => v.slice(0, 3).join(" · ") },
  { label: "Reported Risks", key: "reportedRisks", format: (v: string[]) => v.slice(0, 3).join(" · ") },
];

const researchColors: Record<string, string> = {
  "Well-Studied": "#1F6B50",
  Emerging: "#8B6B4A",
  Experimental: "#DC6B6B",
};

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedA, setSelectedA] = useState(searchParams.get("a") || "");
  const [selectedB, setSelectedB] = useState(searchParams.get("b") || "");
  const [selectedC, setSelectedC] = useState(searchParams.get("c") || "");
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [searchC, setSearchC] = useState("");
  const [addThird, setAddThird] = useState(!!searchParams.get("c"));

  const peptideA = peptides.find((p) => p.slug === selectedA);
  const peptideB = peptides.find((p) => p.slug === selectedB);
  const peptideC = addThird ? peptides.find((p) => p.slug === selectedC) : undefined;

  const canCompare = peptideA && peptideB;

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedA) params.set("a", selectedA);
    if (selectedB) params.set("b", selectedB);
    if (selectedC && addThird) params.set("c", selectedC);
    const newUrl = `/compare${params.toString() ? "?" + params.toString() : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [selectedA, selectedB, selectedC, addThird, router]);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/compare?a=${selectedA}&b=${selectedB}${selectedC ? "&c=" + selectedC : ""}`
      : "";

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "0.75rem" }}>
          <span style={{ color: "#A89E98", fontSize: "0.813rem" }}>
            <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>Home</Link>
            {" › "}
            <span style={{ color: "#6B6460" }}>Compare Peptides</span>
          </span>
        </nav>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#1A1614",
            margin: "0 0 0.5rem 0",
          }}
        >
          <GitCompare size={32} color="#3B82A0" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.5rem" }} />
          Peptide Comparison Tool
        </h1>
        <p style={{ color: "#6B6460", margin: 0 }}>
          Select 2–3 peptides to compare side-by-side. Share your comparison with a unique URL.
        </p>
      </div>

      {/* Popular comparisons */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ color: "#A89E98", fontSize: "0.813rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
          Popular Comparisons
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {popularComparisons.map((comp) => (
            <button
              key={comp.label}
              onClick={() => {
                setSelectedA(comp.a);
                setSelectedB(comp.b);
                setSelectedC("");
                setAddThird(false);
              }}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                cursor: "pointer",
                background:
                  selectedA === comp.a && selectedB === comp.b
                    ? "rgba(59,130,160,0.1)"
                    : "rgba(0,0,0,0.04)",
                border:
                  selectedA === comp.a && selectedB === comp.b
                    ? "1px solid rgba(59,130,160,0.35)"
                    : "1px solid #E8E2D8",
                color:
                  selectedA === comp.a && selectedB === comp.b ? "#3B82A0" : "#6B6460",
              }}
            >
              {comp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selector row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: addThird ? "1fr 1fr 1fr auto" : "1fr 1fr auto",
          gap: "1rem",
          marginBottom: "2rem",
          alignItems: "end",
        }}
      >
        <PeptideSelector
          label="Peptide A"
          value={selectedA}
          search={searchA}
          setSearch={setSearchA}
          onSelect={setSelectedA}
          accent="#3B82A0"
        />
        <PeptideSelector
          label="Peptide B"
          value={selectedB}
          search={searchB}
          setSearch={setSearchB}
          onSelect={setSelectedB}
          accent="#8B6B4A"
        />
        {addThird && (
          <PeptideSelector
            label="Peptide C"
            value={selectedC}
            search={searchC}
            setSearch={setSearchC}
            onSelect={setSelectedC}
            accent="#7B6BA0"
          />
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {!addThird ? (
            <button
              onClick={() => setAddThird(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 0.875rem",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E8E2D8",
                color: "#6B6460",
                cursor: "pointer",
                fontSize: "0.813rem",
                whiteSpace: "nowrap",
              }}
            >
              <Plus size={14} /> Add 3rd
            </button>
          ) : (
            <button
              onClick={() => { setAddThird(false); setSelectedC(""); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 0.875rem",
                borderRadius: "8px",
                background: "rgba(220,107,107,0.08)",
                border: "1px solid rgba(220,107,107,0.2)",
                color: "#DC6B6B",
                cursor: "pointer",
                fontSize: "0.813rem",
                whiteSpace: "nowrap",
              }}
            >
              <X size={14} /> Remove
            </button>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {canCompare ? (
        <>
          {/* Share URL */}
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              background: "#FFFFFF",
              border: "1px solid #E8E2D8",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <ExternalLink size={14} color="#A89E98" />
            <span style={{ color: "#A89E98", fontSize: "0.813rem" }}>Shareable URL:</span>
            <code
              style={{
                color: "#3B82A0",
                fontSize: "0.813rem",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {shareUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "6px",
                background: "rgba(59,130,160,0.08)",
                border: "1px solid rgba(59,130,160,0.22)",
                color: "#3B82A0",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "0.875rem 1rem",
                      textAlign: "left",
                      color: "#A89E98",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid #E8E2D8",
                      width: "20%",
                      background: "#F5F2ED",
                    }}
                  >
                    Criteria
                  </th>
                  {[peptideA, peptideB, peptideC].filter(Boolean).map((p, i) => (
                    <th
                      key={p!.slug}
                      style={{
                        padding: "0.875rem 1rem",
                        textAlign: "left",
                        borderBottom: "1px solid #E8E2D8",
                        background: "#F5F2ED",
                      }}
                    >
                      <Link
                        href={`/peptides/${p!.slug}`}
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: i === 0 ? "#3B82A0" : i === 1 ? "#8B6B4A" : "#7B6BA0",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        {p!.name} <ArrowRight size={12} />
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, rowIdx) => (
                  <tr
                    key={row.key}
                    style={{
                      background: rowIdx % 2 === 0 ? "rgba(0,0,0,0.02)" : "#FFFFFF",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.875rem 1rem",
                        color: "#6B6460",
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        borderBottom: "1px solid #E8E2D8",
                        verticalAlign: "top",
                      }}
                    >
                      {row.label}
                    </td>
                    {[peptideA, peptideB, peptideC].filter(Boolean).map((p) => {
                      const val = (p as unknown as Record<string, unknown>)[row.key];
                      const formatted = (row.format as (v: unknown) => string)(val);
                      const isResearch = row.key === "researchLevel";
                      return (
                        <td
                          key={p!.slug}
                          style={{
                            padding: "0.875rem 1rem",
                            fontSize: "0.875rem",
                            lineHeight: 1.6,
                            borderBottom: "1px solid #E8E2D8",
                            verticalAlign: "top",
                            color: isResearch ? researchColors[formatted] || "#3A3330" : "#3A3330",
                            fontWeight: isResearch ? 600 : 400,
                          }}
                        >
                          {formatted}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Affiliate row */}
                <tr>
                  <td
                    style={{
                      padding: "0.875rem 1rem",
                      color: "#6B6460",
                      fontSize: "0.813rem",
                      fontWeight: 600,
                      borderBottom: "1px solid #E8E2D8",
                    }}
                  >
                    Research Suppliers
                  </td>
                  {[peptideA, peptideB, peptideC].filter(Boolean).map((p) => (
                    <td
                      key={p!.slug}
                      style={{
                        padding: "0.875rem 1rem",
                        borderBottom: "1px solid #E8E2D8",
                      }}
                    >
                      {/* AFFILIATE: swap [AFFILIATE_LINK_PEPTIDE_NAME] with actual affiliate URL */}
                      <a
                        href={`[AFFILIATE_LINK_${p!.affiliatePlaceholder}]`}
                        className="affiliate-link"
                        data-product={p!.name}
                        style={{
                          color: "#8B6B4A",
                          fontSize: "0.813rem",
                          textDecoration: "none",
                          border: "1px solid rgba(139,107,74,0.3)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        View {p!.name} <span style={{ opacity: 0.7 }}>(affiliate)</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <MedicalDisclaimer />
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1.5rem",
            background: "rgba(0,0,0,0.02)",
            borderRadius: "12px",
            border: "1px dashed #E8E2D8",
          }}
        >
          <GitCompare size={48} color="#A89E98" style={{ marginBottom: "1rem" }} />
          <p style={{ color: "#A89E98", fontSize: "1.1rem" }}>
            Select at least 2 peptides above to see the comparison
          </p>
        </div>
      )}

      {/* Pre-built comparison links */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#1A1614",
            marginBottom: "1rem",
          }}
        >
          Popular Comparisons
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.75rem" }}>
          {[
            { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500", desc: "Healing and recovery" },
            { href: "/compare/semaglutide-vs-tirzepatide", label: "Semaglutide vs Tirzepatide", desc: "GLP-1 vs GLP-1/GIP for weight loss" },
            { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin", desc: "The most popular GH stack" },
            { href: "/compare/nad-plus-vs-nmn", label: "NAD+ vs NMN", desc: "Longevity pathway comparison" },
            { href: "/compare/mk-677-vs-ipamorelin", label: "MK-677 vs Ipamorelin", desc: "Oral vs injectable GH secretagogues" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "1rem 1.25rem",
                background: "#FFFFFF",
                border: "1px solid #E8E2D8",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <p style={{ color: "#1A1614", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.3rem 0" }}>
                {link.label}
              </p>
              <p style={{ color: "#A89E98", fontSize: "0.8rem", margin: 0 }}>{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PeptideSelector({
  label,
  value,
  search,
  setSearch,
  onSelect,
  accent,
}: {
  label: string;
  value: string;
  search: string;
  setSearch: (v: string) => void;
  onSelect: (v: string) => void;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = peptides.find((p) => p.slug === value);

  const filtered = peptides.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.includes(search.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <p
        style={{
          color: accent,
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </p>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "0.65rem 1rem",
          borderRadius: "8px",
          background: selected ? `${accent}10` : "#FFFFFF",
          border: `1px solid ${selected ? accent + "40" : "#E8E2D8"}`,
          color: selected ? "#1A1614" : "#A89E98",
          textAlign: "left",
          cursor: "pointer",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <span>{selected ? selected.name : "Select a peptide…"}</span>
        {selected && (
          <X
            size={14}
            onClick={(e) => {
              e.stopPropagation();
              onSelect("");
              setSearch("");
            }}
          />
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            background: "#FFFFFF",
            border: "1px solid #E8E2D8",
            borderRadius: "8px",
            marginTop: "4px",
            maxHeight: "280px",
            overflow: "auto",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ padding: "0.5rem" }}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E8E2D8",
                borderRadius: "6px",
                color: "#1A1614",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>
          {filtered.map((p) => (
            <button
              key={p.slug}
              onClick={() => {
                onSelect(p.slug);
                setOpen(false);
                setSearch("");
              }}
              style={{
                width: "100%",
                padding: "0.6rem 0.875rem",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color: value === p.slug ? accent : "#3A3330",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: value === p.slug ? 600 : 400,
                display: "block",
              }}
            >
              {p.name}
              <span style={{ color: "#A89E98", fontSize: "0.75rem", marginLeft: "0.5rem" }}>
                {p.primaryUses[0]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#A89E98" }}>Loading…</div>}>
      <CompareContent />
    </Suspense>
  );
}
