import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Configure this endpoint URL (https://<your-domain>/api/webhook) in the
// Stripe Dashboard, subscribed to at least the checkout.session.completed
// event, then set STRIPE_WEBHOOK_SECRET to the signing secret it gives you.
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log(
      `Payment completed for product "${session.metadata?.slug}" — session ${session.id}, customer ${session.customer_details?.email ?? "unknown"}`
    );
    // Extend here: persist the order, send a receipt/download email, etc.
  }

  return NextResponse.json({ received: true });
}
