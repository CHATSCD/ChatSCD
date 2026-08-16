# Needed 2 B Developed App Store

A digital storefront for selling your own apps, built with Next.js and
Stripe Checkout. Buyers pay through Stripe, land on a verified success
page, and get a gated download link — no cart, no account system, just
list a product and start selling.

## How it works

- **Catalog** — `lib/products.ts` is the entire product list. Each entry
  is a name, description, price, category, and the filename of the file
  buyers receive.
- **Checkout** — `app/api/checkout/route.ts` creates a Stripe Checkout
  Session for the product on click. No Stripe Product/Price objects need
  to exist ahead of time — prices are defined inline in code.
- **Delivery** — `app/success/page.tsx` verifies the Checkout Session
  server-side (via the Stripe API) before showing a download link.
  `app/api/download/[slug]/route.ts` re-verifies payment before it will
  stream the file, so download links can't be reused for products that
  weren't paid for.
- **Webhook** — `app/api/webhook/route.ts` is a scaffold for
  `checkout.session.completed` events (order logging, receipt emails,
  etc.). It's optional for the store to function since the success page
  already verifies payment directly.

## Adding or replacing a product

1. Open `lib/products.ts` and edit an existing entry (or add a new
   object to the array) with the product's `slug`, `name`, `tagline`,
   `description`, `priceCents`, and `category`.
2. Drop the file buyers should receive into `public/downloads/` and set
   `fileName` to match.
3. Pick an accent gradient (any two Tailwind color stops) for the
   `accent` field, e.g. `"from-sky-500 to-blue-600"`.

No other code changes are needed — the homepage grid, product page, and
checkout flow all read from this file automatically.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
| --- | --- |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys. Use a `sk_test_...` key while testing, `sk_live_...` once you're ready to take real payments. |
| `STRIPE_WEBHOOK_SECRET` | Created when you add a webhook endpoint (see below). Only needed if you want the webhook route to work. |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL, e.g. `https://your-store.vercel.app`. Used to build Stripe success/cancel URLs. |

**Never commit real Stripe keys to the repo.** Set them as environment
variables in Vercel (Project → Settings → Environment Variables) instead.

## Setting up the Stripe webhook (optional but recommended)

1. In the Stripe Dashboard, go to Developers → Webhooks → Add endpoint.
2. Endpoint URL: `https://<your-domain>/api/webhook`
3. Subscribe to at least the `checkout.session.completed` event.
4. Copy the signing secret it gives you into `STRIPE_WEBHOOK_SECRET`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With a valid
`STRIPE_SECRET_KEY` test key set, the full buy → Stripe Checkout →
success → download flow works end to end using Stripe's test card
`4242 4242 4242 4242` (any future expiry, any CVC).

## Deploying

This is a standard Next.js app — deploy it to Vercel (or any Node
host) and set the environment variables above in your hosting
provider's dashboard.
