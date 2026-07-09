"use client";

import { useState, useEffect } from "react";
import type { TocItem } from "@/lib/utils";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    const headings = document.querySelectorAll("h2[id], h3[id]");
    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        目录
      </h4>
      <ul className="space-y-1.5 border-l border-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
              className={`block text-sm py-0.5 transition-colors ${
                item.level === 3 ? "pl-4" : "pl-3"
              } ${
                activeId === item.id
                  ? "text-brand-orange border-l-2 border-brand-orange -ml-px font-medium"
                  : "text-gray-500 hover:text-gray-900 border-l-2 border-transparent -ml-px"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
