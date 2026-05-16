import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomTabBar from "@/components/layout/BottomTabBar";
import EmailPopup from "@/components/ui/EmailPopup";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peptidesmasters.com"),
  title: {
    default: "PeptidesMasters.com — The Trusted Peptide Research Authority",
    template: "%s | PeptidesMasters.com",
  },
  description:
    "Evidence-based, cited peptide research. Explore the most comprehensive library of peptide information — mechanisms, research, legal status, and comparisons. Not medical advice.",
  keywords: [
    "peptides",
    "peptide research",
    "BPC-157",
    "TB-500",
    "semaglutide",
    "peptide therapy",
    "research peptides",
    "peptides for weight loss",
    "peptides for healing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peptidesmasters.com",
    siteName: "PeptidesMasters.com",
    title: "PeptidesMasters.com — The Trusted Peptide Research Authority",
    description:
      "Evidence-based, cited peptide research. The most comprehensive library of peptide information online.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PeptidesMasters.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptidesMasters.com — The Trusted Peptide Research Authority",
    description: "Evidence-based, cited peptide research. Not medical advice.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PeptidesMasters.com",
              url: "https://peptidesmasters.com",
              description:
                "The most trusted educational resource for peptide research.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://peptidesmasters.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* TODO: Replace G-XXXXXXXXXX with your Google Analytics 4 Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
      </head>
      <body
        style={{
          background: "#FFFFFF",
          color: "#111827",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <BottomTabBar />
        <EmailPopup />
      </body>
    </html>
  );
}
