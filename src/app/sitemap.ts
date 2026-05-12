import type { MetadataRoute } from "next";
import { getAllPeptideSlugs } from "@/data/peptides";
import { getAllArticleSlugs } from "@/data/articles";

const BASE_URL = "https://peptidesmasters.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const peptideSlugs = getAllPeptideSlugs();
  const articleSlugs = getAllArticleSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/peptides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const peptidePages: MetadataRoute.Sitemap = peptideSlugs.map((slug) => ({
    url: `${BASE_URL}/peptides/${slug}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const comparePages: MetadataRoute.Sitemap = [
    "bpc-157-vs-tb-500",
    "semaglutide-vs-tirzepatide",
    "cjc-1295-vs-ipamorelin",
    "nad-plus-vs-nmn",
    "mk-677-vs-ipamorelin",
  ].map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...peptidePages, ...articlePages, ...comparePages];
}
