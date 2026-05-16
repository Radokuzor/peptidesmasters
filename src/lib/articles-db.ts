import { supabase } from "./supabase";
import type { Article } from "@/data/articles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(row: any): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    publishedAt: row.published_at,
    readTime: row.read_time,
    tags: row.tags ?? [],
    content: row.content ?? [],
    relatedSlugs: row.related_slugs ?? [],
    affiliatePeptide: row.affiliate_peptide ?? undefined,
    liveUpdateLog: row.live_update_log ?? undefined,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? toArticle(data) : undefined;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data } = await supabase.from("articles").select("slug");
  return (data ?? []).map((r) => r.slug);
}

export async function getArticleCategories(): Promise<string[]> {
  const { data } = await supabase.from("articles").select("category");
  return [...new Set((data ?? []).map((r) => r.category))];
}

export async function getArticlesBySlugList(slugs: string[]): Promise<Article[]> {
  if (!slugs.length) return [];
  const { data } = await supabase
    .from("articles")
    .select("*")
    .in("slug", slugs);
  return (data ?? []).map(toArticle);
}
