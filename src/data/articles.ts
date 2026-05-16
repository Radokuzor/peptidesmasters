export interface ArticleSection {
  heading?: string;
  body: string;
  sources?: { label: string; url: string }[];
}

export interface LogEntry {
  date: string;
  status: string;
  message: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  content: ArticleSection[];
  relatedSlugs: string[];
  affiliatePeptide?: string;
  liveUpdateLog?: LogEntry[];
}
