import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV !== "test") {
  console.warn(
    "STRIPE_SECRET_KEY is not set. Checkout and download routes will fail until it is configured."
  );
}

export const stripe = new Stripe(secretKey ?? "sk_test_placeholder", {
  apiVersion: "2026-07-29.dahlia",
});

export function getSiteUrl(originHeader: string | null): string {
  return (
    originHeader ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}
