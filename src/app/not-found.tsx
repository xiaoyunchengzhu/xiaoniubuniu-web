import Link from "next/link";
import { LuArrowLeft, LuDownload, LuNewspaper } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-orange mb-3">404</p>
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        This page doesn&apos;t exist (yet)
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        The link may be outdated, or I shipped a rename. Here&apos;s the way
        back:
      </p>
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors"
        >
          <LuArrowLeft size={16} /> Back to Home
        </Link>
        <div className="flex justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <LuDownload size={15} /> Products
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <LuNewspaper size={15} /> Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
