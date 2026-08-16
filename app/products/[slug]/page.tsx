import { notFound } from "next/navigation";
import { BuyButton } from "@/components/BuyButton";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div
          className={`flex h-64 items-center justify-center rounded-xl bg-gradient-to-br ${product.accent} text-6xl font-bold text-white/90 sm:h-full`}
        >
          {product.name.charAt(0)}
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="text-black/60 dark:text-white/60">
            {product.description}
          </p>
          <div className="mt-2 text-3xl font-semibold">
            {formatPrice(product.priceCents, product.currency)}
          </div>
          <BuyButton slug={product.slug} />
          <p className="text-xs text-black/40 dark:text-white/40">
            Instant digital download. You&apos;ll get access as soon as
            your payment is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
