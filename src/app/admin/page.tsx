"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Article, ArticleSection } from "@/data/articles";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
);

const CATEGORIES = [
  "Research Deep Dives",
  "Legal & Regulatory",
  "Comparisons",
  "Goal Guides",
  "Education",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const emptySection = (): ArticleSection => ({ heading: "", body: "", sources: [] });

const emptyForm = () => ({
  slug: "",
  title: "",
  category: CATEGORIES[0],
  summary: "",
  publishedAt: new Date().toISOString().split("T")[0],
  readTime: 8,
  tags: "",
  relatedSlugs: "",
  affiliatePeptide: "",
  content: [emptySection()],
});

// ── Login ──────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else onLogin();
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9F9F9" }}>
      <form
        onSubmit={handleSubmit}
        style={{ background: "#FFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "360px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.25rem", fontWeight: 800, margin: "0 0 1.5rem 0" }}>Admin Login</h1>
        <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle} />
        <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ ...inputStyle, marginTop: "0.75rem" }} />
        {error && <p style={{ color: "#DC2626", fontSize: "0.8rem", margin: "0.5rem 0 0 0" }}>{error}</p>}
        <button type="submit" disabled={loading} style={btnPrimary}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ── Article Form ───────────────────────────────────────────────
function ArticleForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Article>;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => {
    if (!initial) return emptyForm();
    return {
      slug: initial.slug ?? "",
      title: initial.title ?? "",
      category: initial.category ?? CATEGORIES[0],
      summary: initial.summary ?? "",
      publishedAt: initial.publishedAt ?? new Date().toISOString().split("T")[0],
      readTime: initial.readTime ?? 8,
      tags: (initial.tags ?? []).join(", "),
      relatedSlugs: (initial.relatedSlugs ?? []).join(", "),
      affiliatePeptide: initial.affiliatePeptide ?? "",
      content: initial.content?.length ? initial.content : [emptySection()],
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initial?.slug);

  function setField(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function setSection(i: number, key: keyof ArticleSection, value: unknown) {
    setForm(f => {
      const content = [...f.content];
      content[i] = { ...content[i], [key]: value };
      return { ...f, content };
    });
  }

  function addSection() {
    setForm(f => ({ ...f, content: [...f.content, emptySection()] }));
  }

  function removeSection(i: number) {
    setForm(f => ({ ...f, content: f.content.filter((_, idx) => idx !== i) }));
  }

  function addSource(sectionIdx: number) {
    setForm(f => {
      const content = [...f.content];
      content[sectionIdx] = {
        ...content[sectionIdx],
        sources: [...(content[sectionIdx].sources ?? []), { label: "", url: "" }],
      };
      return { ...f, content };
    });
  }

  function setSource(sectionIdx: number, sourceIdx: number, key: "label" | "url", value: string) {
    setForm(f => {
      const content = [...f.content];
      const sources = [...(content[sectionIdx].sources ?? [])];
      sources[sourceIdx] = { ...sources[sourceIdx], [key]: value };
      content[sectionIdx] = { ...content[sectionIdx], sources };
      return { ...f, content };
    });
  }

  function removeSource(sectionIdx: number, sourceIdx: number) {
    setForm(f => {
      const content = [...f.content];
      const sources = (content[sectionIdx].sources ?? []).filter((_, i) => i !== sourceIdx);
      content[sectionIdx] = { ...content[sectionIdx], sources };
      return { ...f, content };
    });
  }

  async function handleSave() {
    setError("");
    if (!form.slug || !form.title || !form.summary) {
      setError("Slug, title, and summary are required.");
      return;
    }
    setSaving(true);

    const payload = {
      slug: form.slug,
      title: form.title,
      category: form.category,
      summary: form.summary,
      published_at: form.publishedAt,
      read_time: Number(form.readTime),
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      related_slugs: form.relatedSlugs.split(",").map(s => s.trim()).filter(Boolean),
      affiliate_peptide: form.affiliatePeptide || null,
      content: form.content.map(s => ({
        heading: s.heading || undefined,
        body: s.body,
        sources: s.sources?.filter(src => src.label || src.url) ?? [],
      })),
    };

    const { error: dbErr } = isEdit
      ? await supabase.from("articles").update(payload).eq("slug", initial!.slug!)
      : await supabase.from("articles").insert(payload);

    if (dbErr) {
      setError(dbErr.message);
      setSaving(false);
      return;
    }

    // Trigger ISR revalidation
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: form.slug, secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET }),
    });

    setSaving(false);
    onSave();
  }

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={onCancel} style={btnSecondary}>← Back</button>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>
          {isEdit ? "Edit Article" : "New Article"}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Title + auto-slug */}
        <label style={labelStyle}>
          Title
          <input style={inputStyle} value={form.title}
            onChange={e => {
              setField("title", e.target.value);
              if (!isEdit) setField("slug", slugify(e.target.value));
            }} />
        </label>

        <label style={labelStyle}>
          Slug <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(URL path)</span>
          <input style={inputStyle} value={form.slug} onChange={e => setField("slug", e.target.value)} />
        </label>

        <div style={{ display: "flex", gap: "1rem" }}>
          <label style={{ ...labelStyle, flex: 1 }}>
            Category
            <select style={inputStyle} value={form.category} onChange={e => setField("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label style={{ ...labelStyle, width: "120px" }}>
            Read time (min)
            <input type="number" min={1} style={inputStyle} value={form.readTime}
              onChange={e => setField("readTime", e.target.value)} />
          </label>
          <label style={{ ...labelStyle, width: "160px" }}>
            Published date
            <input type="date" style={inputStyle} value={form.publishedAt}
              onChange={e => setField("publishedAt", e.target.value)} />
          </label>
        </div>

        <label style={labelStyle}>
          Summary
          <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={form.summary}
            onChange={e => setField("summary", e.target.value)} />
        </label>

        <label style={labelStyle}>
          Tags <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(comma-separated)</span>
          <input style={inputStyle} value={form.tags} onChange={e => setField("tags", e.target.value)}
            placeholder="BPC-157, Healing, Research" />
        </label>

        <div style={{ display: "flex", gap: "1rem" }}>
          <label style={{ ...labelStyle, flex: 1 }}>
            Related slugs <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(comma-separated)</span>
            <input style={inputStyle} value={form.relatedSlugs} onChange={e => setField("relatedSlugs", e.target.value)}
              placeholder="bpc-157-complete-research-review, how-to-read-coa" />
          </label>
          <label style={{ ...labelStyle, width: "200px" }}>
            Affiliate peptide <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
            <input style={inputStyle} value={form.affiliatePeptide}
              onChange={e => setField("affiliatePeptide", e.target.value)} placeholder="BPC_157" />
          </label>
        </div>

        {/* Content sections */}
        <div style={{ marginTop: "0.5rem" }}>
          <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: "0 0 0.75rem 0", color: "#374151" }}>
            Content Sections
          </p>
          {form.content.map((section, si) => (
            <div key={si} style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: "1rem", marginBottom: "1rem", background: "#FAFAFA" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "#6B7280" }}>Section {si + 1}</span>
                {form.content.length > 1 && (
                  <button onClick={() => removeSection(si)} style={btnDanger}>Remove</button>
                )}
              </div>
              <label style={labelStyle}>
                Heading <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
                <input style={inputStyle} value={section.heading ?? ""} onChange={e => setSection(si, "heading", e.target.value)} />
              </label>
              <label style={{ ...labelStyle, marginTop: "0.5rem" }}>
                Body
                <textarea rows={5} style={{ ...inputStyle, resize: "vertical", marginTop: "0.25rem" }}
                  value={section.body} onChange={e => setSection(si, "body", e.target.value)} />
              </label>
              {/* Sources */}
              <div style={{ marginTop: "0.75rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", margin: "0 0 0.5rem 0" }}>Sources</p>
                {(section.sources ?? []).map((src, srcIdx) => (
                  <div key={srcIdx} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                    <input placeholder="Label" style={{ ...inputStyle, flex: 1 }} value={src.label}
                      onChange={e => setSource(si, srcIdx, "label", e.target.value)} />
                    <input placeholder="URL" style={{ ...inputStyle, flex: 2 }} value={src.url}
                      onChange={e => setSource(si, srcIdx, "url", e.target.value)} />
                    <button onClick={() => removeSource(si, srcIdx)} style={btnDanger}>×</button>
                  </div>
                ))}
                <button onClick={() => addSource(si)} style={btnSecondary}>+ Add source</button>
              </div>
            </div>
          ))}
          <button onClick={addSection} style={btnSecondary}>+ Add section</button>
        </div>
      </div>

      {error && <p style={{ color: "#DC2626", fontSize: "0.875rem", margin: "1rem 0 0 0" }}>{error}</p>}

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
        <button onClick={handleSave} disabled={saving} style={btnPrimary}>
          {saving ? "Publishing…" : isEdit ? "Save Changes" : "Publish Article"}
        </button>
        <button onClick={onCancel} style={btnSecondary}>Cancel</button>
      </div>
    </div>
  );
}

