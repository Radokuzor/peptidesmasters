"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, GitCompare, HelpCircle, Zap } from "lucide-react";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/peptides", icon: BookOpen, label: "Library" },
  { href: "/compare", icon: GitCompare, label: "Compare" },
  { href: "/quiz", icon: Zap, label: "Quiz" },
  { href: "/faq", icon: HelpCircle, label: "FAQ" },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-tab-bar" aria-label="Mobile navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              color: isActive ? "#3B82A0" : "#A89E98",
              textDecoration: "none",
              flex: 1,
              padding: "0.5rem 0",
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span style={{ fontSize: "0.6875rem", fontWeight: isActive ? 600 : 400 }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
      <style>{`
        .bottom-tab-bar {
          display: none;
        }
        @media (max-width: 768px) {
          .bottom-tab-bar {
            display: flex !important;
          }
          body {
            padding-bottom: 64px;
          }
        }
      `}</style>
    </nav>
  );
}
