export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceCents: number;
  currency: string;
  category: string;
  fileName: string;
  accent: string;
};

// Placeholder catalog. Replace or add entries as you repurpose real apps —
// each entry becomes a listing, a checkout button, and a gated download.
export const products: Product[] = [
  {
    slug: "product-slot-one",
    name: "Product Slot 1",
    tagline: "Replace this with your first app",
    description:
      "This is a placeholder listing. Swap in your real product name, description, price, and the file buyers receive after checkout by editing lib/products.ts.",
    priceCents: 1900,
    currency: "usd",
    category: "Placeholder",
    fileName: "product-slot-one.txt",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    slug: "product-slot-two",
    name: "Product Slot 2",
    tagline: "Replace this with your second app",
    description:
      "Another placeholder listing, ready to be repurposed. Update the fields in lib/products.ts and drop the real download file in public/downloads.",
    priceCents: 2900,
    currency: "usd",
    category: "Placeholder",
    fileName: "product-slot-two.txt",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    slug: "product-slot-three",
    name: "Product Slot 3",
    tagline: "Replace this with your third app",
    description:
      "A third placeholder slot so you can see the grid with multiple listings. Delete it, or repurpose it, whenever you're ready.",
    priceCents: 4900,
    currency: "usd",
    category: "Placeholder",
    fileName: "product-slot-three.txt",
    accent: "from-amber-500 to-orange-600",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
