"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface ProductFilterProps {
  products: Product[];
}

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: "active", label: "Released" },
  { key: "in-development", label: "In Development" },
  { key: "archived", label: "Archived" },
];

const categoryOptions = [
  { key: "all", label: "All Categories" },
  { key: "iot", label: "IoT" },
  { key: "saas", label: "SaaS" },
  { key: "mobile", label: "Mobile" },
  { key: "macOS", label: "macOS" },
  { key: "tool", label: "Tool" },
  { key: "other", label: "Other" },
];

export default function ProductFilter({ products }: ProductFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeStatus, setActiveStatus] = useState(
    searchParams.get("status") || "all"
  );
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    setActiveStatus(searchParams.get("status") || "all");
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // 过滤
  let filteredProducts = products;
  if (activeStatus !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.status === activeStatus
    );
  }
  if (activeCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === activeCategory
    );
  }

  // 更新 URL
  const updateParams = (updates: { status?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.status !== undefined) {
      if (updates.status === "all") {
        params.delete("status");
      } else {
        params.set("status", updates.status);
      }
    }
    if (updates.category !== undefined) {
      if (updates.category === "all") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <div>
      {/* Status filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {statusOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => updateParams({ status: opt.key })}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
              activeStatus === opt.key
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => updateParams({ category: opt.key })}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === opt.key
                ? "border border-brand-orange text-brand-orange bg-orange-50"
                : "border border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 产品列表 */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No matching products</p>
          <p className="text-sm mt-2">Try a different filter 🐂</p>
        </div>
      )}
    </div>
  );
}
