import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      <div
        className={`flex h-40 items-center justify-center bg-gradient-to-br ${product.accent} text-4xl font-bold text-white/90`}
      >
        {product.name.charAt(0)}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold group-hover:underline">
          {product.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-black/60 dark:text-white/60">
          {product.tagline}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
