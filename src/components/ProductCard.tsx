import Link from "next/link";
import type { Product } from "@/lib/products";
import { statusLabels, categoryLabels } from "@/lib/product-constants";

interface ProductCardProps {
  product: Product;
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  "in-development": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-500",
};

export default function ProductCard({ product }: ProductCardProps) {
  const statusLabel = statusLabels[product.status] || product.status;
  const categoryLabel = categoryLabels[product.category] || product.category;
  const statusColor = statusColors[product.status] || statusColors.active;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}
        >
          {statusLabel}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {categoryLabel}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
        {product.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>

      {/* 标签 */}
      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