// ── Admin Dashboard ────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("slug,title,category,published_at,read_time,summary,tags,related_slugs,affiliate_peptide,content")
      .order("published_at", { ascending: false });

    setArticles(
      (data ?? []).map(r => ({
        slug: r.slug,
        title: r.title,
        category: r.category,
        summary: r.summary,
        publishedAt: r.published_at,
        readTime: r.read_time,
        tags: r.tags ?? [],
        content: r.content ?? [],
        relatedSlugs: r.related_slugs ?? [],
        affiliatePeptide: r.affiliate_peptide ?? undefined,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    await supabase.from("articles").delete().eq("slug", slug);
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET }),
    });
    fetchArticles();
  }

  if (view === "new" || view === "edit") {
    return (
      <ArticleForm
        initial={view === "edit" && editing ? editing : undefined}
        onSave={() => { setView("list"); fetchArticles(); }}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", margin: 0 }}>
          PeptidesMasters Admin
        </h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => setView("new")} style={btnPrimary}>+ New Article</button>
          <button onClick={onLogout} style={btnSecondary}>Log out</button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#9CA3AF" }}>Loading…</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {articles.map(a => (
            <div key={a.slug}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem 1.25rem", background: "#FFF", border: "1px solid #E5E7EB", borderRadius: "8px" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.25rem 0", color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.title}
                </p>
                <p style={{ color: "#9CA3AF", fontSize: "0.75rem", margin: 0 }}>
                  {a.category} · {a.publishedAt} · /articles/{a.slug}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <a href={`/articles/${a.slug}`} target="_blank" rel="noopener" style={btnSecondary}>View</a>
                <button onClick={() => { setEditing(a); setView("edit"); }} style={btnSecondary}>Edit</button>
                <button onClick={() => handleDelete(a.slug)} style={btnDanger}>Delete</button>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p style={{ color: "#9CA3AF" }}>No articles yet. Create your first one!</p>}
        </div>
      )}
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.55rem 0.875rem",
  border: "1px solid #E5E7EB",
  borderRadius: "6px",
  fontSize: "0.9rem",
  color: "#111827",
  background: "#FFF",
  outline: "none",
  boxSizing: "border-box",
  marginTop: "0.25rem",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "#374151",
};

const btnPrimary: React.CSSProperties = {
  padding: "0.55rem 1.25rem",
  background: "#FD6C68",
  color: "#FFF",
  border: "none",
  borderRadius: "6px",
  fontWeight: 700,
  fontSize: "0.875rem",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const btnSecondary: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "#F3F4F6",
  color: "#374151",
  border: "1px solid #E5E7EB",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "0.8rem",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const btnDanger: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  background: "rgba(220,38,38,0.06)",
  color: "#DC2626",
  border: "1px solid rgba(220,38,38,0.2)",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "0.75rem",
  cursor: "pointer",
};

// ── Root ───────────────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(Boolean(data.session));
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(Boolean(s));
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === null) return null; // loading

  if (!session) return <LoginForm onLogin={() => setSession(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#F9F9F9" }}>
      <Dashboard onLogout={async () => { await supabase.auth.signOut(); setSession(false); }} />
    </div>
  );
}
