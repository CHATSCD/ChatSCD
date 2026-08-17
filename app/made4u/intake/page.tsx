import Link from "next/link";
import { Made4uIntakeForm } from "@/components/Made4uIntakeForm";
import { stripe } from "@/lib/stripe";
import { formatMade4uPrice, getMade4uTier } from "@/lib/made4u";

export default async function Made4uIntakePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <StatusPage
        title="No checkout session found"
        message="Please start from the Made4U page and complete payment to reach the questionnaire."
      />
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return (
      <StatusPage
        title="We couldn't verify that purchase"
        message="Double-check the link from your confirmation email, or contact support if the problem continues."
      />
    );
  }

  if (session.payment_status !== "paid" || session.metadata?.made4u !== "true") {
    return (
      <StatusPage
        title="Payment not completed"
        message="It looks like this checkout session wasn't completed. No charge was made, and the questionnaire unlocks once payment is confirmed."
      />
    );
  }

  const tier = session.metadata?.tier ? getMade4uTier(session.metadata.tier) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
        Payment confirmed
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Tell us what you need
      </h1>
      {tier && (
        <p className="mt-2 text-black/60 dark:text-white/60">
          {tier.name} &middot;{" "}
          {formatMade4uPrice(tier.priceCents, tier.currency)}
        </p>
      )}
      <p className="mt-2 text-black/60 dark:text-white/60">
        Answer a few questions and upload anything you&apos;re currently
        using (paper forms, spreadsheets, screenshots — any format is fine).
        We&apos;ll get back to you within 1-3 business days.
      </p>
      <div className="mt-8">
        <Made4uIntakeForm sessionId={sessionId} />
      </div>
    </div>
  );
}

function StatusPage({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-black/60 dark:text-white/60">{message}</p>
      <Link
        href="/made4u"
        className="mt-8 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        &larr; Back to Made4U
      </Link>
    </div>
  );
}
