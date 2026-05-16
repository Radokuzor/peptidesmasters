import ArticleTableOfContents, { TocItem } from "@/components/ui/ArticleTableOfContents";

interface Props {
  tocItems: TocItem[];
  children: React.ReactNode;
}

export default function ArticleLayout({ tocItems, children }: Props) {
  return (
    <>
      <div
        className="article-layout-root"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          display: "flex",
          gap: "3rem",
          alignItems: "flex-start",
        }}
      >
        <ArticleTableOfContents items={tocItems} />
        <div className="article-layout-content" style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .article-layout-root {
            flex-direction: column !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
