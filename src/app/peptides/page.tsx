"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Filter, X, Search } from "lucide-react";
import peptides, { type Goal, type PeptideForm, type ResearchLevel } from "@/data/peptides";
import PeptideCard from "@/components/ui/PeptideCard";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";

const goals: Goal[] = [
  "Fat Loss",
  "Muscle Recovery",
  "Longevity",
  "Cognitive Performance",
  "Injury Healing",
  "Skin & Beauty",
  "Hormonal Health",
];
const forms: PeptideForm[] = ["Injectable", "Oral", "Topical", "Nasal"];
const researchLevels: ResearchLevel[] = ["Well-Studied", "Emerging", "Experimental"];

function PeptideLibraryContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get("goal") || "";

  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<Goal | "">(initialGoal as Goal | "");
  const [selectedForm, setSelectedForm] = useState<PeptideForm | "">("");
  const [selectedLevel, setSelectedLevel] = useState<ResearchLevel | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return peptides.filter((p) => {
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.tagline.toLowerCase().includes(search.toLowerCase()) &&
        !p.alsoKnownAs.some((a) => a.toLowerCase().includes(search.toLowerCase()))
      ) {
        return false;
      }
      if (selectedGoal && !p.primaryUses.includes(selectedGoal)) return false;
      if (selectedForm && !p.form.includes(selectedForm)) return false;
      if (selectedLevel && p.researchLevel !== selectedLevel) return false;
      return true;
    });
  }, [search, selectedGoal, selectedForm, selectedLevel]);

  const hasFilters = selectedGoal || selectedForm || selectedLevel;

  function clearFilters() {
    setSelectedGoal("");
    setSelectedForm("");
    setSelectedLevel("");
    setSearch("");
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "0.75rem" }}>
          <span style={{ color: "#A89E98", fontSize: "0.813rem" }}>
            <Link href="/" style={{ color: "#A89E98", textDecoration: "none" }}>Home</Link>
            {" › "}
            <span style={{ color: "#6B6460" }}>Peptide Library</span>
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
          Peptide Library
        </h1>
        <p style={{ color: "#6B6460", fontSize: "1rem", margin: 0 }}>
          {peptides.length} peptides with cited research, plain-English explanations, and legal breakdowns
        </p>
      </div>

      {/* Search + Filter bar */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#FFFFFF",
            border: "1px solid #E8E2D8",
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Search size={16} color="#A89E98" />
          <input
            type="text"
            placeholder="Search peptides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#1A1614",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: showFilters ? "rgba(59,130,160,0.08)" : "rgba(0,0,0,0.04)",
            border: showFilters ? "1px solid rgba(59,130,160,0.3)" : "1px solid #E8E2D8",
            color: showFilters ? "#3B82A0" : "#6B6460",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          <Filter size={15} />
          Filters {hasFilters ? `(${[selectedGoal, selectedForm, selectedLevel].filter(Boolean).length})` : ""}
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 0.875rem",
              borderRadius: "8px",
              background: "rgba(220,107,107,0.08)",
              border: "1px solid rgba(220,107,107,0.2)",
              color: "#DC6B6B",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E2D8",
            borderRadius: "10px",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <FilterGroup
            label="Goal"
            options={goals}
            selected={selectedGoal}
            onSelect={(v) => setSelectedGoal(v as Goal | "")}
          />
          <FilterGroup
            label="Form"
            options={forms}
            selected={selectedForm}
            onSelect={(v) => setSelectedForm(v as PeptideForm | "")}
          />
          <FilterGroup
            label="Research Level"
            options={researchLevels}
            selected={selectedLevel}
            onSelect={(v) => setSelectedLevel(v as ResearchLevel | "")}
          />
        </div>
      )}

      {/* Active filter chips */}
      {hasFilters && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {selectedGoal && (
            <Chip label={selectedGoal} onRemove={() => setSelectedGoal("")} />
          )}
          {selectedForm && (
            <Chip label={selectedForm} onRemove={() => setSelectedForm("")} />
          )}
          {selectedLevel && (
            <Chip label={selectedLevel} onRemove={() => setSelectedLevel("")} />
          )}
        </div>
      )}

      {/* Results count */}
      <p style={{ color: "#A89E98", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
        Showing {filtered.length} of {peptides.length} peptides
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((peptide) => (
            <PeptideCard key={peptide.slug} peptide={peptide} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1.5rem",
            color: "#A89E98",
          }}
        >
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No peptides match your filters</p>
          <button
            onClick={clearFilters}
            style={{
              color: "#3B82A0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.875rem",
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ marginTop: "3rem" }}>
        <MedicalDisclaimer />
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <p
        style={{
          color: "#6B6460",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(selected === opt ? "" : opt)}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "6px",
              fontSize: "0.8rem",
              cursor: "pointer",
              background: selected === opt ? "rgba(59,130,160,0.1)" : "rgba(0,0,0,0.04)",
              border: selected === opt ? "1px solid rgba(59,130,160,0.35)" : "1px solid #E8E2D8",
              color: selected === opt ? "#3B82A0" : "#6B6460",
              fontWeight: selected === opt ? 600 : 400,
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.25rem 0.65rem",
        borderRadius: "999px",
        background: "rgba(59,130,160,0.08)",
        border: "1px solid rgba(59,130,160,0.22)",
        color: "#3B82A0",
        fontSize: "0.8rem",
        fontWeight: 500,
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{ background: "none", border: "none", color: "#3B82A0", cursor: "pointer", padding: 0, lineHeight: 1 }}
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default function PeptideLibraryPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#A89E98" }}>Loading...</div>}>
      <PeptideLibraryContent />
    </Suspense>
  );
}
