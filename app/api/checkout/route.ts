import { NextRequest, NextResponse } from "next/server";
import { getSiteUrl, stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const product = slug ? getProduct(slug) : undefined;
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const siteUrl = getSiteUrl(req.headers.get("origin"));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.priceCents,
            product_data: {
              name: product.name,
              description: product.tagline,
            },
          },
        },
      ],
      metadata: { slug: product.slug },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/products/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again shortly." },
      { status: 500 }
    );
  }
}
