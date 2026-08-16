import { NextRequest, NextResponse } from "next/server";
import { getSiteUrl, stripe } from "@/lib/stripe";
import { getMade4uTier } from "@/lib/made4u";

export async function POST(req: NextRequest) {
  let tierId: string | undefined;
  try {
    const body = await req.json();
    tierId = body?.tierId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const tier = tierId ? getMade4uTier(tierId) : undefined;
  if (!tier) {
    return NextResponse.json({ error: "Tier not found." }, { status: 404 });
  }

  const siteUrl = getSiteUrl(req.headers.get("origin"));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: tier.currency,
            unit_amount: tier.priceCents,
            product_data: {
              name: `Made4U — ${tier.name}`,
              description: tier.bestFor,
            },
          },
        },
      ],
      metadata: { made4u: "true", tier: tier.id },
      success_url: `${siteUrl}/made4u/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/made4u`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Made4U checkout session creation failed:", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again shortly." },
      { status: 500 }
    );
  }
}
