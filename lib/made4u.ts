export type Made4uTier = {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  bestFor: string;
  features: string[];
};

// Tiered pricing for custom "Made4U" builds. Edit prices/copy freely —
// customers pay one of these upfront, then fill out the questionnaire.
export const made4uTiers: Made4uTier[] = [
  {
    id: "quick-fix",
    name: "Quick Fix",
    priceCents: 14900,
    currency: "usd",
    bestFor: "One job, done right. A single form, calculator, or tracker.",
    features: [
      "One core screen / one job",
      "Replaces a single paper form or spreadsheet",
      "1-3 business day turnaround",
    ],
  },
  {
    id: "standard-build",
    name: "Standard Build",
    priceCents: 34900,
    currency: "usd",
    bestFor: "A small app with a few features working together.",
    features: [
      "Multiple screens / features",
      "Replaces a small process end-to-end",
      "1-3 business day turnaround",
    ],
  },
  {
    id: "full-custom",
    name: "Full Custom",
    priceCents: 69900,
    currency: "usd",
    bestFor: "A bigger multi-feature app replacing a whole workflow.",
    features: [
      "Several screens, uploads/exports, more moving parts",
      "Replaces a whole spreadsheet or paper-based workflow",
      "1-3 business day turnaround",
    ],
  },
];

export function getMade4uTier(id: string): Made4uTier | undefined {
  return made4uTiers.find((tier) => tier.id === id);
}

export function formatMade4uPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
