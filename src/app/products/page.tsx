import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ProductFilter from "@/components/ProductFilter";

export const metadata: Metadata = {
  title: "Apps — XiaoNiuBuNiu",
  description:
    "Indie Mac & iOS apps built and shipped solo. From idea to launch — real products, real stories.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        My Apps
      </h1>
      <p className="text-gray-500 text-center mb-10">
        Indie apps I&apos;ve built and shipped — from idea to launch.
      </p>

      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-400">Loading...</div>
        }
      >
        <ProductFilter products={products} />
      </Suspense>
    </div>
  );
}
