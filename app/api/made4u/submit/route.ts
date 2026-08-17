import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getMade4uTier } from "@/lib/made4u";

type UploadedFile = { name: string; url: string; size: number };

export async function POST(req: NextRequest) {
  let payload: {
    sessionId?: string;
    name?: string;
    email?: string;
    business?: string;
    phone?: string;
    problem?: string;
    currentProcess?: string;
    desiredOutcome?: string;
    deploymentPreference?: string;
    notes?: string;
    files?: UploadedFile[];
  };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { sessionId } = payload;
  if (!sessionId) {
    return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.problem || !payload.currentProcess) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      { status: 400 }
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("Failed to retrieve checkout session:", err);
    return NextResponse.json({ error: "Could not verify your purchase." }, { status: 400 });
  }

  if (session.payment_status !== "paid" || session.metadata?.made4u !== "true") {
    return NextResponse.json(
      { error: "Payment could not be verified for this request." },
      { status: 403 }
    );
  }

  const tier = session.metadata?.tier ? getMade4uTier(session.metadata.tier) : undefined;
  const submittedAt = new Date().toISOString();
  const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  const metadata = {
    sessionId,
    tier: tier?.id ?? session.metadata?.tier ?? null,
    tierName: tier?.name ?? null,
    pricePaidCents: session.amount_total ?? tier?.priceCents ?? null,
    currency: session.currency ?? tier?.currency ?? "usd",
    submittedAt,
    dueDate,
    contact: {
      name: payload.name,
      email: payload.email,
      business: payload.business || null,
      phone: payload.phone || null,
    },
    problem: payload.problem,
    currentProcess: payload.currentProcess,
    desiredOutcome: payload.desiredOutcome || null,
    deploymentPreference: payload.deploymentPreference || "not-sure",
    notes: payload.notes || null,
    files: payload.files ?? [],
  };

  try {
    await put(`made4u/${sessionId}/metadata.json`, JSON.stringify(metadata, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
    });
  } catch (err) {
    console.error("Failed to store Made4U submission:", err);
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, dueDate });
}
