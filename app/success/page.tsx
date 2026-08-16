import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { formatPrice, getProduct } from "@/lib/products";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <StatusPage
        title="No checkout session found"
        message="If you just completed a purchase, please check your Stripe email receipt for details."
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

  if (session.payment_status !== "paid") {
    return (
      <StatusPage
        title="Payment not completed"
        message="It looks like this checkout session wasn't completed. No charge was made."
      />
    );
  }

  const slug = session.metadata?.slug;
  const product = slug ? getProduct(slug) : undefined;

  if (!product) {
    return (
      <StatusPage
        title="Payment received"
        message="Your payment went through, but we couldn't match it to a product. Contact support with your receipt for help."
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
        Payment confirmed
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Thanks for your purchase!
      </h1>
      <p className="mt-3 text-black/60 dark:text-white/60">
        {product.name} &middot;{" "}
        {formatPrice(product.priceCents, product.currency)}
      </p>
      <a
        href={`/api/download/${product.slug}?session_id=${sessionId}`}
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
      >
        Download {product.name}
      </a>
      <p className="mt-4 text-sm text-black/40 dark:text-white/40">
        A receipt was sent to{" "}
        {session.customer_details?.email ?? "your email"}. Keep this page
        open if you need to download again.
      </p>
      <Link
        href="/"
        className="mt-10 block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        &larr; Back to the store
      </Link>
    </div>
  );
}

function StatusPage({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-black/60 dark:text-white/60">{message}</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        &larr; Back to the store
      </Link>
    </div>
  );
}
