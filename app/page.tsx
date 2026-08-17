import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Digital apps, delivered instantly.
        </h1>
        <p className="mt-4 text-lg text-black/60 dark:text-white/60">
          Browse the catalog below and check out securely with Stripe.
          Every purchase unlocks an instant download.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </div>
  );
}
