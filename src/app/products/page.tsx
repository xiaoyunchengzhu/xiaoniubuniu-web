import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ProductFilter from "@/components/ProductFilter";

export const metadata: Metadata = {
  title: "独立产品",
  description:
    "小牛不牛的独立产品矩阵，包括物联网平台、合规工具等。记录从0到1的真实产品研发过程。",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        独立产品
      </h1>
      <p className="text-gray-500 text-center mb-10">
        记录我独立开发的产品，从想法到上线，真实的研发过程。
      </p>

      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-400">加载中...</div>
        }
      >
        <ProductFilter products={products} />
      </Suspense>
    </div>
  );
}
