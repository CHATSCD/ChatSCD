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
  {
    slug: "training-program-kit",
    name: "Training Program Kit",
    tagline:
      "Everything you need to run the training yourself: workbooks, study guide, test, and certificate.",
    description:
      "A complete, ready-to-teach training package: Teacher's Workbook, Student's Workbook, Study Guide, Certification Test, and a Certificate of Completion template. Download once and train as many people as you need, on your own schedule.",
    priceCents: 24900,
    currency: "usd",
    category: "Training",
    fileName: "training-program-kit.txt",
    accent: "from-rose-500 to-pink-600",
  },
  {
    slug: "self-paced-training-course",
    name: "Self-Paced Training Course",
    tagline: "The full training class, ready to go at your own pace.",
    description:
      "The complete training class packaged for self-paced learning — go through it anytime, from anywhere, at your own speed. Includes the same workbooks, study guide, certification test, and certificate template as the Training Program Kit, formatted for independent study.",
    priceCents: 34900,
    currency: "usd",
    category: "Training",
    fileName: "self-paced-training-course.txt",
    accent: "from-sky-500 to-blue-600",
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
